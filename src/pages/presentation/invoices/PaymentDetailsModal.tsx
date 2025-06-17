import React, { useState, useEffect } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Textarea from '../../../components/bootstrap/forms/Textarea';

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: any;
  onAddPayment: () => void;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({ isOpen, onClose, invoice, onAddPayment }) => {
  const [amount, setAmount] = useState(invoice?.total ? String(invoice.total) : '');
  const [exchangeRate, setExchangeRate] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('');
  const [remark, setRemark] = useState('');
  const [currency, setCurrency] = useState('INR (₹)');
  const [bankAccount, setBankAccount] = useState('');
  const [, setReceipt] = useState<File | null>(null);

  // Update amount if invoice changes (when opening modal for a new invoice)
  useEffect(() => {
    setAmount(invoice?.total ? String(invoice.total) : '');
  }, [invoice]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} size="xl" isCentered>
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="payment-details-title">Payment details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="row g-3">
            <FormGroup label="Project" className="col-md-3">
              <Input value={invoice?.project || ''} readOnly />
            </FormGroup>
            <FormGroup label="Invoice" className="col-md-3">
              <Input value={invoice?.invoiceNumber || ''} readOnly />
            </FormGroup>
            <FormGroup label="Paid On" className="col-md-3">
              <Input value={new Date().toDateString()} readOnly />
            </FormGroup>
            <FormGroup label="Amount *" className="col-md-3">
              <Input
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </FormGroup>
            <FormGroup label="Currency" className="col-md-3">
              <Select
                value={currency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
                ariaLabel="Select Currency"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
              </Select>
            </FormGroup>
            <FormGroup label="Exchange Rate *" className="col-md-3">
              <Input
                value={exchangeRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExchangeRate(e.target.value)}
                placeholder="Enter exchange rate"
              />
            </FormGroup>
            <FormGroup label="Transaction Id" className="col-md-3">
              <Input
                value={transactionId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID of the payment"
              />
            </FormGroup>
            <FormGroup label="Payment Gateway" className="col-md-3">
              <Select
                value={paymentGateway}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentGateway(e.target.value)}
                ariaLabel="Select Payment Gateway"
              >
                <option value="">--</option>
                <option value="razorpay">Razorpay</option>
                <option value="stripe">Stripe</option>
              </Select>
            </FormGroup>
            <FormGroup label="Bank Account" className="col-md-3">
              <Select
                value={bankAccount}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBankAccount(e.target.value)}
                ariaLabel="Select Bank Account"
              >
                <option value="">--</option>
              </Select>
            </FormGroup>
            <FormGroup label="Receipt" className="col-md-9">
              <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReceipt(e.target.files ? e.target.files[0] : null)}
              />
            </FormGroup>
            <FormGroup label="Remark" className="col-12">
              <Textarea
                value={remark}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRemark(e.target.value)}
                placeholder="Enter a summary of the payment."
              />
            </FormGroup>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onAddPayment}>Save Payment</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentDetailsModal;