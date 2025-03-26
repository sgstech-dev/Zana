using System;
using System.Reflection;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using OperatorSystems;
using Server.models;
using WebSocketsSample.MoonSocket;

namespace Server.DecisionService;

public class DecisionBuilder
{
    private WGDBContextFactory _wgdbBContextFactory;
    private IHubContext<ServerHub> _hubContext;
    private IMoonContext _moonContext;
    private IConfiguration _configuration;
    public Dictionary<int, OperatorSystem> OperatorSystems { get; set; }
    public DecisionBuilder(WGDBContextFactory wGDBContextFactory, IHubContext<ServerHub> hubContext, IMoonContext moonContext, IConfiguration configuration)
    {
        OperatorSystems = [];
        _wgdbBContextFactory = wGDBContextFactory;
        _hubContext = hubContext;
        _moonContext = moonContext;
        _configuration = configuration;
    }
    public async Task LoadSystemsAsync(int scenario_id)
    {
        var db = _wgdbBContextFactory.CreateDbContext();
        var gisObjects = await db.GisObjects
        .Include("ObjectType.Category")
        .Where(go => go.Scenario_id == scenario_id && go.ObjectType!.Category!.Key != "aircraft").ToListAsync();
        foreach (var gisObject in gisObjects)
        {
            int? startRange = null;
            int? endRange = null;
            double? startAngle = null;
            double? endAngle = null;
            bool IsOperator = false;

            var gisObjectState = await db.Scene.Where(s => s.GisObjectId == gisObject.Id).FirstOrDefaultAsync();
            var metadatas = await db.GisObjectMetaDatas.Include("Field").Where(gom => gom.Object_id == gisObject.Id).ToListAsync();
            foreach (var metadata in metadatas)
            {
                switch (metadata.Field!.Name)
                {
                    case "startRange":
                        startRange = int.Parse(metadata.Value);
                        break;
                    case "endRange":
                        endRange = int.Parse(metadata.Value);
                        break;
                    case "startAngle":
                        startAngle = double.Parse(metadata.Value);
                        break;
                    case "endAngle":
                        endAngle = double.Parse(metadata.Value);
                        break;
                    case "IsOperator":
                        IsOperator = bool.Parse(metadata.Value);
                        break;
                    default:
                        break;
                }
            }
            OperatorSystem? operatorSystem;
            if (startAngle != null && endAngle != null && startRange != null && endRange != null && IsOperator)
            {
                operatorSystem = loadSystem(_configuration["Appsettings:OperatorSystemLibPath"] + "/" + gisObject.ObjectType!.Name + ".dll", gisObject,
                    startRange.Value,
                    endRange.Value,
                    startAngle.Value,
                    endAngle.Value,
                    gisObjectState!.Latitude,
                    gisObjectState!.Longitude,
                    gisObjectState!.Altitude);
                if (operatorSystem == null)
                {
                    operatorSystem = loadSystem(_configuration["Appsettings:OperatorSystemLibPath"] + "/DefaultSystem.dll", gisObject,
                        startRange.Value,
                        endRange.Value,
                        startAngle.Value,
                        endAngle.Value,
                        gisObjectState!.Latitude,
                        gisObjectState!.Longitude,
                        gisObjectState!.Altitude);
                }
                if (operatorSystem != null)
                    OperatorSystems[gisObject.Id] = operatorSystem;
            }
        }
    }

    private OperatorSystem? loadSystem(string systemLibraryPath, params object?[]? args)
    {
        if (File.Exists(systemLibraryPath))
        {
            byte[] dllBytes = File.ReadAllBytes(systemLibraryPath);
            Assembly assembly = Assembly.Load(dllBytes);
            Type? operatorType = assembly.GetTypes()
                .FirstOrDefault(t => typeof(OperatorSystem).IsAssignableFrom(t) && !t.IsAbstract);

            if (operatorType != null)
            {
                OperatorSystem? instance = (OperatorSystem?)Activator.CreateInstance(operatorType, args);
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
    public void MakeDecision()
    {
        foreach (var item in OperatorSystems)
        {
            var OSTargets = item.Value.Targets;
            if (OSTargets.Count() > 0)
            {
                item.Value.Execute(OSTargets.FirstOrDefault().Value);
                item.Value.SendReportToClients(OSTargets.FirstOrDefault().Value, _hubContext);
            }
        }
    }
    public void UpdateState(Target target)
    {
        foreach (var item in OperatorSystems)
        {
            item.Value.AddTarget(target);
        }
    }
}
