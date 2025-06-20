/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Proposal from '../proposal/Proposal';
import NotePage from '../document/NotePage';
import Followup from './Followup';

const TAB_KEYS = ['files', 'followup', 'proposal', 'notes', 'history'];

const DealViewPage: React.FC = () => {
  const { state } = useLocation();
  const deal = state?.deal?.proposalData || state?.deal || state?.proposalData;
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState('files');
  const navigate = useNavigate();

  if (!deal) return <div className="p-4">No deal data found.</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileSave = () => {
    if (selectedFile) {
      setUploadedFiles(prev => [...prev, selectedFile]);
      setIsFileModalOpen(false);
      setSelectedFile(null);
    }
  };

  const handleFileDelete = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Tab navigation handlers
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid p-4">
      <div className="mb-3">
        <span className="fw-bold fs-4">{deal.deal || deal.proposal || 'Deal Details'}</span>
        <span className="ms-2 text-muted"> {deal.deal || deal.proposal}</span>
      </div>
      <div className="row">
        {/* Deal Info Card */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3 d-flex align-items-center gap-2">
                <span className="fw-bold">Sales Pipeline</span>
                <span className="mx-2">→</span>
                <span className="fw-bold">
                  {deal.dealStages === 'Generated' && (
                    <span className="text-warning"><i className="bi bi-dot" /> Generated</span>
                  )}
                  {deal.dealStages === 'Qualified' && (
                    <span className="text-primary"><i className="bi bi-dot" /> Qualified</span>
                  )}
                  {deal.dealStages === 'Initial Contact' && (
                    <span className="text-success"><i className="bi bi-dot" /> Initial Contact</span>
                  )}
                  {deal.dealStages === 'Schedule Appointment' && (
                    <span className="text-info"><i className="bi bi-dot" /> Schedule Appointment</span>
                  )}
                  {deal.dealStages === 'Proposal Sent' && (
                    <span className="text-warning"><i className="bi bi-dot" /> Proposal Sent</span>
                  )}
                  {deal.dealStages === 'Win' && (
                    <span className="text-success"><i className="bi bi-dot" /> Win</span>
                  )}
                  {deal.dealStages === 'Lost' && (
                    <span className="text-danger"><i className="bi bi-dot" /> Lost</span>
                  )}
                </span>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="mb-2"><strong>Deal Name</strong></div>
                  <div>{deal.deal || '--'}</div>
                </div>
                <div className="col-6">
                  <div className="mb-2"><strong>Lead Contact</strong></div>
                  <div>{deal.contactName || '--'}</div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="mb-2"><strong>Email</strong></div>
                  <div>{deal.email || '--'}</div>
                </div>
                <div className="col-6">
                  <div className="mb-2"><strong>Company Name</strong></div>
                  <div>{deal.companyName || '--'}</div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="mb-2"><strong>Deal Category</strong></div>
                  <div>{deal.dealCategory || '--'}</div>
                </div>
                <div className="col-6">
                  <div className="mb-2"><strong>Deal Agent</strong></div>
                  <div>{deal.dealAgent || '--'}</div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="mb-2"><strong>Deal Watcher</strong></div>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="/path/to/avatar.jpg"
                      alt="Watcher Avatar"
                      className="rounded-circle"
                      style={{ width: '30px', height: '30px' }} />
                    <span>
                      {deal.dealWatcher || 'atharvraj singh rana'}{' '}
                      <span className="badge bg-light text-dark ms-1">It's you</span>
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2"><strong>Close Date</strong></div>
                  <div>
                    {deal.validTill
                      ? new Date(deal.validTill).toLocaleDateString(undefined, {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                      : '--'}
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="mb-2"><strong>Deal Value</strong></div>
                  <div>
                    {deal.currency || '₹'}
                    {deal.dealValue ? Number(deal.dealValue).toFixed(2) : '0.00'}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2"><strong>Products</strong></div>
                  <div>{deal.products || '--'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lead Contact Detail Card */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header fw-bold">Lead Contact Detail</div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Lead</strong>
                <div>{deal.contactName || '--'}</div>
              </div>
              <div className="mb-2">
                <strong>Email</strong>
                <div>{deal.email || '--'}</div>
              </div>
              <div className="mb-2">
                <strong>Mobile</strong>
                <div>{deal.mobile || '--'}</div>
              </div>
              <div className="mb-2">
                <strong>Company Name</strong>
                <div>{deal.companyName || '--'}</div>
              </div>
              <Button color="light" className="mt-2">
                <i className="bi bi-envelope me-2" />Email
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Section Below Deal Info */}
      <div className="card mt-3">
        <div className="card-body p-0">
          <ul className="nav nav-tabs px-3 pt-3" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === 'files' ? ' active' : ''}`}
                type="button"
                onClick={() => handleTabClick('files')}
              >
                Files
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === 'followup' ? ' active' : ''}`}
                type="button"
                onClick={() => handleTabClick('followup')}
              >
                Follow Up
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === 'proposal' ? ' active' : ''}`}
                type="button"
                onClick={() => handleTabClick('proposal')}
              >
                Proposal
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === 'notes' ? ' active' : ''}`}
                type="button"
                onClick={() => handleTabClick('notes')}
              >
                Notes
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === 'history' ? ' active' : ''}`}
                type="button"
                onClick={() => handleTabClick('history')}
              >
                History
              </button>
            </li>
          </ul>
          <div className="tab-content p-4" style={{ minHeight: 200 }}>
            {activeTab === 'files' && (
              <div>
                <button
                  type="button"
                  className="text-primary d-inline-flex align-items-center mb-3 btn btn-link p-0"
                  onClick={() => setIsFileModalOpen(true)}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-plus-circle me-2" /> Upload File
                </button>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center mt-5">
                    <i className="bi bi-file-earmark-excel" style={{ fontSize: 40, color: '#bdbdbd' }} />
                    <div className="text-muted mt-2">- No file uploaded. -</div>
                  </div>
                ) : (
                  <ul className="list-group">
                    {uploadedFiles.map((file, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          <i className="bi bi-paperclip me-2" />
                          {file.name}
                        </span>
                        <Button color="danger" size="sm" onClick={() => handleFileDelete(idx)}>
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {activeTab === 'followup' && (
              <Followup />
            )}
            {activeTab === 'proposal' && (
              <Proposal />
            )}
            {activeTab === 'notes' && (
              <NotePage />
            )}
            {activeTab === 'history' && (
              <div>
                {/* History tab content here */}
                <p>History content goes here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Files Modal */}
      {isFileModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Files</h5>
                <button type="button" className="btn-close" onClick={() => setIsFileModalOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Add File <span className="text-danger">*</span>
                  </label>
                  <div
                    className="border rounded d-flex align-items-center justify-content-center"
                    style={{ height: 120, cursor: 'pointer', background: '#fafbfc' }}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <span className="text-muted">
                      {selectedFile ? selectedFile.name : 'Choose a file'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button color="secondary" onClick={() => setIsFileModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleFileSave}
                  isDisable={!selectedFile}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealViewPage;
