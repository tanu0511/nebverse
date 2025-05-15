import React, { FC } from 'react';
import { useFormik } from 'formik';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import 'react-phone-input-2/lib/style.css';
interface IProjectEditModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (newEmployee: any) => void; // You can give it a better type later
}


const ProjectEditModal: FC<IProjectEditModalProps> = ({ id, isOpen, setIsOpen, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            EmployeeID: '',
            EmployeeName: '',
            EmployeeEmail: '',
            UserRole: '',
            ReportingTo: '',
            Status: 'Active',
        },
        onSubmit: (values) => {
            // Format the data to match the structure in CommonUpcomingEvents
            const newEmployee = {
                id: values.EmployeeID,
                name: values.EmployeeName,
                email: values.EmployeeEmail,
                role: values.UserRole,
                reportingTo: values.ReportingTo,
                status: { name: values.Status, color: 'success' }, // Default color for now
            };

            onSubmit(newEmployee);

            // Close the modal
            setIsOpen(false);

            // Show a notification
            showNotification(
                <span className="d-flex align-items-center">
                    <Icon icon="CheckCircle" size="lg" className="me-1" />
                    <span>Employee Added</span>
                </span>,
                `Employee "${values.EmployeeName}" added successfully!`
            );
        },
    });

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id}>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>Add Project</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-10'>
                <div className='row g-4'>
                    {/* Project Name */}
                    <FormGroup id='EmployeeID' label='EmployeeID' className='col-4'>
                        <Input
                            name='EmployeeID'
                            onChange={formik.handleChange}
                            value={formik.values.EmployeeID}
                            placeholder='Employee ID'
                        />
                    </FormGroup>

                    <FormGroup id="EmployeeName" label="Employee Name" className="col-4">
                        <Input
                            name="EmployeeName"
                            onChange={formik.handleChange}
                            value={formik.values.EmployeeName}
                            placeholder="Enter Employee Name"
                        />
                    </FormGroup>
                    <FormGroup id="EmployeeEmail" label="Employee Email" className="col-4">
                        <Input
                            name="EmployeeEmail"
                            onChange={formik.handleChange}
                            value={formik.values.EmployeeEmail}
                            placeholder="Enter Employee Email"
                        />
                    </FormGroup>
                    <FormGroup id="ReportingTo" label="Reporting To" className="col-6">
                        <Input
                            name="ReportingTo"
                            onChange={formik.handleChange}
                            value={formik.values.ReportingTo}
                            placeholder="Enter Reporting To"
                        />
                    </FormGroup>

                    <FormGroup id="UserRole" label="User Role" className="col-6">
                        <Input
                            name="UserRole"
                            onChange={formik.handleChange}
                            value={formik.values.UserRole}
                            placeholder="Enter User Role"
                        />
                    </FormGroup>

                </div>
            </ModalBody>

            <ModalFooter className='px-4 pb-4'>
                <Button color='info' onClick={formik.handleSubmit}>
                    Save
                </Button>

            </ModalFooter>
        </Modal>
    );
};

export default ProjectEditModal;
