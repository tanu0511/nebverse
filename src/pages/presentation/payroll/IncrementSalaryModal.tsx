import React, { useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Icon from '../../../components/icon/Icon';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';

interface EmployeeData {
  id: number;
  name: string;
  annualCTC: string;
  // Add other employee fields if needed
}

interface SalaryHistoryEntry {
  type: 'Increment' | 'Decrement';
  amount: number;
  date: string;
}

interface IncrementSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeData | undefined;
  onSave: (employeeId: number, newAnnualCTC: number, type: "Increment" | "Decrement", amount: number, date: string) => void;
  editEntry?: SalaryHistoryEntry | null;
}

const IncrementSalaryModal: React.FC<IncrementSalaryModalProps> = ({
  isOpen, onClose, employee, onSave, editEntry
}) => {
  const [incrementType, setIncrementType] = useState<'Increment' | 'Decrement'>('Increment');
  const [incrementAmount, setIncrementAmount] = useState('');
  const [incrementDate, setIncrementDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (editEntry) {
      setIncrementType(
        editEntry.type.charAt(0).toUpperCase() + editEntry.type.slice(1).toLowerCase() as 'Increment' | 'Decrement'
      );
      setIncrementAmount(editEntry.amount.toString());
      setIncrementDate(editEntry.date);
    }
  }, [editEntry, isOpen]);

  const currentAnnual = employee?.annualCTC ? parseFloat(employee.annualCTC) : 0;
  const amount = parseFloat(incrementAmount) || 0;
  const newAnnual = incrementType === 'Increment'
    ? currentAnnual + amount
    : currentAnnual - amount;
  const newMonthly = newAnnual / 12;

  const handleSave = () => {
    if (employee) {
      onSave(employee.id, newAnnual, incrementType, amount, incrementDate);
      // Reset only the increment fields
      setIncrementType('Increment');
      setIncrementAmount('');
      setIncrementDate(new Date().toISOString().slice(0, 10));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} size="lg" isCentered>
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="increment-salary-modal-title">Update Salary</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: 48, height: 48, fontSize: 22, color: '#fff' }}
            >
              <Icon icon="Person" />
            </div>
            <div className="ms-2">
              <div className="fw-bold">{employee?.name || 'Employee'}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>Ram</div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="text-muted">Current Annual Gross Salary</div>
            <div className="fw-bold fs-5">₹{currentAnnual.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="col-md-4">
            <div className="text-muted">Current Monthly Gross Salary</div>
            <div className="fw-bold fs-5">₹{(currentAnnual / 12).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <FormGroup label="Value Type *">
              <select
                className="form-select"
                value={incrementType}
                onChange={e => setIncrementType(e.target.value as 'Increment' | 'Decrement')}
              >
                <option value="Increment">Increment</option>
                <option value="Decrement">Decrement</option>
              </select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Annual {incrementType} Amount *">
              <Input
                type="number"
                value={incrementAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncrementAmount(e.target.value)}
                placeholder={`Enter ${incrementType.toLowerCase()} amount`}
                min={0}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Increment Date">
              <Input
                type="date"
                value={incrementDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncrementDate(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="text-muted">{incrementType} Monthly Gross Salary</div>
            <div className="fw-bold">₹{(amount / 12).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="col-md-4">
            <div className="text-muted">New Effective Annual Gross Salary</div>
            <div className="fw-bold">₹{newAnnual.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="col-md-4">
            <div className="text-muted">New Effective Monthly Gross Salary</div>
            <div className="fw-bold">₹{newMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={onClose}>Close</Button>
        <Button
          color="primary"
          className="ms-2"
          onClick={handleSave}
        >
          <Icon icon="Check" className="me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default IncrementSalaryModal;