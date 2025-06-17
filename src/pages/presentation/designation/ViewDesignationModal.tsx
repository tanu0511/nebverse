import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  designation?: {
    name: string;
    parentDepartment?: string;
  };
}

const ViewDesignationModal: React.FC<Props> = ({ isOpen, setIsOpen, designation }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Designation Details'>
      <ModalHeader>
        <h4>Designation Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Designation Name</div>
            <div className='col-sm-8'>{designation?.name || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Parent Department</div>
            <div className='col-sm-8'>{designation?.parentDepartment || '--'}</div>
          </div>
          <div className='text-end mt-4'>
            <Button color='secondary' onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewDesignationModal;