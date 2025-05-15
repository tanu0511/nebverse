/* eslint-disable prettier/prettier */
import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ViewAwardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  award: {
    id: number;
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
  } | undefined;
}

const ViewAwardModal: React.FC<ViewAwardModalProps> = ({ isOpen, setIsOpen, award }) => {
  if (!award) return null; // If no award is selected, don't render anything

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId="viewAwardModal" isCentered size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="viewAwardModal">Award Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Award Name:</strong> {award.name}</p>
            <p><strong>Category:</strong> {award.parentDepartment || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Date:</strong> {award.date || 'N/A'}</p>
          </div>
          <div className="col-12">
            <p><strong>Summary:</strong> {award.summary || 'N/A'}</p>
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

export default ViewAwardModal;