using System;
using Server.models;

namespace Server.Tools;

public struct GeoPoint{
    public double lat;
    public double lon;
}
public class GisUtil
{
    double EARTHRADIUSE = 6371e3; 
    private const double EarthRadius = 6371000;

    public static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        const double R = EarthRadius; // Earth's radius in meters
        double lat1Rad = lat1 * (Math.PI / 180);
        double lat2Rad = lat2 * (Math.PI / 180);
        double deltaLat = (lat2 - lat1) * (Math.PI / 180);
        double deltaLon = (lon2 - lon1) * (Math.PI / 180);

        double a = Math.Sin(deltaLat / 2) * Math.Sin(deltaLat / 2) +
                   Math.Cos(lat1Rad) * Math.Cos(lat2Rad) *
                   Math.Sin(deltaLon / 2) * Math.Sin(deltaLon / 2);
        double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return R * c; // Distance in meters
    }

    public GeoPoint GetLastPosition(double originLat,double originLng, double bearing, double range)
    {
        double latInRadian = toRadians(originLat);
        double lngInRadian = toRadians(originLng);
        double bearingInRadian = toRadians(bearing);
        var lastLat = Math.Asin(Math.Sin(latInRadian) * Math.Cos(range / EARTHRADIUSE) +
                             Math.Cos(latInRadian) * Math.Sin(range / EARTHRADIUSE) * Math.Cos(bearingInRadian));
        var lastLng = lngInRadian + Math.Atan2(Math.Sin(bearingInRadian) * Math.Sin(range / EARTHRADIUSE) * Math.Cos(latInRadian),
                                   Math.Cos(range / EARTHRADIUSE) - Math.Sin(latInRadian) * Math.Sin(lastLat));
        GeoPoint result;
        result.lat = toDegrees(lastLat);
        result.lon = toDegrees(lastLng);
        return result;
    }

    private static double toRadians(double degrees)
    {
        return degrees * Math.PI / 180;
    }

    // Converts from radians to degrees.
    private static double toDegrees(double radians)
    {
        return radians * 180 / Math.PI;
    }

    public static double bearing(double startLat, double startLng, double destLat, double destLng)
    {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);

        var y = Math.Sin(destLng - startLng) * Math.Cos(destLat);
        var x = Math.Cos(startLat) * Math.Sin(destLat) -
          Math.Sin(startLat) * Math.Cos(destLat) * Math.Cos(destLng - startLng);
        var brng = Math.Atan2(y, x);
        brng = toDegrees(brng);
        return (brng + 360) % 360;
    }

    public static (bool isFinished, Scene targetState) Interpolate(List<Scene> states, double time)
    {
        if (states == null || states.Count < 2)
            throw new ArgumentException("At least two states are required for interpolation.");

        Scene? start = null;
        Scene? end = null;
        double accumulatedTime = 0; // To track time across segments
        double totalDuration = 0;

        // Calculate the total duration to reach the last state
        for (int i = 0; i < states.Count - 1; i++)
        {
            double distance = GisUtil.CalculateDistance(states[i].Latitude, states[i].Longitude, states[i + 1].Latitude, states[i + 1].Longitude);
            totalDuration += distance / states[i].Speed;
        }

        // If the time exceeds the total duration, return the final state and mark as finished
        if (time >= totalDuration)
            return (true, states[^1]); // Final state reached, return true

        // Find the appropriate segment for interpolation
        for (int i = 0; i < states.Count - 1; i++)
        {
            start = states[i];
            end = states[i + 1];

            // Calculate the time it takes to reach the end state
            
            double distance = GisUtil.CalculateDistance(start.Latitude, start.Longitude, end.Latitude, end.Longitude);
            double segmentDuration = distance / start.Speed; // Time to travel from start to end at current speed

            // If time falls within the current segment
            if (time >= accumulatedTime && time < accumulatedTime + segmentDuration)
            {
                break;
            }

            // Update accumulated time by adding the current segment's duration
            accumulatedTime += segmentDuration;
        }

        // Calculate the time spent in the current segment
        double timeInSegment = time - accumulatedTime;

        // Calculate the interpolation factor based on the time within the segment
        double distanceToTravel = start!.Speed * timeInSegment; // Distance to travel based on speed
        double totalDistance = GisUtil.CalculateDistance(start.Latitude, start.Longitude, end!.Latitude, end.Longitude);

        double interpolationFactor = distanceToTravel / totalDistance;
        interpolationFactor = Math.Max(0, Math.Min(1, interpolationFactor)); // Clamp between 0 and 1

        // Interpolate latitude and longitude
        double interpolatedLatitude = start.Latitude + interpolationFactor * (end.Latitude - start.Latitude);
        double interpolatedLongitude = start.Longitude + interpolationFactor * (end.Longitude - start.Longitude);

        // Interpolate speed
        double interpolatedSpeed = start.Speed + (end.Speed - start.Speed) * interpolationFactor;
        double heading = bearing(start.Latitude,start.Longitude,end.Latitude,end.Longitude);
        return (false, new Scene
        {
            Id = start.Id,
            GisObjectId = start.GisObjectId,
            GisObject = start.GisObject!,
            Latitude = interpolatedLatitude,
            Longitude = interpolatedLongitude,
            Altitude = start.Altitude,
            Heading = heading,
            Speed = interpolatedSpeed,
            StartTime = 0
        });
       // return (true,null);
    }
}
