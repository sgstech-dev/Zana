using System;
using Microsoft.AspNetCore.SignalR;
using OperatorSystems;
using Server.models;
using MoonSocket;

namespace Server.DecisionService;

public class SadidSystem : OperatorSystem
{
    //private readonly IMoonContext _moonContext;
    public SadidSystem(IHubContext<Hub> hubContext, string ipAddress, int port, GisObject gisObject, int startRange, int endRange, double startAngle, double endAngle, double latitude, double longitude, double altitude/*,IMoonContext moonContext*/) : base(hubContext, ipAddress, port, gisObject, startRange, endRange, startAngle, endAngle, latitude, longitude, altitude)
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
        Console.WriteLine("Target <" + target.TargetId + "> reported to GUI ");
        _hubContext.Clients.All.SendAsync("assignTarget", target, m_gisObject).Wait();
    }

    public override void StopExecution(Target target)
    {
        Console.WriteLine("Target <" + target.TargetId + "> is finished operation by " + m_gisObject.Name);
    }

    public override void CallCommand(string command, params object[] args)
    {
        Console.WriteLine("call bandTurnOnOff", args);
        switch (command)
        {
            case "bandTurnOnOff":
                bandTurnOnOff(args[0].ToString()!, args[1].ToString()!);
                break;
            default:
                break;
        }
    }

    public void bandTurnOnOff(string bandNumber, string state)
    {
        List<Parameter> parameters = new List<Parameter>();
        parameters.Add(new Parameter { ParamName = "BandNumber", Value = bandNumber });
        parameters.Add(new Parameter { ParamName = "State", Value = state });
        //_moonContext.All.Invoke("bandTurnOnOff", parameters.ToArray());
    }
}
