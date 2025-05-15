using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Reflection.Metadata;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Server.SensorManager;

namespace WebSocketsSample.MoonSocket;

#region snippet_Controller_Connect
public class MoonSocket : ControllerBase
{
    private IMoonContext _moonContext;
    private SensorService _sensorService;
    public MoonSocket(IMoonContext moonContext, SensorService sensorService)
    {
        _moonContext = moonContext;
        _sensorService = sensorService;
    }

    [HttpGet]
    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "";
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await Echo(webSocket, ipAddress);
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }

    private async Task Echo(WebSocket webSocket, string ipAddress)
    {
        Guid ClientId = Guid.NewGuid();
        _moonContext.AddClient(ClientId, webSocket, ipAddress, _sensorService);
        (_moonContext.Clients[ClientId] as Client)!.OnClose += OnClose;
        await (_moonContext.Clients[ClientId] as Client)!.ListenAsync(ClientId);

    }

    private void OnClose(Guid clientId)
    {
        _moonContext.RemoveClient(clientId);
    }
    #endregion
}
