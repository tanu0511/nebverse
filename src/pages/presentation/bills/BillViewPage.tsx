/* eslint-disable prefer-template */
import React, { useRef, useState } from 'react';

const BillViewPage = ({ bill, onClose }: { bill: any, onClose: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!bill) return null;

  // Calculate totals
  const items = bill.items || [];
  const subTotal = items.reduce((sum: number, item: any) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);
  const discountAmount = (subTotal * (bill.discount || 0)) / 100;
  const totalTax = items.reduce((sum: number, item: any) => sum + Number(item.tax || 0), 0);
  const total = subTotal - discountAmount + totalTax;

  // Download as JSON (for demo)
  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bill, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `bill_${bill.purchaseBillNumber || 'download'}.json`);
    dlAnchorElem.click();
  };

  // Print as PDF (browser print dialog)
  const handleViewPDF = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const win = window.open('', '', 'height=700,width=900');
      if (win) {
        win.document.write('<html><head><title>Bill PDF</title>');
        win.document.write('<style>body{font-family:sans-serif;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ccc;padding:8px;} .text-end{text-align:right;} .fw-bold{font-weight:bold;} .bg-light{background:#f5f7fa;}</style>');
        win.document.write('</head><body>');
        win.document.write(printContents);
        win.document.write('</body></html>');
        win.document.close();
        win.print();
      }
    }
  };

  // Simulate send
  const handleSend = () => {
    alert('Bill sent successfully!');
    setDropdownOpen(false);
  };

  return (
    <div className="card p-4">
      <div ref={printRef}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          {/* Left: Company & Billed To */}
          <div>
            <img src="/logo192.png" alt="Logo" style={{ width: 60, borderRadius: '50%' }} />
            <div className="mt-2 mb-3">
              <div><b>{bill.companyName || ''}</b></div>
              <div>{bill.companyPhone || ''}</div>
            </div>
            <div className="fw-bold text-muted mb-1">Billed To</div>
            <div>{bill.billedToName || ''}</div>
            <div>{bill.billedToEmail || ''}</div>
            <div>{bill.billedToPhone || ''}</div>
            <div>{bill.billedToAddress || ''}</div>
          </div>
          {/* Right: Bill Info */}
          <div>
            <div className="fw-bold fs-4 text-end mb-2">BILL</div>
            <table className="table table-bordered mb-0">
              <tbody>
                <tr>
                  <td className="fw-bold">Bill Number</td>
                  <td>{bill.purchaseBillNumber}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Bill Date</td>
                  <td>{bill.billDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Items Table and Summary */}
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Hsn/Sac</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td>{item.description}</td>
                    <td>{item.hsn || ''}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.tax}</td>
                    <td>{(Number(item.quantity) * Number(item.unitPrice) + Number(item.tax || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Summary Table aligned left */}
            <div className="mt-2" style={{ maxWidth: 400 }}>
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td className="text-end border-0">Sub Total</td>
                    <td className="text-end border-0">{subTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="text-end border-0">Discount</td>
                    <td className="text-end border-0">
                      {bill.discount ? `${bill.discount} %` : '0 %'}
                      <span className="ms-2">{discountAmount.toFixed(2)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end border-0">Tax</td>
                    <td className="text-end border-0">{totalTax.toFixed(2)}</td>
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
        {/* Note Section */}
        <div className="mt-4">
          <div><b>Note</b></div>
          <div>{bill.note ? bill.note : '--'}</div>
          <div className="text-muted mt-2">Note : Tax is calculating after discount.</div>
        </div>
      </div>
      {/* Action Button */}
      <div className="mt-4">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div className="btn-group">
            <button
              className="btn btn-dark"
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              Actions
            </button>
            <button
              type="button"
              className="btn btn-dark dropdown-toggle dropdown-toggle-split"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-expanded={dropdownOpen}
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            {dropdownOpen && (
              <ul
                className="dropdown-menu show"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '100%',
                  zIndex: 1000,
                }}
              >
                <li>
                  <button className="dropdown-item" type="button" onClick={handleSend}>
                    Send
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button" onClick={handleDownload}>
                    Download
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button" onClick={handleViewPDF}>
                    View PDF
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="text-end mt-3">
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BillViewPage;