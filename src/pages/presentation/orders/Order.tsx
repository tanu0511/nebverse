
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';
import CreateOrderModal from './CreateOrderModal';
import Icon from '../../../components/icon/Icon';
import PaginationButtons from '../../../components/PaginationButtons';
import ViewOrderModal from './ViewOrderModal';

const formatDateTime = (date: string | Date | null | undefined) => date ? new Date(date).toLocaleDateString() : '';
const formatCurrency = (amount: number) => `₹${amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

// TableRow is a TypeScript interface defined right here.
// It describes the shape of each row in your order table.
interface OrderRow {
  id?: number; // Made optional
  orderNumber: string;
  client: string;
  clientCompany: string;
  total: number;
  date: string | Date;
  status: string;
  products: any[];        // Products in the order
  clientNote: string;     // Note from client
  discount: number;       // Discount amount
  discountType: string;   // Discount type (e.g., %, flat)
  tax: number;
}

// Add this above your component
const statusOptions = [
  { label: 'Pending', color: 'gold', bg: 'bg-warning' },
  { label: 'On Hold', color: 'teal', bg: 'bg-info' },
  { label: 'Failed', color: 'black', bg: 'bg-dark' },
  { label: 'Processing', color: 'dodgerblue', bg: 'bg-primary' },
  { label: 'Completed', color: 'green', bg: 'bg-success' },
  { label: 'Refunded', color: '#21242a', bg: 'bg-dark' },
  { label: 'Canceled', color: 'red', bg: 'bg-danger' },
];

type Utility = {
  id: string;
  text: string;
  icon: string;
  path: string;
};

const utilities: Record<string, Utility> = {}; // Replace with actual initialization

const handleDownload = (order: OrderRow) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(order, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `order_${order.orderNumber}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const Order = () => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [tableData, setTableData] = useState<OrderRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [actionDropdownIdx, setActionDropdownIdx] = useState<number | null>(null);
  const [statusDropdownIdx, setStatusDropdownIdx] = useState<number | null>(null);
  const [viewOrder, setViewOrder] = useState<OrderRow | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [pendingStatusRowId, setPendingStatusRowId] = useState<number | null>(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [editOrder, setEditOrder] = useState<OrderRow | null>(null);
  const bankAccounts = [
    { value: '', label: 'Select bank account' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'sbi', label: 'SBI Bank' },
    { value: 'icici', label: 'ICICI Bank' },
  ];

  // Pagination logic
  const paginatedData = tableData.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Handle new order from modal
  const handleOrderCreate = (order: OrderRow) => {
    if (editOrder) {
      // Update existing order
      setTableData(prev =>
        prev.map(item => item.id === editOrder.id ? { ...item, ...order, id: editOrder.id } : item)
      );
      setEditOrder(null);
    } else {
      // Add new order
      setTableData(prev => [
        ...prev,
        { ...order, id: Date.now()}
      ]);
    }
    setShowCreateOrder(false);
  };

  // Also, add this to close the dropdown when clicking outside:
  useEffect(() => {
    const close = () => setStatusDropdownIdx(null);
    if (statusDropdownIdx !== null) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [statusDropdownIdx]);

  useEffect(() => {
    const close = () => setActionDropdownIdx(null);
    if (actionDropdownIdx !== null) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [actionDropdownIdx]);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-3 gap-2">
        <Button color="primary" className="px-4" onClick={() => setShowCreateOrder(true)}>
          <i className="fa fa-plus me-2" /> Add New Order
        </Button>
        <Button color="secondary" className="px-4">
          <i className="fa fa-file-export me-2" /> Export
        </Button>
      </div>
      <div className="card p-3">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Client</th>
              <th>Total</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {paginatedData.length === 0 ? (
    <tr>
      <td colSpan={10} className="text-center text-muted">
        No record found.
      </td>
    </tr>
  ) : (
    paginatedData.map((row) => (
      <tr key={row.id}>
        <td>{row.orderNumber}</td>
        <td>
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://via.placeholder.com/32"
              alt="avatar"
              className="rounded-circle"
            />
            <div>
              <div>{row.client}</div>
              <div className="text-muted small">{row.clientCompany}</div>
            </div>
          </div>
        </td>
        <td>{formatCurrency(row.total)}</td>
        <td>{formatDateTime(row.date)}</td>
        <td style={{ position: "relative" }}>
          <Button
            color="light"
            size="sm"
            className="d-flex align-items-center"
            isDisable={row.status === "Canceled" || row.status === "Refunded"}
            style={{
              minWidth: 120,
              borderRadius: 12,
              background: "#f1f5fb",
              opacity:
                row.status === "Canceled" || row.status === "Refunded" ? 0.6 : 1,
              pointerEvents:
                row.status === "Canceled" || row.status === "Refunded"
                  ? "none"
                  : "auto",
            }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              if (
                row.status !== "Canceled" &&
                row.status !== "Refunded" &&
                row.id !== undefined
              ) {
                setStatusDropdownIdx(row.id);
              }
            }}
          >
            <span
              className="me-2 rounded-circle"
              style={{
                width: 10,
                height: 10,
                display: "inline-block",
                background:
                  statusOptions.find((opt) => opt.label === row.status)?.color ||
                  "gray",
              }}
            ></span>
            <span style={{ fontWeight: 500 }}>{row.status}</span>
            <i className="fa fa-caret-down ms-1" />
          </Button>
          {statusDropdownIdx === row.id &&
            row.status !== "Canceled" &&
            row.status !== "Refunded" && (
              <div
                className="shadow border rounded bg-white position-absolute"
                style={{ zIndex: 10, minWidth: 160, left: 0, top: "110%" }}
                onClick={(e) =>
                  (e as React.MouseEvent<HTMLDivElement>).stopPropagation()
                }
              >
                {(row.status === "Completed"
                  ? statusOptions.filter(
                      (opt) =>
                        opt.label === "Completed" || opt.label === "Refunded"
                    )
                  : statusOptions.filter((opt) => opt.label !== "Refunded")
                ).map((opt) => (
                  <div
                    key={opt.label}
                    className="dropdown-item d-flex align-items-center"
                    style={{
                      cursor: row.status === "Refunded" ? "not-allowed" : "pointer",
                      padding: "10px 16px",
                      background:
                        row.status === opt.label ? "#e9f3ff" : undefined,
                      fontWeight: row.status === opt.label ? 600 : 400,
                      opacity:
                        row.status === "Refunded" && opt.label === "Refunded"
                          ? 0.6
                          : 1,
                    }}
                    onClick={() => {
                      if (row.status === "Refunded") return;
                      setPendingStatus(opt.label);
                      setPendingStatusRowId(row.id ?? null);
                      setShowStatusAlert(true);
                      setStatusDropdownIdx(null);
                    }}
                  >
                    <span
                      className="me-2 rounded-circle"
                      style={{
                        width: 14,
                        height: 14,
                        display: "inline-block",
                        background: opt.color,
                      }}
                    ></span>
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
        </td>
        <td style={{ position: "relative" }}>
          <Button
            color="secondary"
            size="sm"
            onClick={() => {
              setViewOrder(row);
              setShowViewModal(true);
            }}
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            title="View"
          >
            View
          </Button>
          <Button
            color="light"
            size="sm"
            className="border-start-0"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={(eve: React.MouseEvent<HTMLButtonElement>) => {
              eve.stopPropagation();
              setActionDropdownIdx(
                row.id !== undefined && row.id === actionDropdownIdx
                  ? null
                  : row.id ?? null
              );
            }}
            title="Action"
          >
            <Icon icon="MoreVert" />
          </Button>
          {actionDropdownIdx === row.id && (
            <div
              className="shadow border rounded bg-white position-absolute"
              style={{ zIndex: 20, minWidth: 180, right: 0, top: "110%" }}
              onClick={(e) => e.stopPropagation()}
            >
              {(row.status === "Canceled" || row.status === "Refunded") ? (
                <>
                  <div
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      handleDownload(row);
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Download" />
                    Download
                  </div>
                  <div
                    className="dropdown-item d-flex align-items-center text-danger"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      setTableData((data) =>
                        data.filter((r) => r.id !== row.id)
                      );
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Delete" /> Delete
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      setTableData((data) =>
                        data.map((r) =>
                          r.id === row.id ? { ...r, status: "Completed" } : r
                        )
                      );
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Check" />
                    Mark as complete
                  </div>
                  <div
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      handleDownload(row);
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Download" />
                    Download
                  </div>
                  <div
                    className="dropdown-item d-flex align-items-center"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      setEditOrder(row);
                      setShowCreateOrder(true);
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Edit" />
                    Edit
                  </div>
                  <div
                    className="dropdown-item d-flex align-items-center text-danger"
                    style={{ cursor: "pointer", padding: "10px 16px" }}
                    onClick={() => {
                      setTableData((data) =>
                        data.filter((r) => r.id !== row.id)
                      );
                      setActionDropdownIdx(null);
                    }}
                  >
                    <Icon icon="Delete" /> Delete
                  </div>
                </>
              )}
            </div>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
        {/* Pagination */}
        <PaginationButtons
  data={tableData}
  label="Orders"
  setCurrentPage={setCurrentPage}
  currentPage={currentPage}
  perPage={perPage}
  setPerPage={setPerPage}
/>
      </div>
      <CreateOrderModal
  isOpen={showCreateOrder}
  onClose={() => {
    setShowCreateOrder(false);
    setEditOrder(null); // Clear edit state on close
  }}
  onOrderCreate={handleOrderCreate}
  editOrder={editOrder ? { ...editOrder, id: String(editOrder.id) } : null}
/>

      <ViewOrderModal
      isOpen={showViewModal}
      onClose={()=> setShowViewModal(false)}
      order ={viewOrder}/>

      {showStatusAlert && (
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
              if (pendingStatus && pendingStatusRowId !== null) {
                if (pendingStatus === 'Completed') {
                  setShowBankModal(true);
                  // DO NOT clear pendingStatusRowId or pendingStatus here!
                } else {
                  setTableData(data =>
                    data.map(r =>
                      r.id === pendingStatusRowId ? { ...r, status: pendingStatus } : r
                    )
                  );
                  setPendingStatus(null);
                  setPendingStatusRowId(null);
                }
              }
              setShowStatusAlert(false);
            }}
          >Yes</Button>
          <Button
            color="light"
            onClick={() => {
              setShowStatusAlert(false);
              setPendingStatus(null);
              setPendingStatusRowId(null);
            }}
          >Cancel</Button>
        </div>
      </div>
    </div>
  </div>
)}

{showBankModal && (
  <div className="modal fade show d-block" tabIndex={-1} style={{
    background: 'rgba(0,0,0,0.2)',
    position: 'fixed',
    left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 2100
  }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content text-center p-4">
        <div className="fw-bold fs-5 mb-3">Select bank account</div>
        <select
          className="form-select mb-4"
          value={selectedBank}
          onChange={e => setSelectedBank(e.target.value)}
        >
          {bankAccounts.map(acc => (
            <option key={acc.value} value={acc.value}>{acc.label}</option>
          ))}
        </select>
        <div className="d-flex justify-content-center gap-3">
          <Button
            color="primary"
            isDisable={!selectedBank}
            onClick={() => {
              setTableData(data =>
                data.map(r =>
                  r.id === pendingStatusRowId ? { ...r, status: 'Completed', bank: selectedBank } : r
                )
              );
              setShowBankModal(false);
              setSelectedBank('');
              setPendingStatus(null);
              setPendingStatusRowId(null);
             
            }}
          >OK</Button>
          <Button
            color="secondary"
            onClick={() => {
              setShowBankModal(false);
              setSelectedBank('');
            }}
          >Cancel</Button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Order;