using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using Server.models;

namespace SensorSystems;

public delegate void TargetDetected(object sender, Target target);
public enum ConnectionType { TcpListener, UdpListener, TcpClient, UdpClient, HttpListener, MoonSocket }

public abstract class SensorSystem
{
    public event TargetDetected? OnTargetDetected;
    private ConcurrentDictionary<string, Guid> TargetIds = [];
    private IHubContext<Hub> m_hubContext;
    protected GisObject m_sensorObject;
    protected string m_ipAddress;
    protected int m_port;
    protected bool m_enableRelay;
    protected RelayConnection? relayConnection;
    public SensorSystem(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port)
    {
        m_hubContext = hubContext;
        m_sensorObject = sensorObject;
        m_ipAddress = IpAddress;
        m_port = Port;
    }
    public abstract Task Listen();
    public virtual void PushData(Target target, string ipAddress)
    {
        Console.WriteLine(target);
    }
    public void EnableRelay(string relayServerIpAddress, int relayServerPort, ConnectionType connectionType){
        m_enableRelay = true;
        var relayConnectionFactory = new RelayConnectionFactory(relayServerIpAddress, relayServerPort);
        relayConnection = relayConnectionFactory.GetConnection(connectionType);
    }
    protected Task sendToClient(Target target)
    {
        target.Detector_id = m_sensorObject.Id;
        target.Detector = m_sensorObject;
        if (OnTargetDetected != null)
        {
            OnTargetDetected(this, target);
        }
        //return Task.CompletedTask;
        return m_hubContext.Clients.All.SendAsync("sendTarget", target);
    }
    protected virtual void Relay(String jasonData) { 
        if (m_enableRelay)
        {
            relayConnection!.Send(jasonData).Wait();
        }
    }
}
