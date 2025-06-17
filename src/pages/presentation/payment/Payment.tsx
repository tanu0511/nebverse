/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardActions } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import * as XLSX from 'xlsx';

interface PaymentData {
  code: string;
  project: string;
  invoice: string;
  client: string;
  order: string;
  amount: string;
  paidOn: string;
  paymentGateway: string;
  status: string;
  currency?: string;
  exchangeRate?: string;
  transactionId?: string;
  bankAccount?: string;
  remark?: string;
  receipt?: string; // (URL or base64 string)
}

const staticInvoices = [
  {
    invoiceNumber: 'INV#001',
    paymentDate: '2025-06-06',
    paymentMethod: '',
    offlineMethod: '',
    bankAccount: 'ICICI Bank',
    transactionId: '',
    amountReceived: '90000000',
    balanceDue: '90000000',
  },
  // Add more static invoices as needed
];

const Payment: React.FC = () => {
  const [formData, setFormData] = useState<PaymentData>({
    code: '',
    project: '',
    invoice: '',
    client: '',
    order: '',
    amount: '',
    paidOn: '',
    paymentGateway: '',
    status: 'Complete',
    currency: 'INR',
    exchangeRate: '1',
    transactionId: '',
    bankAccount: '',
    remark: '',
    receipt: '',
  });
  const [search, setSearch] = useState(''); // <-- Dynamic search state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
  const [viewData, setViewData] = useState<PaymentData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);
  const [tableData, setTableData] = useState<PaymentData[]>([]);
  const [bulkPaymentMethod, setBulkPaymentMethod] = useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = useState<string>(''); // <-- Selected invoice state
  const [bulkInvoices, setBulkInvoices] = useState(staticInvoices); // Add this state to manage invoice row edits
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const isAllSelected = tableData.length > 0 && tableData.every((_, idx) => selectedRows.includes((currentPage - 1) * perPage + idx));

  // Dynamic search filter for payments
  const filteredData = tableData.filter(
    (row) =>
      row.project.toLowerCase().includes(search.toLowerCase()) ||
      row.client.toLowerCase().includes(search.toLowerCase()) ||
      row.invoice.toLowerCase().includes(search.toLowerCase()) ||
      row.code.toLowerCase().includes(search.toLowerCase()) ||
      row.order.toLowerCase().includes(search.toLowerCase()) ||
      row.amount.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleOpenPaymentModal = () => setIsPaymentModalOpen(true);
  const handleClosePaymentModal = () => setIsPaymentModalOpen(false);

  const handleOpenBulkPaymentModal = () => setIsBulkPaymentModalOpen(true);
  const handleCloseBulkPaymentModal = () => setIsBulkPaymentModalOpen(false);

  const handleDeleteRow = (index: number) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  // Dummy download handler for row data
  const handleDownloadRow = (index: number) => {
    const row = tableData[index];
    if (!row) return;
    const dataStr = JSON.stringify(row, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment_${row.code || index}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewRow = (row: PaymentData) => {
    setViewData(row);
    setIsViewModalOpen(true);
  };

  const toggleDropdown = (index: number) => {
    setIsDropdownOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Add missing handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add missing handler for saving payment
  const handleSavePayment = () => {
    setTableData((prev) => [
      ...prev,
      { ...formData },
    ]);
    setFormData({
      code: '',
      project: '',
      invoice: '',
      client: '',
      order: '',
      amount: '',
      paidOn: '',
      paymentGateway: '',
      status: 'Complete',
      currency: 'INR',
      exchangeRate: '1',
      transactionId: '',
      bankAccount: '',
      remark: '',
      receipt: '',
    });
    setIsPaymentModalOpen(false);
  };

  // Update the payment method and offline method handlers
  const handleBulkPaymentMethodChange = (idx: number, value: string) => {
    setBulkInvoices(prev => {
      const updated = [...prev];
      updated[idx].paymentMethod = value;
      // Reset offline method if payment method is changed
      if (value !== 'Offline Payment') updated[idx].offlineMethod = '';
      return updated;
    });
  };

  const handleBulkOfflineMethodChange = (idx: number, value: string) => {
    setBulkInvoices(prev => {
      const updated = [...prev];
      updated[idx].offlineMethod = value;
      return updated;
    });
  };

  const handleExportExcel = () => {
    // Prepare data for export (you can customize columns as needed)
    const exportData = tableData.map(row => ({
      Code: row.code,
      Project: row.project,
      Invoice: row.invoice,
      Client: row.client,
      Order: row.order,
      Amount: row.amount,
      'Paid On': row.paidOn,
      'Payment Gateway': row.paymentGateway,
      Status: row.status,
      'Transaction Id': row.transactionId,
      'Bank Account': row.bankAccount,
      Remark: row.remark,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
    XLSX.writeFile(workbook, 'payments.xlsx');
  };

  const handleSelectRow = (rowIdx: number) => {
    setSelectedRows(prev =>
      prev.includes(rowIdx)
        ? prev.filter(idx => idx !== rowIdx)
        : [...prev, rowIdx]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows(prev => prev.filter(idx => !paginatedData.some((_, idx) => idx === (currentPage - 1) * perPage + idx)));
    } else {
      setSelectedRows(prev => [
        ...prev,
        ...paginatedData
          .map((_, idx) => (currentPage - 1) * perPage + idx)
          .filter(idx => !prev.includes(idx)),
      ]);
    }
  };

  return (
    <PageWrapper title="Payments">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search payment..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={handleOpenPaymentModal}
          >
            Add Payment
          </Button>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={handleOpenBulkPaymentModal}
          >
            Add Bulk Payment
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            onClick={handleExportExcel}
          >
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Code</th>
                      <th>Project</th>
                      <th>Invoice</th>
                      <th>Client</th>
                      <th>Order</th>
                      <th>Amount</th>
                      <th>Paid On</th>
                      <th>Payment Gateway</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes((currentPage - 1) * perPage + index)}
                              onChange={() => handleSelectRow((currentPage - 1) * perPage + index)}
                            />
                          </td>
                          <td>{row.code}</td>
                          <td>{row.project}</td>
                          <td>{row.invoice}</td>
                          <td>{row.client}</td>
                          <td>{row.order}</td>
                          <td>{row.amount}</td>
                          <td>{row.paidOn}</td>
                          <td>{row.paymentGateway}</td>
                          <td>
                            {row.status === 'Complete' ? (
                              <>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: 'limegreen',
                                    marginRight: 6,
                                  }}
                                ></span>
                                Complete
                              </>
                            ) : (
                              row.status
                            )}
                          </td>
                          <td className="text-end">
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => handleViewRow(row)}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                 <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => handleDownloadRow((currentPage - 1) * perPage + index)}
                                >
                                  <Icon icon="Download" className="me-2" /> Download
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteRow((currentPage - 1) * perPage + index)}
                                >
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center text-muted">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Employees"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} setIsOpen={setIsPaymentModalOpen} size="xl">
        <ModalHeader setIsOpen={setIsPaymentModalOpen}>
          <ModalTitle id="payment-details-title">Payment Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-md-3">
              <FormGroup label="Project">
                <Select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  ariaLabel="Select project"
                >
                  <option value="">--</option>
                  <option value="Project A">Project A</option>
                  <option value="Project B">Project B</option>
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Invoice">
                <Select
                  name="invoice"
                  value={formData.invoice}
                  onChange={handleInputChange}
                  ariaLabel="Select invoice"
                >
                  <option value="">--</option>
                  <option value="INV001">INV001</option>
                  <option value="INV002">INV002</option>
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Paid On">
                <Input
                  type="date"
                  name="paidOn"
                  value={formData.paidOn}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Amount *">
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="e.g. 10000"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Currency">
                <Select
                  name="currency"
                  value={formData.currency || 'INR'}
                  onChange={handleInputChange}
                  ariaLabel="Select currency"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Exchange Rate *">
                <Input
                  type="number"
                  name="exchangeRate"
                  value={formData.exchangeRate || '1'}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Transaction Id">
                <Input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId || ''}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID of the payment"
                />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Payment Gateway">
                <Select
                  name="paymentGateway"
                  value={formData.paymentGateway}
                  onChange={handleInputChange}
                  ariaLabel="Select payment gateway"
                >
                  <option value="">--</option>
                  <option value="Gateway A">Gateway A</option>
                  <option value="Gateway B">Gateway B</option>
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Bank Account">
                <Select
                  name="bankAccount"
                  value={formData.bankAccount || ''}
                  onChange={handleInputChange}
                  ariaLabel="Select bank account"
                >
                  <option value="">--</option>
                  <option value="Account 1">Account 1</option>
                  <option value="Account 2">Account 2</option>
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-12">
              <FormGroup label="Receipt">
                <Input
                  type="file"
                  name="receipt"
                  accept="image/*"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          receipt: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <small className="form-text text-muted">
                  <Icon icon="HelpCircle" className="me-1" /> Choose an image file
                </small>
              </FormGroup>
            </div>
            <div className="col-md-12">
              <FormGroup label="Remark">
                <textarea
                  className="form-control"
                  name="remark"
                  value={formData.remark || ''}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  rows={2}
                />
              </FormGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClosePaymentModal}>
            Close
          </Button>
          <Button color="primary" onClick={handleSavePayment}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* Bulk Payment Modal */}
      <Modal isOpen={isBulkPaymentModalOpen} setIsOpen={setIsBulkPaymentModalOpen} size="xl">
        <ModalHeader setIsOpen={setIsBulkPaymentModalOpen}>
          <ModalTitle id="bulk-payment-title">Add Bulk Payment</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Filter invoices by client">
                <Select
                  ariaLabel="Filter invoices by client"
                  value={selectedInvoice}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedInvoice(e.target.value)}
                >
                  <option value="">--</option>
                  {staticInvoices.map((inv) => (
                    <option key={inv.invoiceNumber} value={inv.invoiceNumber}>
                      {inv.invoiceNumber}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Select Payment Method">
                <Select
                  ariaLabel="Select Payment Method"
                  value={bulkPaymentMethod}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBulkPaymentMethod(e.target.value)}
                >
                  <option value="">--</option>
                  <option value="Offline Payment">Offline Payment</option>
                  <option value="Online Payment">Online Payment</option>
                </Select>
              </FormGroup>
            </div>
            {bulkPaymentMethod === 'Offline Payment' && (
              <div className="col-md-3">
                <FormGroup label="Select Offline Method">
                  <Select ariaLabel="Select Offline Method">
                    <option value="">Select Offline Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </Select>
                </FormGroup>
              </div>
            )}
          </div>
          <div className="table-responsive mt-4">
            <table className="table table-modern table-hover">
              <thead>
                <tr>
                  <th>Invoice Number#</th>
                  <th>Payment Date*</th>
                  <th>Payment Method</th>
                  <th>Offline Payment Methods</th>
                  <th>Bank Account</th>
                  <th>Transaction ID</th>
                  <th>Amount Received*</th>
                  <th>Invoice Balance Due</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice
                  ? (
                    bulkInvoices
                      .map((inv, idx) =>
                        inv.invoiceNumber === selectedInvoice ? (
                          <tr key={inv.invoiceNumber}>
                            <td>{inv.invoiceNumber}</td>
                            <td>
                              <Input
                                type="date"
                                value={inv.paymentDate}
                                readOnly
                              />
                            </td>
                            <td>
                              <Select
                                value={inv.paymentMethod}
                                ariaLabel="Select payment method"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleBulkPaymentMethodChange(idx, e.target.value)}
                              >
                                <option value="">--</option>
                                <option value="Offline Payment">Offline Payment</option>
                                <option value="Online Payment">Online Payment</option>
                              </Select>
                            </td>
                            <td>
                              {inv.paymentMethod === 'Offline Payment' && (
                                <Select
                                  value={inv.offlineMethod}
                                  ariaLabel="Select Offline Method"
                                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleBulkOfflineMethodChange(idx, e.target.value)}
                                >
                                  <option value="">--</option>
                                  <option value="Cash">cash</option>
                                  <option value="Cheque">cheque</option>
                                  <option value="Bank Transfer">bank transfer</option>
                                </Select>
                              )}
                            </td>
                            <td>
                              <Input value={inv.bankAccount} readOnly />
                            </td>
                            <td>
                              <Input
                                value={inv.transactionId}
                                onChange={e => {
                                  const event = e as React.ChangeEvent<HTMLInputElement>;
                                  setBulkInvoices(prev => {
                                    const updated = [...prev];
                                    updated[idx].transactionId = event.target.value;
                                    return updated;
                                  });
                                }}
                              />
                            </td>
                            <td>
                              <Input
                                value={inv.amountReceived}
                                onChange={e => {
                                  const event = e as React.ChangeEvent<HTMLInputElement>;
                                  setBulkInvoices(prev => {
                                    const updated = [...prev];
                                    updated[idx].amountReceived = event.target.value;
                                    return updated;
                                  });
                                }}
                              />
                            </td>
                            <td>
                              ₹{Number(inv.balanceDue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ) : null
                      )
                  )
                  : (
                    <tr>
                      <td colSpan={8} className="text-center text-muted">
                        <i className="bi bi-database fs-4 text-muted"></i>
                        <p className="text-muted mt-2">- No record found. -</p>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            icon="Check"
            onClick={() => {
              // Find the selected invoice in bulkInvoices
              const selected = bulkInvoices.find(inv => inv.invoiceNumber === selectedInvoice);
              if (selected) {
                setTableData(prev => [
                  ...prev,
                  {
                    code: '', // You can generate or map code as needed
                    project: '', // Fill as needed
                    invoice: selected.invoiceNumber,
                    client: '', // Fill as needed
                    order: '', // Fill as needed
                    amount: selected.amountReceived,
                    paidOn: selected.paymentDate,
                    paymentGateway: selected.paymentMethod === 'Offline Payment' && selected.offlineMethod
                      ? `${selected.paymentMethod} (${selected.offlineMethod})`
                      : selected.paymentMethod || '',
                    status: 'Complete',
                    currency: 'INR',
                    exchangeRate: '1',
                    transactionId: selected.transactionId,
                    bankAccount: selected.bankAccount,
                    remark: '',
                  },
                ]);
                setIsBulkPaymentModalOpen(false);
                setSelectedInvoice('');
              }
            }}
          >
            Save
          </Button>
          <Button color="secondary" onClick={handleCloseBulkPaymentModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* View Payment Modal */}
      <Modal isOpen={isViewModalOpen} setIsOpen={setIsViewModalOpen} size="lg">
        <ModalHeader setIsOpen={setIsViewModalOpen}>
          <ModalTitle id="view-payment-title">Payment Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {viewData && (
            <div className="card">
              <div className="card-header">
                <strong>Payment details</strong>
              </div>
              <div className="card-body p-0">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Amount</strong></td>
                      <td>
                        ₹{Number(viewData.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Payment On</strong></td>
                      <td>
                        {viewData.paidOn
                          ? new Date(viewData.paidOn).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '--'}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Invoice</strong></td>
                      <td>{viewData.invoice || '--'}</td>
                    </tr>
                    <tr>
                      <td><strong>Project</strong></td>
                      <td>{viewData.project || '--'}</td>
                    </tr>
                    <tr>
                      <td><strong>Bank Account</strong></td>
                      <td>{viewData.bankAccount || '--'}</td>
                    </tr>
                    <tr>
                      <td><strong>Transaction Id</strong></td>
                      <td>{viewData.transactionId || '--'}</td>
                    </tr>
                    <tr>
                      <td><strong>Gateway</strong></td>
                      <td>{viewData.paymentGateway || '--'}</td>
                    </tr>
                    <tr>
                      <td><strong>Status</strong></td>
                      <td>
                        {viewData.status === 'Complete' ? (
                          <>
                            <span
                              style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: 'limegreen',
                                marginRight: 6,
                                verticalAlign: 'middle',
                              }}
                            ></span>
                            Complete
                          </>
                        ) : (
                          viewData.status || '--'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Receipt</strong></td>
                      <td>
                        {viewData.receipt ? (
                          <a
                            href={viewData.receipt}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-block' }}
                          >
                            <img
                              src={viewData.receipt}
                              alt="Receipt"
                              style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #eee', cursor: 'pointer' }}
                            />
                          </a>
                        ) : (
                          '--'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Remark</strong></td>
                      <td>{viewData.remark || '--'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </PageWrapper>
  );
};

export default Payment;
