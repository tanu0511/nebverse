import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

const EventDetailPage = ({ event, onClose, onDelete, onEdit }: { event: any, onClose: () => void, onDelete: (event: any) => void, onEdit: () => void }) => {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [completeNote, setCompleteNote] = useState(event.completeNote || '');
  const [cancelNote, setCancelNote] = useState(event.cancelNote || '');
  const [noteInput, setNoteInput] = useState('');
  const [status, setStatus] = useState(event.status);

  if (!event) return null;

  const showActionButtons = status !== 'Completed' && status !== 'Cancelled';

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
        {showActionButtons && (
          <>
            <Button color="primary" className="me-2" onClick={() => { setNoteInput(''); setShowCompleteModal(true); }}>
              <i className="fa fa-check me-1" /> Mark Complete
            </Button>
            <Button color="light" className="border me-2" onClick={() => { setNoteInput(''); setShowCancelModal(true); }}>
              <Icon icon='Edit' /> Mark Canceled
            </Button>
          </>
        )}
        <Button color="primary" className="me-2" onClick={onEdit}>
          <i className="fa fa-edit me-1" /> Edit
        </Button>
        <Button
          color="danger"
          className="me-2"
          onClick={() => {
            onDelete(event);
            onClose();
          }}
        >
          <i className="fa fa-trash me-1" /> Delete
        </Button>
        <Button color="secondary" onClick={onClose}>
          <i className="fa fa-arrow-left me-1" /> Back
        </Button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Event Name</div>
            <div className="col-md-9">{event.title || event.name}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Attendees Employee</div>
            <div className="col-md-9">
              <i className="fa fa-user-circle" style={{ fontSize: 22, color: '#ccc' }} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Attendees Clients</div>
            <div className="col-md-9">
              <i className="fa fa-user-circle" style={{ fontSize: 22, color: '#ccc' }} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Host</div>
            <div className="col-md-9">{event.host || '--'}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Description</div>
            <div className="col-md-9">{event.description}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Where</div>
            <div className="col-md-9">{event.where}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Department</div>
            <div className="col-md-9">
              {event.departments && Array.isArray(event.departments)
                ? event.departments.map((d: any) => d.label || d.value).join(', ')
                : ''}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Select Employee</div>
            <div className="col-md-9">{event.employee || ''}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Select Client</div>
            <div className="col-md-9">{event.client || ''}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Start On</div>
            <div className="col-md-9">
              {event.start ? new Date(event.start).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">End On</div>
            <div className="col-md-9">
              {event.end ? new Date(event.end).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Status</div>
            <div className="col-md-9">
              <span style={{ color: status === 'Pending' ? '#FFD600' : status === 'Completed' ? '#00e600' : '#ff0000', marginRight: 8 }}>●</span>
              {status}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Event Link</div>
            <div className="col-md-9">{event.eventLink || ''}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Repeat</div>
            <div className="col-md-9">{event.repeat ? 'Yes' : 'No'}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Send Reminder</div>
            <div className="col-md-9">{event.reminder ? 'Yes' : 'No'}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Label Color</div>
            <div className="col-md-9">
              {event.labelColor && (
                <span style={{
                  display: 'inline-block',
                  width: 20,
                  height: 20,
                  background: event.labelColor,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginRight: 8
                }} />
              )}
              {event.labelColor}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3 text-muted">Add File</div>
            <div className="col-md-9">{event.fileName || ''}</div>
          </div>
          {completeNote && (
            <div className="row mb-2">
              <div className="col-md-3 text-muted">Note</div>
              <div className="col-md-9">{completeNote}</div>
            </div>
          )}
          {cancelNote && (
            <div className="row mb-2">
              <div className="col-md-3 text-muted">Note</div>
              <div className="col-md-9">{cancelNote}</div>
            </div>
          )}
        </div>
      </div>
      {showCompleteModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 8,
            width: 500,
            maxWidth: '90vw',
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
            padding: 24,
            position: 'relative'
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Event Complete Note</h5>
              <button className="btn-close" onClick={() => setShowCompleteModal(false)} />
            </div>
            <div className="mb-3">
              <label>Note</label>
              <textarea
                className="form-control"
                rows={4}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button color="light" onClick={() => setShowCompleteModal(false)}>Cancel</Button>
              <Button color="primary" onClick={() => {
                setCompleteNote(noteInput);
                setStatus('Completed');
                setShowCompleteModal(false);
              }}>
                <i className="fa fa-check me-1" /> Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {showCancelModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 8,
            width: 500,
            maxWidth: '90vw',
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
            padding: 24,
            position: 'relative'
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Event Cancel Note</h5>
              <button className="btn-close" onClick={() => setShowCancelModal(false)} />
            </div>
            <div className="mb-3">
              <label>Note</label>
              <textarea
                className="form-control"
                rows={4}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button color="light" onClick={() => setShowCancelModal(false)}>Cancel</Button>
              <Button color="primary" onClick={() => {
                setCancelNote(noteInput);
                setStatus('Cancelled');
                setShowCancelModal(false);
              }}>
                <i className="fa fa-check me-1" /> Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;