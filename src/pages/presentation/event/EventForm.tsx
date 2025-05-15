/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

const defaultValues = {
  name: '',
  labelColor: '#11AEED',
  where: '',
  description: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  department: [] as string[],
  employee: '',
  client: '',
  host: '',
  status: 'Pending',
  sendReminder: false,
  eventLink: '',
  file: null as File | null,
};

const departments = ['HR', 'ADMIN', 'FRONTEND DEVELOPER', 'BACKEND DEVELOPER', 'bkkmnl'];
const employees = ['TANUSHREE WAGHMARE'];
const clients = ['aaaaa'];
const statuses = [
  { value: 'Pending', label: 'Pending', color: '#ffc107' },
  { value: 'Completed', label: 'Completed', color: '#28e60b' },
];

interface EventFormProps {
  initialValues: Omit<typeof defaultValues, 'file'> & { file: File | null };
  onSubmit: (form: typeof defaultValues) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues });

  useEffect(() => {
    setForm({ ...defaultValues, ...initialValues });
  }, [initialValues]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setForm(f => ({ ...f, file }));
  };

  // Handle department selection (multi-select)
  const toggleDepartment = (dept: string) => {
    setForm(f => ({
      ...f,
      department: f.department.includes(dept)
        ? f.department.filter(d => d !== dept)
        : [...f.department, dept],
    }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <div className="row g-3">
        {/* Event Name */}
        <div className="col-md-4">
          <label className="form-label">Event Name *</label>
          <input className="form-control" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </div>
        {/* Label Color */}
        <div className="col-md-4">
          <label className="form-label">Label Color *</label>
          <input type="color" className="form-control form-control-color" value={form.labelColor} onChange={e => setForm(f => ({ ...f, labelColor: e.target.value }))} />
        </div>
        {/* Where */}
        <div className="col-md-4">
          <label className="form-label">Where *</label>
          <input className="form-control" value={form.where} onChange={e => setForm(f => ({ ...f, where: e.target.value }))} required />
        </div>
        {/* Description */}
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        {/* Dates and Times */}
        <div className="col-md-3">
          <label className="form-label">Starts On Date *</label>
          <input type="date" className="form-control" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Starts On Time *</label>
          <input type="time" className="form-control" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Ends On Date *</label>
          <input type="date" className="form-control" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Ends On Time *</label>
          <input type="time" className="form-control" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} required />
        </div>
        {/* Department */}
        <div className="col-12">
          <label className="form-label">Department</label>
          <div>
            {departments.map(dept => (
              <button
                type="button"
                key={dept}
                className={`btn btn-sm me-2 mb-2 ${form.department.includes(dept) ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => toggleDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        {/* Select Employee */}
        <div className="col-md-6">
          <label className="form-label">Select Employee *</label>
          <select className="form-select" value={form.employee} onChange={e => setForm(f => ({ ...f, employee: e.target.value }))} required>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>
        {/* Select Client */}
        <div className="col-md-6">
          <label className="form-label">Select Client</label>
          <select className="form-select" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}>
            <option value="">Select Client</option>
            {clients.map(cli => (
              <option key={cli} value={cli}>{cli}</option>
            ))}
          </select>
        </div>
        {/* Host */}
        <div className="col-md-6">
          <label className="form-label">Host</label>
          <select className="form-select" value={form.host} onChange={e => setForm(f => ({ ...f, host: e.target.value }))}>
            <option value="">Select Host</option>
            {employees.map(emp => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>
        {/* Status */}
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
            {statuses.map(stat => (
              <option key={stat.value} value={stat.value}>{stat.label}</option>
            ))}
          </select>
        </div>
        {/* Send Reminder */}
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={form.sendReminder} onChange={e => setForm(f => ({ ...f, sendReminder: e.target.checked }))} id="sendReminder" />
            <label className="form-check-label" htmlFor="sendReminder">Send Reminder</label>
          </div>
        </div>
        {/* Event Link */}
        <div className="col-12">
          <label className="form-label">Event Link</label>
          <input className="form-control" value={form.eventLink} onChange={e => setForm(f => ({ ...f, eventLink: e.target.value }))} placeholder="e.g. https://www.example.com" />
        </div>
        {/* Upload File */}
        <div className="col-12">
          <label className="form-label">Upload File</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
          {form.file && <div className="mt-2">{form.file.name}</div>}
        </div>
        {/* Buttons */}
        <div className="col-12 d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-info">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;