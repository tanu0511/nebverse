import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ContactViewProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contact?: {
    title?: string;
    salutation?: string;
    name?: string;
    email?: string;
    mobile?: string;
    country?: string;
    companyAddress?: string;
    gender?: string;
    language?: string;
    created?: string;
  };
}

const ViewContactModal: React.FC<ContactViewProps> = ({ isOpen, setIsOpen, contact }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Contact Details">
      <ModalHeader>
        <h4>Contact Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Title</div>
            <div className="col-sm-8">{contact?.title || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Salutation</div>
            <div className="col-sm-8">{contact?.salutation || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Name</div>
            <div className="col-sm-8">{contact?.name || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Email</div>
            <div className="col-sm-8">{contact?.email || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Phone</div>
            <div className="col-sm-8">{contact?.mobile || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Country</div>
            <div className="col-sm-8">{contact?.country || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Company Address</div>
            <div className="col-sm-8">{contact?.companyAddress || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Gender</div>
            <div className="col-sm-8">{contact?.gender || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Language</div>
            <div className="col-sm-8">{contact?.language || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Created</div>
            <div className="col-sm-8">{contact?.created || '--'}</div>
          </div>
          <div className="text-end mt-4">
            <Button color="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewContactModal;