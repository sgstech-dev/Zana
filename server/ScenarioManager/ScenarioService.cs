using System;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.DecisionService;
using Server.models;
using Server.SensorManager;
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
    private SensorService _sensorService;
    private static Dictionary<int, bool> isRun = [];
    
    public ScenarioService(ILogger<ScenarioService> logger,
        WGDBContextFactory wgdbBContextFactory,
        IHubContext<ServerHub> hubContext,
        SensorService sensorService,
        DecisionBuilder decisionBuilder)
    {
        _logger = logger;
        _dbContext = wgdbBContextFactory.CreateDbContext();
        _hubContext = hubContext;
        _wgdbBContextFactory = wgdbBContextFactory;
        _decisionBuilder = decisionBuilder;
        _sensorService = sensorService;
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
        _sensorService.StopSimulation();
    }

    public void Start(int scenario_id)
    {
        if (isRun.ContainsKey(scenario_id) && isRun[scenario_id])
            return;
        isRun[scenario_id] = true;
        var allTargetOfScenario = _dbContext.GisObjects.Include("ObjectType.Category").Where(go => go.Scenario_id == scenario_id && go.ObjectType!.Category!.Key == "aircraft");
        List<List<Scene>> targets = [];
        foreach (var target in allTargetOfScenario)
        {
            var sceneOfTarget = _dbContext.Scene.Where(s => s.GisObjectId == target.Id).ToList();
            foreach (var item in sceneOfTarget)
            {
                item.GisObject = null;
            }
            targets.Add(sceneOfTarget);
        }
        _sensorService.StartSimulation(targets);
    }
}
