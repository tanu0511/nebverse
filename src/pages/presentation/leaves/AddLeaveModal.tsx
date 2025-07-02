import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import AddLeaveTypeModal from './AddLeaveTypeModal'; // Import the AddLeaveTypeModal component

interface AddLeaveModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    onSubmit: (formValues: any) => void;
    initialData?: {
        member: string;
        leaveType: string;
        status: string;
        reason: string;
        file: string;
        date: string;
        duration: string;
        fromDate: string;
        toDate: string;
    }; // Add initialData property
}

const AddLeaveModal: FC<AddLeaveModalProps> = ({ isOpen, setIsOpen, onSubmit, initialData }) => {
    const [leaveTypes, setLeaveTypes] = useState([
        { name: "Sick Leave", count: 0 },
        { name: "Casual Leave", count: 0 },
        { name: "Earned Leave", count: 0 },
    ]);
    const formik = useFormik({
        initialValues: {
            member: initialData?.member || '',
            leaveType: initialData?.leaveType || '',
            status: initialData?.status || 'Pending',
            reason: initialData?.reason || '',
            file: initialData?.file || '',
            date: initialData?.date || dayjs().format('YYYY-MM-DD'),
            duration: initialData?.duration || 'Full Day',
            fromDate: initialData?.fromDate || '',
            toDate: initialData?.toDate || '',
        },
        enableReinitialize: true, // Reinitialize form values when initialData changes
        onSubmit: (values) => {
            if (onSubmit) {
                onSubmit(values);
            }
            formik.resetForm(); // Reset the form fields to their initial values
            setIsOpen(false); // Close the modal
            showNotification(
                <span className="d-flex align-items-center">
                    <Icon icon="Info" size="lg" className="me-1" />
                    <span>Leave Assigned Successfully</span>
                </span>,
                'Leave has been assigned successfully',
            );
        },
    });

    const durationOptions = ['Full Day', 'Multiple', 'First Half', 'Second Half'];
    const [addLeaveTypeOpen, setAddLeaveTypeOpen] = React.useState(false); // State for AddLeaveTypeModal

    interface LeaveType {
        name: string;
        count: number;
    }

    interface NewLeaveTypeData {
        leaveType: string;
    }

    const handleAddLeaveType = (newTypeData: NewLeaveTypeData) => {
        setLeaveTypes((prev: LeaveType[]) => {
            if (prev.some((t: LeaveType) => t.name === newTypeData.leaveType)) return prev;
            return [...prev, { name: newTypeData.leaveType, count: 0 }];
        });
        setAddLeaveTypeOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId="assignLeaveModal" isCentered size="lg" isStaticBackdrop>
                <ModalHeader setIsOpen={setIsOpen}>
                    <ModalTitle id="assignLeaveModal">Assign Leave</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row g-4">
                            {/* Member */}
                            <FormGroup id="member" label={<span>Choose Member <span className="text-danger">*</span></span>} className="col-md-4">
                                <Select
                                    id="member"
                                    name="member"
                                    value={formik.values.member}
                                    onChange={formik.handleChange}
                                    ariaLabel="Select a member"
                                >
                                    <option value="">--</option>
                                    <option value="John Doe">John Doe</option>
                                    <option value="Jane Smith">Jane Smith</option>
                                </Select>
                            </FormGroup>
                            {/* Leave Type with Add button */}
                            <FormGroup id="leaveType" label={<span>Leave Type <span className="text-danger">*</span></span>} className="col-md-4">
                                <div className="input-group">
                                    <Select
                                        id="leaveType"
                                        name="leaveType"
                                        value={formik.values.leaveType}
                                        onChange={formik.handleChange}
                                        ariaLabel="Select leave type"
                                    >
                                        <option value="">--</option>
                                        {leaveTypes.map(type => (
                                            <option key={type.name} value={type.name}>
                                              {type.name} {type.count > 0 ? `(${type.count})` : ""}
                                            </option>
                                        ))}
                                    </Select>
                                    <Button color="light" type="button" className="input-group-text" onClick={() => setAddLeaveTypeOpen(true)}>
                                        Add
                                    </Button>
                                </div>
                            </FormGroup>
                            {/* Status */}
                            <FormGroup id="status" label="Status" className="col-md-4">
                                <Select
                                    id="status"
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    ariaLabel="Select status"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </Select>
                            </FormGroup>
                            <FormGroup id="duration" label="Select Duration" className="col-md-6">
                                <div className="d-flex gap-3 pt-2">
                                    {durationOptions.map((option) => (
                                        <label key={option} className="form-check-label d-flex align-items-center gap-1">
                                            <input
                                                type="radio"
                                                name="duration"
                                                value={option}
                                                checked={formik.values.duration === option}
                                                onChange={formik.handleChange}
                                                className="form-check-input"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </FormGroup>
                            <FormGroup id="date" label="Date" className="col-md-6">
                                <Input
                                    type="date"
                                    name="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    aria-label="Select date"
                                />
                            </FormGroup>
                            {formik.values.duration === 'Multiple' && (
                                <div className="row g-4">
                                    <FormGroup id="fromDate" label="From Date" className="col-md-6">
                                        <Input
                                            type="date"
                                            name="fromDate"
                                            value={formik.values.fromDate || ''}
                                            onChange={formik.handleChange}
                                            aria-label="Select from date"
                                        />
                                    </FormGroup>
                                    <FormGroup id="toDate" label="To Date" className="col-md-6">
                                        <Input
                                            type="date"
                                            name="toDate"
                                            value={formik.values.toDate || ''}
                                            onChange={formik.handleChange}
                                            aria-label="Select to date"
                                        />
                                    </FormGroup>
                                </div>
                            )}
                            <FormGroup id="reason" label="Reason for absence *" className="col-12">
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    placeholder="E.g. Feeling not well"
                                    name="reason"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    aria-label="Reason for absence"
                                />
                            </FormGroup>
                            <FormGroup id="file" label="Attach document" className="col-12">
                                <input
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        formik.setFieldValue('file', e.currentTarget.files?.[0] || '')
                                    }
                                    aria-label="Attach document"
                                />
                            </FormGroup>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={formik.handleSubmit}>
                        Assign
                    </Button>
                    <Button color="light" onClick={() => setIsOpen(false)} className="me-2">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <AddLeaveTypeModal 
               isOpen={addLeaveTypeOpen} 
               setIsOpen={setAddLeaveTypeOpen} 
               onSave={handleAddLeaveType} /> {/* Add the modal here */}
        </>
    );
};

export default AddLeaveModal;