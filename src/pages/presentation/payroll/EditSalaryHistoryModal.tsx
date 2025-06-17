import React, { useState, useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface EditSalaryHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry: {
        type: string;
        amount: number;
        date: string;
    } | null;
    onSave: (type: string, amount: number, date: string) => void;
}

const EditSalaryHistoryModal: React.FC<EditSalaryHistoryModalProps> = ({
    isOpen,
    onClose,
    entry,
    onSave,
}) => {
    const [type, setType] = useState('increment');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    useEffect(() => {
        if (entry) {
            setType(entry.type);
            setAmount(entry.amount);
            setDate(entry.date);
        }
    }, [entry]);

    return (
        <Modal isOpen={isOpen} setIsOpen={onClose} isCentered>
            <ModalHeader setIsOpen={onClose}>
                <ModalTitle id="edit-salary-history-title">Edit Salary History</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <label>Value Type</label>
                    <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
                        <option value="increment">Increment</option>
                        <option value="decrement">Decrement</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Annual Amount</label>
                    <input
                        className="form-control"
                        type="number"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className="mb-3">
                    <label>Date</label>
                    <input
                        className="form-control"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>Close</Button>
                <Button color="primary" onClick={() => onSave(type, amount, date)}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditSalaryHistoryModal;