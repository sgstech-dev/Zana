using System;
using System.ComponentModel.DataAnnotations;

namespace Server.models
{
    public class MapAddress
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Address { get; set; } = "";
        public string Layers { get; set; } = "";
        public string Format { get; set; } = "";
        public bool Transparent { get; set; } = true;
        public string Type { get; set; } = "";
        public int MinZoomLevel{ get; set; } = 0;
        public int MaxZoomLevel{ get; set; } = 0;
        public double CenterLatitude{ get; set; } = 0;
        public double CenterLongitude{ get; set; } =0;
    }
}