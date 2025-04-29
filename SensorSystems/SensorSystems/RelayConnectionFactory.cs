using System;

namespace SensorSystems;

public class RelayConnectionFactory
{
    private string relayServerIpAddress { get; set; }
    private int relayServerPort { get; set; }
    public ConnectionType connectionType { get; set; }
    public RelayConnectionFactory(string relayServerIpAddress, int relayServerPort)
    {
        this.relayServerIpAddress = relayServerIpAddress;
        this.relayServerPort = relayServerPort;
        this.connectionType = connectionType;
    }
    public RelayConnection? GetConnection(ConnectionType connectionType)
    {
        switch (connectionType)
        {
            case ConnectionType.TcpListener: return new TcpListenerRelayConnection(this.relayServerIpAddress, relayServerPort);
            case ConnectionType.TcpClient: return new TcpClientRelayConnection(this.relayServerIpAddress, this.relayServerPort);
            default: return null;
        }
    }
}

