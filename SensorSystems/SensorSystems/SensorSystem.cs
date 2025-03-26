using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using Server.models;

namespace SensorSystems;

public delegate void TargetDetected(object sender,Target target);
public abstract class SensorSystem
{
    public event TargetDetected? OnTargetDetected;
    private ConcurrentDictionary<string, Guid> TargetIds = [];
    private IHubContext<Hub> m_hubContext;
    public SensorSystem(IHubContext<Hub> hubContext){
        m_hubContext = hubContext;
    }
    public abstract Task Listen();
    protected Task sendToClient(Target target){
        if(OnTargetDetected != null){
            OnTargetDetected(this,target);
        }
        return m_hubContext.Clients.All.SendAsync("sendTarget", target);
    }
}
