using System.Collections.Concurrent;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.DecisionService;
using Server.models;
using Server.ScenarioManager;
using Server.SensorManager;
using Server.Tools;
using WebSocketsSample.MoonSocket;

namespace Server
{
    public class ServerHub : Hub
    {
        private readonly WGDBContext _dbContext;
        private ScenarioService _scenarioService;
        private SensorService _sensorService;
        private DecisionBuilder _decisionBuilder;
        public ServerHub(WGDBContext dbContext, ScenarioService scenarioService, DecisionBuilder decisionBuilder , SensorService sensorService)
        {
            _dbContext = dbContext;
            _scenarioService = scenarioService;
            _decisionBuilder = decisionBuilder;
            _sensorService = sensorService;
        }
        public override Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;
            Console.WriteLine($"Client connected with connection ID: {connectionId}");
            return base.OnConnectedAsync();
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public void Start(int scenario_id)
        {
            _scenarioService.Start(scenario_id);
        }

        public void Stop(int scenario_id)
        {
            _scenarioService.Stop(scenario_id);
        }

        public bool IsStarted(int scenario_id)
        {
            return _scenarioService.IsStarted(scenario_id);
        }

        public void ChangeScenario(int scenario_id)
        {
            _decisionBuilder.LoadSystemsAsync(scenario_id).Wait();
            _sensorService.LoadSystemsAsync(scenario_id).Wait();
        }

        public List<Scene> getGisObjects(int scenario_id)
        {
            return _dbContext.Scene
                .Include("GisObject")
                .Include("GisObject.ObjectType.Category")
                .Where(s => s.GisObject!.Scenario_id == scenario_id && s.GisObject.ObjectType!.Category!.Key != "aircraft").ToList();
        }

    }
}