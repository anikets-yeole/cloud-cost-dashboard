import React, { useMemo } from "react";
import { Card, Select } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CostChart({ data, service, onServiceChange }) {
  const services = Array.from(new Set((data || []).map(d => d.service))).sort();
  const current = service || services[0];

  const byMonth = useMemo(() => {
    const map = new Map();
    (data || []).filter(d => d.service === current).forEach(d => {
      map.set(d.month, { month: d.month, cost: d.cost });
    });
    return Array.from(map.values());
  }, [data, current]);

  return (
    <Card title="Cost Trend">
      <div style={{ marginBottom: 12 }}>
        <Select
          value={current}
          onChange={onServiceChange}
          options={services.map(s => ({ label: s, value: s }))}
          style={{ width: 200 }}
        />
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={byMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cost" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
