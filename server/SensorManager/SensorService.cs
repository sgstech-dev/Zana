using System;
using System.Reflection;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SensorSystems;
using Server.DecisionService;
using Server.models;

namespace Server.SensorManager;

public class SensorService
{
    private WGDBContextFactory _wgdbBContextFactory;
    private IHubContext<ServerHub> _hubContext;
    private Dictionary<int, SensorSystem> SensorSystems { get; set; }
    private IConfiguration _configuration;
    private DecisionBuilder _decisionBuilder;
    private double lastDetectedTimeInSecond;
    private DateTime lastDetectedTime;
    private bool warningSituation = false;
    private double MaxRange;
    public SensorService(WGDBContextFactory wGDBContextFactory, IHubContext<ServerHub> hubContext, IConfiguration configuration, DecisionBuilder decisionBuilder)
    {
        SensorSystems = [];
        _wgdbBContextFactory = wGDBContextFactory;
        _hubContext = hubContext;
        _configuration = configuration;
        _decisionBuilder = decisionBuilder;
        lastDetectedTimeInSecond = 0;
        lastDetectedTime = DateTime.Now;
        checkWarningSituation();
    }

    private SensorSystem? loadSystem(string systemLibraryPath, params object?[]? args)
    {
        if (File.Exists(systemLibraryPath))
        {
            byte[] dllBytes = File.ReadAllBytes(systemLibraryPath);
            Assembly assembly = Assembly.Load(dllBytes);
            Type? sensorType = assembly.GetTypes()
                .FirstOrDefault(t => typeof(SensorSystem).IsAssignableFrom(t) && !t.IsAbstract);

            if (sensorType != null)
            {
                SensorSystem? instance = (SensorSystem?)Activator.CreateInstance(sensorType, args);
                return instance;
            }
            else
            {
                Console.WriteLine("No valid derived class found in the DLL.");
                return null;
            }
        }
        else
        {
            Console.WriteLine("DLL not found.");
            return null;
        }
    }

    public async Task LoadSystemsAsync(int scenario_id)
    {
        var db = _wgdbBContextFactory.CreateDbContext();
        var gisObjects = await db.GisObjects
        .Include("ObjectType.Category")
        .Where(go => go.Scenario_id == scenario_id && go.ObjectType!.Category!.Key != "aircraft").ToListAsync();
        foreach (var gisObject in gisObjects)
        {
            bool IsSensor = false;
            string IpAddress = "";
            int port = 0;
            bool HasRelay = false;
            string RelayRemoteServerIpAddres = "";
            int RelayRemoteServerPort = 0;
            ConnectionType relayConnectionType = ConnectionType.TcpClient;
            var gisScene = db.Scene.Where(s => s.GisObjectId == gisObject.Id).FirstOrDefault();
            gisObject.LastLatitude = gisScene!.Latitude;
            gisObject.LastLongitude = gisScene!.Longitude;

            var metadatas = await db.GisObjectMetaDatas.Include("Field").Where(gom => gom.Object_id == gisObject.Id).ToListAsync();
            foreach (var metadata in metadatas)
            {
                if (metadata.Field!.Name == "IsSensor")
                {
                    IsSensor = bool.Parse(metadata.Value);
                }
                if (metadata.Field!.Name == "IpAddress")
                {
                    IpAddress = metadata.Value;
                }
                if (metadata.Field!.Name == "Port")
                {
                    port = int.Parse(metadata.Value);
                }
                if (metadata.Field!.Name == "HasRelay")
                {
                    HasRelay = bool.Parse(metadata.Value);
                }
                if (metadata.Field!.Name == "RelayRemoteServerIpAddres")
                {
                    RelayRemoteServerIpAddres = metadata.Value;
                }
                if (metadata.Field!.Name == "RelayRemoteServerPort")
                {
                    RelayRemoteServerPort = int.Parse(metadata.Value);
                }
                if (metadata.Field!.Name == "MaxRange")
                {
                    MaxRange = double.Parse(metadata.Value);
                }
                if (metadata.Field!.Name == "RelayType")
                {
                    switch (metadata.Value)
                    {
                        case "TcpClient": relayConnectionType = ConnectionType.TcpClient; break;
                        case "TcpListener": relayConnectionType = ConnectionType.TcpListener; break;
                        case "UdpClient": relayConnectionType = ConnectionType.UdpClient; break;
                        case "UdpListener": relayConnectionType = ConnectionType.UdpListener; break;
                        case "HttpListener": relayConnectionType = ConnectionType.HttpListener; break;
                        case "MoonSocket": relayConnectionType = ConnectionType.MoonSocket; break;
                        default: relayConnectionType = ConnectionType.TcpClient; break;
                    }
                }
            }
            if (IsSensor && !SensorSystems.ContainsKey(gisObject.Id))
            {
                SensorSystem? sensorSystem = loadSystem(_configuration["Appsettings:SensorSystemLibPath"] + "/" + gisObject.ObjectType!.Name + ".dll", _hubContext, gisObject, IpAddress, port,MaxRange);
                if (sensorSystem != null)
                {
                    SensorSystems[gisObject.Id] = sensorSystem;
                    sensorSystem.OnTargetDetected += SensorSystems_OnTargetDetected;
                    if (HasRelay)
                        sensorSystem.EnableRelay(RelayRemoteServerIpAddres, RelayRemoteServerPort, relayConnectionType);
                    _ = sensorSystem.Listen();
                }
            }
        }
    }

    public void StartSimulation(List<List<Scene>> targets_states)
    {
        foreach (var item in SensorSystems)
        {
            item.Value.StartSimulation(targets_states);
        }
    }

    public void StopSimulation()
    {
        foreach (var item in SensorSystems)
        {
            item.Value.StopSimulation();
        }
    }

    private void SensorSystems_OnTargetDetected(object sender, Target target)
    {
        lastDetectedTime = DateTime.Now;
        if (target != null)
        {
            _decisionBuilder.UpdateState(target);
            _decisionBuilder.MakeDecision();
        }
    }

    private void checkWarningSituation()
    {
        Task.Run(() =>
        {
            while (true)
            {
                lastDetectedTimeInSecond = (DateTime.Now - lastDetectedTime).TotalSeconds;
                if (lastDetectedTimeInSecond > 60)  // 30 second without any target
                {
                    if (warningSituation)
                    {
                        _hubContext.Clients.All.SendAsync("SendWarningSituation", false).Wait();
                    }
                    warningSituation = false;
                }
                else
                {
                    if (!warningSituation)
                    {
                        _hubContext.Clients.All.SendAsync("SendWarningSituation", true).Wait();
                    }
                    warningSituation = true;
                }
                Task.Delay(100).Wait();
            }
        });
    }

    public void PushData(Target target, string ipAddress)
    {
        foreach (var item in SensorSystems)
        {
            item.Value.PushData(target, ipAddress);
        }
    }
}
