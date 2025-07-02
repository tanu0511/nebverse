import React, { useState, useRef, useEffect } from 'react';
import Modal, { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface RejectModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onReject: (reason: string) => void;
}

const RejectModal: React.FC<RejectModalProps> = ({ isOpen, setIsOpen, onReject }) => {
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
    onReject(reason);
    setIsOpen(false);
    setReason('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setReason('');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCentered>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="reject-leave-modal-title">Leaves Reject Reason</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <label htmlFor="reject-reason" className="form-label">
            Reason <span className="text-danger">*</span>
          </label>
          <textarea
            id="reject-reason"
            className="form-control"
            rows={4}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder=""
            ref={textareaRef}
            required
            aria-required="true"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={handleClose}>
          Close
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
          isDisable={!reason.trim()}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RejectModal;