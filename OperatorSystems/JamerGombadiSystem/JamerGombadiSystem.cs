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
    public JamerGombadiSystem(GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude) : base(gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {

    }

    public override void Execute(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
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
}
