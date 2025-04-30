using System;
using System.Net.WebSockets;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Xml;
using Microsoft.AspNetCore.SignalR;
using Server;
using Server.models;
using Server.SensorManager;


namespace WebSocketsSample.MoonSocket;

public delegate void OnClose(Guid clientId);
public interface IClient
{
    public Guid ClientId { get; set; }
    public void Invoke(string MethodName, params Parameter[] allParams);
}

public abstract class Client : IClient
{
    private Guid _ClientId;
    private WGDBContext? _dbContext;
    private WebSocket? _webSocket;
    private IHubContext<ServerHub>? _hubContext;
    private string? ipAddress;
    private SensorService? _sensorService;
    internal WebSocket WebSocket { get { return _webSocket!; } set { _webSocket = value; } }
    internal WGDBContext? DbContext { get { return _dbContext!; } set { _dbContext = value; } }
    internal SensorService? SensorService { get { return _sensorService!; } set { _sensorService = value; } }
    internal IHubContext<ServerHub> HubContext { get { return _hubContext!; } set { _hubContext = value; } }
    internal string IpAddress { get { return ipAddress ?? ""; } set { ipAddress = value; } }
    public event OnClose? OnClose;
    Guid IClient.ClientId { get => _ClientId; set => _ClientId = value; }

    public void Invoke(string MethodName, params Parameter[] allParams)
    {
        var textBuff = Encoding.UTF8.GetBytes(Protocol.GetMethodInfoJson(MethodName, allParams));
        _webSocket!.SendAsync(
            new ArraySegment<byte>(textBuff, 0, textBuff.Length),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None).Wait();
    }

    public Client()
    {
        _webSocket = null;

    }

    public async Task ListenAsync(Guid ClientId)
    {
        var buffer = new byte[1024];

        _ClientId = ClientId;
        await _webSocket!.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(Protocol.GetEchoJson())), WebSocketMessageType.Text, true, CancellationToken.None);
        await _webSocket!.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(Protocol.GetIdentityJson(ClientId))), WebSocketMessageType.Text, true, CancellationToken.None);

        //Task.Run(async () =>
        // {
        try
        {
            while (_webSocket!.State == WebSocketState.Open)
            {
                var result = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    // Close the connection gracefully
                    await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
                    if (OnClose != null)
                        OnClose(_ClientId);
                }
                else if (result.MessageType == WebSocketMessageType.Text)
                {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    MethodInfo methodInfo = Protocol.GetMethodInfo(message);
                    List<object> parameters = new List<object>();
                    foreach (var param in methodInfo.Params)
                    {
                        parameters.Add(param.Value);
                    }
                    CallFunction(methodInfo.ClientId, methodInfo.FunctionId, methodInfo.MethodName, [.. parameters]);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        //});
    }

    private async void CallFunction(Guid clientId, Guid functionId, string functionName, params object[] parameters)
    {
        // Use reflection to find a method with the given name
        var derivedTypes = GetDerivedTypes(typeof(Client));
        foreach (var derivedType in derivedTypes)
        {
            var method = derivedType.GetMethod(functionName,
            System.Reflection.BindingFlags.DeclaredOnly |
            System.Reflection.BindingFlags.Instance |
            System.Reflection.BindingFlags.NonPublic |
            System.Reflection.BindingFlags.Public);
            Console.WriteLine("Client Id : " + clientId + " call the function :" + functionName);
            if (method != null)
            {
                if (method.GetParameters().Length == parameters.Length)
                {
                    // Invoke the method dynamically
                    var value = method?.Invoke(this, parameters);
                    var resultJson = Protocol.GetResultJson(functionId, value);
                    await _webSocket!.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(resultJson)), WebSocketMessageType.Text, true, CancellationToken.None);

                    Console.WriteLine("Client Id : " + clientId + " call the function is success.");
                }
                else
                    Console.WriteLine("Parameters in method " + functionName + " are not match!!.");
            }
        }
    }

    private IEnumerable<Type> GetDerivedTypes(Type parentType)
    {
        // Scan all loaded assemblies and get all types that inherit from the given parentType
        return AppDomain.CurrentDomain.GetAssemblies() // Get all loaded assemblies
            .SelectMany(assembly => assembly.GetTypes()) // Get all types in each assembly
            .Where(type => type.IsClass && !type.IsAbstract && type.IsSubclassOf(parentType));
    }
}

public interface IMoonContext
{
    public void AddClient(Guid clientId, WebSocket webSocket, string ipAddress, SensorService sensorService);
    public void RemoveClient(Guid clientId);
    public dynamic All { get; }

    public dynamic Clients { get; }
}

public class MoonContext<T> : IMoonContext where T : Client, new()
{
    WGDBContext? _dbContext = null;
    IHubContext<ServerHub> _hubContext;
    AllClientsWrapper _all;

    public MoonContext(IHubContext<ServerHub> hubContext)
    {
        _all = new AllClientsWrapper(_clients);
        _hubContext = hubContext;
    }
    private static Dictionary<Guid, T> _clients = [];

    private Dictionary<Guid, T> Clients => _clients;

    public void AddClient(Guid clientId, WebSocket webSocket, string ipAddress, SensorService sensorService)
    {
        Clients[clientId] = new T
        {
            WebSocket = webSocket,
            DbContext = _dbContext,
            SensorService = sensorService,
            HubContext = _hubContext,
            IpAddress = ipAddress
        };
    }

    public void RemoveClient(Guid clientId)
    {
        _clients.Remove(clientId);
    }

    public AllClientsWrapper All { get { return _all; } } //new AllClientsWrapper(_clients);

    dynamic IMoonContext.All => All;

    dynamic IMoonContext.Clients => Clients;

    public class AllClientsWrapper
    {
        private readonly Dictionary<Guid, T> _clients;

        public AllClientsWrapper(Dictionary<Guid, T> clients)
        {
            _clients = clients;
        }

        public void Invoke(string MethodName, params Parameter[] allParams)
        {
            foreach (var client in _clients.Values)
            {
                if ((client as Client)!.WebSocket.State == WebSocketState.Open)
                    client.Invoke(MethodName, allParams);
            }
        }
    }
}
