import React, { FC, useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

interface ClientModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onSave: (client: Client) => void; // Callback to save client details
}

interface Client {
    name: string;
    email: string;
    companyName: string;
    loginAllowed: boolean;
}

const ClientModal: FC<ClientModalProps> = ({ isOpen, setIsOpen, onSave }) => {
  const [clientData, setClientData] = useState<Client>({
    name: '',
    email: '',
    companyName: '',
    loginAllowed: false,
  });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (value: boolean) => {
        setClientData((prev) => ({ ...prev, loginAllowed: value }));
    };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onSave(clientData);
    setClientData({ name: '', email: '', companyName: '', loginAllowed: false }); 
    setIsOpen(false); 
  };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop>
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="client-modal-title">Client</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormGroup label="Client Name *">
                    <Input
                        name="name"
                        value={clientData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        required
                    />
                </FormGroup>
                <FormGroup label="Email *">
                    <Input
                        type="email"
                        name="email"
                        value={clientData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. johndoe@example.com"
                        required
                    />
                </FormGroup>
                <FormGroup label="Company Name *">
                    <Input
                        name="companyName"
                        value={clientData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corporation"
                        required
                    />
                </FormGroup>
                <FormGroup label="Login Allowed?">
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                id="loginYes"
                                name="loginAllowed"
                                checked={clientData.loginAllowed}
                                onChange={() => handleRadioChange(true)}
                                className="form-check-input"
                            />
                            <label htmlFor="loginYes" className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="loginNo"
                                name="loginAllowed"
                                checked={!clientData.loginAllowed}
                                onChange={() => handleRadioChange(false)}
                                className="form-check-input"
                            />
                            <label htmlFor="loginNo" className="form-check-label">
                                No
                            </label>
                        </div>
                    </div>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ClientModal;