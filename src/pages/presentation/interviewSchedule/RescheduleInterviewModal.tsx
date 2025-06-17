/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (data: any) => void;
  interview?: any;
};

const RescheduleInterviewModal: React.FC<Props> = ({ isOpen, setIsOpen, onSave, interview }) => {
  const [startOn, setStartOn] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [notifyCandidate, setNotifyCandidate] = useState(true);
  const [commentCandidate, setCommentCandidate] = useState('');

  useEffect(() => {
    if (interview) {
      setStartOn(interview.startOn ? new Date(interview.startOn) : null);
      setStartTime(interview.startTime || '');
      setNotifyCandidate(true);
      setCommentCandidate('');
    }
  }, [interview, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...interview,
      startOn: startOn ? format(startOn, 'EEE dd MMM yyyy') : '',
      startTime: startOn ? format(startOn, 'hh:mm aa') : startTime,
      notifyCandidate,
      commentCandidate,
    });
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">Reschedule Interview</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="row g-3">
            <div className="col-md-6 d-flex flex-column">
              <label className="form-label" htmlFor="rescheduleStartOn">
                Start On <span className="text-danger">*</span>
              </label>
              <DatePicker
                id="rescheduleStartOn"
                selected={startOn}
                onChange={date => setStartOn(date)}
                dateFormat="EEE dd MMM yyyy"
                className="form-control"
                placeholderText="Select date"
                required
                autoComplete="off"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="rescheduleStartTime">Start Time <span className="text-danger">*</span></label>
              <Input
                id="rescheduleStartTime"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifyCandidate}
              onChange={e => setNotifyCandidate(e.target.checked)}
              id="rescheduleNotifyCandidate"
            />
            <label className="form-check-label" htmlFor="rescheduleNotifyCandidate">
              Notify Candidate
            </label>
          </div>
          <div className="mt-2">
            <label className="form-label" htmlFor="rescheduleCommentCandidate">
              Comment for Candidate
            </label>
            <textarea
              id="rescheduleCommentCandidate"
              className="form-control"
              rows={2}
              value={commentCandidate}
              onChange={e => setCommentCandidate(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <Button color="light" isLight type="button" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RescheduleInterviewModal;