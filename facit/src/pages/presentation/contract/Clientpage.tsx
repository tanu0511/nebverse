/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface IAddNoticeModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onAddNotice: (notice: {
        name: string;
        parentDepartment?: string;
        date?: string;
        summary?: string;
        recipientType?: string;
        selectedEmployee?: string;
        selectedClient?: string;
    }) => void;
    selectedNotice?: {
        id: number;
        name: string;
        parentDepartment?: string;
        date?: string;
        summary?: string;
        recipientType?: string;
        selectedEmployee?: string;
        selectedClient?: string;
    };
}

interface IClientModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSaveClient: (client: { id: number; name: string; email: string; companyName: string }) => void;
}

const ClientPage: FC<IAddNoticeModalProps & IClientModalProps> = ({
    isOpen,
    setIsOpen,
    onAddNotice,
    selectedNotice,
    onSaveClient,
}) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedNotice?.name || '',
            parentDepartment: selectedNotice?.parentDepartment || '',
            date: selectedNotice?.date || dayjs().format('YYYY-MM-DD'),
            summary: selectedNotice?.summary || '',
            recipientType: selectedNotice?.recipientType || 'Employees',
            selectedEmployee: selectedNotice?.selectedEmployee || '',
            selectedClient: selectedNotice?.selectedClient || '',
        },
        onSubmit: (values) => {
            onAddNotice(values);
            setIsOpen(false);
        },
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            alert('Client name is required');
            return;
        }
        const newClient = {
            id: Date.now(), // Generate a unique ID
            name: formData.name,
            email: formData.email,
            companyName: formData.companyName,  
        };
        onSaveClient(newClient); // Pass the new client to the parent component
        setFormData({ name: '', email: '', companyName: '' }); // Reset the form
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullScreen="md" titleId="clientModal">
            <ModalHeader setIsOpen={setIsOpen}>
                <h5 className="modal-title">{selectedNotice ? 'Edit Notice' : 'Add Client'}</h5>
            </ModalHeader>
            <ModalBody>
                <FormGroup id="name" label="Client Name *" className="col-md-12">
                    <Input
                        name="name"
                        placeholder="Enter client name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup id="email" label="Email" className="col-md-12">
                    <Input
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup id="companyName" label="Company Name" className="col-md-12">
                    <Input
                        name="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Save
                </Button>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ClientPage;