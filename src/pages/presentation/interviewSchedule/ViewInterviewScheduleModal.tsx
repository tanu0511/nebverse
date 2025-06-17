import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: any;
  onEdit?: (data: any) => void;
  onReschedule?: (data: any) => void;
  onDelete?: (data: any) => void; 
};

const ViewInterviewScheduleModal: React.FC<Props> = ({ isOpen, setIsOpen, data }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'evaluations' | 'history'>('files');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState(data?.status || 'Pending'); // <-- Add this line

  if (!data) return null; // <-- Move this after hooks

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <div className="modal-header">
        <h5 className="modal-title">Interview Details</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <div className="row">
          {/* Left: Candidate Details */}
          <div className="col-md-8">
            <h4 className="mb-3">{data.candidate}</h4>
            <div className="mb-2"><strong>Job:</strong> {data.job || '--'}</div>
            <div className="mb-2"><strong>Candidate Name:</strong> {data.candidate}</div>
            <div className="mb-2"><strong>Candidate Email:</strong> {data.email || '--'}</div>
            <div className="mb-2"><strong>Phone:</strong> {data.phone || '--'}</div>
            <div className="mb-2"><strong>Comment:</strong> {data.comment || '--'}</div>
            <div className="mb-2"><strong>Resume:</strong> {data.resume ? <a href={data.resume} target="_blank" rel="noopener noreferrer">View</a> : '--'}</div>
          </div>
          {/* Right: Interview Round Details */}
          <div className="col-md-4">
            <div className="card p-3" style={{ borderRadius: 8, border: '1px solid #eee' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Interview Rounds</h6>
                <span className="text-warning" style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: status === 'Completed' ? '#007bff' : '#ffc107', // <-- Change color if completed
                    marginRight: 6
                  }} />
                  {status}
                </span>
              </div>
              <div className="fw-bold mb-2">{data.round || '--'}</div>
              <div className="d-flex align-items-center mb-3" style={{ position: 'relative' }}>
                <Button
                  color="primary"
                  size="sm"
                  style={{ minWidth: 140 }}
                  onClick={() => setStatus('Completed')} // <-- Update status on click
                  isDisable={status === 'Completed'} // Optional: disable if already completed
                >
                  <span className="me-2" style={{ fontSize: 16 }}>✔</span> Mark As Completed
                </Button>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-muted" style={{ fontSize: 13 }}>Start On</div>
                <div className="col-6 text-end" style={{ fontSize: 13 }}>
                  {data.startOn} {data.startTime && `- ${data.startTime}`}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-muted" style={{ fontSize: 13 }}>Interview Type</div>
                <div className="col-6 text-end" style={{ fontSize: 13 }}>{data.interviewType || '--'}</div>
              </div>
              <div className="row">
                <div className="col-12" style={{ fontSize: 13 }}>
                  <span className="text-muted">Assigned Interviewer</span><br />
                  <span>{data.interviewer || '--'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="mt-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link${activeTab === 'files' ? ' active' : ''}`}
                onClick={() => setActiveTab('files')}
                type="button"
              >
                Files
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link${activeTab === 'evaluations' ? ' active' : ''}`}
                onClick={() => setActiveTab('evaluations')}
                type="button"
              >
                Evaluations
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link${activeTab === 'history' ? ' active' : ''}`}
                onClick={() => setActiveTab('history')}
                type="button"
              >
                History
              </button>
            </li>
          </ul>
          <div className="tab-content p-4 border border-top-0 rounded-bottom" style={{ minHeight: 150 }}>
            {activeTab === 'files' && (
              <div>
                <label className="btn btn-link" style={{ cursor: 'pointer' }}>
                  <span className="me-2">+</span>Upload File
                  <input
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange} />
                </label>
                {files.length === 0 ? (
                  <div className="text-center mt-4" style={{ color: '#888' }}>
                    - No file uploaded. -
                  </div>
                ) : (
                  <ul className="list-group mt-3">
                    {files.map((file, idx) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                        <span>{file.name}</span>
                        <Button color="danger" size="sm" onClick={() => handleRemoveFile(idx)}>
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {activeTab === 'evaluations' && (
              <div>
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead style={{ background: "#f5f6fa" }}>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Candidate</th>
                      <th>Submitted By</th>
                      <th>Status</th>
                      <th>Interview Rounds</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="text-center py-5" style={{ color: "#888" }}>
                        <div>
                          <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>
                            <i className="bi bi-clock-history" />
                          </span>
                          - No record found. Evaluation can be added by an interviewer once the interview round is marked as completed. -
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'history' && (
              <div>
                <div className="text-center mt-4" style={{ color: '#888' }}>
                  - No history available. -
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <Button color="primary" type="button" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ViewInterviewScheduleModal;