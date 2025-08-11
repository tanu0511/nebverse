import React, { useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

interface Tax {
  name: string;
  rate: string;
}

interface TaxModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  taxes: Tax[];
  setTaxes: React.Dispatch<React.SetStateAction<Tax[]>>;
}

const TaxModal: React.FC<TaxModalProps> = ({ isOpen, setIsOpen, taxes, setTaxes }) => {
  const [taxName, setTaxName] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const handleAddTax = () => {
    if (taxName && taxRate) {
      setTaxes([...taxes, { name: taxName, rate: taxRate }]);
      setTaxName('');
      setTaxRate('');
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="tax-modal-title">Tax</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Tax Name</th>
                <th>Rate %</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((tax, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{tax.name}</td>
                  <td>{tax.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label" htmlFor="tax-name-input">Tax Name <span className="text-danger">*</span></label>
            <Input id="tax-name-input" value={taxName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxName(e.target.value)} />
          </div>
          <div className="col-md-5">
            <label className="form-label" htmlFor="tax-rate-input">Rate <span className="text-danger">*</span></label>
            <Input id="tax-rate-input" value={taxRate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxRate(e.target.value)} />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isOutline onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleAddTax} isDisable={!taxName || !taxRate}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaxModal;