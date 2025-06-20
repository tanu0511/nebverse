import React from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface FollowupModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  form: {
    leadName: string;
    date: string;
    time: string;
    sendReminder: boolean;
    remark: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  editIndex: number | null;
}

const FollowupModal: React.FC<FollowupModalProps> = ({
  isOpen,
  setIsOpen,
  form,
  onChange,
  onSave,
  editIndex,
}) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <ModalHeader setIsOpen={setIsOpen}>
      <ModalTitle id="add-follow-up-title">
        {editIndex !== null ? 'Edit Follow Up' : 'Add Follow Up'}
      </ModalTitle>
    </ModalHeader>
    <ModalBody>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label text-muted">Lead Name</label>
          <div>{form.leadName}</div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Follow Up Next <span className="text-danger">*</span></label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Start Time <span className="text-danger">*</span></label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={form.time}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="sendReminder"
          name="sendReminder"
          checked={form.sendReminder}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="sendReminder">
          Send Reminder
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">Remark</label>
        <textarea
          className="form-control"
          name="remark"
          value={form.remark}
          onChange={onChange}
          rows={3}
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => setIsOpen(false)}>
        Close
      </Button>
      <Button color="primary" onClick={onSave} isDisable={!form.date || !form.time}>
        Save
      </Button>
    </ModalFooter>
  </Modal>
);

export default FollowupModal;