import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Icon from '../../../components/icon/Icon';
import StockAdjustmentReasonModal from './StockAdjustmentReasonModal';

export interface IAddNoticeModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddInventory: (data: any) => void;
  defaultValues?: any;
}

const AddInventory: FC<IAddNoticeModalProps> = ({
  isOpen,
  setIsOpen,
  onAddInventory,
  defaultValues,
}) => {
  const [mode, setMode] = useState<'quantity' | 'value'>('quantity');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [product1OnHand, setProduct1OnHand] = useState('5');
  const [product2OnHand, setProduct2OnHand] = useState('8');
  const [reasonOptions, setReasonOptions] = useState<string[]>(['Damaged', 'Lost', 'Expired']);

  const product1Available = 10;
  const product2Available = 20;

  const product1Adjusted = product1Available - Number(product1OnHand || 0);
  const product2Adjusted = product2Available - Number(product2OnHand || 0);

  const handleSubmit = () => {
    onAddInventory({
      mode,
      referenceNumber,
      date,
      reason,
      description,
      file,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setReferenceNumber(defaultValues?.referenceNumber || '');
      setDate(defaultValues?.date ? dayjs(defaultValues.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
      setReason(defaultValues?.reason || '');
      setDescription(defaultValues?.description || '');
      setFile(defaultValues?.file || null);
      setMode(defaultValues?.mode || 'quantity');
      setProduct1OnHand(defaultValues?.product1OnHand || '5');
      setProduct2OnHand(defaultValues?.product2OnHand || '8');
    }
  }, [isOpen, defaultValues]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <ModalHeader>
        <h4 className="fw-bold mb-0">Add Inventory</h4>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          style={{ position: 'absolute', right: 24, top: 24 }}
        />
      </ModalHeader>
      <ModalBody>
        <div className="card shadow-sm rounded-3 p-4">
          <h5 className="mb-4">Add Inventory</h5>
          <div className="row g-3 align-items-end">
            {/* Mode Of adjustment */}
            <FormGroup label="Mode Of adjustment *" className="col-md-12 mb-0">
              <div className="d-flex align-items-center gap-4">
                <label className="me-3 mb-0">
                  <input
                    type="radio"
                    name="mode"
                    value="quantity"
                    checked={mode === 'quantity'}
                    onChange={() => setMode('quantity')}
                    className="me-2"
                  />
                  Quantity adjustment
                </label>
                <label className="mb-0">
                  <input
                    type="radio"
                    name="mode"
                    value="value"
                    checked={mode === 'value'}
                    onChange={() => setMode('value')}
                    className="me-2"
                  />
                  Value adjustment
                </label>
              </div>
            </FormGroup>
            {/* Reference number */}
            <FormGroup label="Reference number" className="col-md-4 mb-0">
              <Input
                name="referenceNumber"
                value={referenceNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferenceNumber(e.target.value)}
                placeholder=""
              />
            </FormGroup>
            {/* Date */}
            <FormGroup label="Date *" className="col-md-4 mb-0">
              <Input
                name="date"
                type="date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                required
              />
            </FormGroup>
            {/* Reason */}
            <FormGroup label="Reason *" className="col-md-4 mb-0">
              <div className="input-group">
                <Select
                  name="reason"
                  value={reason}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReason(e.target.value)}
                  className="form-select"
                  ariaLabel="Reason"
                >
                  {reasonOptions.filter(opt => opt !== '--').map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
                <Button
                  type="button"
                  color="light"
                  className="input-group-text"
                  onClick={() => setShowReasonModal(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
          </div>
          {/* Description */}
          <FormGroup label="Description" className="mt-4">
            <textarea
              name="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              rows={3}
            />
          </FormGroup>
          {/* Product Row */}
          <div className="mt-4">
            <div className="input-group" style={{ maxWidth: 400 }}>
              <Select
                name="product"
                value={selectedProduct}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProduct(e.target.value)}
                className="form-select"
                ariaLabel="Select Product"
              >
                <option value="">Select Product</option>
                <option value="Product 1">Product 1</option>
                <option value="Product 2">Product 2</option>
              </Select>
              <Button type="button" color="light" className="input-group-text">
                <Icon icon="FilterAlt" />
              </Button>
            </div>

            {/* Table for Product 1 */}
            {selectedProduct === 'Product 1' && (
              <div className="table-responsive mt-3">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="text-muted" style={{ minWidth: 200 }}>Description</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Available quantity</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Quantity on hand</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Quantity adjusted</th>
                      <th style={{ width: 40 }} />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          type="text"
                          className="form-control bg-light"
                          value="laptop"
                          readOnly
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Input type="text" className="form-control bg-light" value={product1Available} readOnly />
                          <span className="ms-2 text-muted">Pcs</span>
                        </div>
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="form-control"
                          value={product1OnHand}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduct1OnHand(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control bg-light"
                          value={isNaN(product1Adjusted) ? '' : product1Adjusted}
                          readOnly
                        />
                      </td>
                      <td className="text-center align-middle">
                        <Button
                          color="link"
                          className="p-0"
                          onClick={() => setSelectedProduct('')}
                        >
                          <Icon icon="Close" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} style={{ borderTop: 'none' }}>
                        <textarea className="form-control" rows={2} placeholder="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Table for Product 2 */}
            {selectedProduct === 'Product 2' && (
              <div className="table-responsive mt-3">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="text-muted" style={{ minWidth: 200 }}>Description</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Available quantity</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Quantity on hand</th>
                      <th className="text-muted text-center" style={{ minWidth: 180 }}>Quantity adjusted</th>
                      <th style={{ width: 40 }} />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          type="text"
                          className="form-control bg-light"
                          value="desktop"
                          readOnly
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Input type="text" className="form-control bg-light" value={product2Available} readOnly />
                          <span className="ms-2 text-muted">Pcs</span>
                        </div>
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="form-control"
                          value={product2OnHand}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduct2OnHand(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control bg-light"
                          value={isNaN(product2Adjusted) ? '' : product2Adjusted}
                          readOnly
                        />
                      </td>
                      <td className="text-center align-middle">
                        <Button
                          color="link"
                          className="p-0"
                          onClick={() => setSelectedProduct('')}
                        >
                          <Icon icon="Close" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} style={{ borderTop: 'none' }}>
                        <textarea className="form-control" rows={2} placeholder="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Add files */}
          <div className="mt-4">
            <label className="form-label" htmlFor="file-upload">Add files</label>
            <div
              className="bg-white border rounded d-flex justify-content-center align-items-center"
              style={{ minHeight: 100, borderStyle: 'dashed', borderWidth: 1 }}
            >
              <input
                type="file"
                style={{ display: 'none' }}
                id="file-upload"
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="file-upload" style={{ width: '100%', textAlign: 'center', cursor: 'pointer', padding: 24 }}>
                {file ? file.name : 'Choose a file'}
              </label>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} isDisable={!reason}>
          Save
        </Button>
        <Button color="light" className="ms-2">
          Save As Draft
        </Button>
        <Button color="light" onClick={() => setIsOpen(false)} className="ms-2">
          Cancel
        </Button>
      </ModalFooter>
      <StockAdjustmentReasonModal
        isOpen={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        reasons={reasonOptions}
        setReasons={setReasonOptions}
      />
    </Modal>
  );
};

export default AddInventory;