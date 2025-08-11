import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import CreateEstimateModal from './CreateEstimateModal';  
import EstimateView from './EstimateView';
import CreateInvoiceModal from '../invoices/CreateInvoiceModal';

interface EstimateType {
  id: string;
  estimate?: string;
  project?: string;
  client?: string;
  total?: string;
  currency?: string; 
  validTill?: string;
  created?: string;
  estimateRequestNumber?: string;
  status?: string;
  isSent?: boolean; // <-- Add this
}

const EstimatePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(10);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [estimates, setEstimates] = useState<EstimateType[]>([]);
  const [viewEstimate, setViewEstimate] = useState<any>(null);
  const [editEstimate, setEditEstimate] = useState<any>(null);
  const [invoiceEstimate, setInvoiceEstimate] = useState<any>(null);
  const [duplicateEstimate, setDuplicateEstimate] = useState<any>(null);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSaveEstimate = (estimate: any) => {
    if (editEstimate) {
      // Edit mode: update the existing estimate
      setEstimates(prev =>
        prev.map(est =>
          est.id === editEstimate.id
            ? { ...est, ...estimate, id: editEstimate.id } // update all fields, including status
            : est
        )
      );
    } else {
      // Create mode: add new estimate
      setEstimates(prev => [
        ...prev,
        {
          id: uuidv4(),
          estimate: estimate.estimateNumber,
          project: estimate.project,
          client: estimate.client,
          total: estimate.total,
          currency: estimate.currency,
          validTill: estimate.validTill,
          created: new Date().toLocaleDateString(),
          estimateRequestNumber: estimate.estimateRequestNumber || '-',
          status: estimate.status || 'Waiting',
          isSent: false, // <-- Add this
        },
      ]);
    }
    setEditEstimate(null);
    setDuplicateEstimate(null);
  };

  const handleCancelEstimate = (id: string) => {
    setEstimates(prev =>
      prev.map(est =>
        est.id === id ? { ...est, status: 'Canceled' } : est
      )
    );
  };

  const filteredData = estimates.filter(
    (item: EstimateType) =>
      (item.estimate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.project || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.total || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.validTill || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.created || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.estimateRequestNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.status || '').toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <PageWrapper title="Estimate">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Estimate..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => setCreateModalOpen(true)}
          >
            Create Estimate
          </Button>
          <Button
            icon='Layers'
            color='primary'
            isLight
            onClick={() => navigate('/estimate-template')} // <-- Update this path to your actual route
          >
            Estimate Template
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
                      <th>Estimate</th>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Total</th>
                      <th>Valid Till</th>
                      <th>Created</th>
                      <th>Estimate Request Number</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id}>
                          <td>{item.estimate || '-'}</td>
                          <td>{item.project || '-'}</td>
                          <td>{item.client || '-'}</td>
                          <td>
                            {(item.currency === 'USD' || item.currency === '$' ? '$' : '₹')}
                            {item.total || '-'}
                          </td>
                          <td>{item.validTill || '-'}</td>
                          <td>{item.created || '-'}</td>
                          <td>{item.estimateRequestNumber || '-'}</td>
                          <td>
                            {/* Status with colored dot, text, and badge */}
                            {item.status === 'Canceled' ? (
                              <span>
                                <span style={{
                                  display: 'inline-block',
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  background: 'red',
                                  marginRight: 6,
                                  verticalAlign: 'middle'
                                }} />
                                Declined
                                {!item.isSent && <span className="badge bg-light text-dark ms-2">Not Sent</span>}
                              </span>
                            ) : item.status === 'Accepted' ? (
                              <span>
                                <span style={{
                                  display: 'inline-block',
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  background: 'green',
                                  marginRight: 6,
                                  verticalAlign: 'middle'
                                }} />
                                Accepted
                                {!item.isSent && <span className="badge bg-light text-dark ms-2">Not Sent</span>}
                              </span>
                            ) : item.status === 'Rejected' ? (
                              <span>
                                <span style={{
                                  display: 'inline-block',
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  background: '#dc3545',
                                  marginRight: 6,
                                  verticalAlign: 'middle'
                                }} />
                                Rejected
                                {!item.isSent && <span className="badge bg-light text-dark ms-2">Not Sent</span>}
                              </span>
                            ) : (
                              <span>
                                <span style={{
                                  display: 'inline-block',
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  background: '#ffc107',
                                  marginRight: 6,
                                  verticalAlign: 'middle'
                                }} />
                                Waiting
                                {!item.isSent && <span className="badge bg-light text-dark ms-2">Not Sent</span>}
                              </span>
                            )}
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                {item.status === 'Canceled' ? (
                                  <>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setViewEstimate(item);
                                        setViewModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="Visibility" className="me-2" /> View
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setDuplicateEstimate(item);
                                        setEditEstimate(null);
                                        setCreateModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="ContentCopy" className="me-2" /> Create Duplicate
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setViewEstimate(item);
                                        setViewModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="Visibility" className="me-2" /> View
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setEditEstimate(item);
                                        setCreateModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="Edit" className="me-2" /> Edit
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setDuplicateEstimate(item); // Set duplicate mode
                                        setEditEstimate(null);      // Clear edit mode
                                        setCreateModalOpen(true);
                                      }}
                                    >
                                      <Icon icon="ContentCopy" className="me-2" /> Create Duplicate
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setEstimates(prev =>
                                          prev.map(est =>
                                            est.id === item.id ? { ...est, isSent: true } : est
                                          )
                                        );
                                      }}
                                    >
                                      <Icon icon="Send" className="me-2" /> Send
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item text-danger"
                                      onClick={() => {
                                        setEstimates(prev => prev.filter(est => est.id !== item.id));
                                      }}
                                    >
                                      <Icon icon="Delete" className="me-2" /> Delete
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => {
                                        setInvoiceEstimate(item);      // Pass the current estimate to the invoice modal
                                        setInvoiceModalOpen(true);     // Open the modal
                                      }}
                                    >
                                      <Icon icon="Add" className="me-2" /> Create Invoice
                                    </Button>
                                    <Button
                                      color="link"
                                      className="dropdown-item text-danger"
                                      onClick={() => handleCancelEstimate(item.id)}
                                    >
                                      <Icon icon="Close" className="me-2" /> Cancel Estimate
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
                        <td colSpan={9} className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )} 
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Estimate"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <CreateEstimateModal
        isOpen={createModalOpen}
        setIsOpen={(open: boolean) => {
          setCreateModalOpen(open);
          if (!open) {
            setEditEstimate(null);
            setDuplicateEstimate(null);
          }
        }}
        onSave={handleSaveEstimate}
        defaultValues={duplicateEstimate || editEstimate}
      />
      <EstimateView 
        isOpen={viewModalOpen} 
        setIsOpen={setViewModalOpen} 
        estimate={viewEstimate} 
      />
      <CreateInvoiceModal
        isOpen={invoiceModalOpen}
        setIsOpen={setInvoiceModalOpen}
        defaultValues={invoiceEstimate}
      />
    </PageWrapper>
  );
};

export default EstimatePage;