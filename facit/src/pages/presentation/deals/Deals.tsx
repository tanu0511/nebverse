/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import CreateProposalModal from './CreateProposalModal';
import ViewProposalModal from './ViewProposalModal';

interface TableRow {
    proposal: string;
    deals: string;
    contactName: string;
    date: string;
    validTill: string;
    status: string;
    items: any[];
    dealAgent?: string;
    dealWatcher?: string;
    dealStages?: string;
    dealValue?: number;
    proposalData?: any;
}

const Deals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<TableRow | null>(null);
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const handleView = (row: TableRow) => {
        setSelectedProposal(row);
        setIsViewModalOpen(true);
    };

    const handleDownload = (row: TableRow) => {
        alert(`Downloading proposal: ${row.proposal}`);
    };

    // Edit functionality: open modal with prefilled data
    const handleEdit = (row: TableRow, index: number) => {
        setEditIdx(index);
        setSelectedProposal(row);
        setIsModalOpen(true);
    };

    // Delete functionality
    const handleDelete = (index: number) => {
        if (window.confirm('Are you sure you want to delete this proposal?')) {
            setTableData((prev) => prev.filter((_, i) => i !== index));
            setEditIdx(null);
            setIsModalOpen(false);
            setIsViewModalOpen(false);
            setSelectedProposal(null);
        }
    };

    const handleActionChange = (action: string, row: TableRow, index: number) => {
        switch (action) {
            case 'view':
                handleView(row);
                break;
            case 'download':
                handleDownload(row);
                break;
            case 'edit':
                handleEdit(row, index);
                break;
            case 'delete':
                handleDelete(index);
                break;
            default:
                break;
        }
    };

    // Save handler for both add and edit
    const handleSave = (formData: any) => {
        const newRow: TableRow = {
            proposal: `Proposal#${editIdx !== null ? editIdx + 1 : tableData.length + 1}`,
            deals: formData.deal,
            contactName: formData.leadContacts,
            date: new Date().toLocaleDateString(),
            validTill: formData.validTill,
            status: formData.requireSignature ? 'Pending Signature' : 'Completed',
            items: formData.items || [],
            dealAgent: formData.dealAgent,
            dealWatcher: formData.dealWatcher,
            dealStages: formData.dealStages,
            dealValue: formData.dealValue,
            proposalData: formData,
        };
        if (editIdx !== null) {
            // Edit mode
            setTableData((prev) =>
                prev.map((row, idx) => (idx === editIdx ? newRow : row))
            );
            setEditIdx(null);
        } else {
            // Add mode
            setTableData((prev) => [...prev, newRow]);
        }
        setIsModalOpen(false);
        setSelectedProposal(null);
    };

    return (
        <PageWrapper title="Employee List">
            <Page>
                <div>
                    <div
                        className="alert py-2 px-3 mb-4"
                        style={{
                            borderRadius: '5px',
                            fontSize: '14px',
                            backgroundColor: '#c2edfa',
                        }}
                    >
                        Proposals are for Leads. If you want to create for existing clients, then create an Estimate.
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex gap-2">
                            <Button
                                color="primary"
                                onClick={() => {
                                    setEditIdx(null);
                                    setSelectedProposal(null);
                                    setIsModalOpen(true);
                                }}
                                hoverShadow="default"
                                icon="add"
                            >
                                Add Deal
                            </Button>
                            <Button color="secondary" hoverShadow="default" icon="ForwardToInbox">
                                Import
                            </Button>
                            <Button color="secondary" hoverShadow="default" icon="ForwardToInbox">
                                Exports
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="table-responsive" style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Deal Name</th>
                                <th>Lead Name</th>
                                <th>Contact Details</th>
                                <th>Value</th>
                                <th>Close Date</th>
                                <th>Next Follow Up</th>
                                <th>Deal Agent</th>
                                <th>Deal Watcher</th>
                                <th>Stage</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{row.proposal}</td>
                                        <td>{row.contactName}</td>
                                        <td></td>
                                        <td>
                                            {row.dealValue
                                                ? `${row.dealValue}`
                                                : '--'}
                                        </td>
                                        <td>{row.validTill}</td>
                                        <td>--</td>
                                        <td>{row.dealAgent || '--'}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src="/path/to/avatar.jpg"
                                                    alt="Watcher Avatar"
                                                    className="rounded-circle"
                                                    style={{ width: '30px', height: '30px' }}
                                                />
                                                <span>{row.dealWatcher || 'atharvraj singh rana'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    row.status === 'Lost'
                                                        ? 'bg-danger'
                                                        : row.status === 'Initial Contact'
                                                        ? 'bg-info'
                                                        : 'bg-success'
                                                }`}
                                            >
                                                {row.dealStages || row.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                onChange={(e) => {
                                                    handleActionChange(e.target.value, row, index);
                                                    e.target.selectedIndex = 0; // Reset to "Select Action" after action
                                                }}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select Action
                                                </option>
                                                <option value="view">View</option>
                                                <option value="edit">Edit</option>
                                                <option value="delete">Delete</option>
                                                <option value="followup">Add Follow Up</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="text-center">
                                        No data available in table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <CreateProposalModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    onSave={handleSave}
                    proposalData={editIdx !== null && tableData[editIdx] ? tableData[editIdx] : null}
                />
                <ViewProposalModal
                    isOpen={isViewModalOpen}
                    setIsOpen={setIsViewModalOpen}
                    proposalData={selectedProposal}
                />
            </Page>
        </PageWrapper>
    );
};

export default Deals;