import React from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

const getCurrencySymbol = (currency?: string) => {
  if (!currency || currency.includes('INR') || currency.includes('₹')) return '₹';
  if (currency.includes('USD') || currency.includes('$')) return '$';
  return currency;
};

const EstimateView = ({ isOpen, setIsOpen, estimate }: any) => {
  if (!estimate) return null;

  const currencySymbol = getCurrencySymbol(estimate.currency);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id={`estimate-title-${estimate.estimate}`}>EST#{estimate.estimate}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="container-fluid py-4">
          <div className="row">
            {/* Left: Logo and client info */}
            <div className="col-md-8">
              <div className="d-flex align-items-start mb-3">
                <div>
                  <div>{estimate.clientName || 'nisha'}</div>
                  <div>{estimate.clientSurname || 'rana'}</div>
                  {estimate.clientPhone && <div>{estimate.clientPhone}</div>}
                </div>
              </div>
              <div className="mb-3">
                <div className="fw-bold">Billed To</div>
                <div>{estimate.billedToName || 'Akhilesh Gupta'}</div>
                <div>{estimate.billedToEmail || 'akhi@gmail.com'}</div>
                {estimate.billedToAddress && <div>{estimate.billedToAddress}</div>}
              </div>
              <div className="mb-2 fw-bold">Description</div>
              <div>{estimate.description || '--'}</div>
            </div>
            {/* Right: Estimate meta info */}
            <div className="col-md-4">
              <div className="float-end">
                <div className="fw-bold mb-2" style={{ fontSize: 20 }}>ESTIMATE</div>
                <table className="table table-bordered mb-2" style={{ width: 'auto' }}>
                  <tbody>
                    <tr>
                      <td>Estimate Number</td>
                      <td>{estimate.estimate}</td>
                    </tr>
                    <tr>
                      <td>Valid Till</td>
                      <td>{estimate.validTill}</td>
                    </tr>
                    <tr>
                      <td>Created</td>
                      <td>{estimate.created}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mb-2">
                  <Button color="danger" isOutline style={{ fontWeight: 500, fontSize: 16, borderRadius: 6, padding: '2px 18px' }} isDisable>
                    {estimate.status ? estimate.status.toUpperCase() : 'WAITING'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Items Table */}
          <div className="row mt-4">
            <div className="col-12">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price ({currencySymbol})</th>
                    <th>Tax</th>
                    <th>Amount ({currencySymbol})</th>
                  </tr>
                </thead>
                <tbody>
                  {(estimate.items || []).map((item: any, idx: number) => (
                    <tr key={idx}>
                      {/* Description */}
                      <td>
                        <div className="fw-semibold">{item.name || '-'}</div>
                        <div className="text-muted small">{item.description || '--'}</div>
                      </td>
                      {/* Quantity */}
                      <td>
                        <span className="fw-semibold">{item.quantity}</span>
                        <span className="text-muted ms-1">{item.unit}</span>
                      </td>
                      {/* Unit Price */}
                      <td>
                        <span className="fw-semibold">{currencySymbol} {item.unitPrice}</span>
                      </td>
                      {/* Tax */}
                      <td>{item.tax ? `${item.tax}%` : '--'}</td>
                      {/* Amount */}
                      <td>
                        {item.amount
                          ? `${currencySymbol} ${item.amount}`
                          : item.unitPrice
                          ? `${currencySymbol} ${(item.quantity * item.unitPrice).toFixed(2)}`
                          : '-'}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="text-end">Sub Total</td>
                    <td>{currencySymbol} {estimate.subTotal || estimate.total}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Total</td>
                    <td className="fw-bold">{currencySymbol} {estimate.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">Note</div>
            <div>{estimate.note || '--'}</div>
          </div>
          <div className="mt-3 text-end">
            <div className="d-inline-flex align-items-center gap-2">
              <Button color="light" isOutline onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
          <div className="mt-4 text-end text-muted" style={{ fontSize: 13 }}>
            <div>Terms and Conditions</div>
            <div>Thank you for your business.</div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EstimateView;