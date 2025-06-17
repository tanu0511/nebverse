import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import CreateInvoiceModal from './CreateInvoiceModal';
import CreateTimeLogInvoice from './CreateTimeLogInvoice';
import PaymentDetailsModal from './PaymentDetailsModal';
import ShippingAddressModal from './ShippingAddressModal';
import UploadFileModal from './UploadFileModal';
import InvoiceViewModal from './InvoiceViewModal';
import { useNavigate } from 'react-router-dom';

const Invoices: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [timeLogModalStatus, setTimeLogModalStatus] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // <-- Dynamic search state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentInvoice, setSelectedPaymentInvoice] = useState<any>(null);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [selectedShippingInvoice, setSelectedShippingInvoice] = useState<any>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [, setUploadingInvoice] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<any>(null);
  const navigate = useNavigate();

  // Dynamic search filter for invoices
  const filteredInvoices = invoiceData.filter((item) =>
    searchTerm
      ? (item.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.project || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.status || '').toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // Paginate filtered data
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSaveInvoice = (invoice: any) => {
    if (selectedInvoice) {
      setInvoiceData((prev) =>
        prev.map((item) =>
          item.id === selectedInvoice.id ? { ...selectedInvoice, ...invoice } : item
        )
      );
    } else {
      setInvoiceData((prev) => [
        ...prev,
        { id: Date.now(), ...invoice },
      ]);
    }
    setEditModalStatus(false);
    setSelectedInvoice(null);
  };

  const handleUploadFile = () => {
    
  };

  const handleAddPayment = (invoiceId: number) => {
    if (!invoiceId) return;
    setInvoiceData(prev =>
      prev.map(item =>
        item.id === invoiceId
          ? {
              ...item,
              paid: item.total,
              unpaid: 0,
              status: 'Paid', // <-- This line updates the status!
            }
          : item
      )
    );
    setPaymentModalOpen(false);
    setSelectedPaymentInvoice(null);
  };

  const handleCancelInvoice = (invoiceId: number) => {
    if (!invoiceId) return;
    setInvoiceData(prev =>
      prev.map(item =>
        item.id === invoiceId
          ? {
              ...item,
              status: 'Cancelled', // Update the status to 'Cancelled'
            }
          : item
      )
    );
  };

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search invoice..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => {
              setSelectedInvoice(null);
              setEditModalStatus(true);
            }}
          >
            Create Invoice
          </Button>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => navigate('/recurring-invoice')}
          >
            Recurring Invoice
          </Button>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => setTimeLogModalStatus(true)}
          >
            Create TimeLog Invoice
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/somefile.txt"
            target="_blank"
            download
          >
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className='table-responsive' style={{ overflow: 'visible' }}>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Invoice</th>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Total</th>
                      <th>Invoice Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.length > 0 ? (
                      paginatedInvoices.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>
                            <div>
                              <span style={{ fontWeight: 600 }}>{item.invoiceNumber || 'N/A'}</span>
                              {item.isRecurring && (
                                <span
                                  className="badge bg-primary ms-2"
                                  style={{ fontSize: '0.75em', verticalAlign: 'middle' }}
                                >
                                  Recurring
                                </span>
                              )}
                            </div>
                          </td>
                          <td>{item.project || 'N/A'}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span
                                className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center me-2"
                                style={{ width: 32, height: 32 }}
                              >
                                <Icon icon="AccountCircle" size="lg" />
                              </span>
                              <div>
                                <div style={{ fontWeight: 500 }}>{item.clientName || item.client || 'N/A'}</div>
                                <div className="text-muted" style={{ fontSize: '0.85em' }}>
                                  {item.clientCompany || 'QualityWebs'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div>
                                <span className="text-dark" style={{ fontWeight: 500 }}>
                                  {item.unpaid === 0
                                    ? <>Paid: {item.total || '₹0.00'}</>
                                    : <>Unpaid: {item.total || '₹0.00'}</>
                                  }
                                </span>
                              </div>
                              <div>
                                <span className="text-success" style={{ fontSize: '0.9em' }}>
                                  Paid: {item.paid || '₹0.00'}
                                </span>
                              </div>
                              <div>
                                <span className="text-danger" style={{ fontSize: '0.9em' }}>
                                  Unpaid: {item.unpaid || '₹0.00'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span>
                                {item.invoiceDate
                                  ? new Date(item.invoiceDate).toLocaleDateString('en-GB', {
                                      weekday: 'short',
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    })
                                  : 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className="badge px-3 py-2 fw-bold text-uppercase"
                              style={{
                                backgroundColor:
                                  item.status === 'Paid'
                                    ? '#e6f4ea'
                                    : item.status === 'Unpaid'
                                    ? '#fdeaea'
                                    : item.status === 'Open'
                                    ? '#e3f2fd'
                                    : item.status === 'Close'
                                    ? '#f3e5f5'
                                    : '#fff8e1',
                                color:
                                  item.status === 'Paid'
                                    ? '#28a745'
                                    : item.status === 'Unpaid'
                                    ? '#dc3545'
                                    : item.status === 'Open'
                                    ? '#1976d2'
                                    : item.status === 'Close'
                                    ? '#8e24aa'
                                    : '#ffc107',
                                border: `1px solid ${
                                  item.status === 'Paid'
                                    ? '#28a745'
                                    : item.status === 'Unpaid'
                                    ? '#dc3545'
                                    : item.status === 'Open'
                                    ? '#1976d2'
                                    : item.status === 'Close'
                                    ? '#8e24aa'
                                    : '#ffc107'
                                }`,
                                fontSize: 13,
                                letterSpacing: 1,
                                minWidth: 80,
                                display: 'inline-block',
                              }}
                            >
                              {item.status ? item.status.toUpperCase() : 'UNPAID'}
                            </span>
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setViewInvoice(item);
                                    setViewModalOpen(true);
                                  }}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                <Button color="link" className="dropdown-item">
                                  <Icon icon="Download" className="me-2" /> Download
                                </Button>
                                <Button color="link" className="dropdown-item" onClick={() => {
                                  setViewInvoice(item);
                                  setViewModalOpen(true);
                                }}>
                                  <Icon icon="RemoveRedEye" className="me-2" /> View PDF
                                </Button>
                                {item.status !== 'Cancelled' && (
                                  <>
                                    <Button color="link" className="dropdown-item">
                                      <Icon icon="Send" className="me-2" /> Send
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setSelectedPaymentInvoice(item);
                                        setPaymentModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="Add" className="me-2" /> Add Payment
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setSelectedShippingInvoice(item);
                                        setShippingModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="Add" className="me-2" /> Add Shipping Address
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setUploadingInvoice(item);
                                        setUploadModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="CloudUpload" className="me-2" /> Upload
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item text-danger"
                                      onClick={() => handleCancelInvoice(item.id)}
                                    >
                                      <Icon icon="Close" className="me-2" /> Cancel
                                    </Button>
                                    <Button color="link" className="dropdown-item">
                                      <Icon icon="ContentCopy" className="me-2" /> Copy Payment Link
                                    </Button>
                                    <Button color="link" className="dropdown-item">
                                      <Icon icon="CallMade" className="me-2" /> View Payment Page
                                    </Button>
                                    <Button color="link" className="dropdown-item">
                                      <Icon icon="NotificationsNone" className="me-2" /> Payment Reminder
                                    </Button>
                                    <Button color="link" className="dropdown-item"
                                      onClick={() => {
                                        const { rest } = item; // Remove id so it creates a new invoice
                                        setSelectedInvoice(rest);
                                        setEditModalStatus(true);
                                      }}
                                    >
                                      <Icon icon="ContentCopy" className="me-2" /> Create Duplicate
                                    </Button>
                                  </>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredInvoices}
                label="Invoices"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <CreateInvoiceModal
        setIsOpen={setEditModalStatus}
        isOpen={editModalStatus}
        onSave={handleSaveInvoice}
        defaultValues={selectedInvoice}
      />
      <CreateTimeLogInvoice
        setIsOpen={setTimeLogModalStatus}
        isOpen={timeLogModalStatus}
      />
      <PaymentDetailsModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        invoice={selectedPaymentInvoice}
        onAddPayment={() => handleAddPayment(selectedPaymentInvoice?.id)}
      />
      <ShippingAddressModal
        isOpen={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        defaultValue={selectedShippingInvoice?.shippingAddress || ''}
        onSave={() => {
          // Optionally update invoiceData here if you want to save the address
        }}
      />
      <UploadFileModal
        isOpen={uploadModalOpen}
        setIsOpen={setUploadModalOpen}
        onSave={handleUploadFile}
      />
      <InvoiceViewModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        invoice={viewInvoice}
      />
    </PageWrapper>
  );
};

export default Invoices;