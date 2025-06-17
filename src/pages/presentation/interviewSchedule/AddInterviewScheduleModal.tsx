import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface AddInterviewScheduleModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (schedule: any) => void; // Add this line
}

const AddInterviewScheduleModal: React.FC<AddInterviewScheduleModalProps> = ({ isOpen, setIsOpen, onSave }) => {
  // Example state for form fields
  const [job, setJob] = useState('');
  const [candidate, setCandidate] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [round, setRound] = useState('');
  const [interviewType, setInterviewType] = useState('In Person');
  const [startOn, setStartOn] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [commentInterviewer, setCommentInterviewer] = useState('');
  const [notifyCandidate, setNotifyCandidate] = useState(true);
  const [commentCandidate, setCommentCandidate] = useState('');
  const [sendReminder, setSendReminder] = useState(true);
  const [remindBefore, setRemindBefore] = useState('1');
  const [remindUnit, setRemindUnit] = useState('Day(s)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTime = startTime
      ? format(new Date(`1970-01-01T${startTime}`), 'hh:mm aa')
      : '';
    onSave({
      job,
      candidate,
      interviewer,
      round,
      interviewType,
      startOn: startOn ? format(startOn, 'EEE dd MMM yyyy') : '',
      startTime: formattedTime,
      commentInterviewer,
      notifyCandidate,
      commentCandidate,
      sendReminder,
      remindBefore,
      remindUnit,
    });
    setIsOpen(false);
    setJob('');
    setCandidate('');
    setInterviewer('');
    setRound('');
    setInterviewType('In Person');
    setStartOn(null);
    setStartTime('');
    setCommentInterviewer('');
    setNotifyCandidate(true);
    setCommentCandidate('');
    setSendReminder(true);
    setRemindBefore('1');
    setRemindUnit('Day(s)');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
      <div className="modal-header">
        <h5 className="modal-title">Add Interview Schedule</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <h5 className="mb-4">Interview Details</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" htmlFor="jobSelect">Job <span className="text-danger">*</span></label>
              <select
                id="jobSelect"
                className="form-select"
                value={job}
                onChange={e => setJob(e.target.value)}
                required
              >
                <option value="">--</option>
                <option value="HR">HR</option>
                <option value="Developer">Developer</option>
                {/* Add job options here */}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="candidateSelect">Candidate <span className="text-danger">*</span></label>
              <select
                id="candidateSelect"
                className="form-select"
                value={candidate}
                onChange={e => setCandidate(e.target.value)}
                required
              >
                <option value="">--</option>
                <option value="Ayushi">Ayushi</option>
                <option value="Tanushree">Tanushree</option>
                {/* Add candidate options here */}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="interviewerSelect">Interviewer <span className="text-danger">*</span></label>
              <select
                id="interviewerSelect"
                className="form-select"
                value={interviewer}
                onChange={e => setInterviewer(e.target.value)}
                required
              >
                <option value="">Nothing selected</option>
                <option value="John Smith">John Smith</option>
                <option value="Rana">Rana</option>
                {/* Add interviewer options here */}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="roundSelect">Round <span className="text-danger">*</span></label>
              <select
                id="roundSelect"
                className="form-select"
                value={round}
                onChange={e => setRound(e.target.value)}
                required
              >
                <option value="">--</option>
                <option value="HR">HR</option>
                <option value="Technical Round">Technical Round</option>
                <option value="Manager Round">Manager Round</option>
                {/* Add round options here */}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="interviewTypeSelect">Interview Type</label>
              <select
                id="interviewTypeSelect"
                className="form-select"
                value={interviewType}
                onChange={e => setInterviewType(e.target.value)}
              >
                <option>In Person</option>
                <option>Online</option>
                {/* Add more types if needed */}
              </select>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <label className="form-label" htmlFor="startOnInput">
                Start On <span className="text-danger">*</span>
              </label>
              <DatePicker
                id="startOnInput"
                selected={startOn}
                onChange={date => setStartOn(date)}
                dateFormat="EEE dd MMM yyyy"
                className="form-control"
                placeholderText="Select date"
                required
                autoComplete="off"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="startTimeInput">Start Time <span className="text-danger">*</span></label>
              <Input
                id="startTimeInput"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="commentInterviewer">Comment for Interviewer</label>
            <textarea
              id="commentInterviewer"
              className="form-control"
              rows={2}
              value={commentInterviewer}
              onChange={e => setCommentInterviewer(e.target.value)}
            />
          </div>
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifyCandidate}
              onChange={e => setNotifyCandidate(e.target.checked)}
              id="notifyCandidate"
            />
            <label className="form-check-label" htmlFor="notifyCandidate">
              Notify Candidate
            </label>
          </div>
          {notifyCandidate && (
            <div className="mt-2">
              <label className="form-label" htmlFor="commentCandidate">
                Comment for Candidate <span title="This comment will be sent to the candidate." style={{ cursor: 'pointer' }}>?</span>
              </label>
              <textarea
                id="commentCandidate"
                className="form-control"
                rows={2}
                value={commentCandidate}
                onChange={e => setCommentCandidate(e.target.value)}
              />
            </div>
          )}
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={sendReminder}
              onChange={e => setSendReminder(e.target.checked)}
              id="sendReminder"
            />
            <label className="form-check-label" htmlFor="sendReminder">
              Send Reminder
            </label>
          </div>
          {sendReminder && (
            <div className="row g-3 align-items-end mt-1">
              <div className="col-md-3">
                <label className="form-label" htmlFor="remindBeforeInput">Remind before <span className="text-danger">*</span></label>
                <Input
                  id="remindBeforeInput"
                  type="number"
                  className="form-control"
                  value={remindBefore}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemindBefore(e.target.value)}
                  required
                  min={1}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label visually-hidden" htmlFor="remindUnitSelect">Remind Unit</label>
                <select
                  id="remindUnitSelect"
                  className="form-select"
                  value={remindUnit}
                  onChange={e => setRemindUnit(e.target.value)}
                >
                  <option>Day(s)</option>
                  <option>Hour(s)</option>
                  <option>Minute(s)</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer mt-4">
          <Button color="primary" type="submit">
            Save
          </Button>
          <Button color="light" isLight type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddInterviewScheduleModal;