/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';

interface ICustomerEditModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
}

interface Row {
    date: string;
    overtimeType: string;
    hours: string;
    minutes: string;
    reason: string;
}

const customerEditModal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
    const [rows, setRows] = useState<Row[]>([
        { date: '', overtimeType: '', hours: '00', minutes: '00', reason: '' },
    ]);

    const handleAddRow = () => {
        setRows([...rows, { date: '', overtimeType: '', hours: '00', minutes: '00', reason: '' }]);
    };

    const handleRemoveRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (index: number, field: keyof Row, value: string) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    if (id || id === '0') {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" titleId={id.toString()}>
                <ModalHeader setIsOpen={setIsOpen} className="p-4">
                    <ModalTitle id={id}>Add Request</ModalTitle>
                </ModalHeader>
                <ModalBody className="px-4">
                    
                    <div className="row g-3">
                        <div className="col-md-6">
                            <FormGroup id="employee" label="Employee *">
                                <select className="form-select">
                                    <option>--</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                    <option>Michael Brown</option>
                                </select>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        {rows.map((row, index) => (
                            <div className="row g-3 align-items-center" key={`row-${index}`}>
                                <div className="col-md-2">
                                    <Input
                                        type="date"
                                        value={row.date}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, 'date', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={row.overtimeType}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            handleInputChange(index, 'overtimeType', e.target.value)
                                        }
                                    >
                                        <option>Nothing selected</option>
                                        <option>Regular</option>
                                        <option>Holiday</option>
                                    </select>
                                </div>
                                <div className="col-md-2 d-flex align-items-center">
                                    <Input
                                        type="number"
                                        className="me-2"
                                        placeholder="00"
                                        value={row.hours}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, 'hours', e.target.value)
                                        }
                                    />
                                    <span className="me-2">hrs</span>
                                    <Input
                                        type="number"
                                        placeholder="00"
                                        value={row.minutes}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, 'minutes', e.target.value)
                                        }
                                    />
                                    <span className="ms-2">mins</span>
                                </div>
                                <div className="col-md-4">
                                    <Input
                                        type="text"
                                        placeholder="Reason"
                                        value={row.reason}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, 'reason', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-md-1">
                                    {index > 0 && ( // Hide the delete button for the first row
                                        <Button
                                            color="danger"
                                            icon="Close"
                                            onClick={() => handleRemoveRow(index)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3">
                        <Button color="link" icon="Add" className="text-primary" onClick={handleAddRow}>
                            Add
                        </Button>
                    </div>
                </ModalBody>
                <ModalFooter className="px-4 pb-4">
                    <Button color="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button color="primary" icon="Send">
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
    return null;
};

export default customerEditModal;