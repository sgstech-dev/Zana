using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Server.models;
using OperatorSystems;
using Microsoft.AspNetCore.SignalR;
using Server.Tools;

namespace Server.DecisionService;

public class LaserSystem : OperatorSystem
{
    //protected TcpListener? tcpListener;
    //protected StreamWriter? writer;
    UdpClient udpClient;
    IPEndPoint endPoint;

    string FiredTargetPic = "";
    public LaserSystem(IHubContext<Hub> hubContext, string ipAddress, int port, GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude) : base(hubContext, ipAddress, port, gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {
        // برای IpAddress باید فیلتر بزاریم
        //TcpListener tcpListener = new(IPAddress.Any, m_port);
        udpClient = new UdpClient(4040);
        udpClient.EnableBroadcast = true; // فعال‌سازی برادکست
        endPoint = new IPEndPoint(IPAddress.Parse("192.168.0.72"), 3030);
        bool receiving = true;

        Console.WriteLine("Waiting for file...");
        _ = Task.Run(() =>
        {
            //     {
            while (receiving)
            {
                byte[] receivedBytes = udpClient.Receive(ref endPoint);
                FiredTargetPic = Convert.ToBase64String(receivedBytes);
                File.WriteAllBytes("received_file.bmp", receivedBytes);
            }
        });
    }

    public override void SendReportToClients(Target target)
    {
        if ((target.TargetType == TargetType.Position)&&(checkTargetInZones(target)))
        {
            Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
            _hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject, FiredTargetPic).Wait();
        }
    }


    protected override void Execute(Target target)
    {
        //target.

    }

    protected override void SendTargetToDevice(Target target)
    {
        var dist = GisUtil.CalculateDistance(m_latitude, m_longitude, target.Latitude, target.Longitude);
        var bearing = GisUtil.bearing(m_latitude, m_longitude, target.Latitude, target.Longitude);
        var elevation = GisUtil.GetElevationAngle(m_latitude, m_longitude, 0, target.Latitude, target.Longitude, target.Altitude);
        //string jsonStr = "{\"Range\":" + dist + ",\"Theta\":" + bearing + "\"TargetId\":" + target.TargetId + "}";
        byte[] data = new byte[37];//Encoding.UTF8.GetBytes(jsonStr); 
        byte[] Range = BitConverter.GetBytes(Convert.ToUInt32(dist));
        byte[] bearingByte = BitConverter.GetBytes(Convert.ToSingle(bearing));
        byte[] Id = BitConverter.GetBytes(Convert.ToInt32(10));
        byte[] elevationByte = BitConverter.GetBytes(Convert.ToSingle(elevation));

        Array.Copy(Range, 0, data, 33, 4);
        Array.Copy(bearingByte, 0, data, 25, 4);
        Array.Copy(Id, 0, data, 19, 4);
        Array.Copy(elevationByte, 0, data, 29, 4);

        udpClient.Send(data, data.Length, endPoint);
        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
        Console.WriteLine("From Dynamic DLL");
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }

    protected override bool checkTargetInZones(Target target)
    {
        return base.checkTargetInZones(target);
    }

    public override void CallCommand(string command, params object[] args)
    {
        return;
    }
}
