import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface CustomerViewModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    customer: {
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    } | null;
}

const CustomerViewModal: React.FC<CustomerViewModalProps> = ({ isOpen, setIsOpen, customer }) => {
    if (!customer) return null;

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            titleId="customer-view-modal-title"
            isCentered={true} // Center the modal
            isScrollable={true}
            size="lg"// Allow scrolling if content overflows
        >
            {/* Modal Header */}
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="customer-view-modal-title">Contract Template</ModalTitle>
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody>
                <div className="d-flex justify-content-between">
                    <div>
                        <p>rana</p>
                        <p>rana</p>
                        <p>9691144265</p>
                    </div>
                    <div>
                        <h5>CONTRACT TEMPLATE</h5>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><strong>Contract Number</strong></td>
                                    <td>#2</td>
                                </tr>
                                <tr>
                                    <td><strong>Contract Type</strong></td>
                                    <td>{customer.contractType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <div>
                    <h6>Subject</h6>
                    <p>{customer.subject}</p>
                    <h6>Description</h6>
                    <p>{customer.description}</p>
                </div>
                <div className="text-end">
                    <h5>
                        Contract Value: {customer.currency}
                        {customer.contractValue}
                    </h5>
                </div>
            </ModalBody>

            {/* Modal Footer */}
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomerViewModal;