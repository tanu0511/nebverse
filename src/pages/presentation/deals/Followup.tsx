/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Icon from '../../../components/icon/Icon';
import FollowupModal from './FollowupModal';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Input from '../../../components/bootstrap/forms/Input';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtered followUps by search
    const filteredFollowUps = followUps.filter(
        (item) =>
            item.leadName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.remark?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        const item = filteredFollowUps[idx];
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
        const globalIdx = (currentPage - 1) * perPage + idx;
        setFollowUps(prev => prev.filter((_, i) => i !== globalIdx));
        setActionMenuIdx(null);
    };

    // For closing action menu on outside click
    useEffect(() => {
        const closeMenu = () => setActionMenuIdx(null);
        if (actionMenuIdx !== null) {
            window.addEventListener('click', closeMenu);
            return () => window.removeEventListener('click', closeMenu);
        }
    }, [actionMenuIdx]);

    return (
        <PageWrapper title="Follow Up">
            <SubHeader>
                <SubHeaderLeft>
                    <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search follow up..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={handleOpenModal}
                    >
                        New Follow Up
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch>
                            <CardBody isScrollable className="table-responsive">
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
                                            <th>Created</th>
                                            <th>Next Follow Up</th>
                                            <th>Remark</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPagination(filteredFollowUps, currentPage, perPage).length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="text-center py-5">
                                                    <Icon icon="Info" className="text-muted mb-2" style={{ fontSize: 24 }} />
                                                    <div className="text-muted mt-2">- No record found. -</div>
                                                </td>
                                            </tr>
                                        ) : (
                                            dataPagination(filteredFollowUps, currentPage, perPage).map((item, idx) => (
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
                                                                e.target.selectedIndex = 0;
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
                            </CardBody>
                            <PaginationButtons
                                data={filteredFollowUps}
                                label="Follow Ups"
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>
            <FollowupModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                form={form}
                onChange={handleChange}
                onSave={handleSave}
                editIndex={editIndex}
            />
        </PageWrapper>
    );
};

export default Followup;