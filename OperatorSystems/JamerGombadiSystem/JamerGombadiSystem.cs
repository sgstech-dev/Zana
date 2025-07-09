using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Server.models;
using OperatorSystems;
using Microsoft.AspNetCore.SignalR;

namespace Server.DecisionService;

public class JamerGombadiSystem : OperatorSystem
{
    public JamerGombadiSystem(IHubContext<Hub> hubContext, string ipAddress, int port, GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude) : base(hubContext, ipAddress, port, gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {

    }

    protected override void Execute(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
    }

    public override void SendReportToClients(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
        _hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject).Wait();
        Console.WriteLine("From Dynamic DLL");
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }

    protected override bool checkTargetInZones(Target target)
    {
        return true;
    }

    static byte[] HexStringToByteArray(string hex)
    {
        return Enumerable.Range(0, hex.Length)
                         .Where(x => x % 2 == 0)
                         .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                         .ToArray();
    }

    public override void CallCommand(string command, params object[] args)
    {
        Console.WriteLine("call jammerGonbadiOnOff", args);
        switch (command)
        {
            case "jammerGonbadiOnOff":
                comunicationWithDevice(args[0].ToString()!, args[1].ToString()!);
                break;
            default:
                break;
        }
    }

    public void comunicationWithDevice(string chanelNumber, string state)
    {
        string dataStr = "";
        IPAddress localIPAddress = IPAddress.Parse(getLocalIpAddress()); // آی‌پی کارت شبکه محلی 192.168.0.26
        int localPort = 9001;
        IPEndPoint localEndPoint = new IPEndPoint(localIPAddress, localPort);
        UdpClient udpClient = new UdpClient(localEndPoint);

        udpClient.EnableBroadcast = true; // فعال‌سازی برادکست
        var endPoint = new IPEndPoint(IPAddress.Parse(m_ipAddress), m_port); // 192.168.0.43:9003
        try
        {
            if (chanelNumber == "All")
            {
                if (state == "On")
                {
                    dataStr = "AA550000000000000000000000000000000000000000FFFF0000000055BB";
                }
                if (state == "Off")
                {
                    dataStr = "AA55000000000000000000000000000000000000000000000000000055BB";
                }
                byte[] data = HexStringToByteArray(dataStr);

                udpClient.Send(data, data.Length, endPoint);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        finally
        {
            udpClient.Close();
        }
    }
}
