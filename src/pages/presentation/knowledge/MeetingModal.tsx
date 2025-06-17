import React from 'react';
import Modal, { ModalHeader, ModalTitle, ModalBody } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface MeetingModalProps {
  show: boolean;
  onClose: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ show, onClose }) => (
  <Modal isOpen={show} setIsOpen={onClose} centered>
    <ModalHeader>
      <ModalTitle id="meeting-modal-title">Add Meeting</ModalTitle>
      <Button
        color="link"
        className="btn-close position-absolute end-0 top-0 m-3"
        aria-label="Close"
        onClick={onClose}
        style={{ boxShadow: "none" }}
      />
    </ModalHeader>
    <ModalBody>
      <div className="card" >
        <div className="card-body text-center">
          <h5 className="card-title mb-4">Meeting Details</h5>
          <Icon icon="Key" size="2x" color="secondary" className="mb-3" />
          <div className="mb-3 text-muted">
            - Please configure the Zoom Setting credentials first -
          </div>
          <Button color="primary" isLight>
            Zoom Settings
          </Button>
        </div>
      </div>
    </ModalBody>
  </Modal>
);

export default MeetingModal;