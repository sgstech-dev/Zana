using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace SensorSystems;

public class TcpListenerRelayConnection : RelayConnection
{
    private int port;
    private string ipAddress;
    private TcpListener tcpListener;
    private TcpClient? tcpClient;
    private NetworkStream? ns = null;

    public TcpListenerRelayConnection(string IpAddress, int Port) : base(IpAddress, Port)
    {
        this.ipAddress = IpAddress;
        this.port = Port;
        tcpListener = new TcpListener(IPAddress.Any, port);
        tcpListener.Start();
    }

    private void Listen(){
        
        tcpClient = tcpListener.AcceptTcpClient();
        ns = tcpClient.GetStream();
            ns.WriteTimeout = 1000;
    }

    public override Task Send(string jasonData)
    {
        return Task.Run(() =>
        {
            try
            {
                if (!IsClientConnected(tcpClient))
                    Listen();
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

