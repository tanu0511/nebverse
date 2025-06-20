import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface EmergencyContact {
  name: string;
  email?: string;
  mobile?: string;
  relationship?: string;
  address?: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contact?: EmergencyContact;
}

const ViewEmergencyContactModal: React.FC<Props> = ({ isOpen, setIsOpen, contact }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Emergency Contact Details'>
      <ModalHeader>
        <h4>Emergency Contact Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Name</div>
            <div className='col-sm-8'>{contact?.name || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Email</div>
            <div className='col-sm-8'>{contact?.email || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Mobile</div>
            <div className='col-sm-8'>{contact?.mobile || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Relationship</div>
            <div className='col-sm-8'>{contact?.relationship || '--'}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-4 text-muted'>Address</div>
            <div className='col-sm-8'>{contact?.address || '--'}</div>
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

export default ViewEmergencyContactModal;