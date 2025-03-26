using System;
using Newtonsoft.Json;
namespace WebSocketsSample.MoonSocket;


public enum MessageType { Echo = -1, Identity = 0, Result = 1, CallFunction = 2 }
public struct Echo
{
    public Echo()
    {
    }

    public MessageType MessageType { get; } = MessageType.Echo;
}

public struct Result
{
    public Result()
    {
    }

    public required object? Value { get; set; }

    public required Guid FunctionId { get; set; }

    public MessageType MessageType { get; } = MessageType.Result;
}

public struct Identity
{
    public Identity()
    {
    }

    public MessageType MessageType { get; } = MessageType.Identity;
    public Guid Id { get; set; }
}

public struct Parameter
{
    public string ParamName { get; set; }
    public object Value { get; set; }
}

public struct MethodInfo
{
    public MethodInfo()
    {
    }

    public Guid ClientId { get; set; } = Guid.Empty;
    public Guid FunctionId { get; set; } = Guid.Empty;
    public MessageType MessageType { get; } = MessageType.CallFunction;
    public required string MethodName { get; set; }
    public Parameter[] Params { get; set; } = [];
}

public class Protocol
{
    public static string GetEchoJson()
    {
        Echo echo = new Echo();

        return JsonConvert.SerializeObject(echo);
    }
    public static string GetIdentityJson(Guid id)
    {
        Identity identity = new Identity();
        identity.Id = id;
        return JsonConvert.SerializeObject(identity);
    }

    public static string GetMethodInfoJson(string MethodName, params Parameter[] allParams)
    {
        MethodInfo methodInfo = new MethodInfo
        {
            MethodName = MethodName,
            Params = allParams
        };
        return JsonConvert.SerializeObject(methodInfo);
    }
    public static MethodInfo GetMethodInfo(string methodInfoJson)
    {
        return JsonConvert.DeserializeObject<MethodInfo>(methodInfoJson);
    }

    public static string GetResultJson(Guid functionId, object? value)
    {
        Result result = new()
        {
            FunctionId = functionId,
            Value = value
        };
        return JsonConvert.SerializeObject(result);
    }
}
