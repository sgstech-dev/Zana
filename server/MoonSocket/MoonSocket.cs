using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace WebSocketsSample.MoonSocket;

#region snippet_Controller_Connect
public class MoonSocket : ControllerBase
{
    private IMoonContext _moonContext;
    public MoonSocket(IMoonContext moonContext)
    {
        _moonContext = moonContext;
    }
    // [Route("send")]
    // public void send()
    // {
    //     _moonContext.All.Invoke("test", new Parameter { ParamName = "p1", Value = 15.12 });
    // }

    [HttpGet]
    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await Echo(webSocket);
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }

    private async Task Echo(WebSocket webSocket)
    {
        Guid ClientId = Guid.NewGuid();
        _moonContext.AddClient(ClientId, webSocket);
        (_moonContext.Clients[ClientId] as Client)!.OnClose += OnClose;
        await (_moonContext.Clients[ClientId] as Client)!.ListenAsync(ClientId);

    }

    private void OnClose(Guid clientId){
        _moonContext.RemoveClient(clientId);
    }
    #endregion
}
