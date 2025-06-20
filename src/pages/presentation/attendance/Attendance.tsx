/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AttendanceModal from "./AttendanceModal";
import addEmployeeData from '../hr/AddEmployee.json';

// 2. Map the data to extract name and department
const employees = (addEmployeeData.AddEmployee || [])
  .filter(emp => emp.name && emp.department !== undefined)
  .map(emp => ({
    id: emp.employeeId || emp.id,
    name: emp.name,
    department: emp.department || "",
  }));

interface AttendanceData {
  employee: string;
  department: string;
  date: string;
  status: string;
  clockIn: string;
  clockOut: string;
  workingFrom: string;
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
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [attendance, setAttendance] = useState<Record<string, AttendanceData>>({});
  const [dates, setDates] = useState(getDaysInMonth(year, month));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDates(getDaysInMonth(year, month));

    // Set all Sundays as Holiday for all employees
    setAttendance((prev) => {
      const updatedAttendance = { ...prev };
      const sundays = dates
        .map((date, idx) => ({ ...date, idx }))
        .filter((dateObj) => {
          // Get the actual date object for this day
          const d = new Date(year, month, Number(dateObj.date));
          return d.getDay() === 0; // 0 = Sunday
        });

      employees.forEach((emp) => {
        sundays.forEach((dateObj) => {
          const key = `${emp.name}-${dateObj.date}`;
          updatedAttendance[key] = {
            employee: emp.name || "",
            department: emp.department,
            date: dateObj.date,
            status: "Holiday",
            clockIn: "",
            clockOut: "",
            workingFrom: "",
          };
        });
      });
      return updatedAttendance;
    });
  }, [year, month]);

  const handleSaveAttendance = (data: {
    employeeName: string;
    department: string;
    dates: string[];
    status: string;
    clockIn?: string;
    clockOut: string;
    workingFrom: string;
    overwrite: boolean;
  }) => {
    setAttendance((prev) => {
      const updatedAttendance = { ...prev };

      data.dates.forEach((date) => {
        const key = `${data.employeeName}-${date}`;
        // Always set clockIn to current time
        const clockInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (data.overwrite || !updatedAttendance[key]) {
          updatedAttendance[key] = {
            employee: data.employeeName,
            department: data.department,
            date: date,
            status: data.status,
            clockIn: clockInTime,
            clockOut: data.clockOut,
            workingFrom: data.workingFrom,
          };
        }
      });

      return updatedAttendance;
    });

    setIsModalOpen(false);
  };

  const handleOpenModal = (employeeName: string, date: string) => {
    setSelectedEmployee(employeeName);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    if (status === "Present") return <Icon icon="Done" size="lg" color="success"/>;
    if (status === "Absent") return <Icon icon="Close" size="lg" color="dark" />;
    if (status === "Half Day") return <Icon icon="StarHalf" size="lg" color="danger" />; // 
    if (status === "On Leave") return <Icon icon="FlightTakeoff" size="2x" color="danger" />;
    if (status === "Holiday") return <Icon icon="Star" size="2x" color="warning" />;
    if(status === "Late")     return <Icon icon="DirectionsRun" size="lg" color="info"/>;
    if (status === "Day Off") return <Icon icon="Today" size="lg" color="info" />; // <-- Add this
    return <Icon icon="Remove" color="secondary" />;
  };

  return (
    <>
      <PageWrapper title="Attendance">
        <SubHeader>
          <SubHeaderLeft>
            <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
              {/* You can use your Icon component if available */}
              {/* <Icon icon="Search" size="2x" color="primary" /> */}
               <Icon icon="Search" size="2x" color="primary" />
            </label>
            <input
              id="searchInput"
              type="search"
              className="border-0 shadow-none bg-transparent"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: "none", minWidth: 200 }}
            />
          </SubHeaderLeft>
          <SubHeaderRight>
            <Button
              icon="PersonAdd"
              color="primary"
              isLight
              onClick={() => setIsModalOpen(true)}
            >
              Mark Attendance
            </Button>
          </SubHeaderRight>
        </SubHeader>
        <Page>
          <div className="mb-3">
            <strong>Note:</strong>{" "}
             <Icon icon="Star" size="2x" color="warning" /> Holiday |{" "}
            <Icon icon="Close" size="lg" color="dark" />Absent |{" "}
            <Icon icon="Done" size="lg" color="success"/>Present |{" "}
            <Icon icon="StarHalf" size="lg" color="danger" /> Halfday |{" "}
            <Icon icon="DirectionsRun" size="lg" color="info"/> Late|{" "}
            <Icon icon="FlightTakeoff" size="2x" color="danger" /> Leave|
            <Icon icon="Today" size="lg" color="info" />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex">
              <select className="form-select me-2" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(2025, i, 1).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </select>
              <select className="form-select me-2" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {Array.from({ length: 5 }, (_, i) => {
                  const yearOption = today.getFullYear() - 2 + i;
                  return <option key={i} value={yearOption}>{yearOption}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row h-100">
            <div className="col-12">
              <Card stretch>
                <CardBody className="table-responsive">
                  <table className="table table-modern table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        {dates.map((date, index) => (
                          <th key={index} className="text-center">
                            <div>{date.date}</div>
                            <div style={{ fontSize: "0.75em", color: "#888" }}>{date.day}</div>
                          </th>
                        ))}
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.filter(emp => (emp.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())).map((emp) => (
                        <tr key={emp.id}>
                          <td>{emp.name}</td>
                          <td>{emp.department}</td>
                          {dates.map((date) => {
                            const key = `${emp.name}-${date.date}`;
                            const att = attendance[key];
                            const status = att?.status || "-";
                            const isLeave = status === "On Leave";
                            const isHoliday = status === "Holiday";
                            return (
                              <td
                                key={key}
                                className="text-center"
                                onClick={() => handleOpenModal(emp.name ?? "", date.date)}
                                style={{ cursor: "pointer", minWidth: 90 }}
                                title={
                                  att && !isLeave && !isHoliday
                                    ? `Working From: ${att.workingFrom || '-'}\nClock-In: ${att.clockIn || '-'}\nClock-Out: ${att.clockOut || '-'}`
                                    : ''
                                }
                              >
                                <div>{getStatusIcon(status)}</div>
                                {/* Only show details if not Absent, not On Leave, not Holiday */}
                                {!isLeave && !isHoliday && status !== "Absent" && (
                                  <div style={{ fontSize: "0.7em", color: "#888" }}>
                                    <div>{att?.workingFrom || '-'}</div>
                                    <div>{att?.clockIn || '-'}</div>
                                    <div>{att?.clockOut || '-'}</div>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                          <td className="text-center">
                            {dates.filter((date) => attendance[`${emp.name}-${date.date}`]?.status === "Present").length} / {dates.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Page>
      </PageWrapper>

      {/* Modal outside PageWrapper to fix TS2322 error */}
      {isModalOpen && (
        <AttendanceModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSave={handleSaveAttendance}
          employeeNames={employees.map((emp) => emp.name).filter((name): name is string => typeof name === "string")}
          selectedEmployee={selectedEmployee}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};

export default Attendance;

