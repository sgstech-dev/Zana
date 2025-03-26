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
    public SensorService(WGDBContextFactory wGDBContextFactory, IHubContext<ServerHub> hubContext, IConfiguration configuration,DecisionBuilder decisionBuilder)
    {
        SensorSystems = [];
        _wgdbBContextFactory = wGDBContextFactory;
        _hubContext = hubContext;
        _configuration = configuration;
        _decisionBuilder = decisionBuilder;
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

           // var gisObjectState = await db.Scene.Where(s => s.GisObjectId == gisObject.Id).FirstOrDefaultAsync();
            var metadatas = await db.GisObjectMetaDatas.Include("Field").Where(gom => gom.Object_id == gisObject.Id).ToListAsync();
            foreach (var metadata in metadatas)
            {
                if(metadata.Field!.Name == "IsSensor")
                {
                    IsSensor = bool.Parse(metadata.Value);
                }
            }
            if (IsSensor){
                SensorSystem? sensorSystem = loadSystem(_configuration["Appsettings:OperatorSystemLibPath"] + "/" + gisObject.ObjectType!.Name + ".dll",_hubContext);
                if (sensorSystem != null)
                {
                    SensorSystems[gisObject.Id] = sensorSystem;
                    sensorSystem.OnTargetDetected += SensorSystems_OnTargetDetected;    
                    await sensorSystem.Listen();
                }
            }
        }
    }

    private void SensorSystems_OnTargetDetected(object sender, Target target)
    {
        _decisionBuilder.UpdateState(target);
        _decisionBuilder.MakeDecision();
    }
}
