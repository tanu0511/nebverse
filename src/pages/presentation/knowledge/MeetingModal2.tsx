import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';

const EMPLOYEES = [
  { value: 'nisha', label: 'Nisha Singh' },
  { value: 'john', label: 'John Doe' },
  { value: 'alex', label: 'Alex Smith' },
];

const CLIENTS = [
  { value: 'client1', label: 'Acme Corp' },
  { value: 'client2', label: 'Globex Inc' },
  { value: 'client3', label: 'Umbrella LLC' },
];

const MeetingModal2 = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    labelColor: '#FF0000',
    startsOn: '',
    startTime: '',
    endsOn: '',
    endTime: '',
    description: '',
    project: '',
    employees: [] as string[],
    clients: [] as string[],
    hostVideo: 'disable',
    participantVideo: 'disable',
    recurring: false,
    sendReminder: false,
  });

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, key: 'employees' | 'clients') => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setForm(prev => ({ ...prev, [key]: selected }));
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold">Add Meeting</h4>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h5 className="mb-4">Meeting Details</h5>
            <form>
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Meeting Title <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Category</label>
                  <div className="input-group">
                    <select className="form-select">
                      <option value="">--</option>
                      <option value="General">General</option>
                      <option value="Project">Project</option>
                    </select>
                    <button className="btn btn-outline-secondary" type="button">Add</button>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Label Color <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <input type="text" className="form-control" value="#FF0000" readOnly />
                    <input type="color" className="form-control form-control-color md-1" value="#FF0000" style={{ width: 10  }} readOnly />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Starts On <span className="text-danger">*</span></label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Start Time <span className="text-danger">*</span></label>
                  <input type="time" className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Ends On <span className="text-danger">*</span></label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">End Time <span className="text-danger">*</span></label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={2} />
              </div>
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Project</label>
                  <select className="form-select">
                    <option value="">--</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Add Employees</label>
                  <select
                    className="form-select"
                    value={form.employees}
                    onChange={e => handleMultiSelect(e, 'employees')}
                  >
                    <option value=""> Nothing Selected</option>
                    {EMPLOYEES.map(emp => (
                      <option key={emp.value} value={emp.value}>{emp.label}</option>
                    ))}
                  </select>
                 
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Add Clients</label>
                  <select
                    className="form-select"
                    value={form.clients}
                    onChange={e => handleMultiSelect(e, 'clients')}
                  >
                    <option value ="">Nothing Selected</option>
                    {CLIENTS.map(client => (
                      <option key={client.value} value={client.value}>{client.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3 align-items-end">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Meeting Host</label>
                  <div className="d-flex align-items-center border rounded p-2 bg-light">
                    <img src="https://ui-avatars.com/api/?name=nisha" alt="host" width={32} height={32} className="rounded-circle me-2" />
                    <span>nisha</span>
                    <span className="badge bg-secondary ms-2">It's you</span>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Host Video Status</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="hostVideo" id="hostVideoEnable" value="enable" />
                      <label className="form-check-label" htmlFor="hostVideoEnable">Enable</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="hostVideo" id="hostVideoDisable" value="disable" defaultChecked />
                      <label className="form-check-label" htmlFor="hostVideoDisable">Disable</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Participant Video Status</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="participantVideo" id="participantVideoEnable" value="enable" />
                      <label className="form-check-label" htmlFor="participantVideoEnable">Enable</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="participantVideo" id="participantVideoDisable" value="disable" defaultChecked />
                      <label className="form-check-label" htmlFor="participantVideoDisable">Disable</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="recurring" />
                  <label className="form-check-label" htmlFor="recurring">
                    Recurring meeting
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="sendReminder" />
                  <label className="form-check-label" htmlFor="sendReminder">
                    Send reminder
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center border-top pt-4 mt-4">
                <Button color="primary" className="me-2" icon="check">
                  Save
                </Button>
                <Button color="secondary" type="button" onClick={onClose} isLight>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal2;