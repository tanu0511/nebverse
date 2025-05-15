/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
import Clientpage from './Clientpage'; // Import the Clientpage component
import ContractType from './ContractType'; // Import ContractType
import { True } from '../../../stories/components/bootstrap/Alert/AlertUseIsDissmisable.stories';

interface ICreateContractModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateContractModal: FC<ICreateContractModalProps> = ({ id, isOpen, setIsOpen }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        contractNumber: '',
        subject: '',
        project: '',
        description: '',
        startDate: '',
        endDate: '',
        withoutDueDate: false,
        contractType: '',
        contractValue: '',
        currency: '',
        client: '',
        cell: '',
        officePhone: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        alternateAddress: '',
        notes: '',
    });

    const [contractTypes, setContractTypes] = useState<{ id: number; name: string }[]>([]); // State for dropdown options
    const [clients, setClients] = useState<{ id: number; name: string; email: string; companyName: string }[]>([]); // State for client dropdown options
    const [isClientModalOpen, setIsClientModalOpen] = useState(false); // State to manage Clientpage modal visibility
    const [isContractTypeModalOpen, setIsContractTypeModalOpen] = useState(false); // State for ContractType modal

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' && (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSaveContractType = (contractType: { id: number; name: string }) => {
        setFormData((prev) => ({
            ...prev,
            contractType: contractType.name,
        }));
        setIsContractTypeModalOpen(false);
    };

    const handleSaveClient = (client: { id: number; name: string; email: string; companyName: string }) => {
        setClients((prev) => [...prev, client]); // Add new client to the dropdown options
        setFormData((prev) => ({
            ...prev,
            client: client.name, // Set the selected client in the form
        }));
        setIsClientModalOpen(false); // Close the modal
    };

    return (
        <>
            {/* Main Contract Modal */}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" titleId={id} isStaticBackdrop={true}>
                <ModalHeader setIsOpen={setIsOpen} className="p-4">
                    <ModalTitle id={id}>Add Contract</ModalTitle>
                </ModalHeader>

                <ModalBody className="px-4">
                    {/* Contract Details */}
                    <div className="mb-4">
                        <h5>Contract Details</h5>
                    </div>

                    <div className="row g-4">
                        <FormGroup id="contractNumber" label="Contract Number *" className="col-md-3">
                            <div className="d-flex">
                                <Input disabled value="CONT#00" className="me-2" />
                                <Input
                                    type="number"
                                    name="contractNumber"
                                    placeholder="Enter number"
                                    value={formData.contractNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormGroup>

                        <FormGroup id="subject" label="Subject *" className="col-md-9">
                            <Input
                                name="subject"
                                placeholder="Enter subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="project" label="Project" className="col-md-4">
                            <select
                                className="form-select"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Project --</option>
                                <option value="project1">Project 1</option>
                                <option value="project2">Task</option>
                            </select>
                        </FormGroup>

                        <FormGroup id="description" label="Description" className="col-12">
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                                style={{
                                    height: '150px', // Adjust height for better usability
                                    marginBottom: '35px', // Add spacing below the editor
                                }}
                            />
                        </FormGroup>

                        <FormGroup id="startDate" label="Start Date *" className="col-md-3">
                            <Input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="endDate" label="End Date" className="col-md-3">
                            <Input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                disabled={formData.withoutDueDate}
                            />
                        </FormGroup>

                        <FormGroup id="noDueDate" label=" " className="col-md-2 d-flex align-items-end">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="noDueDate"
                                    name="withoutDueDate"
                                    checked={formData.withoutDueDate}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="noDueDate">
                                    Without Due Date
                                </label>
                            </div>
                        </FormGroup>

                        <FormGroup id="contractType" label="Contract Type *" className="col-md-4">
                            <div className="d-flex align-items-center">
                                <select
                                    className="form-select me-2"
                                    name="contractType"
                                    value={formData.contractType}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Contract Type --</option>
                                    {contractTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <Button color="primary" onClick={() => setIsContractTypeModalOpen(true)}>
                                    Add
                                </Button>
                            </div>
                        </FormGroup>

                        <FormGroup id="contractValue" label="Contract Value *" className="col-md-4">
                            <Input
                                type="number"
                                name="contractValue"
                                placeholder="Enter value"
                                value={formData.contractValue}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="currency" label="Currency" className="col-md-4">
                            <select
                                className="form-select"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                            >
                                <option value="inr">INR (₹)</option>
                                <option value="usd">USD ($)</option>
                                <option value="eur">EUR (€)</option>
                            </select>
                        </FormGroup>
                    </div>

                    {/* Client Details Section */}
                    <div className="mt-5 mb-3">
                        <h5>Client Details</h5>
                    </div>

                    <div className="row g-4">
                        <FormGroup id="client" label="Client *" className="col-md-4 mb-3">
                            <div className="d-flex align-items-center">
                                <select
                                    className="form-select me-2"
                                    name="client"
                                    value={formData.client}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Client --</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.name}>
                                            {client.name} ({client.email}) - {client.companyName}
                                        </option>
                                    ))}
                                </select>
                                <Button color="primary" onClick={() => setIsClientModalOpen(true)}>
                                    Add
                                </Button>
                            </div>
                        </FormGroup>

                        <FormGroup id="cell" label="Cell" className="col-md-4 mb-3">
                            <Input
                                name="cell"
                                placeholder="Enter mobile number"
                                value={formData.cell}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="officePhone" label="Office Phone Number" className="col-md-4 mb-3">
                            <Input
                                name="officePhone"
                                placeholder="e.g. +19876543"
                                value={formData.officePhone}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="city" label="City" className="col-md-3 mb-3">
                            <Input
                                name="city"
                                placeholder="e.g. New York, Jaipur, Dubai"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="state" label="State" className="col-md-3 mb-3">
                            <Input
                                name="state"
                                placeholder="e.g. California, Rajasthan, Dubai"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="country" label="Country" className="col-md-3 mb-3">
                            <Input
                                name="country"
                                placeholder="Enter country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="postalCode" label="Postal code" className="col-md-3 mb-3">
                            <Input
                                name="postalCode"
                                placeholder="e.g. 90250"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="alternateAddress" label="Alternate Address" className="col-md-6 mb-4">
                            <Input
                                name="alternateAddress"
                                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                                style={{ height: '90px' }}
                                value={formData.alternateAddress}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup id="notes" label="Notes" className="col-md-6 mb-4">
                            <textarea
                                className="form-control"
                                name="notes"
                                placeholder="Enter notes..."
                                style={{ height: '90px' }}
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                </ModalBody>

                <ModalFooter className="px-4 pb-4">
                    <Button icon="Check" color="primary" className="me-3">
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Clientpage Modal */}
            <Clientpage isOpen={isClientModalOpen} setIsOpen={setIsClientModalOpen} onAddNotice={function (notice: { name: string; parentDepartment?: string; date?: string; summary?: string; recipientType?: string; selectedEmployee?: string; selectedClient?: string; }): void {
                throw new Error('Function not implemented.');
            }} onSaveClient={handleSaveClient} />

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

export default CreateContractModal;