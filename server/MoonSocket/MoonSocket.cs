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

    //-- Sent do Saher 
    [HttpGet]
    [Route("saher_TurnOn_Off")]
    public void Saher_TurnOn_Off(string JammerName)
    {
        switch (JammerName)
        {
            case "Jammer2.4":
                _moonContext.All.Invoke("jammer2_4OnOff", new Parameter { });
                break;
            case "Jammer5.8":
                _moonContext.All.Invoke("jammer5_8OnOff", new Parameter { });
                break;
            case "Jammer400":
                _moonContext.All.Invoke("jammer400OnOff", new Parameter { });
                break;
            case "Jammer900":
                _moonContext.All.Invoke("jammer900OnOff", new Parameter { });
                break;
            case "JammerGPS":
                _moonContext.All.Invoke("jammerGPSOnOff", new Parameter { });
                break;
            case "JammerAll":
                _moonContext.All.Invoke("allJammerOnOff", new Parameter { });
                break;
            case "motor":
                _moonContext.All.Invoke("motorOnOff", new Parameter { });
                break;
            default: break;
        }
        _moonContext.All.Invoke("jammersAndMotorStatusRequest", new Parameter { });
    }

    [HttpGet]
    [Route("saherStatusRequest")]
    public void saherStatusRequest(string JammerName)
    {
        _moonContext.All.Invoke("jammersAndMotorStatusRequest", new Parameter { });
    }

    // --Send to Jaber

    [HttpPost]
    [Route("takingPossession")]
    public void takingPossession(string serialNumber, double lat, double lng, string order)
    {
        List<Parameter> parameters = new List<Parameter>();
        parameters.Add(new Parameter { ParamName = "serialNumber", Value = serialNumber});
        parameters.Add(new Parameter { ParamName = "Lat", Value = lat});
        parameters.Add(new Parameter { ParamName = "Long", Value = lng});
        parameters.Add(new Parameter { ParamName = "Order", Value = order});
        _moonContext.All.Invoke("jammersAndMotorStatusRequest", parameters.ToArray());
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
