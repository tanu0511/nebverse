import React, { useState } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (data: any) => void;
  employees: { id: number; name: string; status: string }[];
  asset: any;
};

const LentAssetModal: React.FC<Props> = ({ isOpen, setIsOpen, onSave, employees }) => {
  const [employee, setEmployee] = useState('');
  const [dateGiven, setDateGiven] = useState('');
  const [dateReturn, setDateReturn] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onSave({ employee, dateGiven, dateReturn, notes });
    setIsOpen(false);
    setEmployee('');
    setDateGiven('');
    setDateReturn('');
    setNotes('');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="lend-asset-modal-title">Lend Asset</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="employee-select">Employee <span className="text-danger">*</span></label>
            <select
              id="employee-select"
              className="form-select"
              value={employee}
              onChange={e => setEmployee(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="date-given-input">Date Given <span className="text-danger">*</span></label>
            <Input
              id="date-given-input"
              type="date"
              value={dateGiven}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateGiven(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="date-return-input">Estimated Date of Return</label>
            <Input
              id="date-return-input"
              type="date"
              value={dateReturn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateReturn(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="notes-textarea">Notes</label>
            <textarea
              id="notes-textarea"
              className="form-control"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notes"
              rows={2}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LentAssetModal;