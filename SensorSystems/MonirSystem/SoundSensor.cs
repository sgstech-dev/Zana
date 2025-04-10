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
    public SoundSensor(IHubContext<Hub> hubContext, GisObject sensorObject) : base(hubContext, sensorObject)
    {
    }

    public override Task Listen()
    {
        try
        {
            UdpClient udpListener = new UdpClient(8037);
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
                        //{"sound_pan": 313.9966570219482, "sound_tilt": 72.43361945274751, "sound_validation": 1, "sound_time": "2025-03-15-13-04-00-887062", "sound_power": null, "2th_pan": null, "2th_tilt": null, "2th_range": null, "2th_time": null}
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
                                TargetType = TargetType.Real,
                                SystemTargetId = 0,//radarTarget!["TargetId"].ToString(),
                                TargetId = Guid.Empty,
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
