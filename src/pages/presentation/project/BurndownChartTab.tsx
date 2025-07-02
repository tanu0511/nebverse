import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Example data (replace with your real data logic)
const initialData = [
  { date: "Sun 01 Jun 2025", actual: 6, ideal: 6 },
  { date: "Mon 02 Jun 2025", actual: 6, ideal: 5 },
  { date: "Tue 03 Jun 2025", actual: 6, ideal: 4 },
  { date: "Wed 04 Jun 2025", actual: 6, ideal: 3 },
  { date: "Thu 05 Jun 2025", actual: 9, ideal: 2 },
  { date: "Fri 06 Jun 2025", actual: 7, ideal: 1 },
  { date: "Sat 07 Jun 2025", actual: 7, ideal: 0 },
  { date: "Sun 08 Jun 2025", actual: 6, ideal: 0 },
  { date: "Mon 09 Jun 2025", actual: 6, ideal: 0 },
  { date: "Tue 10 Jun 2025", actual: 6, ideal: 0 },
  { date: "Wed 11 Jun 2025", actual: 6, ideal: 0 },
  { date: "Thu 12 Jun 2025", actual: 6, ideal: 0 },
  { date: "Fri 13 Jun 2025", actual: 6, ideal: 0 },
  { date: "Sat 14 Jun 2025", actual: 6, ideal: 0 },
  { date: "Sun 15 Jun 2025", actual: 6, ideal: 0 },
  { date: "Mon 16 Jun 2025", actual: 6, ideal: 0 },
  { date: "Tue 17 Jun 2025", actual: 6, ideal: 0 },
  { date: "Wed 18 Jun 2025", actual: 6, ideal: 0 },
  { date: "Thu 19 Jun 2025", actual: 6, ideal: 0 },
  { date: "Fri 20 Jun 2025", actual: 6, ideal: 0 },
  { date: "Sat 21 Jun 2025", actual: 6, ideal: 0 },
  { date: "Sun 22 Jun 2025", actual: 6, ideal: 0 },
  { date: "Mon 23 Jun 2025", actual: 6, ideal: 0 },
  { date: "Tue 24 Jun 2025", actual: 6, ideal: 0 },
  { date: "Wed 25 Jun 2025", actual: 6, ideal: 0 },
  { date: "Thu 26 Jun 2025", actual: 6, ideal: 0 },
  { date: "Fri 27 Jun 2025", actual: 6, ideal: 0 },
  { date: "Sat 28 Jun 2025", actual: 6, ideal: 0 },
];

const BurndownChartTab: React.FC = () => {
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-06-28");

  // You can filter data based on startDate/endDate if needed

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginTop: 8 }}>
      <div className="d-flex align-items-center mb-3" style={{ gap: 24 }}>
        <div>
          <label htmlFor="start-date" className="form-label" style={{ fontWeight: 500 }}>Start Date</label>
          <input
            id="start-date"
            type="date"
            className="form-control"
            style={{ minWidth: 180 }}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end-date" className="form-label" style={{ fontWeight: 500 }}>End Date</label>
          <input
            id="end-date"
            type="date"
            className="form-control"
            style={{ minWidth: 180 }}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <LineChart
            data={initialData}
            margin={{ top: 24, right: 24, left: 0, bottom: 24 }}
          >
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-25}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis
              domain={[0, 9]}
              tick={{ fontSize: 14 }}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="rect"
              wrapperStyle={{ top: 0, right: 24 }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#2196f3"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#2196f3", fill: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="ideal"
              name="Ideal"
              stroke="#bdbdbd"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BurndownChartTab;