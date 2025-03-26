using System;
using Microsoft.AspNetCore.SignalR;
using OperatorSystems;
using Server.models;
//using WebSocketsSample.MoonSocket;

namespace Server.DecisionService;

public class SadidSystem : OperatorSystem
{
   // private readonly IMoonContext _moonContext;
    public SadidSystem(GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude/*,IMoonContext moonContext*/) : base(gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
    {
       // _moonContext = moonContext;
    }

    public override void Execute(Target target)
    {
        // List<Parameter> parameters = new List<Parameter>();
        // parameters.Add(new Parameter { ParamName = "Range", Value = target.Range });
        // parameters.Add(new Parameter { ParamName = "Theta", Value = target.Theta });
        // _moonContext.All.Invoke("test", parameters);
        
        Console.WriteLine("Target <" + target.TargetId + "> assign to oparator " + m_gisObject.Name);
    }

    public override void SendReportToClients(Target target, IHubContext<Hub> hubContext)
    {
        Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
        hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject);
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }
}
