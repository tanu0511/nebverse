/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import TicketPreviewForm from './TicketPreviewForm';
 // Add this import at the top if you use react-icons

export type TicketFormModalProps = {
  show: boolean;
  onHide: () => void;
  types: { id: number; name: string }[];
  priorities: string[];
  groups: { id: number; name: string }[];
  onSave: (ticket: any) => void;
};

const TicketFormModal: React.FC<TicketFormModalProps> = ({ show, onHide, types, priorities, groups, onSave }) => {
  // Toggle states for each field
  const [showDescription, setShowDescription] = useState(true);
  const [showType, setShowType] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  // Form state
  const [form, setForm] = useState({
    email: '',
    name: '',
    subject: '',
    description: '',
    type: '',
    priority: '',
    group: '',
  });

  // Tickets table state
  const [tickets, setTickets] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);



  return (
    <Modal isOpen={show} setIsOpen={onHide} size="xl" title={null} isStaticBackdrop>
      {[
        // Optional: Add a Modal.Header if your Modal component supports it
        // <Modal.Header key="header" onClose={onHide}>Create Ticket</Modal.Header>,
        <div>
          <div className="container-fluid py-4">
            <div style={{ position: 'absolute', top: 20, right: 30, zIndex: 10 }}>
              <button
                type="button"
                className="btn btn-link p-0"
                style={{ fontSize: 24, color: '#888' }}
                onClick={onHide}
                aria-label="Close"
              >
                <Icon icon='close' />
              </button>
            </div>
            <div className="row">
              {/* Fields Table with toggles */}
              <div className="col-md-6">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Field</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Name</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Email</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ticket Subject</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Ticket Description</td>
                  <td>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showDescription}
                    onChange={() => setShowDescription(v => !v)}
                    id="descSwitch"
                  />
                  <label className="form-check-label visually-hidden" htmlFor="descSwitch">
                    Toggle Ticket Description
                  </label>
                </div>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Type</td>
                  <td>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showType}
                    onChange={() => setShowType(v => !v)}
                    id="typeSwitch"
                  />
                  <label className="form-check-label visually-hidden" htmlFor="typeSwitch">
                    Toggle Type
                  </label>
                </div>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Priority</td>
                  <td>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showPriority}
                    onChange={() => setShowPriority(v => !v)}
                    id="prioritySwitch"
                  />
                  <label className="form-check-label visually-hidden" htmlFor="prioritySwitch">
                    Toggle Priority
                  </label>
                </div>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Assign Group</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
            <div className="col-md-12 mt-4">
    <div className="card p-3 mb-4">
      <div className="mb-2 fw-bold">
        Copy &amp; Paste the code anywhere in your site to show the form,<br />
        additionally you can adjust the width and height px to fit your website.
      </div>
      <pre style={{ background: "#fff0f0", padding: 10, borderRadius: 6, fontSize: 14 }}>
        {`<iframe src="https://nebverse.com/public/ticket-form/
        40e0f6ff11e87832a089641b4ba953f2" frameborder="0"
        scrolling="yes" style="display:block; width:100%; 
        height:60vh;"></iframe>`}
      </pre>
      <div className="mt-3 fw-bold">Share Direct link</div>
      <div>
        <a href="https://nebverse.com/public/ticket-form/40e0f6ff11e87832a089641b4ba953f2?styled=1" target="_blank" rel="noopener noreferrer">
          https://nebverse.com/public/ticket-form/40e0f6ff11e87832a089641b4ba953f2?styled=1
        </a>
        <br />
        <a href="https://nebverse.com/public/ticket-form/40e0f6ff11e87832a089641b4ba953f2?styled=1&with_logo=1" target="_blank" rel="noopener noreferrer">
          https://nebverse.com/public/ticket-form/40e0f6ff11e87832a089641b4ba953f2?styled=1&amp;with_logo=1
        </a>
      </div>
    </div>
  </div>
            </div>
            <div className="col-md-6">
  <TicketPreviewForm
  types={types}
  priorities={priorities}
  groups={groups}
  showDescription={showDescription}
  showType={showType}
  showPriority={showPriority}
/>
  </div>
              {/* Preview Form */}
         
            </div>
          </div>
          <div className="row">
</div>
        </div>
      ]}
    </Modal>
  );
};

export default TicketFormModal;