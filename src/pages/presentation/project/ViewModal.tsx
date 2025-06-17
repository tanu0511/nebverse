import React from 'react';

interface Project {
    projectName: string;
    members?: string;
    projectCategory: string;
    summary?: string;
    notes?: string;
}

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{project.projectName} - Details</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        {/* Tab navigation */}
                        <ul className="nav nav-tabs mb-4">
                            <li className="nav-item">
                                <span className="nav-link active" style={{ cursor: 'pointer' }}>Overview</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }}>Members</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }}>Tasks</span>
                            </li>
                        </ul>
                        {/* Project Description */}
                        <div className="mb-4">
                            <h6><b>Project Description</b></h6>
                            <div style={{ minHeight: 80, background: "#f8f9fa", padding: 16 }}>
                                {project.summary || <span className="text-muted">No description</span>}
                            </div>
                        </div>
                        {/* Project Note */}
                        <div>
                            <h6><b>Project Note</b></h6>
                            <div style={{ minHeight: 80, background: "#f8f9fa", padding: 16 }}>
                                {project.notes || <span className="text-muted">No note</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;