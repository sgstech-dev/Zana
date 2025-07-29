using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.models;

public enum TargetType { Position= 0, Direction = 1 }
public class Target
{
    [Key]
    public int Id { get; set; }
    [Required]
    public String TargetId { get; set; } = "";
    public int SystemTargetId { get; set; }
    public TargetType TargetType { get; set; } = TargetType.Position;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Altitude { get; set; }
    public double Speed { get; set; }
    public double Heading { get; set; }
    public double Theta { get; set; }
    public double Elevation { get; set; }
    public double Range { get; set; }
    [Required]
    public int Detector_id{ get; set; }
    [ForeignKey("Detector_id")]
    public GisObject? Detector{ get; set; }
    public DateTime DetectedTime { get; set; }
    public bool Simulated { get; set; }
    public string DeviceType { get; set; } = "";
    public double SNR { get; set; }
    public double BandWidth{ get; set; }
    public double CenterFreq { get; set; }
    public bool EnableHunted { get; set; } = false;
}
