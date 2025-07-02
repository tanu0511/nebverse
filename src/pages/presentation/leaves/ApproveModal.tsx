import React, { useState, useRef, useEffect } from 'react';
import Modal, { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ApproveModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onApprove: (reason: string) => void;
}

const ApproveModal: React.FC<ApproveModalProps> = ({ isOpen, setIsOpen, onApprove }) => {
  const [reason, setReason] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
    if (!isOpen) {
      setReason('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!reason.trim()) return;
    onApprove(reason);
    setReason('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setReason('');
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isCentered
      aria-labelledby="approve-leave-modal-title"
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="approve-leave-modal-title">Approve Leave</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <label htmlFor="approve-reason" className="form-label">Reason</label>
          <textarea
            id="approve-reason"
            className="form-control"
            rows={4}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Enter reason for approval"
            ref={textareaRef}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={handleClose}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave} isDisable={!reason.trim()}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ApproveModal;