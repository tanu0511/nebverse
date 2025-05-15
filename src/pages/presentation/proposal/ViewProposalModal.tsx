
import React from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ViewProposalModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    proposalData: any;
}

const ViewProposalModal: React.FC<ViewProposalModalProps> = ({
    isOpen,
    setIsOpen,
    proposalData,
}) => {
    if (!proposalData) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="proposal-details-title">Proposal Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Billed To</h5>
                        <p>{proposalData.deals}</p>
                        <p>{proposalData.contactName}</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <h5>Proposal</h5>
                        <p>
                            <strong>Proposal:</strong> {proposalData.proposal}
                        </p>
                        <p>
                            <strong>Valid Till:</strong> {proposalData.validTill}
                        </p>
                        <p>
                            <strong>Date:</strong> {proposalData.date}
                        </p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className="badge bg-warning text-dark">
                                {proposalData.status}
                            </span>
                        </p>
                    </div>
                </div>

                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposalData.items.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unitPrice.toFixed(2)}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <h5>Summary</h5>
                    <div className="d-flex justify-content-between">
                        <span>Sub Total:</span>
                        <span>{parseFloat(proposalData.subTotal).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Discount:</span>
                        <span>{parseFloat(proposalData.discount).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax:</span>
                        <span>{parseFloat(proposalData.tax).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong>{parseFloat(proposalData.total).toFixed(2)}</strong>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ViewProposalModal;
