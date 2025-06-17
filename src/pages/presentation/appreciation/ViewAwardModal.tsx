import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface ViewAwardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  award: {
    id: number;
    name: string;
    icon?: string;
    color?: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
    photo?: File | string;
  } | undefined;
}

const ViewAwardModal: React.FC<ViewAwardModalProps> = ({ isOpen, setIsOpen, award }) => {
  if (!award) return null;

  let photoUrl: string | undefined;
  if (award.photo) {
    if (typeof award.photo === 'string') {
      photoUrl = award.photo;
    } else {
      photoUrl = URL.createObjectURL(award.photo);
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId="viewAwardModal" isCentered size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="viewAwardModal">Award Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row align-items-start">
          <div className="col-md-6 mb-3">
            <div className="d-flex align-items-center mb-2">
              {award.icon && (
                <Icon
                  icon={award.icon}
                  style={{
                    marginRight: 10,
                    fontSize: 28,
                    verticalAlign: 'middle',
                    color: award.color || '#A259E6'
                  }}
                />
              )}
              <h5 className="mb-0">{award.name}</h5>
            </div>
            <div className="mb-2">
              <strong>Category:</strong> {award.parentDepartment || <span className="text-muted">N/A</span>}
            </div>
            <div className="mb-2">
              <strong>Date:</strong> {award.date || <span className="text-muted">N/A</span>}
            </div>
          </div>
          <div className="col-md-6 mb-3 d-flex flex-column align-items-center">
            {photoUrl && (
              <div className="w-100 text-center">
                <strong>Photo:</strong>
                <div className="mt-2">
                  <img
                    src={photoUrl}
                    alt="Award"
                    style={{
                      maxWidth: 220,
                      maxHeight: 180,
                      borderRadius: 12,
                      border: '1px solid #eee',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-12 mt-3">
            <div className="p-3 rounded" style={{ background: '#f8f9fa' }}>
              <strong>Summary:</strong>
              <div className="mt-1" style={{ whiteSpace: 'pre-line' }}>
                {award.summary || <span className="text-muted">N/A</span>}
              </div>
            </div>
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