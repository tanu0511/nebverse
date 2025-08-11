import React from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface EstimateItem {
  description?: string;
  name?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  tax?: number;
}

interface Estimate {
  id: string | number;
  name: string;
  description?: string;
  currency: string;
  items?: EstimateItem[];
}

interface ViewEstimateModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  estimate: Estimate | null;
}

const ViewEstimateModal: React.FC<ViewEstimateModalProps> = ({ isOpen, setIsOpen, estimate }) => {
  if (!estimate) return null;

  // Calculate subtotal and total
  const subtotal = estimate.items?.reduce((sum: number, item) => sum + (item.unitPrice * item.quantity), 0) || 0;
  // You can add tax/discount logic here if needed
  const total = subtotal;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id={`estimate-modal-title-${estimate.id}`}>
          Estimate Template#{estimate.id}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-md-2 d-flex flex-column">
              <div>nisha</div>
              <div>rana</div>
              <div>8770099047</div>
            </div>
            <div className="col-md-10">
              <div className="d-flex justify-content-end align-items-center h-100">
                <h4 className="fw-bold mb-0">ESTIMATE TEMPLATE</h4>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <strong>Name</strong>
            <div>{estimate.name}</div>
          </div>
          <div className="mb-3">
            <strong>Description</strong>
            <div>{estimate.description || '--'}</div>
          </div>
          <div className="mb-4">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price ({estimate.currency})</th>
                  <th>Tax</th>
                  <th>Amount ({estimate.currency})</th>
                </tr>
              </thead>
              <tbody>
                {estimate.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.description || item.name || '-'}</td>
                    <td>
                      {item.quantity} <span className="text-muted">{item.unit}</span>
                    </td>
                    <td>{item.unitPrice?.toFixed(2)}</td>
                    <td>{item.tax !== undefined && item.tax !== null ? `${item.tax}%` : '-'}</td>
                    <td>
                      {(item.unitPrice * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="text-end">Sub Total</td>
                  <td>{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end fw-bold">Total</td>
                  <td className="fw-bold">{total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <div className="text-end">
              <div className="fw-bold">Terms and Conditions</div>
              <div>Thank you for your business.</div>
            </div>
          </div>
          <div className="mt-4">
            <Button color="light" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewEstimateModal;