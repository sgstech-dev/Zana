using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models
{
    public class Scene:IDisposable
    {
        // public Scene(int id,int gisObjectId,GisObject gisObject,double latitude,double longitude,double altitude,double heading,double speed, long startTime){
        //     Id = id;
        //     GisObjectId = gisObjectId;
        //     GisObject = gisObject;
        //     Latitude =latitude;
        //     Longitude = longitude;
        //     Altitude = altitude;
        //     Heading = heading;
        //     Speed = speed;
        //     StartTime = startTime;
        // }
        public int Id { get; set; }
        [Required]
        public required int GisObjectId { get; set; }
        [ForeignKey("GisObjectId")]
        public virtual GisObject? GisObject { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public double Heading { get; set; }
        public double Speed { get; set; }
        public long StartTime { get; set; } // Start Time is a value of time in second from start of Scenario. if speed has a value , start time calculate by speed and last position.

        public void Dispose()
        {
            GisObject = null;
        }
    }
}
