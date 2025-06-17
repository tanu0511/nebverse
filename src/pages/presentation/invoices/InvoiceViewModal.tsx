import React from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface Invoice {
  logoUrl?: string;
  companyName?: string;
  companyContact?: string;
  companyPhone?: string;
  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;
  invoiceNumber?: string;
  invoiceDate?: string | Date;
  dueDate?: string | Date;
  status?: string;
  description?: string;
  quantity?: number;
  unitPrice?: number;
  tax?: number;
  amount?: number;
  note?: string;
  subTotal?: number;
  discountPercent?: number;
  discount?: number;
  total?: number;
  paid?: number;
  unpaid?: number;
}

interface InvoiceViewModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  invoice?: Invoice;
}

const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({ isOpen, setIsOpen, invoice }) => {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <div className="modal-header">
        <h5 className="modal-title">Invoice</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-6">
            <img src={invoice.logoUrl || '/logo192.png'} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
            <div>{invoice.companyName}</div>
            <div>{invoice.companyContact}</div>
            <div>{invoice.companyPhone}</div>
            <br />
            <div><b>Billed To</b></div>
            <div>{invoice.clientName}</div>
            <div>{invoice.clientEmail}</div>
            <div>{invoice.clientCompany}</div>
          </div>
          <div className="col-6 text-end">
            <h4>INVOICE</h4>
            <div className="border p-2 mb-2 d-inline-block text-start">
              <div><b>Invoice Number</b>: {invoice.invoiceNumber}</div>
              <div><b>Invoice Date</b>: {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : ''}</div>
              <div><b>Due Date</b>: {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : ''}</div>
            </div>
            <div>
              <Button
                color={invoice.status?.toLowerCase() === 'paid' ? 'success' : 'danger'}
                style={{
                  border: '1px solid',
                  borderColor: invoice.status?.toLowerCase() === 'paid' ? '#28a745' : '#dc3545',
                  color: invoice.status?.toLowerCase() === 'paid' ? '#28a745' : '#dc3545',
                  background: 'transparent',
                  fontWeight: 600,
                  minWidth: 100,
                  textTransform: 'uppercase'
                }}
                isOutline
              >
                {invoice.status?.toUpperCase() || 'UNPAID'}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (INR)</th>
                <th>Tax</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoice.description}</td>
                <td>
                  <div>
                    <span style={{ fontWeight: 600 }}>{invoice.quantity}</span>
                    <div style={{ fontSize: 12, color: '#888' }}>Pcs</div>
                  </div>
                </td>
                <td>{invoice.unitPrice}</td>
                <td>{invoice.tax}</td>
                <td>{invoice.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mt-3"><b>Note</b></div>
            <div>{invoice.note}</div>
          </div>
          <div className="col-6">
            <table className="table">
              <tbody>
                <tr>
                  <td className="text-end">Sub Total</td>
                  <td className="text-end">{invoice.subTotal}</td>
                </tr>
                <tr>
                  <td className="text-end">Discount: {invoice.discountPercent}%</td>
                  <td className="text-end">{invoice.discount}</td>
                </tr>
                <tr>
                  <td className="text-end"><b>Total</b></td>
                  <td className="text-end"><b>{invoice.total}</b></td>
                </tr>
                <tr>
                  <td className="text-end">Total Paid</td>
                  <td className="text-end">{invoice.paid} INR</td>
                </tr>
                <tr>
                  <td className="text-end"><b>Total Due</b></td>
                  <td className="text-end"><b>{invoice.unpaid} INR</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-end mt-3">
          <div>Terms and Conditions</div>
          <div>Thank you for your business.</div>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceViewModal;