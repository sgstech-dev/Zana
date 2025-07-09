using Microsoft.AspNetCore.SignalR;
using SensorSystems;
using Server.models;
using Server.Tools;

namespace SaherSystem;

public class SaherSensor : SensorSystem
{
    private bool isListenning = false;
    public SaherSensor(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port, double maxrange) : base(hubContext, sensorObject, IpAddress, Port, maxrange)
    {
    }

    public override Task Listen()
    {
        isListenning = true;
        return Task.CompletedTask;
    }
    public override void PushData(Target target, string ipAddress)
    {
        if (!m_ipAddress.Contains(ipAddress!.Trim()))
            return;
        if (target == null)
            return;
        if (isListenning)
            if (target.GetType() == typeof(Target))
            {
                Target? atarget = target as Target;
                if (atarget != null)
                {
                    atarget.Detector = m_sensorObject;
                    atarget.Detector_id = m_sensorObject.Id;
                    atarget.DetectedTime = DateTime.Now;
                    atarget.TargetType = TargetType.Direction;
                    atarget.Simulated = false;
                    atarget.SystemTargetId = 0;
                    atarget.TargetId = Guid.Empty.ToString();
                    sendToClient(atarget).Wait();
                }
            }

        base.PushData(target, ipAddress);
    }
    
    public override Task StartSimulation(List<List<Scene>> targets_States)
    {
        base.StartSimulation(targets_States);
        foreach (var target_states in targets_States)
        {
            Task.Run( () =>
            {
                double time = 0;// in second
                Guid TargetId = Guid.NewGuid();
                (bool isFinished, Scene? targetState) result;
                do
                {
                    result = GisUtil.Interpolate(target_states, time);
                    var dist = GisUtil.CalculateDistance(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, result.targetState!.Latitude, result.targetState.Longitude);
                    var theta = GisUtil.bearing(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, result.targetState!.Latitude, result.targetState.Longitude);
                    var elevation = GisUtil.GetElevationAngle(m_sensorObject.LastLatitude, m_sensorObject.LastLongitude, m_sensorObject.LastAltitude, result.targetState!.Latitude, result.targetState.Longitude, result.targetState.Altitude);
                   // if (dist > m_maxrange)
                    //     continue;
                    try
                    {
                        Target simulatedtarget = new Target
                        {
                            Theta = theta + GisUtil.getRandomValue(-2, 2),
                            Elevation = elevation,
                            DetectedTime = DateTime.Now,
                            TargetType = TargetType.Direction,
                            Simulated = true,
                            SystemTargetId = 0,
                            TargetId = Guid.Empty.ToString(),
                            Detector_id = m_sensorObject.Id,
                            Detector = m_sensorObject
                        };
                        sendToClient(simulatedtarget).Wait();
                        time++; ///in second
                        Task.Delay(3000).Wait();
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
                while (!result.isFinished && m_isRunSimulation);
            });

        }
        Console.WriteLine("Start simulation.");
        return Task.CompletedTask;
    }
}
