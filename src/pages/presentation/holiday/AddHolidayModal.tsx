import React, { useState, useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import dayjs from 'dayjs';

interface AddHolidayModalProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
    onSave: (data: { holidays: { date: string; occasion: string; fromTime: string; toTime: string }[]; department: string; designation: string; employmentType: string }) => void;
    selectedDate: Date | null;
    existingEvent: { date: string; occasion: string } | null; // Pass the existing event if it exists
}

const AddHolidayModal: React.FC<AddHolidayModalProps> = ({
    isOpen,
    setIsOpen,
    onSave,
    selectedDate,
    existingEvent,
}) => {
    const [holidayList, setHolidayList] = useState<{ date: string; occasion: string; fromTime: string; toTime: string }[]>([
        { date: '', occasion: '', fromTime: '', toTime: '' },
    ]);

    const [department, setDepartment] = useState<string>(''); // New field
    const [designation, setDesignation] = useState<string>(''); // New field
    const [employmentType, setEmploymentType] = useState<string>(''); // New field

    useEffect(() => {
        if (isOpen) {
            if (existingEvent) {
                // Prefill form fields with existingEvent data
                setHolidayList([{
                    date: existingEvent.date,
                    occasion: existingEvent.occasion,
                    fromTime: '',
                    toTime: ''
                }]);
            } else {
                // Reset all form fields to initial state here
                setHolidayList([{
                    date: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '',
                    occasion: '',
                    fromTime: '',
                    toTime: ''
                }]);
            }
            setDepartment('');
            setDesignation('');
            setEmploymentType('');
        }
    }, [isOpen, existingEvent, selectedDate]);

    const handleAddFields = () => {
        setHolidayList([...holidayList, { date: '', occasion: '', fromTime: '', toTime: '' }]);
    };

    const handleFieldChange = (index: number, field: 'date' | 'occasion' | 'fromTime' | 'toTime', value: string) => {
        const updatedList = [...holidayList];
        updatedList[index][field] = value;
        setHolidayList(updatedList);
    };

    const handleSave = () => {
        // Combine holiday data with additional fields
        const dataToSave = {
            holidays: holidayList,
            department,
            designation,
            employmentType,
        };
        onSave(dataToSave); // Pass the combined data to the parent component
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            titleId="addHolidayModal"
            isCentered
            isAnimation
            size="lg"
        >
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="addHolidayModal">Add Holiday</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form>
                    {holidayList.map((holiday, index) => (
                        <div className="row g-3 mb-3" key={index}>
                            <div className="col-md-3">
                                <label htmlFor={`holidayDate-${index}`} className="form-label">
                                    Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    id={`holidayDate-${index}`}
                                    className="form-control"
                                    value={holiday.date}
                                    onChange={(e) => handleFieldChange(index, 'date', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor={`holidayOccasion-${index}`} className="form-label">
                                    Occasion <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id={`holidayOccasion-${index}`}
                                    className="form-control"
                                    value={holiday.occasion}
                                    onChange={(e) => handleFieldChange(index, 'occasion', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor={`holidayFromTime-${index}`} className="form-label">
                                    From Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="time"
                                    id={`holidayFromTime-${index}`}
                                    className="form-control"
                                    value={holiday.fromTime}
                                    onChange={(e) => handleFieldChange(index, 'fromTime', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor={`holidayToTime-${index}`} className="form-label">
                                    To Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="time"
                                    id={`holidayToTime-${index}`}
                                    className="form-control"
                                    value={holiday.toTime}
                                    onChange={(e) => handleFieldChange(index, 'toTime', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-start mb-4">
                        <Button
                            color="primary"
                            onClick={handleAddFields}
                            type="button"
                            icon="Add"
                        >
                            Add Holiday
                        </Button>
                    </div>

                    {/* New Fields */}
                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label htmlFor="department" className="form-label">
                                Department
                            </label>
                            <select
                                id="department"
                                className="form-select"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">Nothing selected</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="designation" className="form-label">
                                Designation
                            </label>
                            <select
                                id="designation"
                                className="form-select"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            >
                                <option value="">Nothing selected</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="employmentType" className="form-label">
                                Employment Type
                            </label>
                            <select
                                id="employmentType"
                                className="form-select"
                                value={employmentType}
                                onChange={(e) => setEmploymentType(e.target.value)}
                            >
                                <option value="">Nothing selected</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={handleSave}
                >
                    Save
                </Button>
                <Button
                    color="secondary"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddHolidayModal;