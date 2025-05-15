import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AttendanceModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (data: {
    employeeName: string;
    department: string;
    dates: string[];
    status: string;
    clockIn: string;
    clockOut: string;
    workingFrom: string;
    overwrite: boolean;
  }) => void;
  employeeNames: string[];
  selectedEmployee: string | null;
  selectedDate: string | null;
}

const departments = ["HR", "Finance", "Engineering", "Marketing"];

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  setIsOpen,
  onSave,
  employeeNames,
  selectedEmployee,
  selectedDate,
}) => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [department, setDepartment] = useState<string>("HR");
  const [dates, setDates] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Present");
  const [clockIn, setClockIn] = useState<string>("09:00");
  const [clockOut, setClockOut] = useState<string>("17:00");
  const [workingFrom, setWorkingFrom] = useState<string>("Office");
  const [overwrite, setOverwrite] = useState<boolean>(false);

  useEffect(() => {
    if (selectedEmployee) setEmployeeName(selectedEmployee);
    if (selectedDate) setDates([selectedDate]);
  }, [selectedEmployee, selectedDate]);

  const handleSave = () => {
    if (employeeName && dates.length && status) {
      onSave({
        employeeName,
        department,
        dates,
        status,
        clockIn,
        clockOut,
        workingFrom,
        overwrite,
      });
      handleClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmployeeName("");
    setDates([]);
    setStatus("Present");
    setClockIn("09:00");
    setClockOut("17:00");
    setWorkingFrom("Office");
    setOverwrite(false);
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered style={{ width: "100%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Mark Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Employee</Form.Label>
            <Form.Select value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}>
              <option value="">Select Employee</option>
              {employeeNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select value={department} onChange={(e) => setDepartment(e.target.value)}>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dates</Form.Label>
            <Form.Select
              multiple
              value={dates}
              onChange={(e) =>
                setDates(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              {Array.from({ length: 31 }, (_, i) => {
                const day = (i + 1).toString().padStart(2, "0");
                return (
                  <option key={day} value={day}>
                    {day}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
              <option>Half Day</option>
              <option>On Leave</option>
              <option>Holiday</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clock-In Time</Form.Label>
            <Form.Control
              type="time"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clock-Out Time</Form.Label>
            <Form.Control
              type="time"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Working From</Form.Label>
            <Form.Select value={workingFrom} onChange={(e) => setWorkingFrom(e.target.value)}>
              <option>Office</option>
              <option>Home</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="overwriteAttendance">
            <Form.Check
              type="checkbox"
              label="Overwrite Attendance"
              checked={overwrite}
              onChange={(e) => setOverwrite(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;