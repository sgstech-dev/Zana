using System;
using System.Net.NetworkInformation;
using Microsoft.EntityFrameworkCore;
using Server.models;

namespace WebSocketsSample.MoonSocket;

struct TargetData{
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
                s.Altitude,s.Speed,
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
        result.gisObject =  DbContext?.GisObjects
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
        result.gisObjectMetaData = DbContext?.GisObjectMetaDatas.Where(gmd=>gmd.Object_id == id).Include("Field").ToList()!;
        return result;
    }
    public string getGisPic(Int64 objectType_id)
    {
        var data = DbContext?.ObjectTypes
            .Where(o=>o.Id == objectType_id)
            .Select(o=>o.PicBase64).FirstOrDefault();
        return data?.Split(',')[1]!;
    }
    public string getGisIcon(Int64 objectType_id)
    {
        
        var Data = DbContext?.ObjectTypes
            .Where(o=>o.Id == objectType_id)
            .Select(o=>o.IconBase64).FirstOrDefault();
        return Data?.Split(',')[1]!;
    }
    public byte[] getGisModel(Int64 objectType_id)
    {
        return DbContext?.ObjectTypes
            .Where(o=>o.Id == objectType_id)
            .Select(o=>o.Model).FirstOrDefault()!;
    }
}
