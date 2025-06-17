import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';

const TicketPreviewForm = ({
  types,
  priorities,
  groups,
  showDescription = true,
  showType = true,
  showPriority = true,
  onSubmit,
}: any) => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    subject: '',
    description: '',
    type: '',
    priority: '',
    group: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Always send all fields, set hidden ones to ''
    const ticketToSave = {
      ...form,
      description: showDescription ? form.description : '',
      type: showType ? form.type : '',
      priority: showPriority ? form.priority : '',
      requester: form.name,
      subject: form.subject,
    };
    // You may want to do something with ticketToSave here, e.g., call onSubmit or setSuccess
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <div className="fw-bold mb-3">Preview</div>
        {success && (
          <div className="alert alert-success" role="alert">
            Ticket created successfully.
          </div>
        )}
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label>Email</label>
            <input className="form-control" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Ticket Subject</label>
            <input className="form-control" name="subject" value={form.subject} onChange={handleChange} />
          </div>
          {showDescription && (
            <div className="mb-3">
              <label>Ticket Description</label>
              <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
            </div>
          )}
          {showType && (
            <div className="mb-3">
              <label>Type</label>
              <select className="form-control" name="type" value={form.type} onChange={handleChange}>
                {types.length === 0 ? (
                  <option value="">--</option>
                ) : (
                  types.map((type: { id: string; name: string }) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
          {showPriority && (
            <div className="mb-3">
              <label>Priority</label>
              <select className="form-control" name="priority" value={form.priority} onChange={handleChange}>
                {priorities.length === 0 ? (
                  <option value="">--</option>
                ) : (
                  priorities.map((priority: string) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
          <div className="mb-3">
            <label>Assign Group</label>
            <select className="form-control" name="group" value={form.group} onChange={handleChange}>
              {groups.length === 0 ? (
                <option value="">--</option>
              ) : (
                groups.map((group: { id: string; name: string }) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="d-flex gap-2 mt-3">
            <Button color="primary" type="submit">
              <i className="fa fa-check me-2" />
              Save
            </Button>
            <Button
              color="secondary"
              isOutline
              type="button"
              onClick={() =>
                setForm({
                  email: '',
                  name: '',
                  subject: '',
                  description: '',
                  type: '',
                  priority: '',
                  group: '',
                })
              }
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </form>
  );
};

export default TicketPreviewForm;