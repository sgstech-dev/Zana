using System;
using System.Net.Sockets;
using System.Text;

namespace SensorSystems;

public class TcpClientRelayConnection : RelayConnection
{
    private TcpClient? tcpClient = null;
    private NetworkStream? ns = null;
    private int port;
    private string ipAddress;
    public TcpClientRelayConnection(string IpAddress, int Port) : base(IpAddress, Port)
    {
        this.ipAddress = IpAddress;
        this.port = Port;
    }
    protected void Connect()
    {
        try
        {
            tcpClient = new TcpClient(ipAddress, port);
            ns = tcpClient.GetStream();
            ns.WriteTimeout = 1000;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"RelayConnection failed to connect. : {ex.Message}");
        }
    }
    public override Task Send(string jasonData)
    {
        return Task.Run(() =>
        {
            try
            {
                if (!IsClientConnected(tcpClient))
                    Connect();
                byte[] buffer = Encoding.UTF8.GetBytes(jasonData);
                ns!.Write(buffer, 0, buffer.Length);
                ns.Flush();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Relay failed to send. :{ex.Message}");
            }
        });
    }

    
}

