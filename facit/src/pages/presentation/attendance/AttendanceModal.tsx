/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface AttendanceModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSave: (data: { employeeName: string; date: string; status: string }) => void; // Pass employee name instead of ID
    employeeNames: string[]; // List of employee names
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, setIsOpen, onSave, employeeNames }) => {
    const [employeeName, setEmployeeName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [status, setStatus] = useState<string>('Present');

    const handleSave = () => {
        if (employeeName && date) {
            onSave({ employeeName, date, status }); // Pass the selected name, date, and status
            setIsOpen(false); // Close the modal
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <h5>Attendance Details</h5>
            </ModalHeader>
            <ModalBody>
                <form>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Employee</label>
                            <select
    className="form-select"
    value={employeeName}
    onChange={(e) => setEmployeeName(e.target.value)}
>
    <option value="">Select Employee</option>
    {employeeNames.map((name, index) => (
        <option key={index} value={name}>
            {name}
        </option>
    ))}
</select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Late">Late</option>
                                <option value="Half Day">Half Day</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleSave}>
                    Save
                </Button>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AttendanceModal;
