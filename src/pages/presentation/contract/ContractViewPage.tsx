import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Document from '../document/Document';
import Discussion from '../document/Discussion';
import ContractRenew from './ContractRenew';
const TABS = [
    'Summary', 'Discussion', 'Contract Files', 'Contract Renewal History', 
];

const ContractViewPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Profile');
    const contract = location.state?.contract;

    if (!contract) {
        return (
            <div className="container mt-4">
                <h4>No contract data found.</h4>
                <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Contract Details</h2>
            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-4">
                {TABS.map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link${activeTab === tab ? ' active' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Profile Tab Styled Like Screenshot */}
            {activeTab === 'Profile' && (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            {/* Left: Logo and Client Info */}
                            <div className="col-md-8 d-flex flex-column align-items-start">
                                <img
                                    src={contract.logoUrl || "/logo192.png"}
                                    alt="Logo"
                                    style={{ width: 80, borderRadius: '50%', marginBottom: 16 }}
                                />
                                <div className="mb-2">
                                    <div>{contract.firstName || 'nisha'}</div>
                                    <div>{contract.lastName || 'rana'}</div>
                                    <div>{contract.phone || contract.clientPhone || '8770099047'}</div>
                                </div>
                                <div className="mt-3 mb-2">
                                    <div className="text-muted">Client</div>
                                    <div>{contract.clientName || contract.client || '--'}</div>
                                    <div>{contract.companyName || contract.clientCompany || '--'}</div>
                                </div>
                                <div className="mt-4">
                                    <div className="fw-bold mb-1">Subject</div>
                                    <div>{contract.subject || '--'}</div>
                                </div>
                                <div className="mt-3">
                                    <div className="fw-bold mb-1">Notes</div>
                                    <div>{contract.notes || '--'}</div>
                                </div>
                                <div className="mt-3">
                                    <div className="fw-bold mb-1">Description</div>
                                    <div>{contract.description || '--'}</div>
                                </div>
                            </div>
                            {/* Right: Contract Info Table */}
                            <div className="col-md-4 d-flex flex-column align-items-end">
                                <h3 className="fw-bold mb-4">CONTRACT</h3>
                                <table className="table table-bordered w-auto">
                                    <tbody>
                                        <tr>
                                            <td><strong>Contract Number</strong></td>
                                            <td>{contract.contractNumber || '--'}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Start Date</strong></td>
                                            <td>
                                                {contract.startDate
                                                    ? new Date(contract.startDate).toDateString()
                                                    : '--'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>End Date</strong></td>
                                            <td>
                                                {contract.endDate
                                                    ? new Date(contract.endDate).toDateString()
                                                    : '--'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Contract Type</strong></td>
                                            <td>{contract.contractType || '--'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Signature Section */}
                        {contract.signature && (
                            <div className="mt-4">
                                <h5>Company Signature</h5>
                                <img
                                    src={contract.signature.image}
                                    alt="Signature"
                                    style={{ width: 150, border: '1px solid #eee', background: '#fff', display: 'block' }}
                                />
                                <div className="text-muted mt-2">
                                    Date: {contract.signature.date ? new Date(contract.signature.date).toLocaleString() : '--'}
                                </div>
                                <div className="text-muted">
                                    Sign By: {contract.signature.signer || '--'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Other Tabs */}
            {activeTab === 'Contract Files' && (
                  <Document/>
            )}
            {
                activeTab=== 'Discussion' && (
                 <Discussion />
                )
            }
            {
                activeTab === 'Contract Renewal History' && (
                    <ContractRenew/>
                )
            }

            <div className="mt-4">
                <Button color="secondary" isOutline onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default ContractViewPage;
