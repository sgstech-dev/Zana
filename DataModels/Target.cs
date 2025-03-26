using System;
using System.ComponentModel.DataAnnotations;

namespace Server.models;

public enum TargetType { Real = 0, Simulation = 1 }
public class Target
{
    [Key]
    public int Id { get; set; }
    [Required]
    public Guid TargetId { get; set; }
    public int SystemTargetId { get; set; }
    public TargetType TargetType { get; set; } = TargetType.Real;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Altitude { get; set; }
    public double Speed { get; set; }
    public double Heading { get; set; }
    public double Theta { get; set; }
    public double Range { get; set; }
}
