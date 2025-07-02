import React, { useState, FC, useEffect } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ContractType from './ContractType';

interface IContractModalProps {
    id?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSave: (data: {
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    }) => void;
    modalTitle: string;
    selectedCustomer: { // Add selectedCustomer prop to manage form data
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    } | null;
}

const CustomerEditModal: FC<IContractModalProps> = ({ id = 'default-id', isOpen, setIsOpen, onSave, modalTitle, selectedCustomer }) => {
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        contractType: '',
        contractValue: '',
        currency: '',
    });

    // Effect to update the formData when selectedCustomer changes
    useEffect(() => {
        if (selectedCustomer) {
            setFormData({
                subject: selectedCustomer.subject,
                description: selectedCustomer.description,
                contractType: selectedCustomer.contractType,
                contractValue: selectedCustomer.contractValue,
                currency: selectedCustomer.currency,
            });
        } else {
            // Reset the form data for "Add Contract Template"
            setFormData({
                subject: '',
                description: '',
                contractType: '',
                contractValue: '',
                currency: '',
            });
        }
    }, [selectedCustomer, isOpen]); // Run on selectedCustomer or modal open

    const handleSave = () => {
        onSave(formData);
        setIsOpen(false);
    };

    return (
        <ContractModal
            id={id} // Use the default or provided id
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            modalTitle={modalTitle}
            selectedCustomer={selectedCustomer} // Passing selectedCustomer here for editing
        />
    );
};

interface IContractModalPropsExtended extends IContractModalProps {
    formData: {
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    }>>;
}

const ContractModal: FC<IContractModalPropsExtended & { onSave: () => void }> = ({
    id,
    isOpen,
    setIsOpen,
    formData,
    setFormData,
    onSave,
    selectedCustomer,
}) => {
    const [description, setDescription] = React.useState<string>('');
    const [contractTypes, setContractTypes] = React.useState<{ id: number; name: string }[]>([]);
    const [isContractTypeModalOpen, setIsContractTypeModalOpen] = React.useState(false);

    // Handle contract type selection
    const handleSaveContractType = (contractType: { id: number; name: string }) => {
        setFormData((prev) => ({
            ...prev,
            contractType: contractType.name,
        }));
        setIsContractTypeModalOpen(false);
    };

    // Reset description whenever selectedCustomer changes (for editing)
    useEffect(() => {
        if (selectedCustomer) {
            setDescription(selectedCustomer.description);
        } else {
            setDescription('');
        }
    }, [selectedCustomer]);

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" titleId={id} isStaticBackdrop={true}>
                <ModalHeader setIsOpen={setIsOpen} className="p-4">
                    <ModalTitle id="Contract-Details">Contract Details</ModalTitle>
                </ModalHeader>

                <ModalBody className="px-4" style={{ minHeight: '400px' }}>
                    <div className="row g-4">
                        <FormGroup id="subject" label="Subject *" className="col-12 mb-4">
                            <Input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replace(/[^0-9,A-Z,a-z]/g, '');
                                    setFormData((prev) => ({
                                        ...prev,
                                        subject: value,
                                    }));
                                }}
                            />
                        </FormGroup>

                        <FormGroup id="contractType" label="Contract Type *" className="col-md-4">
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const { value } = e.target;
                                        setFormData((prev) => ({
                                            ...prev,
                                            contractType: value,
                                        }));
                                    }}
                                >
                                    <option value="">-- Select Contract Type --</option>
                                    {contractTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {/* <Button type="button" color="light"   className="input-group-text" onClick={() => setIsContractTypeModalOpen(true)}>
                                    Add
                                </Button> */}
                                <Button type="button"
                                  color="light"
                                  className="input-group-text"
                                >
                                    Add
                                </Button>
                            </div>
                        </FormGroup>

                        <FormGroup id="contractValue" label="Contract Value *" className="col-md-4 mb-4">
                            <Input
                                type="text"
                                name="contractValue"
                                value={formData.contractValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setFormData((prev) => ({
                                        ...prev,
                                        contractValue: value,
                                    }));
                                }}
                            />
                        </FormGroup>

                        <FormGroup id="currency" label="Currency" className="col-md-4 mb-4">
                            <select className="form-select">
                                <option value="inr">INR (₹)</option>
                                <option value="usd">USD ($)</option>
                                <option value="eur">EUR (€)</option>
                            </select>
                        </FormGroup>

                        <FormGroup id="description" label="Description" className="col-12 mb-3">
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                style={{ height: '100px' }}
                            />
                        </FormGroup>
                    </div>
                </ModalBody>

                <ModalFooter className="px-4 pb-4">
                    <Button icon="Check" color="primary" className="me-3" onClick={onSave}>
                        Save
                    </Button>
                    <Button color="light" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ContractType Modal */}
            <ContractType
                isOpen={isContractTypeModalOpen}
                setIsOpen={setIsContractTypeModalOpen}
                onSaveContractType={handleSaveContractType}
                contractTypes={contractTypes}
                setContractTypes={setContractTypes}
            />
        </>
    );
};

export default CustomerEditModal;