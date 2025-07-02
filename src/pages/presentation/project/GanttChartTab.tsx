import React, { useState } from "react";
import Button from "../../../components/bootstrap/Button";


// Generate date columns for 3 weeks (customize as needed)
function getDateColumns() {
  const start = new Date("2025-06-08");
  const cols = [];
  for (let w = 0; w < 3; w++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + w * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    cols.push({
      week: `${weekStart.toLocaleString("en-US", { day: "2-digit", month: "short", year: "2-digit" })} - ${weekEnd.toLocaleString("en-US", { day: "2-digit", month: "short", year: "2-digit" })}`,
      days: Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return {
          date: d.toISOString().slice(0, 10),
          label: `${d.getDate()}, ${d.toLocaleString("en-US", { weekday: "short" })}`,
        };
      }),
    });
  }
  return cols;
}

const dateColumns = getDateColumns();

const statusColors: Record<string, string> = {
  "Incomplete": "#dacac4",
  "To Do": "#dae7dd",
  "Complete": "#4ade80",
};

// Example tasks data
const tasks = [
  {
    id: 1,
    name: "Design UI",
    start: "2025-06-08",
    duration: 5,
    status: "Incomplete",
    assignee: "Alice",
  },
  {
    id: 2,
    name: "Develop Backend",
    start: "2025-06-10",
    duration: 7,
    status: "To Do",
    assignee: "Bob",
  },
  {
    id: 3,
    name: "Testing",
    start: "2025-06-15",
    duration: 4,
    status: "Complete",
    assignee: "Charlie",
  },
];

const GanttChartTab: React.FC = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  // Filter tasks if needed
  const visibleTasks = hideCompleted
    ? tasks.filter((t) => t.status !== "Complete")
    : tasks;

  // Tooltip state
  const [tooltip, setTooltip] = useState<{ x: number; y: number; task: any } | null>(null);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <Button
          icon="Add"
          color="primary"
          isLight
        >
          Add Task
        </Button>
      </div>
      <div className="mb-3">
        <label className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={e => setHideCompleted(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Hide completed task
        </label>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "auto",
          padding: 0,
          border: "1px solid #e5e7eb",
        }}
      >
        <table className="table mb-0" style={{ minWidth: 1200 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 160 }}>Task name</th>
              <th style={{ minWidth: 120 }}>Start time</th>
              <th style={{ minWidth: 80 }}>Duration</th>
              {dateColumns.map((week, i) => (
                <th key={i} colSpan={7} style={{ textAlign: "center", background: "#f8fafc" }}>
                  {week.week}
                </th>
              ))}
            </tr>
            <tr>
              <th />
              <th />
              <th />
              {dateColumns.map((week) =>
                week.days.map((d, j) => (
                  <th
                    key={d.date}
                    style={{
                      minWidth: 60,
                      textAlign: "center",
                      background: (j === 0 || j === 6) ? "#f1f5f9" : "#fff",
                      fontWeight: 400,
                      fontSize: 13,
                    }}
                  >
                    {d.label}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {visibleTasks.map((task) => (
              <tr key={task.id}>
                <td style={{ fontWeight: 500 }}>{task.name}</td>
                <td>{task.start}</td>
                <td>{task.duration}</td>
                {dateColumns.flatMap((week) =>
                  week.days.map((d, colIdx) => {
                    // Is this cell part of the task bar?
                    const startIdx = dateColumns
                      .flatMap((w) => w.days)
                      .findIndex((day) => day.date === task.start);
                    const cellIdx =
                      dateColumns
                        .slice(0, dateColumns.indexOf(week))
                        .reduce((a, w) => a + w.days.length, 0) + colIdx;
                    const isBar =
                      cellIdx >= startIdx &&
                      cellIdx < startIdx + task.duration;
                    return (
                      <td
                        key={d.date}
                        style={{
                          background: (colIdx === 0 || colIdx === 6) ? "#f1f5f9" : "#fff",
                          position: "relative",
                          padding: 0,
                          height: 36,
                        }}
                      >
                        {isBar && (
                          <div
                            style={{
                              background: statusColors[task.status] || "#ddd",
                              borderRadius: 6,
                              color: "#222",
                              minHeight: 28,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              padding: "0 8px",
                              fontWeight: 500,
                              boxShadow: "0 1px 4px 0 #0001",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 2,
                            }}
                            onMouseEnter={e =>
                              setTooltip({
                                x: (e.target as HTMLElement).getBoundingClientRect().left + window.scrollX,
                                y: (e.target as HTMLElement).getBoundingClientRect().top + window.scrollY + 36,
                                task,
                              })
                            }
                            onMouseLeave={() => setTooltip(null)}
                          >
                            {task.name}
                            {task.assignee && (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  marginLeft: 8,
                                  background: "#f1f5f9",
                                  borderRadius: "50%",
                                  width: 22,
                                  height: 22,
                                  justifyContent: "center",
                                  color: "#888",
                                  border: "1px solid #e5e7eb",
                                }}
                              >
                                <i className="bi bi-person" />
                              </span>
                            )}
                            <span
                              style={{
                                marginLeft: 8,
                                color: statusColors[task.status],
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              ● {task.status}
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              background: "#222c",
              color: "#fff",
              borderRadius: 8,
              padding: 16,
              minWidth: 180,
              zIndex: 1000,
              boxShadow: "0 4px 24px #0004",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
              {tooltip.task.name} <span style={{ color: "#aaa", fontSize: 13 }}>#{tooltip.task.id}</span>
            </div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{tooltip.task.assignee || "Unassigned"}</span>
            </div>
            <div style={{ fontSize: 13, color: "#bdbdbd", marginBottom: 4 }}>
              <i className="bi bi-layers" /> {tooltip.task.name}
            </div>
            <div style={{ fontSize: 13, color: "#bdbdbd", marginBottom: 4 }}>
              <i className="bi bi-hourglass-split" /> 0:{tooltip.task.duration * 2}
            </div>
            <div style={{ fontSize: 13, color: "#f87171" }}>
              <i className="bi bi-calendar-event" /> Thu 12 Jun 2025
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GanttChartTab;