using System;
using System.Net.Sockets;
using Server.models;
using Microsoft.AspNetCore.SignalR;
using Server;
using Server.Tools;

namespace OperatorSystems
{

    public abstract class OperatorSystem
    {
        protected GisObject m_gisObject;
        protected int m_startRange;
        protected int m_endRange;
        protected double m_startAngle;
        protected double m_endAngle;
        protected double m_latitude;
        protected double m_longitude;
        protected double m_atitude;
        protected Dictionary<Guid, Target> m_targetMap;
        public Dictionary<Guid, Target> Targets { get { return m_targetMap; } }
        public OperatorSystem(
            GisObject gisObject,
            int startRange,
            int endRange,
            double startAngle,
            double endAngle,
            double latitude,
            double longitude,
            double altitude)
        {
            m_gisObject = gisObject;
            m_targetMap = new Dictionary<Guid, Target>();
            m_startRange = startRange;
            m_endRange = endRange;
            m_startAngle = startAngle;
            m_endAngle = endAngle;
            m_latitude = latitude;
            m_longitude = longitude;
            m_atitude = altitude;

        }
        public abstract void Execute(Target target);
        public abstract void StopExecution(Target target);
        public abstract void SendReportToClients(Target target, IHubContext<Hub> hubContext);
        public void AddTarget(Target target)
        {
            if (checkTargetInZones(target))
            {
                m_targetMap[target.TargetId] = target;
            }
            else
            {
                if (m_targetMap.ContainsKey(target.TargetId))
                {
                    RemoveTarget(target);
                    StopExecution(target);
                }
            }
        }
        private void RemoveTarget(Target target)
        {
            m_targetMap.Remove(target.TargetId);
        }
        private bool checkTargetInZones(Target target)
        {
            var dist = GisUtil.CalculateDistance(m_latitude, m_longitude, target.Latitude, target.Longitude);
            var bearing = GisUtil.bearing(m_latitude, m_longitude, target.Latitude, target.Longitude);
            return (dist > m_startRange && dist < m_endRange && bearing > m_startAngle && bearing < m_endAngle);
        }
    }
}