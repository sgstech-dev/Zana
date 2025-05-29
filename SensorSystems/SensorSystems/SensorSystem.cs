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
    //protected ConcurrentDictionary<string, Guid> TargetIds = [];
    protected IHubContext<Hub> m_hubContext;
    protected GisObject m_sensorObject;
    protected string m_ipAddress;
    protected int m_port;
    protected bool m_enableRelay;
    protected bool m_isRunSimulation = false;
    protected RelayConnection? relayConnection;
    protected double m_maxrange;
    public SensorSystem(IHubContext<Hub> hubContext, GisObject sensorObject, string IpAddress, int Port, double maxrange)
    {
        m_hubContext = hubContext;
        m_sensorObject = sensorObject;
        m_ipAddress = IpAddress;
        m_port = Port;
        m_maxrange = maxrange;
    }
    public abstract Task Listen();
    public virtual Task StartSimulation(List<List<Scene>> tergets_States)
    {
        m_isRunSimulation = true;
        return Task.CompletedTask;
    }
    public void StopSimulation()
    {
        m_isRunSimulation = false;
    }
    public virtual void PushData(Target target, string ipAddress)
    {
        Console.WriteLine(target);
    }
    public void EnableRelay(string relayServerIpAddress, int relayServerPort, ConnectionType connectionType)
    {
        m_enableRelay = true;
        var relayConnectionFactory = new RelayConnectionFactory(relayServerIpAddress, relayServerPort);
        relayConnection = relayConnectionFactory.GetConnection(connectionType);
    }
    protected Task sendToClient(Target target)
    {
        try
        {
            target.Detector_id = m_sensorObject.Id;
            target.Detector = m_sensorObject;
            if (OnTargetDetected != null)
            {
                OnTargetDetected(this, target);
            }
            return m_hubContext.Clients.All.SendAsync("sendTarget", target);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
        return Task.CompletedTask;
    }
    protected virtual void Relay(String jasonData)
    {
        if (m_enableRelay)
        {
            relayConnection!.Send(jasonData).Wait();
        }
    }
}
