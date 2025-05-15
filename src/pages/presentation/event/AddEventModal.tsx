/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import Select, { MultiValue } from 'react-select';

const statusOptions = [
  { value: 'Pending', label: 'Pending', color: '#FFD600' },
  { value: 'Completed', label: 'Completed', color: '#00e600' },
  { value: 'Cancelled', label: 'Cancelled', color: '#ff0000' },
];

const departmentOptions = [
  { value: 'HR', label: 'HR' },
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'FRONTEND DEVELOPER', label: 'FRONTEND DEVELOPER' },
  { value: 'BACKEND DEVELOPER', label: 'BACKEND DEVELOPER' },
  { value: 'bkkmnl', label: 'bkkmnl' },
];

const AddEventModal = ({
  show,
  onClose,
  onAddEvent,
}: {
  show: boolean;
  onClose: () => void;
  onAddEvent: (event: any) => void;
}) => {
  const [eventName, setEventName] = useState('');
  const [labelColor, setLabelColor] = useState('#FF0000');
  const [where, setWhere] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [departments, setDepartments] = useState<any[]>([]);
  const [employee, setEmployee] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('Pending');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      title: eventName, // for react-big-calendar display
      name: eventName,  // for your custom MyEvent component if needed
      start: new Date(`${startDate}T${startTime}`),
      end: new Date(`${endDate}T${endTime}`),
      labelColor,
      // ...other fields
    });
  };

  return (
    <>
      <Modal isOpen={show} setIsOpen={onClose} size="xl">
          {[
              <form onSubmit={handleSubmit} key="form">
                  <div className="modal-header">
                      <h5 className="modal-title">Add Event</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                  </div>
                  <div className="modal-body">
                      <div className="row mb-3">
                          <div className="col-md-4">
                              <label className="form-label">Event Name <span className="text-danger">*</span></label>
                              <Input value={eventName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value)} />
                          </div>
                          <div className="col-md-4">
                              <label className="form-label">Label Color <span className="text-danger">*</span></label>
                              <div className="input-group">
                                  <Input
                                      value={labelColor}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabelColor(e.target.value)}
                                  />
                                  <span className="input-group-text p-0" style={{ border: 'none', background: 'transparent' }}>
                                      <input
                                          type="color"
                                          value={labelColor}
                                          onChange={e => setLabelColor(e.target.value)}
                                          style={{
                                              width: 36,
                                              height: 36,
                                              border: 'none',
                                              background: 'none',
                                              cursor: 'pointer',
                                              padding: 0,
                                          }}
                                          title="Pick a color"
                                      />
                                  </span>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <label className="form-label">Where <span className="text-danger">*</span></label>
                              <Input value={where} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhere(e.target.value)} />
                          </div>
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                              className="form-control"
                              rows={5}
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              placeholder="Description"
                          />
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-3">
                              <label className="form-label">Starts On Date <span className="text-danger">*</span></label>
                              <Input type="date" value={startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} />
                          </div>
                          <div className="col-md-3">
                              <label className="form-label">Starts On Time <span className="text-danger">*</span></label>
                              <Input type="time" value={startTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)} />
                          </div>
                          <div className="col-md-3">
                              <label className="form-label">Ends On Date <span className="text-danger">*</span></label>
                              <Input type="date" value={endDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)} />
                          </div>
                          <div className="col-md-3">
                              <label className="form-label">Ends On Time <span className="text-danger">*</span></label>
                              <Input type="time" value={endTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)} />
                          </div>
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Department</label>
                          <Select
                              isMulti
                              options={departmentOptions}
                              value={departments}
                            onChange={(newValue: MultiValue<{ value: string; label: string }>) => setDepartments(newValue ? [...newValue] : [])}
                              placeholder="Nothing selected"
                              closeMenuOnSelect={false}
                              isClearable
                          />
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <label className="form-label">Select Employee <span className="text-danger">*</span></label>
                              <Input value={employee} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee(e.target.value)} />
                          </div>
                          <div className="col-md-6">
                              <label className="form-label">Select Client <span className="text-danger">*</span></label>
                              <Input value={client} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClient(e.target.value)} />
                          </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-4">
                              <label className="form-label">Host</label>
                              <select className="form-select">
                                  <option>--</option>
                              </select>
                          </div>
                          <div className="col-md-4">
                              <label className="form-label">Status</label>
                              <div className="input-group">
                                  <span className="input-group-text" style={{ background: 'transparent', border: 'none', paddingRight: 10 }}>
                                      <span style={{
                                          display: 'inline-block',
                                          width: 16,
                                          height: 16,
                                          borderRadius: '50%',
                                          background: statusOptions.find(opt => opt.value === status)?.color || '#FFD600',
                                      }} />
                                  </span>
                                  <select
                                      className="form-select"
                                      value={status}
                                      onChange={e => setStatus(e.target.value)}
                                      style={{ paddingLeft: 10 }}
                                  >
                                      {statusOptions.map(opt => (
                                          <option key={opt.value} value={opt.value}>
                                              {opt.label}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                              <style>
                                  {`
                                      select.form-select option[value="Pending"] {
                                          background-image: linear-gradient(to left, #FFD600 12px, transparent 12px);
                                          background-repeat: no-repeat;
                                          padding-left: 20px;
                                      }
                                      select.form-select option[value="Completed"] {
                                          background-image: linear-gradient(to left, #00e600 12px, transparent 12px);
                                          background-repeat: no-repeat;
                                          padding-left: 20px;
                                      }
                                      select.form-select option[value="Cancelled"] {
                                          background-image: linear-gradient(to left, #ff0000 12px, transparent 12px);
                                          background-repeat: no-repeat;
                                          padding-left: 20px;
                                      }
                                  `}
                              </style>
                          </div>
                      </div>
                      <div className="row mb-3 align-items-center">
                          <div className="col-md-2">
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id="repeat" />
                                  <label className="form-check-label" htmlFor="repeat">Repeat</label>
                              </div>
                          </div>
                          <div className="col-md-2">
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id="reminder" />
                                  <label className="form-check-label" htmlFor="reminder">Send Reminder</label>
                              </div>
                          </div>
                          <div className="col-md-8">
                              <label className="form-label mb-0">Event Link</label>
                              <Input placeholder="e.g. https://www.example.com" />
                          </div>
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Add File</label>
                          <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                  border: '1px solid #e0e0e0',
                                  borderRadius: 6,
                                  height: 120,
                                  background: '#fafbfc',
                                  cursor: 'pointer'
                              }}
                              onClick={() => document.getElementById('event-upload-input')?.click()}
                          >
                              <input
                                  id="event-upload-input"
                                  type="file"
                                  style={{ display: 'none' }}
                              />
                              <span style={{ color: '#6c757d' }}>
                                  Choose a file
                              </span>
                          </div>
                      </div>
                  </div>
                  <div className="modal-footer">
                      <Button color="secondary" onClick={onClose}>Cancel</Button>
                      <Button color="primary" type="submit">Save</Button>
                  </div>
              </form>
          ]}
      </Modal>
    </>
  );
};

export default AddEventModal;