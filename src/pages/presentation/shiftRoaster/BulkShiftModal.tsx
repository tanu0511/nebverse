
import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    department: string;
    employee: number | 'all';
    shift: 'full' | 'half' | 'sick' | 'festival' | 'event' | 'none';
    date: string;
  }) => void;
  initialData?: {
    employee: number;
    date: string;
    shift: 'full' | 'half' | 'sick' | 'festival' | 'event' | 'none';
  } | null;
};

const BulkShiftModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const shiftMap: Record<string, 'full' | 'half' | 'sick' | 'festival' | 'event' | 'none'> = {
      'Full Day': 'full',
      'Half Day': 'half',
      'Sick Leave': 'sick',
      'Festival': 'festival',
      'Event': 'event',
      'Day Off': 'none',
    };

    const department = (form.elements.namedItem('department') as HTMLSelectElement)?.value;
    const employeeValue = (form.elements.namedItem('employees') as HTMLSelectElement)?.value;
    const shiftValue = (form.elements.namedItem('employeeShift') as HTMLSelectElement)?.value;
    const date = (form.elements.namedItem('selectDate') as HTMLInputElement)?.value;
    const allEmployeesChecked = (form.elements.namedItem('selectAll') as HTMLInputElement)?.checked;

    const employee: number | 'all' = allEmployeesChecked
      ? 'all'
      : Number.isNaN(parseInt(employeeValue ?? '', 10))
        ? 0
        : parseInt(employeeValue ?? '', 10);

    const shiftKey = shiftValue as keyof typeof shiftMap;
    const shift = shiftMap[shiftKey] ?? 'none';

    const formData = {
      department,
      employee,
      shift,
      date,
    };

    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    } else {
      console.error('onSubmit is not a function');
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose}>
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="bulkShiftModalTitle">Assign Bulk Shifts</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="alert alert-primary text-white mb-4">
          The existing shift will be overridden.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-4 col-md-6">
              <label htmlFor="department" className="form-label">Department</label>
              <select id="department" className="form-select" required>
                <option value="">--</option>
                <option value="Sales">Sales</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            <div className="mb-4 col-md-6">
              <label htmlFor="employees" className="form-label">Employees</label>
              <select id="employees" className="form-select" required>
                <option value="1">Atharvraj Singh Rana</option>
                <option value="2">Atharva</option>
              </select>
            </div>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="selectAll" />
            <label className="form-check-label ms-2" htmlFor="selectAll">
              Select All Employees
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="employeeShift" className="form-label">Employee Shift</label>
            <select id="employeeShift" className="form-select" required>
              <option>Day Off</option>
              <option>Full Day</option>
              <option>Half Day</option>
              <option>Sick Leave</option>
              <option>Festival</option>
              <option>Event</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="selectDate" className="form-label">Select Date</label>
            <input type="date" id="selectDate" className="form-control" required />
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="sendEmail" />
            <label className="form-check-label ms-2" htmlFor="sendEmail">
              Send Email
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="remark" className="form-label">Remark</label>
            <textarea id="remark" className="form-control" rows={3} />
          </div>

          <div className="d-flex justify-content-end">
            <Button color="secondary" onClick={onClose} className="me-3">Cancel</Button>
            <Button color="primary" type="submit">Submit</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};
 
export default  BulkShiftModal;
