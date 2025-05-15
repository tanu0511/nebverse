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

interface CutomerEditModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CutomerEditModal: FC<CutomerEditModalProps> = ({ isOpen, setIsOpen }) => {
    const formik = useFormik({
        initialValues: {
            electronicAddress: '',
            electronicAddressScheme: '',
            companyId: '',
            companyIdScheme: '',
        },
        onSubmit: (values) => {
            console.log('E-Invoice Settings Submitted:', values);
            setIsOpen(false);
        },
    });

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isCentered>
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="CutomerEditModal">E-Invoice Settings</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="alert alert-light-success">
                    <strong>Note:</strong> This module uses the country from the Business Address. If you have not selected a country, please choose one from the{' '}
                    <a href="#" className="alert-link">Business Address</a>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-3">
                        <FormGroup label="Electronic Address" className="col-md-6">
                            <Input
                                name="electronicAddress"
                                value={formik.values.electronicAddress}
                                onChange={formik.handleChange}
                                placeholder="Enter Electronic Address"
                            />
                        </FormGroup>
                        <FormGroup label="Electronic Address Scheme" className="col-md-6">
                            <Input
                                name="electronicAddressScheme"
                                value={formik.values.electronicAddressScheme}
                                onChange={formik.handleChange}
                                placeholder="Enter Address Scheme"
                            />
                        </FormGroup>
                        <FormGroup label="Company ID" className="col-md-6">
                            <Input
                                name="companyId"
                                value={formik.values.companyId}
                                onChange={formik.handleChange}
                                placeholder="Enter Company ID"
                            />
                        </FormGroup>
                        <FormGroup label="Company ID Scheme" className="col-md-6">
                            <Input
                                name="companyIdScheme"
                                value={formik.values.companyIdScheme}
                                onChange={formik.handleChange}
                                placeholder="Enter ID Scheme"
                            />
                        </FormGroup>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                <Button color="primary" onClick={formik.handleSubmit}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CutomerEditModal;
