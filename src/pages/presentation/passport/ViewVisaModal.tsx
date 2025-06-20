import React from 'react';
import Modal, {
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface VisaData {
  visaNumber: string;
  country: string;
  issueDate: string;
  expiryDate: string;
  scanCopyUrl?: string;
}

interface ViewVisaModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  visa?: VisaData;
}

const ViewVisaModal: React.FC<ViewVisaModalProps> = ({ isOpen, setIsOpen, visa }) => {
  if (!isOpen || !visa) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Visa Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="row py-4">
          <div className="col-md-12">
            <table>
              <tbody>
                <tr>
                  <td className="text-muted pe-4 py-2">Visa Number</td>
                  <td>{visa.visaNumber}</td>
                </tr>
                <tr>
                  <td className="text-muted pe-4 py-2">Country</td>
                  <td>{visa.country}</td>
                </tr>
                <tr>
                  <td className="text-muted pe-4 py-2">Issue Date</td>
                  <td>{visa.issueDate ? new Date(visa.issueDate).toDateString() : '--'}</td>
                </tr>
                <tr>
                  <td className="text-muted pe-4 py-2">Expiry Date</td>
                  <td>{visa.expiryDate ? new Date(visa.expiryDate).toDateString() : '--'}</td>
                </tr>
                <tr>
                  <td className="text-muted pe-4 py-2">Scan Copy</td>
                  <td>
                    {visa.scanCopyUrl ? (
                      <a
                        href={visa.scanCopyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-bold"
                      >
                        <Icon icon="OpenInNew" className="me-1" />
                        View Scan Copy
                      </a>
                    ) : (
                      '--'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
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

export default ViewVisaModal;