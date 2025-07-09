using System;
using System.Net.Sockets;
using Server.models;
using Microsoft.AspNetCore.SignalR;
using Server;
using Server.Tools;
using System.Runtime.InteropServices.Marshalling;
using System.Net;

namespace OperatorSystems
{

    public abstract class OperatorSystem
    {
        protected string m_ipAddress;
        protected int m_port;
        protected GisObject m_gisObject;
        protected int m_startRange;
        protected int m_endRange;
        protected double m_startAngle;
        protected double m_endAngle;
        protected double m_latitude;
        protected double m_longitude;
        protected double m_atitude;
        private int traceCount = 0;
        protected Dictionary<string, Target> m_targetMap;
        protected IHubContext<Hub> _hubContext;
        public Target? CurrentTarget { get; set; } = null;
        public Dictionary<string, Target> Targets { get { return m_targetMap; } }
        public OperatorSystem(
            IHubContext<Hub> hubContext,
            string ipAddress,
            int port,
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
            m_targetMap = [];
            m_startRange = startRange;
            m_endRange = endRange;
            m_startAngle = startAngle;
            m_endAngle = endAngle;
            m_latitude = latitude;
            m_longitude = longitude;
            m_atitude = altitude;
            _hubContext = hubContext;
            m_ipAddress = ipAddress;
            m_port = port;
        }
        protected abstract void Execute(Target target);
        public abstract void StopExecution(Target target);
        public abstract void SendReportToClients(Target target);
        public bool IsTargetAssined(Target target)
        {
            return (CurrentTarget == null);
        }
        protected bool IsEqualTargetAssined(Target target)
        {
            if ((CurrentTarget == null) || (CurrentTarget.TargetId == target.TargetId))
                return true;
            return false;
        }
        protected virtual void SendTargetToDevice(Target target)
        {

        }
        public void MakeDecision(Target target)
        {
            if (checkTargetInZones(target))
            {
                if (IsEqualTargetAssined(target))
                {
                    if (target.TargetType == TargetType.Position)
                    {
                        SendTargetToDevice(target);
                        CurrentTarget = target;
                        traceCount = 0;
                    }
                }
                else
                {
                    if (target.TargetType == TargetType.Position)
                        traceCount++;
                }
                if (traceCount > 2)
                {
                    CurrentTarget = null;
                }
                if (!m_targetMap.ContainsKey(target.TargetId))
                {
                    Execute(target);// شرایط عمل کردن و اینکه این سامانه در حالت لاک بماند تا عملش تموم بشه و اولویت اهداف تخصیص داده شده برای عمل باید پیاده سازی بشه

                }
                if ((target != null) && (target.TargetId != null))
                    m_targetMap[target.TargetId] = target;
                if ((target != null))
                    SendReportToClients(target);
            }
            else
            {
                if (m_targetMap.ContainsKey(target.TargetId))
                {
                    RemoveTarget(target);
                    StopExecution(target);
                    if (IsEqualTargetAssined(target))
                        CurrentTarget = null;
                }
            }
        }
        private void RemoveTarget(Target target)
        {
            m_targetMap.Remove(target.TargetId);
        }
        protected virtual bool checkTargetInZones(Target target)
        {
            var dist = GisUtil.CalculateDistance(m_latitude, m_longitude, target.Latitude, target.Longitude);
            var bearing = GisUtil.bearing(m_latitude, m_longitude, target.Latitude, target.Longitude);
            return (dist > m_startRange && dist < m_endRange && bearing > m_startAngle && bearing < m_endAngle);
        }
        public abstract void CallCommand(string command, params object[] args);

        public string getLocalIpAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                    return ip.ToString();
            }
            return "";
        }
    }
}