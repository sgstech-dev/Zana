using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.DecisionService;
using Server.models;
using Server.ScenarioManager;
using Server.SensorManager;
using Server.Tools;
using WebSocketsSample.MoonSocket;

namespace Server
{
    public class CommandDto
    {
        public string CommandName { get; set; } = "";
        public int GisObjectId { get; set; }
        public object[] Args { get; set; } = [];
    }

    public class ServerHub : Hub
    {
        private readonly WGDBContext _dbContext;
        private ScenarioService _scenarioService;
        private SensorService _sensorService;
        private DecisionBuilder _decisionBuilder;
        private IMoonContext _moonContext;
        public ServerHub(WGDBContext dbContext, ScenarioService scenarioService, DecisionBuilder decisionBuilder, SensorService sensorService, IMoonContext moonContext)
        {
            _dbContext = dbContext;
            _scenarioService = scenarioService;
            _decisionBuilder = decisionBuilder;
            _sensorService = sensorService;
            _moonContext = moonContext;
        }
        public override Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;
            Console.WriteLine($"Client connected with connection ID: {connectionId}");
            return base.OnConnectedAsync();
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public void Start(int scenario_id)
        {
            _scenarioService.Start(scenario_id);
        }

        public void Stop(int scenario_id)
        {
            _scenarioService.Stop(scenario_id);
        }

        public bool IsStarted(int scenario_id)
        {
            return _scenarioService.IsStarted(scenario_id);
        }

        public void ChangeScenario(int scenario_id)
        {
            _decisionBuilder.LoadSystemsAsync(scenario_id).Wait();
            _sensorService.LoadSystemsAsync(scenario_id).Wait();
        }

        public List<Scene> getGisObjects(int scenario_id)
        {
            return _dbContext.Scene
                .Include("GisObject")
                .Include("GisObject.ObjectType.Category")
                .Where(s => s.GisObject!.Scenario_id == scenario_id && s.GisObject.ObjectType!.Category!.Key != "aircraft").ToList();
        }

        // -- Send to JammerGonbadi
        public void jammerGonbadiOnOff(string chanelNumber, string state)
        {
            string dataStr = "";
            IPAddress localIPAddress = IPAddress.Parse("192.168.0.26"); // آی‌پی کارت شبکه محلی
            int localPort = 9001;
            IPEndPoint localEndPoint = new IPEndPoint(localIPAddress, localPort);
            UdpClient udpClient = new UdpClient(localEndPoint);

            udpClient.EnableBroadcast = true; // فعال‌سازی برادکست
            var endPoint = new IPEndPoint(IPAddress.Parse("192.168.0.43"), 9003);
            try
            {
                if (chanelNumber == "All")
                {
                    if (state == "On")
                    {
                        dataStr = "AA550000000000000000000000000000000000000000FFFF0000000055BB";
                    }
                    if (state == "Off")
                    {
                        dataStr = "AA55000000000000000000000000000000000000000000000000000055BB";
                    }
                    byte[] data = HexStringToByteArray(dataStr);

                    udpClient.Send(data, data.Length, endPoint);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                udpClient.Close();
            }
        }

        // -- Send to Sadid
        public void bandTurnOnOff(string bandNumber, string state)
        {
            List<Parameter> parameters = new List<Parameter>();
            parameters.Add(new Parameter { ParamName = "BandNumber", Value = bandNumber });
            parameters.Add(new Parameter { ParamName = "State", Value = state });
            _moonContext.All.Invoke("bandTurnOnOff", parameters.ToArray());
        }

        //-- Sent do Saher 
        public void saher_TurnOn_Off(string JammerName)
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

        public void saherStatusRequest()
        {
            _moonContext.All.Invoke("jammersAndMotorStatusRequest", new Parameter { });
        }

        // --Send to Jaber

        public void takingPossession(string serialNumber, double lat, double lng, string order)
        {
            List<Parameter> parameters = new List<Parameter>();
            parameters.Add(new Parameter { ParamName = "serialNumber", Value = serialNumber });
            parameters.Add(new Parameter { ParamName = "Lat", Value = lat });
            parameters.Add(new Parameter { ParamName = "Long", Value = lng });
            parameters.Add(new Parameter { ParamName = "Order", Value = order });
            _moonContext.All.Invoke("TakingPossession", parameters.ToArray());
        }

        public void callCommand(CommandDto commandDto)
        {
            if (_decisionBuilder.OperatorSystems.ContainsKey(commandDto.GisObjectId))
                _decisionBuilder.OperatorSystems[commandDto.GisObjectId].CallCommand(commandDto.CommandName, commandDto.Args);
        }
        private byte[] HexStringToByteArray(string hex)
        {
            return Enumerable.Range(0, hex.Length)
                             .Where(x => x % 2 == 0)
                             .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                             .ToArray();
        }
        private void laserOnOff(string name, string state)
        {
            
        }
    }
}