using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SensorSystems;
using Server.models;
using Server.Tools;

namespace MonirSystem;

public class SoundSensor : SensorSystem
{
    public SoundSensor(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port, double maxrange) : base(hubContext, sensorObject, IpAddress, Port, maxrange)
    {

    }

    public override Task Listen()
    {
        var listener = new HttpListener();
        if (int.TryParse(m_port.ToString(), out int port) && port >= 1 && port <= 65535 && IsPortAvailable(port))
        {
            listener.Prefixes.Add($"http://+:{port}/");
            listener.Start();
        }
        else
        {
            Console.WriteLine("Invalid or unavailable port.");
            return Task.CompletedTask;
        }
        return Task.Run(async () =>
        {
            while (true)
            {
                HttpListenerContext context = await listener.GetContextAsync(); HttpListenerRequest request = context.Request;
                var clientIp = context.Request.RemoteEndPoint?.Address.ToString();
                Console.WriteLine($"The client with ip address {clientIp} was connected.");
                Console.WriteLine($"Method: {request.HttpMethod}");
                Console.WriteLine($"URL: {request.Url}");
                // فقط اگر POST بود            
                if (m_ipAddress.Contains(clientIp!.Trim()) && (request.HttpMethod == "POST"))
                {
                    using (var reader = new StreamReader(request.InputStream, request.ContentEncoding))
                    {
                        string body = await reader.ReadToEndAsync();
                        Console.WriteLine("POST Body: " + body);
                        var radarTarget = JsonConvert.DeserializeObject<Dictionary<string, Object>>(body)!;
                        // if (radarTarget.ContainsKey("radarTarget"))
                        {
                            if (radarTarget != null)
                            {
                                string trimmedInput = radarTarget!["sound_time"].ToString()!.Substring(0, 23); // "2025-03-15-13-04-00-887"
                                string format = "yyyy-MM-dd-HH-mm-ss-fff";

                                DateTime dt = DateTime.ParseExact(trimmedInput, format, CultureInfo.InvariantCulture);
                                Target target = new Target
                                {
                                    Theta = Convert.ToDouble(radarTarget!["sound_pan"]),
                                    Elevation = Convert.ToDouble(radarTarget!["sound_tilt"]),
                                    DetectedTime = dt,
                                    TargetType = TargetType.Direction,
                                    Simulated = false,
                                    SystemTargetId = 0,
                                    TargetId = Guid.Empty.ToString(),
                                    Detector_id = m_sensorObject.Id,
                                    Detector = m_sensorObject
                                };
                                Console.WriteLine(target);
                                if (m_enableRelay)
                                    Relay(body);
                                sendToClient(target).Wait();
                            }
                        }

                    }
                    // پاسخ به درخواست                
                    string responseString = "Received POST!";
                    byte[] buffer = Encoding.UTF8.GetBytes(responseString);
                    context.Response.ContentLength64 = buffer.Length;
                    await context.Response.OutputStream.WriteAsync(buffer, 0, buffer.Length);
                    context.Response.Close();
                }
                else
                {
                    context.Response.StatusCode = 405;
                    // // Method Not Allowed   
                    context.Response.Close();
                }
            }
        });
    }
    public override Task StartSimulation(List<List<Scene>> targets_States)
    {
        base.StartSimulation(targets_States);
        foreach (var target_states in targets_States)
        {
            Task.Run(() =>
            {
                double time = 0;// in second
                Guid TargetId = Guid.NewGuid();
                (bool isFinished, Scene? targetState) result;
                do
                {
                    result = GisUtil.Interpolate(target_states, time);
                    var dist = GisUtil.CalculateDistance(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, result.targetState!.Latitude, result.targetState.Longitude);
                    var theta = GisUtil.bearing(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, result.targetState!.Latitude, result.targetState.Longitude);
                    var elevation = GisUtil.GetElevationAngle(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, m_sensorObject.LastAltitude, result.targetState!.Latitude, result.targetState.Longitude, result.targetState.Altitude);
                    // if (dist > m_maxrange)
                    //     continue;
                    try
                    {
                        Target simulatedtarget = new Target
                        {
                            Theta = theta, //+ GisUtil.getRandomValue(-5, 5),
                            Elevation = elevation,
                            DetectedTime = DateTime.Now,
                            TargetType = TargetType.Direction,
                            Simulated = true,
                            SystemTargetId = 0,
                            TargetId = Guid.Empty.ToString(),
                            Detector_id = m_sensorObject.Id,
                            Detector = m_sensorObject
                        };
                        sendToClient(simulatedtarget).Wait();
                        time++; ///in second
                        Task.Delay(3000).Wait();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                    finally
                    {
                        result.targetState!.Dispose();
                    }
                }
                while (!result.isFinished && m_isRunSimulation);
            });

        }
        Console.WriteLine("Start simulation.");
        return Task.CompletedTask;
    }
    protected override void Relay(string jasonData)
    {
        base.Relay(jasonData);
    }
}
