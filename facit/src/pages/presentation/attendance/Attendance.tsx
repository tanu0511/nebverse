/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import AttendanceModal from "./AttendanceModal";

const employees = [
  { id: "1", name: "Joey Tribbiani", department: "HR" },
  { id: "2", name: "Chandler Bing", department: "Finance" },
];

interface AttendanceData {
  employee: string;
  date: string;
  status?: string;
}

const getDaysInMonth = (year: number, month: number): { date: string; day: string }[] => {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => {
    const currentDate = new Date(year, month, i + 1);
    return {
      date: currentDate.toLocaleDateString("en-US", { day: "2-digit" }),
      day: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
    };
  });
};

const Attendance = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear()); // Default to the current year
  const [month, setMonth] = useState(today.getMonth()); // Default to the current month
  const [attendance, setAttendance] = useState<Record<string, AttendanceData>>({});
  const [dates, setDates] = useState(getDaysInMonth(year, month));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setDates(getDaysInMonth(year, month));
  }, [year, month]);

  const handleSaveAttendance = (data: { employeeName: string; date: string; status: string }) => {
    const key = `${data.employeeName}-${data.date}`; // Use employee name and date as the key
    setAttendance((prev) => ({
      ...prev,
      [key]: { employee: data.employeeName, date: data.date, status: data.status }, // Map employeeName to employee
    }));
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleOpenModal = (employeeName: string, date: string) => {
    setSelectedEmployee(employeeName);
    setSelectedDate(date);
    setIsModalOpen(true); // Open the modal
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <span className="text-success">✔</span>;
      case "Absent":
        return <span className="text-danger">✖</span>;
      case "Late":
        return <span className="text-warning">⚠</span>;
      case "Half Day":
        return <span className="text-primary">★</span>;
      case "On Leave":
        return <span className="text-info">✈</span>;
      case "Holiday":
        return <span className="text-warning">⭐</span>;
      default:
        return <span>-</span>;
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Legend */}
      <div className="mb-3">
        <strong>Note:</strong>{" "}
        <span className="text-warning">⭐ Holiday</span> |{" "}
        <span className="text-danger">✖ Absent</span> |{" "}
        <span className="text-success">✔ Present</span> |{" "}
        <span className="text-primary">★ Half Day</span> |{" "}
        <span className="text-warning">⚠ Late</span> |{" "}
        <span className="text-info">✈ On Leave</span>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <select
          className="form-select me-2"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(2025, i, 1).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          className="form-select me-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const yearOption = today.getFullYear() - 2 + i; // Show 5 years: 2 before and 2 after the current year
            return (
              <option key={i} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Mark Attendance
        </Button>
      </div>

      <div className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr>
              <th rowSpan={2} className="align-middle">
                Employee
              </th>
              {dates.map((date, index) => (
                <th key={index} className="text-center">
                  {date.date}
                </th>
              ))}
              <th rowSpan={2} className="align-middle">
                Total
              </th>
            </tr>
            <tr>
              {dates.map((date, index) => (
                <th key={index} className="text-center text-muted">
                  {date.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <strong>{emp.name}</strong>
                      <br />
                      <small>{emp.department}</small>
                    </div>
                  </div>
                </td>
                {dates.map((date) => {
                  const key = `${emp.name}-${date.date}`; // Use employee name instead of ID
                  const status = attendance[key]?.status || "-";
                  return (
                    <td
                      key={key}
                      className="text-center"
                      onClick={() => handleOpenModal(emp.name, date.date)} // Pass employee name
                      style={{ cursor: "pointer" }}
                    >
                      {getStatusIcon(status)} {/* Display the icon */}
                    </td>
                  );
                })}
                <td className="text-center">
                  {dates.filter((date) => attendance[`${emp.name}-${date.date}`]?.status === "Present")
                    .length}{" "}
                  / {dates.length}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {isModalOpen && (
          <AttendanceModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onSave={(data) => handleSaveAttendance(data)} // Pass data to save
            employeeNames={employees.map((emp) => emp.name)} // Pass employee names
          />
        )}
      </div>
    </div>
  );
};

export default Attendance;