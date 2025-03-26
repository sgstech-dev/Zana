using System;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.DecisionService;
using Server.models;
using Server.Tools;

namespace Server.ScenarioManager;

public interface IScenarioService
{
    public bool IsStarted(int scenario_id);
    public void Stop(int scenario_id);
    public void Start(int scenario_id);
}
public class ScenarioService : IScenarioService
{
    private readonly ILogger<ScenarioService> _logger;
    private readonly WGDBContext _dbContext;
    private IHubContext<ServerHub> _hubContext;
    private WGDBContextFactory _wgdbBContextFactory;
    private DecisionBuilder _decisionBuilder;
    private static Dictionary<int, bool> isRun = [];
    private ConcurrentDictionary<int,Dictionary<int, Guid>> ScenarioTargetIds = [];
    public static ConcurrentDictionary<int, Scene> lastTargetScene = [];
    public ScenarioService(ILogger<ScenarioService> logger,
        WGDBContextFactory wgdbBContextFactory,
        IHubContext<ServerHub> hubContext,
        DecisionBuilder decisionBuilder)
    {
        _logger = logger;
        _dbContext = wgdbBContextFactory.CreateDbContext();
        _hubContext = hubContext;
        _wgdbBContextFactory = wgdbBContextFactory;
        _decisionBuilder = decisionBuilder;
    }

    public bool IsStarted(int scenario_id)
    {
        bool result = isRun.ContainsKey(scenario_id);
        if (result)
            result = isRun[scenario_id];
        return result;
    }

    public void Stop(int scenario_id)
    {
        isRun[scenario_id] = false;
    }

    public void Start(int scenario_id)
    {
        ScenarioTargetIds[scenario_id] = [];
        if (isRun.ContainsKey(scenario_id) && isRun[scenario_id])
            return;
        isRun[scenario_id] = true;
        var allTargetOfScenario = _dbContext.GisObjects.Include("ObjectType.Category").Where(go => go.Scenario_id == scenario_id && go.ObjectType!.Category!.Key == "aircraft");

        foreach (var target in allTargetOfScenario)
        {
            ScenarioTargetIds[scenario_id][target.Id] =Guid.NewGuid();
            var sceneOfTarget = _dbContext.Scene.Where(s => s.GisObjectId == target.Id).ToList();
            foreach (var item in sceneOfTarget)
            {
                item.GisObject = null;
            }
            double time = 0;// in second
            Task.Run(async () =>
            {
                (bool isFinished, Scene? targetState) result;
                do
                {
                    result = GisUtil.Interpolate(sceneOfTarget, time);
                    try
                    {
                        Target simulatedtarget = new Target{
                            Altitude=result.targetState!.Altitude,
                            Heading=result.targetState!.Heading,
                            Latitude=result.targetState!.Latitude,
                            Longitude=result.targetState!.Longitude,
                            Speed = result.targetState!.Speed,
                            TargetType=TargetType.Simulation,
                            SystemTargetId=result.targetState!.GisObjectId,
                            TargetId=ScenarioTargetIds[scenario_id][target.Id]
                            };
                        _decisionBuilder.UpdateState(simulatedtarget);
                        _decisionBuilder.MakeDecision();
                        var simulatedtargetJson = JsonConvert.DeserializeObject<Target>(
                                 JsonConvert.SerializeObject(simulatedtarget));
                        await _hubContext.Clients.All.SendAsync("sendTarget",simulatedtargetJson);
                        lastTargetScene[result.targetState!.GisObjectId] = result.targetState;
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
                while (!result.isFinished && isRun[scenario_id]);
                lastTargetScene.Clear();
            });

        }
    }
}
