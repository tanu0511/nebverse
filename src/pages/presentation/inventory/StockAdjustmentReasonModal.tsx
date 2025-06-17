import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface StockAdjustmentReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasons: string[];
  setReasons: (reasons: string[]) => void;
}

const StockAdjustmentReasonModal: React.FC<StockAdjustmentReasonModalProps> = ({ isOpen, onClose, reasons, setReasons }) => {
  const [reasonInput, setReasonInput] = useState('');

  const handleAddReason = () => {
    const trimmed = reasonInput.trim();
    if (trimmed && !reasons.includes(trimmed)) {
      setReasons([...reasons, trimmed]);
      setReasonInput('');
      onClose(); 
    }
  };

  const handleDeleteReason = (reasonName: string) => {
    setReasons(reasons.filter(r => r !== reasonName));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose}>
      <ModalHeader>
        <span className="fw-bold">Stock Adjustment Reason</span>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive mb-3">
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Reason name</th>
                <th style={{ width: 120 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reasons.filter(r => r !== '--').length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">No reasons added</td>
                </tr>
              ) : (
                reasons.filter(r => r !== '--').map((r, idx) => (
                  <tr key={r}>
                    <td>{idx + 1}</td>
                    <td>{r}</td>
                    <td>
                      <Button color="light" size="sm" onClick={() => handleDeleteReason(r)}>
                        <Icon icon="Delete" className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <FormGroup label="Reason name *">
          <Input
            value={reasonInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReasonInput(e.target.value)}
            placeholder="Enter a reason name"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={onClose}>Close</Button>
        <Button color="primary" onClick={handleAddReason}>
          <Icon icon="Check" className="me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StockAdjustmentReasonModal;
