using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SensorSystems;
using Server.models;

namespace KashefSystem;

public class Radar : SensorSystem
{
    private ConcurrentDictionary<string, Guid> TargetIds = [];
    public Radar(IHubContext<Hub> hubContext) : base(hubContext)
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
                                TargetType = TargetType.Real,
                                SystemTargetId = 0,//radarTarget!["TargetId"].ToString(),
                                TargetId = TargetIds[radarTarget!["TargetID"].ToString()!]
                            };
                            var targetJson = JsonConvert.DeserializeObject<Target>(
                                 JsonConvert.SerializeObject(target)); // ??????????????
                            await sendToClient(targetJson);
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
}
