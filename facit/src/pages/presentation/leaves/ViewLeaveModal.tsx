/* eslint-disable prettier/prettier */
import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ViewLeaveModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    leave: any | null; // The leave data to display
}

const ViewLeaveModal: React.FC<ViewLeaveModalProps> = ({ isOpen, setIsOpen, leave }) => {
    if (!leave) return null; // If no leave is selected, don't render anything

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId="viewLeaveModal" isCentered size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="viewLeaveModal">Leave Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Employee:</strong> {leave.member}</p>
                        <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                        <p><strong>Status:</strong> {leave.status}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Date:</strong> {leave.fromDate} to {leave.toDate}</p>
                        <p><strong>Duration:</strong> {leave.duration}</p>
                        <p><strong>Paid:</strong> {leave.paid ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-12">
                        <p><strong>Reason:</strong> {leave.reason}</p>
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

export default ViewLeaveModal;