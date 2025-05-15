using Microsoft.AspNetCore.SignalR;
using SensorSystems;
using Server.models;

namespace JaberSystem;

public class JaberSensor : SensorSystem
{
    private bool isListenning = false;
    public JaberSensor(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port) : base(hubContext, sensorObject, IpAddress, Port)
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
                    atarget.TargetType = TargetType.Position;
                    atarget.Simulated = false;
                    atarget.SystemTargetId = 0;
                    sendToClient(atarget).Wait();
                }
            }

        base.PushData(target, ipAddress);
    }
}
