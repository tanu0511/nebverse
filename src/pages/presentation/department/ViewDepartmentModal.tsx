import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  department?: {
    name: string;
    parentDepartment?: string;
  };
}

const ViewDepartmentModal: React.FC<Props> = ({ isOpen, setIsOpen, department }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Department Details'>
      <ModalHeader>
        <h4>Department Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Department Name</div>
            <div className='col-sm-8'>{department?.name || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Parent Department</div>
            <div className='col-sm-8'>{department?.parentDepartment || '--'}</div>
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

export default ViewDepartmentModal;