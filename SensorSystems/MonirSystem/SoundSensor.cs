using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SensorSystems;
using Server.models;

namespace MonirSystem;

public class SoundSensor : SensorSystem
{
    public SoundSensor(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port) : base(hubContext, sensorObject, IpAddress, Port)
    {

    }

    public override Task Listen()
    {
        var listener = new HttpListener();
        listener.Prefixes.Add($"http://+:{m_port}/" );
        listener.Start();
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
    protected override void Relay(string jasonData)
    {
        base.Relay(jasonData);
    }
}
