import React, { useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import { useNavigate } from 'react-router-dom';

    
interface ViewProposalModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    proposalData: any;
}

const ViewProposalModal: React.FC<ViewProposalModalProps> = ({
    isOpen,
    setIsOpen,
    proposalData,
}) => {
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // <-- NEW
    const navigate = useNavigate();

    if (!proposalData) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileSave = () => {
        if (selectedFile) {
            setUploadedFiles(prev => [...prev, selectedFile]); // <-- Add file to state
            setIsFileModalOpen(false);
            setSelectedFile(null);
        }
    };

    
    const handleFileDelete = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };
  

    const goToFollowUp = () => {
        navigate('/followup');
    };

    const goToProposal = () => {
        navigate('/proposal');
    }; 

    const goToNotes = () => {
        navigate('/notes');
    };

    const goToHistory = () => {
        navigate('/history');
    };
    return (


        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop={true} size="lg">
                <ModalHeader setIsOpen={setIsOpen}>
                    <ModalTitle id="proposal-details-title">{proposalData.deal || proposalData.proposal}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        {/* Deal Info Card */}
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="mb-3 d-flex align-items-center gap-2">
                                        <span className="fw-bold">Sales Pipeline</span>
                                        <span className="mx-2">→</span>
                                        <span className="fw-bold">
                                            {proposalData.dealStages === 'Generated' && (
                                                <span className="text-warning">
                                                    <i className="bi bi-dot" /> Generated
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Qualified' && (
                                                <span className="text-primary">
                                                    <i className="bi bi-dot" /> Qualified
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Initial Contact' && (
                                                <span className="text-success">
                                                    <i className="bi bi-dot" /> Initial Contact
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Schedule Appointment' && (
                                                <span className="text-info">
                                                    <i className="bi bi-dot" /> Schedule Appointment
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Proposal Sent' && (
                                                <span className="text-warning">
                                                    <i className="bi bi-dot" /> Proposal Sent
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Win' && (
                                                <span className="text-success">
                                                    <i className="bi bi-dot" /> Win
                                                </span>
                                            )}
                                            {proposalData.dealStages === 'Lost' && (
                                                <span className="text-danger">
                                                    <i className="bi bi-dot" /> Lost
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Deal Name</strong></div>
                                            <div>{proposalData.deal || '--'}</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Lead Contact</strong></div>
                                            <div>{proposalData.contactName || '--'}</div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Email</strong></div>
                                            <div>{proposalData.email || '--'}</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Company Name</strong></div>
                                            <div>{proposalData.companyName || '--'}</div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Deal Category</strong></div>
                                            <div>{proposalData.dealCategory || '--'}</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Deal Agent</strong></div>
                                            <div>{proposalData.dealAgent || '--'}</div>
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
                                                    style={{ width: '30px', height: '30px' }}
                                                />
                                                <span>
                                                    {proposalData.dealWatcher || 'atharvraj singh rana'}{' '}
                                                    <span className="badge bg-light text-dark ms-1">It's you</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Close Date</strong></div>
                                            <div>
                                                {proposalData.validTill
                                                    ? new Date(proposalData.validTill).toLocaleDateString(undefined, {
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
                                                {proposalData.currency || '₹'}
                                                {proposalData.dealValue ? Number(proposalData.dealValue).toFixed(2) : '0.00'}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2"><strong>Products</strong></div>
                                            <div>{proposalData.products || '--'}</div>
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
                                        <div>{proposalData.contactName || '--'}</div>
                                    </div>
                                    <div className="mb-2">
                                        <strong>Email</strong>
                                        <div>{proposalData.email || '--'}</div>
                                    </div>
                                    <div className="mb-2">
                                        <strong>Mobile</strong>
                                        <div>{proposalData.mobile || '--'}</div>
                                    </div>
                                    <div className="mb-2">
                                        <strong>Company Name</strong>
                                        <div>{proposalData.companyName || '--'}</div>
                                    </div>
                                    <Button color="light" className="mt-2">
                                        <i className="bi bi-envelope me-2" />Email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                {/* Tabs Section Below Deal Info */}
                <div className="card mt-3">
                    <div className="card-body p-0">
                        <ul className="nav nav-tabs px-3 pt-3" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="files-tab" data-bs-toggle="tab" data-bs-target="#files" type="button" role="tab">
                                    Files
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="followup-tab" data-bs-toggle="tab" data-bs-target="#followup" type="button" role="tab" onClick={goToFollowUp}>
                                    Follow Up
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="proposal-tab" data-bs-toggle="tab" data-bs-target="#proposal" type="button" role="tab" onClick={goToProposal} >
                                    Proposal
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="notes-tab" data-bs-toggle="tab" data-bs-target="#notes" type="button" role="tab" onClick={goToNotes}>
                                    Notes
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" onClick={goToHistory}>
                                    History
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content p-4" style={{ minHeight: 200 }}>
                            <div className="tab-pane fade show active" id="files" role="tabpanel">
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
                            </div>
                          
                            
                        </div>
                    </div>
                </div>
                {/* Add Files Modal */}
                <ModalFooter>
                    <Button color="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={isFileModalOpen} setIsOpen={setIsFileModalOpen}>
                <ModalHeader setIsOpen={setIsFileModalOpen}>
                    <ModalTitle id="">Add Files</ModalTitle>
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ViewProposalModal;