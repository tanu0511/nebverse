/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  notice?: {
    name: string;
    date?: string;
    parentDepartment?: string;
    summary?: string;
  };
}

const ViewNoticeModal: React.FC<Props> = ({ isOpen, setIsOpen, notice }) => {
  return (
    
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Notice Details'>
      <ModalHeader><h4>Notice Details</h4></ModalHeader>
      <ModalBody>
      <div className='container'>
        <div className='row mb-3'>
          <div className='col-sm-4 text-muted'>Notice Heading</div>
          <div className='col-sm-8'>{notice?.name || '--'}</div>
        </div>
        <div className='row mb-3'>
          <div className='col-sm-4 text-muted'>Date</div>
          <div className='col-sm-8'>{notice?.date || '--'}</div>
        </div>
        <div className='row mb-3'>
          <div className='col-sm-4 text-muted'>To</div>
          <div className='col-sm-8'>{notice?.parentDepartment || '--'}</div>
        </div>
        
        <div className='row mb-3'>
          <div className='col-sm-4 text-muted'>Description</div>
          <div className='col-sm-8'>{notice?.summary || '--'}</div>
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

export default ViewNoticeModal;
