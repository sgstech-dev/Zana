using System;
using System.Net.NetworkInformation;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server;
using Server.models;
using Server.SensorManager;

namespace WebSocketsSample.MoonSocket;

struct TargetData
{
    public Object gisObject;
    public List<GisObjectMetaData> gisObjectMetaData;
}
public class ClientHub : Client
{
    public string SendMessage(string message)
    {
        Console.WriteLine("Message1 -------------> " + message);
        return "Result Of Function. Sent Message was : " + message;
    }

    public object? getGisObjects(Int64 scenario_id)
    {
        return DbContext?.Scene
            .Include(s => s.GisObject)
            .ThenInclude(g => g!.ObjectType)
            .ThenInclude(o => o!.Category)
            .Where(s => s.GisObject!.Scenario_id == scenario_id
            //&& s.GisObject.ObjectType!.Category!.Key != "aircraft"
            )
            .Select(s => new
            {
                // Scene = s, // Keep Scene data
                s.Heading,
                s.Longitude,
                s.Latitude,
                s.Altitude,
                s.Speed,
                GisObject = new
                {
                    s.GisObject!.Id,
                    s.GisObject.Scenario_id,
                    s.GisObject.Name,
                    s.GisObject.ObjectType_id,
                    // Include only the properties you want to keep for GisObject
                    ObjectType = new
                    {
                        s.GisObject.ObjectType!.Id,
                        s.GisObject.ObjectType.Name,
                        s.GisObject.ObjectType.Category_id,
                        // Include only the properties you need for ObjectType
                        Category = new
                        {
                            s.GisObject.ObjectType.Category!.Id,
                            s.GisObject.ObjectType.Category.Key,
                            s.GisObject.ObjectType.Category.Name
                            // Add other Category properties as needed
                        }
                    }
                }
            })
            .ToList();
    }

    public object? getGisObjectById(Int64 id)
    {
        Console.WriteLine(">>-----------------------------------> " + id);
        TargetData result = new();
        result.gisObject = DbContext?.GisObjects
            .Include(g => g!.ObjectType)
            .ThenInclude(c => c!.Category)
            .Where(o => o.Id == id)
            .Select(s => new
            {
                GisObject = new
                {
                    s.Id,
                    s.Scenario_id,
                    s.Name,
                    s.ObjectType_id,
                    // Include only the properties you want to keep for GisObject
                    ObjectType = new
                    {
                        s.ObjectType!.Id,
                        s.ObjectType.Name,
                        s.ObjectType.Category_id,
                        // Include only the properties you need for ObjectType
                        Category = new
                        {
                            s.ObjectType.Category!.Id,
                            s.ObjectType.Category.Key,
                            s.ObjectType.Category.Name
                            // Add other Category properties as needed
                        }
                    }
                }
            })
            .FirstOrDefault()!;
        result.gisObjectMetaData = DbContext?.GisObjectMetaDatas.Where(gmd => gmd.Object_id == id).Include("Field").ToList()!;
        return result;
    }
    public string getGisPic(Int64 objectType_id)
    {
        var data = DbContext?.ObjectTypes
            .Where(o => o.Id == objectType_id)
            .Select(o => o.PicBase64).FirstOrDefault();
        return data?.Split(',')[1]!;
    }
    public string getGisIcon(Int64 objectType_id)
    {

        var Data = DbContext?.ObjectTypes
            .Where(o => o.Id == objectType_id)
            .Select(o => o.IconBase64).FirstOrDefault();
        return Data?.Split(',')[1]!;
    }
    public byte[] getGisModel(Int64 objectType_id)
    {
        return DbContext?.ObjectTypes
            .Where(o => o.Id == objectType_id)
            .Select(o => o.Model).FirstOrDefault()!;
    }

    // Call from Saher System
    public void threatList(string deviceType, double snr, double angle, double bandWidth, double centerFreq, double distance)
    {
        Console.WriteLine("Saher Target ----> Device Type : " + deviceType + " snr:" + snr + " angle:" + angle + " BandWidth:" + bandWidth + " CenterFreq:" + centerFreq + " Distance:" + distance);
        Target target = new Target();
        target.DeviceType = deviceType;
        target.SNR = snr;
        target.Theta = angle;
        target.BandWidth = bandWidth;
        target.CenterFreq = centerFreq;
        target.Range = distance;
        target.TargetType = TargetType.Direction;
        SensorService?.PushData(target, IpAddress);
    }

    public void JammerAndMotorStatus(bool motor, bool jammer2_4, bool jammer5_8, bool jammer400, bool jammer900, bool jammersGPS, bool autoControl)
    {
        Console.WriteLine("Mottor state: " + motor + " Jammer2.4  state: " + jammer2_4 + " Jammer5.8  state: " + jammer5_8 + " Jammer400  state: " + jammer400 + " Jammer900 state: " + jammer900 + " JammerGPS  state: " + jammersGPS + " AutoControl  state: " + autoControl);
        HubContext.Clients.All.SendAsync("jammersAndMotorStatus", motor, jammer2_4, jammer5_8, jammer400, jammer900, jammersGPS, autoControl).Wait();
    }
    //call from Jaber System
    public void JaberState(bool State)
    {
        HubContext.Clients.All.SendAsync("JaberState", State).Wait();
    }

    public void sendTargetInfo(string UUID, string QuadAlt, string SerialNumber, string QuadLat, string QuadLong, string QuadHeight, string HomeLat, string HomeLong, string Type, string PilotLat, string PilotLong, string QuadSpeedLat, string QuadSpeedHeight, string QuadSpeedLong, string Date, string Time, bool EnableHunted)
    {
        double tmp;
        Target target = new Target()
        {
            TargetId = SerialNumber,
            Altitude = double.TryParse(QuadAlt, out tmp) ? tmp : 0,
            Latitude = double.TryParse(QuadLat, out tmp) ? tmp : 0,
            Longitude = double.TryParse(QuadLong, out tmp) ? tmp : 0,
            DetectedTime = DateTime.Now,//باید اصلاح شود
            DeviceType = Type,
            Simulated = false,
            EnableHunted = EnableHunted
        };

        SensorService?.PushData(target, IpAddress);
    }

    //Call from Sadid
    public void SadidState(bool State)
    {
        HubContext.Clients.All.SendAsync("SadidState", State).Wait();
        Console.WriteLine("Sayad state is : " + State);
    }
}
