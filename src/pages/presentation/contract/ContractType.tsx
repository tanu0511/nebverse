import React, { FC, useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface IContractTypeModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    contractTypes: { id: number; name: string }[];
    setContractTypes: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
    onSaveContractType: (contractType: { id: number; name: string }) => void; // Added this line
}

const ContractType: FC<IContractTypeModalProps> = ({ isOpen, setIsOpen, contractTypes, setContractTypes, onSaveContractType }) => {
    const [formData, setFormData] = useState({ id: 0, name: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddContractType = () => {
        if (formData.name.trim() === '') {
            alert('Name is required');
            return;
        }
        const newContractType = { id: contractTypes.length + 1, name: formData.name };
        setContractTypes((prev) => [...prev, newContractType]);
        onSaveContractType(newContractType); // Call the onSaveContractType function
        setFormData({ id: 0, name: '' });
    };

    const handleDeleteContractType = (id: number) => {
        setContractTypes((prev) => prev.filter((type) => type.id !== id));
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullScreen="md" titleId="contractTypeModal">
            <ModalHeader setIsOpen={setIsOpen}>
                <h5 className="modal-title">Contract Type</h5>
            </ModalHeader>
            <ModalBody>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractTypes.length > 0 ? (
                            contractTypes.map((type) => (
                                <tr key={type.id}>
                                    <td>{type.id}</td>
                                    <td>{type.name}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteContractType(type.id)}
                                        >
                                            <Icon icon="Trash" /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    <div className="d-flex flex-column align-items-center">
                                        <Icon icon="List" size="lg" className="mb-2 text-muted" />
                                        <span className="text-muted">- No record found. -</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <FormGroup id="name" label="Name *" className="col-md-12">
                    <Input
                        name="name"
                        placeholder="Enter a category name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleAddContractType}>
                    <Icon icon="Check" className="me-1" /> Save
                </Button>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ContractType;