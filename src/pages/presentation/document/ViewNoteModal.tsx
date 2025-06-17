import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  note?: {
    title: string;
    type?: string;
    created?: string;
    detail?: string;
  };
}

const ViewNoteModal: React.FC<Props> = ({ isOpen, setIsOpen, note }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Note Details'>
      <ModalHeader>
        <h4>Note Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Note Title</div>
            <div className='col-sm-8'>{note?.title || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Note Type</div>
            <div className='col-sm-8'>{note?.type || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Created</div>
            <div className='col-sm-8'>{note?.created || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Note Detail</div>
            <div className='col-sm-8'>{note?.detail || '--'}</div>
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

export default ViewNoteModal;