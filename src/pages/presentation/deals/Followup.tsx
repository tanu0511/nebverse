/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Icon from '../../../components/icon/Icon';
import FollowupModal from './FollowupModal';

const Followup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [followUps, setFollowUps] = useState<any[]>([]);
    const [form, setForm] = useState({
        leadName: 'Mr atrava',
        date: '',
        time: '',
        sendReminder: false,
        remark: '',
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [actionMenuIdx, setActionMenuIdx] = useState<number | null>(null);

    const handleOpenModal = () => {
        setForm({
            leadName: 'Mr atrava',
            date: '',
            time: '',
            sendReminder: false,
            remark: '',
        });
        setEditIndex(null);
        setIsModalOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
        if (editIndex !== null) {
            // Edit mode
            setFollowUps(prev =>
                prev.map((item, idx) =>
                    idx === editIndex
                        ? {
                              ...item,
                              next: form.date,
                              time: form.time,
                              remark: form.remark,
                              status: form.sendReminder ? 'Reminder Set' : 'Pending',
                          }
                        : item
                )
            );
        } else {
            // Add mode
            setFollowUps(prev => [
                ...prev,
                {
                    created: new Date().toLocaleString(),
                    next: form.date,
                    time: form.time,
                    remark: form.remark,
                    status: form.sendReminder ? 'Reminder Set' : 'Pending',
                },
            ]);
        }
        setIsModalOpen(false);
        setEditIndex(null);
    };

    const handleEdit = (idx: number) => {
        const item = followUps[idx];
        setForm({
            leadName: 'Mr atrava',
            date: item.next,
            time: item.time,
            sendReminder: item.status === 'Reminder Set',
            remark: item.remark,
        });
        setEditIndex(idx);
        setIsModalOpen(true);
        setActionMenuIdx(null);
    };

    const handleDelete = (idx: number) => {
        setFollowUps(prev => prev.filter((_, i) => i !== idx));
        setActionMenuIdx(null);
    };

    // For closing action menu on outside click
    React.useEffect(() => {
        const closeMenu = () => setActionMenuIdx(null);
        if (actionMenuIdx !== null) {
            window.addEventListener('click', closeMenu);
            return () => window.removeEventListener('click', closeMenu);
        }
    }, [actionMenuIdx]);

    return (
        <PageWrapper title="Follow Up">
            <Page>
                <div className="container-fluid">
                    <div className="mb-3">
                        <a
                            href="#"
                            className="text-primary d-inline-flex align-items-center"
                            style={{ fontSize: 16, textDecoration: 'none' }}
                            onClick={e => { e.preventDefault(); handleOpenModal(); }}
                        >
                            <Icon icon="Add" className="me-1" />
                            New Follow Up
                        </a>
                    </div>
                    <div className="card">
                        <div className="card-body p-0">
                            <table className="table mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Created</th>
                                        <th>Next Follow Up</th>
                                        <th>Remark</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followUps.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-5">
                                                <Icon icon="Info" className="text-muted mb-2" style={{ fontSize: 24 }} />
                                                <div className="text-muted mt-2">- No record found. -</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        followUps.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.created}</td>
                                                <td>
                                                    {item.next} {item.time && <span className="text-muted">{item.time}</span>}
                                                </td>
                                                <td>{item.remark}</td>
                                                <td>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                        <span
                                                            style={{
                                                                display: 'inline-block',
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: '50%',
                                                                background: item.status === 'Pending' ? '#ffc107' : '#0d6efd',
                                                                marginRight: 6,
                                                            }}
                                                         />
                                                        {item.status}
                                                    </span>
                                                </td>
												<td style={{ minWidth: 140 }}>
    <select
        className="form-select"
        style={{ width: 'auto', display: 'inline-block' }}
        onChange={e => {
            const value = e.target.value;
            if (value === 'edit') handleEdit(idx);
            if (value === 'delete') handleDelete(idx);
            // Add more actions as needed
            e.target.selectedIndex = 0; // Reset to "Select Action"
        }}
        defaultValue=""
    >
        <option value="" disabled>
            Select Action
        </option>
        <option value="edit">Edit</option>
        <option value="delete">Delete</option>
    </select>
</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Follow Up Modal */}
                <FollowupModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    form={form}
                    onChange={handleChange}
                    onSave={handleSave}
                    editIndex={editIndex}
                />
            </Page>
        </PageWrapper>
    );
};

export default Followup;