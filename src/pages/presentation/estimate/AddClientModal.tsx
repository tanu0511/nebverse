import React, { FC } from 'react';
import { useFormik } from 'formik';
import Modal, {
ModalBody,
ModalFooter,
ModalHeader,
ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

interface AddClientModalProps {
isOpen: boolean;
setIsOpen: (open: boolean) => void;
onSave?: (clientName: string) => void; 
}

const AddClientModal: FC<AddClientModalProps> = ({ isOpen, setIsOpen, onSave }) => {
const formik = useFormik({
initialValues: {
clientName: '',
email: '',
companyName: '',
loginAllowed: 'no',
},
validate: (values) => {
const errors: { [key: string]: string } = {};
if (!values.clientName) {
errors.clientName = 'Client Name is required';
}
if (!values.email) {
errors.email = 'Email is required';
} else if (!/\S+@\S+.\S+/.test(values.email)) {
errors.email = 'Invalid email address';
}
return errors;
},
onSubmit: (values) => {
if (onSave) {
onSave(values.clientName); 
}
setIsOpen(false);
},
});
return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCentered>
        <ModalHeader setIsOpen={setIsOpen}>
            <ModalTitle id="add-client-title">Client</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <form onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                    {/* Client Name Field */}
                    <FormGroup label="Client Name *" className="col-12">
                        <Input
                            name="clientName"
                            value={formik.values.clientName}
                            onChange={formik.handleChange}
                            placeholder="e.g. John Doe"
                            required
                        />
                        {formik.touched.clientName && formik.errors.clientName ? (
                            <div className="text-danger">{formik.errors.clientName}</div>
                        ) : <></>}
                    </FormGroup>

                    {/* Email Field */}
                    <FormGroup className="col-12">
                        <>
                            Email{' '}
                            <span className="text-muted" title="We'll never share your email.">
                                <i className="bi bi-question-circle small" />
                            </span>
                        </>
                        <Input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="e.g. johndoe@example.com"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : <></>}
                    </FormGroup>

                    {/* Company Name Field */}
                    <FormGroup label="Company Name" className="col-12">
                        <Input
                            name="companyName"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            placeholder="e.g. Acme Corporation"
                        />
                    </FormGroup>

                    {/* Login Allowed Radio Buttons */}
                    <FormGroup label="Login Allowed?" className="col-12">
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="loginYes"
                                    name="loginAllowed"
                                    value="yes"
                                    checked={formik.values.loginAllowed === 'yes'}
                                    onChange={formik.handleChange}
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
                                    value="no"
                                    checked={formik.values.loginAllowed === 'no'}
                                    onChange={formik.handleChange}
                                    className="form-check-input"
                                />
                                <label htmlFor="loginNo" className="form-check-label">
                                    No
                                </label>
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => setIsOpen(false)}>
                Close
            </Button>
            <Button color="primary" onClick={formik.handleSubmit}>
                Save
            </Button>
        </ModalFooter>
    </Modal>
);
};

export default AddClientModal;