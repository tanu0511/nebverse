import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

const formatCurrency = (amount: number) => `₹${amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
const formatDateTime = (date: string | Date | null | undefined) => date ? new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '';

const STATUS_COLORS: Record<string, string> = {
  Pending: '#ffc107',
  'On Hold': '#17a2b8',
  Failed: '#6c757d',
  Processing: '#007bff',
  Completed: '#28a745',
  Canceled: '#dc3545',
};

const ViewOrderModal = ({ isOpen, onClose, order }: {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onStatusChange?: (status: string) => void; // Optional callback for status change
}) => {
  const [actionOpen, setActionOpen] = useState(false);


  if (!isOpen || !order) return null;

  // Alert modal JSX

    <div className="modal fade show d-block" tabIndex={-1} style={{
      background: 'rgba(0,0,0,0.2)',
      position: 'fixed',
      left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 2000
    }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <div className="mb-3">
            <span style={{
              display: 'inline-block',
              border: '4px solid #ffc107',
              borderRadius: '50%',
              width: 80,
              height: 80,
              lineHeight: '80px'
            }}>
              <span style={{ fontSize: 48, color: '#ffc107' }}>!</span>
            </span>
          </div>
          <div className="fw-bold fs-5 mb-2">Are you sure you want to change the order status?</div>
          <div className="mb-4 text-muted" style={{ fontSize: 15 }}>
            On hold order is waiting for payment or payment is pending.
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Button
              color="primary"
              onClick={() => {
              
                setActionOpen(false);
    
              }}
            >Yes</Button>
            <Button
              color="light"
              onClick={() => {
            
              }}
            >Cancel</Button>
          </div>
        </div>
      </div>
    </div>

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <img src="https://i.ibb.co/0j1Yw7v/logo.png" alt="logo" style={{ width: 60, borderRadius: '50%' }} />
                  <div className="mt-2">Nisha<br />Nisha<br />8770099047</div>
                  <div className="mt-3">
                    <b>Billed To:</b><br />
                    {order.client}<br />
                    {order.clientCompany}
                  </div>
                </div>
                <div className="text-end">
                  <h4 className="fw-bold">ORDER</h4>
                  <div className="d-flex justify-content-end mb-3">
                    <div style={{ position: 'relative' }}>
                      <Button
                        color="primary"
                        onClick={() => setActionOpen((open) => !open)}
                        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                      >
                        Action <span>{actionOpen ? <>&#9650;</> : <>&#9660;</>}</span>
                      </Button>
                      {actionOpen && (
                        <div
                          className="shadow border rounded bg-white position-absolute"
                          style={{ zIndex: 30, minWidth: 180, right: 0, top: '110%' }}
                          onClick={e => e.stopPropagation()}
                        >
                          <div
                            className="dropdown-item d-flex align-items-center"
                            style={{ cursor: 'pointer', padding: '10px 16px' }}
                            onClick={() => {
                              // Download logic here
                              setActionOpen(false);
                            }}
                          >
                            <Icon icon="download" /> Download
                          </div>
                          <div
                            className="dropdown-item d-flex align-items-center"
                            style={{ cursor: 'pointer', padding: '10px 16px' }}
                            onClick={() => {
                             
                            }}
                          >
                            <Icon icon="Check" /> Mark as complete
                          </div>
                          <div
                            className="dropdown-item d-flex align-items-center text-danger"
                            style={{ cursor: 'pointer', padding: '10px 16px' }}
                            onClick={() => {
                              // Delete logic here
                              setActionOpen(false);
                            }}
                          >
                            <Icon icon="Delete" /> Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Order Number</td>
                        <td>{order.orderNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Order Date</td>
                        <td>{formatDateTime(order.date)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-2">
                    <span
                      className="border px-4 py-2 rounded"
                      style={{
                        color: STATUS_COLORS[order.status] || '#333',
                        borderColor: STATUS_COLORS[order.status] || '#333',
                        fontWeight: 500,
                        background: 'transparent',
                        display: 'inline-block'
                      }}
                    >
                      {order.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>SKU</th>
                      <th>Unit Price (INR)</th>
                      <th>Tax</th>
                      <th>Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((prod: any, idx: number) => (
                      <tr key={idx}>
                        <td>
                          {prod.name}
                          {prod.description && <div className="text-muted small">{prod.description}</div>}
                        </td>
                        <td>
                          {prod.quantity} <span className="text-muted small">{prod.unit}</span>
                        </td>
                        <td>{prod.sku}</td>
                        <td>{formatCurrency(Number(prod.price))}</td>
                        <td>{prod.tax}</td>
                        <td>{formatCurrency(Number(prod.price) * Number(prod.quantity))}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5} className="text-end fw-bold">Sub Total</td>
                      <td>{formatCurrency(order.products.reduce((sum: number, p: any) => sum + Number(p.price) * Number(p.quantity), 0))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {order.clientNote && (
                <div className="mt-3">
                  <b>Client Note:</b>
                  <div className="border rounded p-2 bg-light">{order.clientNote}</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <Button color="secondary" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default ViewOrderModal;