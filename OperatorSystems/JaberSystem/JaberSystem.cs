using System;
using Microsoft.AspNetCore.SignalR;
using OperatorSystems;
using Server.models;
//using WebSocketsSample.MoonSocket;

namespace Server.DecisionService;

public class JaberSystem : OperatorSystem
{
    // private readonly IMoonContext _moonContext;
    public JaberSystem(IHubContext<Hub> hubContext,GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude/*,IMoonContext moonContext*/) : base(hubContext,gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {
        // _moonContext = moonContext;
    }

    protected override void Execute(Target target)
    {
        // List<Parameter> parameters = new List<Parameter>();
        // parameters.Add(new Parameter { ParamName = "Range", Value = target.Range });
        // parameters.Add(new Parameter { ParamName = "Theta", Value = target.Theta });
        // _moonContext.All.Invoke("test", parameters);

        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
    }

    public override void SendReportToClients(Target target)
    {
        if (target.EnableHunted)
        {
            Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
            _hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject).Wait();
        }
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }

    protected override bool checkTargetInZones(Target target)
    {
        return (target.Detector_id == m_gisObject.Id) && target.EnableHunted;
    }
}
