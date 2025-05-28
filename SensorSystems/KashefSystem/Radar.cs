using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SensorSystems;
using Server.models;
using Server.Tools;

namespace KashefSystem;

public class Radar : SensorSystem
{
    private ConcurrentDictionary<string, Guid> TargetIds = [];
    public Radar(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port, double maxrange) : base(hubContext, sensorObject, IpAddress, Port,maxrange)
    {
    }

    public override Task Listen()
    {
        try
        {
            UdpClient udpListener = new UdpClient(51233);
            var isRun = true;
            _ = Task.Run(async () =>
            {
                while (isRun)
                {
                    try
                    {
                        // Receive data from UDP client
                        IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, 0);
                        byte[] receivedData = udpListener.Receive(ref remoteEndPoint);

                        // Convert bytes to string
                        string receivedString = Encoding.UTF8.GetString(receivedData);
                        Console.WriteLine("Received data: " + receivedString);
                        var radarTarget = JsonConvert.DeserializeObject<Dictionary<string, Object>>(receivedString)!;
                        if (radarTarget != null)
                        {
                            if (!TargetIds.ContainsKey(radarTarget!["TargetID"].ToString()!))
                                TargetIds[radarTarget!["TargetID"].ToString()!] = Guid.NewGuid();
                            Target target = new Target
                            {
                                Altitude = Convert.ToDouble(radarTarget!["Alt"]),
                                Heading = 0,//radarTarget!.Heading,
                                Latitude = Convert.ToDouble(radarTarget!["Lat"]),
                                Longitude = Convert.ToDouble(radarTarget!["Lng"]),
                                Speed = Convert.ToDouble(radarTarget!["Speed"]),
                                TargetType = TargetType.Position,
                                Simulated = false,
                                SystemTargetId = 0,//radarTarget!["TargetId"].ToString(),
                                TargetId = TargetIds[radarTarget!["TargetID"].ToString()!].ToString(),
                                DetectedTime = DateTime.Now
                            };
                            await sendToClient(target);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error: " + ex.Message);
                    }
                }
            });
        }
        catch (Exception error)
        {
            Console.WriteLine("An error was occurred! : " + error.Message);
        }
        return Task.CompletedTask;
    }

    public override Task StartSimulation(List<List<Scene>> targets_States)
    {
        base.StartSimulation(targets_States);
        foreach (var target_states in targets_States)
        {
            Task.Run(async () =>
            {
                double time = 0;// in second
                Guid TargetId = Guid.NewGuid();
                (bool isFinished, Scene? targetState) result;
                do
                {
                    result = GisUtil.Interpolate(target_states, time);
                    var dist = GisUtil.CalculateDistance(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, result.targetState!.Latitude, result.targetState.Longitude);
                    //if (dist > m_maxrange)
                   //     continue;
                    try
                        {
                            Target simulatedtarget = new Target
                            {
                                Altitude = result.targetState!.Altitude,
                                Heading = result.targetState!.Heading,
                                Latitude = result.targetState!.Latitude,
                                Longitude = result.targetState!.Longitude,
                                Speed = result.targetState!.Speed,
                                TargetType = TargetType.Position,
                                Simulated = true,
                                SystemTargetId = result.targetState!.GisObjectId,
                                TargetId = TargetId.ToString(),
                                DetectedTime = DateTime.Now
                            };
                            await sendToClient(simulatedtarget);
                            time++; ///in second
                            await Task.Delay(3000);
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
}
