using System;
using System.Net.Sockets;

namespace SensorSystems;

public abstract class RelayConnection
{
    private string IpAddress;
    private int Port;
    public RelayConnection(string IpAddress, int Port)
    {
        this.IpAddress = IpAddress;
        this.Port = Port;
    }
    public abstract Task Send(string jasonData);
    protected bool IsClientConnected(TcpClient? client)
    {
        if (client == null)
            return false;
        try
        {
            if (client.Client.Poll(0, SelectMode.SelectRead))
            {
                byte[] buffer = new byte[1];
                if (client.Client.Receive(buffer, SocketFlags.Peek) == 0)
                {
                    // اتصال بسته شده
                    return false;
                }
            }
            return true;
        }
        catch
        {
            return false;
        }
    }
}

