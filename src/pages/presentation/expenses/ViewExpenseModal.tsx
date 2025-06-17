import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ExpenseItem {
  id: number;
  itemName: string;
  price?: string;
  employee?: string;
  purchasedFrom?: string;
  purchaseDate?: string;
  status?: string;
  paymentMethod?: string;
  notes?: string;
  category?: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  expense?: ExpenseItem | null;
}

const ViewExpenseModal: React.FC<Props> = ({ isOpen, setIsOpen, expense }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Expense Details">
      <ModalHeader>
        <h4>Expense Details</h4>
      </ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Item Name</div>
            <div className="col-sm-8">{expense?.itemName || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Price</div>
            <div className="col-sm-8">{expense?.price || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Employee</div>
            <div className="col-sm-8">{expense?.employee || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Purchased From</div>
            <div className="col-sm-8">{expense?.purchasedFrom || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Purchase Date</div>
            <div className="col-sm-8">{expense?.purchaseDate || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Status</div>
            <div className="col-sm-8">{expense?.status || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Payment Method</div>
            <div className="col-sm-8">{expense?.paymentMethod || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Category</div>
            <div className="col-sm-8">{expense?.category || '--'}</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 text-muted">Notes</div>
            <div className="col-sm-8">{expense?.notes || '--'}</div>
          </div>
          <div className="text-end mt-4">
            <Button color="secondary" isLight onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExpenseModal;