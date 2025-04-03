using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Server.models;
using OperatorSystems;
using Microsoft.AspNetCore.SignalR;

namespace Server.DecisionService;

public class DefaultSystem : OperatorSystem
{
    IPEndPoint endPoint;
    protected UdpClient udpClient;
    public DefaultSystem(GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude) : base(gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {
        udpClient = new UdpClient();
        udpClient.EnableBroadcast = true; // فعال‌سازی برادکست
        endPoint = new IPEndPoint(IPAddress.Broadcast, 61000);
    }

    public override void Execute(Target target)
    {
        string jsonStr = "{\"Range\":" + target.Range + ",\"Theta\":" + target.Theta + "\"TargetId\":" + target.TargetId + "}";
        byte[] data = Encoding.UTF8.GetBytes(jsonStr);

        udpClient.Send(data, data.Length, endPoint);
        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
        Console.WriteLine("From Dynamic DLL");
    }

    public override void SendReportToClients(Target target, IHubContext<Hub> hubContext)
    {
        Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
        hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject);
        Console.WriteLine("From Dynamic DLL");
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }
}
