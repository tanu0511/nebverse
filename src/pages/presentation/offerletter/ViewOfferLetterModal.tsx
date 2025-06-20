/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface OfferHistoryEntry {
  message: string;
  date: string; // ISO string or formatted
  user: string;
}

interface Offer {
  avatar?: string;
  applicant?: string;
  candidateName?: string;
  name?: string;
  candidatePhone?: string;
  candidateEmail?: string;
  job?: string;
  experience?: string;
  location?: string;
  department?: string;
  salary?: string;
  joiningDate?: string;
  expiry?: string;
  description?: string;
  status?: string;
  history?: OfferHistoryEntry[];
}

interface ViewOfferLetterModalProps {
  show: boolean;
  onClose: () => void;
  offer?: Offer;
}

const ViewOfferLetterModal = (props: ViewOfferLetterModalProps) => {
  const { show, onClose, offer } = props;
  if (!offer) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'additional' | 'history'>('details');

  // Format dates for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const displayName = offer.applicant || offer.candidateName || offer.name || '';

  // Get the badge color based on status
  const getStatusBadge = (status?: string) => {
    let color = '#6c757d'; // default gray
    if (status === 'Accepted') color = '#28a745';
    else if (status === 'Pending') color = '#ffc107';
    else if (status === 'Declined') color = '#dc3545';
    else if (status === 'Expired') color = '#fd2d09';
    else if (status === 'Withdraw') color = '#007bff';
    else if (status === 'Draft') color = '#545c63';
    return (
      <span
        style={{
          display: 'inline-block',
          background: color,
          color: '#fff',
          fontWeight: 600,
          borderRadius: 6,
          padding: '4px 16px',
          fontSize: 16,
          marginRight: 16,
          minWidth: 90,
          textAlign: 'center',
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="lg" isStaticBackdrop={true}>
      <ModalHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <h4>Offer Letters</h4>
          <Button color="light" onClick={onClose}>
            <Icon icon="Close" />
          </Button>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <img src={offer.avatar || '/avatar.png'} alt="avatar" style={{ width: 60, borderRadius: '50%' }} />
              <div>{displayName}</div>
              <div>{offer.candidatePhone}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              {getStatusBadge(offer.status)}
              <Button
                color="light"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = offer.avatar!;
                  link.download = offer.name || 'download';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Icon icon="Download" className="me-2" /> Download
              </Button>
            </div>
          </div>
          <div className="border-bottom mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link${activeTab === 'details' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link${activeTab === 'additional' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('additional')}
                >
                  Additional Informations
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link${activeTab === 'history' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <>
              <div className="row">
                <div className="col-md-12 md-5">
                  <h6>Candidate Details</h6>
                  <div><span className="text-muted">Name</span>: {offer.applicant}</div>
                  <div><span className="text-muted">Email</span>: {offer.candidateEmail}</div>
                </div>
                <div className="col-md-12 mt-5 md-5" >
                  <h6>Job Details</h6>
                  <div><span className="text-muted">Job Title</span>: {offer.job}</div>
                  <div><span className="text-muted">Work Experience</span>: {offer.experience}</div>
                  <div><span className="text-muted">Location</span>: {offer.location}</div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-md-12 mt-5">
                  <h6>Offer Details</h6>
                  <div className="row">
                    <div className="col-md-12">
                      <div><span className="text-muted">Department</span>: {offer.department}</div>
                      <div><span className="text-muted">Salary Offered</span>: {offer.salary}</div>
                      <div><span className="text-muted">Joining Date</span>: {formatDate(offer.joiningDate)}</div>
                    </div>
                    <div className="col-md-12">
                      <div><span className="text-muted">Last Date of Acceptance</span>: {formatDate(offer.expiry)}</div>
                      <div><span className="text-muted">Description</span>: {offer.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'additional' && (
            <div className="bg-white p-4" style={{ minHeight: 200 }}>
              <div className="row">
                <div className="col-12">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Questions</th>
                        <th>Answers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="text-center py-5">
                          <div>
                            <Icon icon="AccountCircle" style={{ fontSize: 32, color: '#b0b8c1' }} />
                          </div>
                          <div className="text-muted mt-2">- No record found. -</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white p-4" style={{ minHeight: 200 }}>
              {offer.history && offer.history.length > 0 ? (
                offer.history.slice().reverse().map((entry, idx) => (
                  <div key={idx} className="d-flex mb-3 align-items-start">
                    <img
                      src="/avatar.png"
                      alt="avatar"
                      style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }}
                    />
                    <div>
                      <div className="fw-semibold">{entry.message}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>
                        {new Date(entry.date).toLocaleString('en-GB', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })} {entry.user && `by ${entry.user}`}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted">No history available.</div>
              )}
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewOfferLetterModal;