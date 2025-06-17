/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Dropdown from '../../../components/bootstrap/Dropdown';
import { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';

import Icon from '../../../components/icon/Icon';
import Modal from '../../../components/bootstrap/Modal';
import BillViewPage from './BillViewPage';

// Example purchase orders data
const PURCHASE_ORDERS = [
  {
    id: 'PO001',
    label: 'PO #001',
    items: [
      {
        description: 'Item A',
        hsn: '',
        quantity: 2,
        unitPrice: 100,
        tax: 10,
      },
      {
        description: 'Item B',
        hsn: '',
        quantity: 1,
        unitPrice: 200,
        tax: 20,
      },
    ],
  },
  // Add more purchase orders as needed
];

type BillFormPageProps = {
  onClose: () => void;
  onSave: (bill: any) => void;
  initialValues?: any;
};

const BillFormPage: React.FC<BillFormPageProps> = ({ onClose, onSave, initialValues }) => {
  const [billNumber, setBillNumber] = useState(initialValues?.purchaseBillNumber || '');
  const [vendor, setVendor] = useState(initialValues?.vendor || '');
  const [billDate, setBillDate] = useState(initialValues?.billDate || '');
  const [purchaseOrder, setPurchaseOrder] = useState(initialValues?.purchaseOrder || '');
  const [note, setNote] = useState(initialValues?.note || '');
  const [discount, setDiscount] = useState(initialValues?.discount || 0);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewingBill, setViewingBill] = useState<any | null>(null);
  const [items, setItems] = useState([
    { description: '', hsn: '', quantity: 1, unitPrice: 0, tax: 0 }
  ]);

  // Update local state when initialValues changes (important for editing)
  React.useEffect(() => {
    setBillNumber(initialValues?.purchaseBillNumber || '');
    setVendor(initialValues?.vendor || '');
    setBillDate(initialValues?.billDate || '');
    setPurchaseOrder(initialValues?.purchaseOrder || '');
    setNote(initialValues?.note || '');
    setDiscount(initialValues?.discount || 0);
  }, [initialValues]);

  // Find selected purchase order
  const selectedPO = PURCHASE_ORDERS.find(po => po.id === purchaseOrder);

  // When purchase order changes, update items state
  React.useEffect(() => {
    if (selectedPO) {
      setItems(selectedPO.items.map(item => ({
        description: item.description || '',
        hsn: item.hsn || '',
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
        tax: item.tax || 0,
      })));
    } else {
      setItems([{ description: '', hsn: '', quantity: 1, unitPrice: 0, tax: 0 }]);
    }
  }, [selectedPO]);

  // Calculate subtotal, discount, tax, and total from items state
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = items.reduce((sum, item) => sum + item.tax, 0);
  const total = subtotal - discountAmount + taxAmount;

  const handleSubmit = (status: string) => {
    if (!billNumber.trim()) {
      setError('Bill Number is required');
      return;
    }
    setError('');
    onSave({
      purchaseBillNumber: billNumber,
      vendor,
      billDate,
      purchaseOrder,
      note,
      status,
      discount,
      total: total.toFixed(2),
      items,
    });
  };

  const handleSave = () => {
    onSave({
      purchaseBillNumber: billNumber,
      vendor,
      billDate,
      purchaseOrder,
      items,
      discount,
      note,
      status: '', // or whatever status you want
      total: total.toFixed(2),
    });
  };

  return (
    <div className="card p-4">
      <h4 className="mb-4">Create Bill</h4>
      <form onSubmit={e => { e.preventDefault(); handleSubmit('Draft'); }}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Bill Number <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">BL#00</span>
              <input
                className="form-control"
                type="text"
                value={billNumber}
                onChange={e => setBillNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Select Vendor</label>
            <select
              className="form-select"
              value={vendor}
              onChange={e => setVendor(e.target.value)}
            >
              <option value="">--</option>
              {/* Add vendor options here */}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Bill Date</label>
            <input
              className="form-control"
              type="date"
              value={billDate}
              onChange={e => setBillDate(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Purchase Order</label>
            <select
              className="form-select"
              value={purchaseOrder}
              onChange={e => setPurchaseOrder(e.target.value)}
            >
              <option value="">--</option>
              {PURCHASE_ORDERS.map(po => (
                <option key={po.id} value={po.id}>{po.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Tax</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.tax}</td>
                  <td>{(item.quantity * item.unitPrice + item.tax).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Summary Table */}
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6">
              <table className="table table-bordered mb-0">
                <tbody>
                  <tr>
                    <td className="text-end" style={{ width: '40%' }}>Sub Total</td>
                    <td className="text-end" style={{ width: '60%' }}>
                      {subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end align-middle">Discount</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="number"
                          min="0"
                          className="form-control form-control-sm me-2"
                          style={{ width: 70 }}
                          value={discount}
                          onChange={e => setDiscount(Number(e.target.value))}
                        />
                        <span className="input-group-text px-2" style={{ height: '30px' }}>%</span>
                        <span className="ms-auto">{discountAmount.toFixed(2)}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end">Tax</td>
                    <td className="text-end">{taxAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end bg-light">Total</td>
                    <td className="fw-bold text-end bg-light">{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Note for the Recipient</label>
          <textarea
            className="form-control"
            placeholder="e.g. Thank you for your business"
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
          />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="d-flex gap-2 align-items-center">
          <Dropdown
            isOpen={dropdownOpen}
            setIsOpen={setDropdownOpen}
            isButtonGroup
            direction="down"
          >
            <DropdownToggle key="toggle" hasIcon>
              <Button
                color="primary"
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                tabIndex={0}
              >
                Save
              </Button>
            </DropdownToggle>
            <DropdownMenu key="menu">
              <DropdownItem onClick={() => { setDropdownOpen(false); handleSubmit('Draft'); }}>
                <span>
                  <Icon icon="save" className="me-2" />
                  Save as Draft
                </span>
              </DropdownItem>
              <DropdownItem onClick={() => { setDropdownOpen(false); handleSubmit('Open'); }}>
                <span>
                  <Icon icon="send" className="me-2" />
                  Save as Open
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="secondary" isOutline type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>

      {/* Add after your BillFormPage modal */}
      <Modal isOpen={!!viewingBill} setIsOpen={(open) => setViewingBill(open ? viewingBill : null)} title="Bill Details" size="xl">
        {viewingBill && (
          <BillViewPage bill={viewingBill} onClose={() => setViewingBill(null)} />
        )}
      </Modal>
    </div>
  );
};

export default BillFormPage;