import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import EstimateTemplateModal from './EstimateTemplateModal'; // <-- Import the modal
import ViewEstimateModal from './ViewEstimateModal'; // Add this import
import CreateEstimateModal from './CreateEstimateModal'; // Import your modal

const EstimateTemplate = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [searchTerm, setSearchTerm] = useState('');
  const [templateModalOpen, setTemplateModalOpen] = useState(false); // <-- Modal state
  const [editEstimate, setEditEstimate] = useState<EstimateTemplateItem | null>(null); // <-- Edit state
  const [viewEstimate, setViewEstimate] = useState<EstimateTemplateItem | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [createEstimateOpen, setCreateEstimateOpen] = useState(false);
  const [createEstimateDefaults, setCreateEstimateDefaults] = useState<EstimateTemplateItem | null>(null);

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  interface EstimateTemplateItem {
    id: string;
    name: string;
    total: string;
    currency: string;
    date: string;
    description?: string;
    items?: any[]; // <-- Add this line
  }

  const [estimateTemplates, setEstimateTemplates] = useState<EstimateTemplateItem[]>([]);

  const filteredData: EstimateTemplateItem[] = estimateTemplates.filter(
    (item: EstimateTemplateItem) =>
      (item.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.total || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper title="Estimate Template ">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Estimate Template ..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => setTemplateModalOpen(true)} // <-- Open modal on click
          >
            Estimate Template 
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
                      <th>Id</th>
                      <th>Name</th>
                      <th>Total</th>
                      <th>date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id}>
                          <td>{item.id || '-'}</td>
                          <td>{item.name || '-'}</td>
                          <td>
                            {(item.currency === 'USD ($)' ? '$' : '₹')}{item.total || '-'}
                          </td>
                          <td>{item.date || '-'}</td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button color="link" className="dropdown-item" onClick={() => {
                                  setViewEstimate(item);
                                  setViewModalOpen(true);
                                }}>
                                  <Icon icon="Visibility" className="me-2" /> View
                                </Button>
                                <Button color="link" className="dropdown-item" onClick={() => {
                                  setCreateEstimateDefaults(item);
                                  setCreateEstimateOpen(true);
                                }}>
                                  <Icon icon="Add" className="me-2" /> Create Estimate
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditEstimate(item);
                                    setTemplateModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => {
                                    setEstimateTemplates(prev => prev.filter(est => est.id !== item.id));
                                  }}
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
                        <td colSpan={5} className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Estimate Template "
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <EstimateTemplateModal
        isOpen={templateModalOpen}
        setIsOpen={(open) => {
          setTemplateModalOpen(open);
          if (!open) setEditEstimate(null); 
        }}
        defaultValues={editEstimate}
        onSave={(newEstimate) => {
          if (editEstimate) {
            setEstimateTemplates(prev =>
              prev.map(est => est.id === editEstimate.id
                ? { ...est, ...newEstimate }
                : est
              )
            );
          } else {
            setEstimateTemplates(prev => [
              ...prev,
              {
                id: (prev.length + 1).toString(),
                name: newEstimate.name,
                total: newEstimate.total,
                currency: newEstimate.currency,
                description: newEstimate.description,
                items: newEstimate.items, // <-- Make sure this is present!
                date: new Date().toLocaleDateString(),
              }
            ]);
          }
          setEditEstimate(null);
        }}
      />
      <ViewEstimateModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        estimate={viewEstimate}
      />
      <CreateEstimateModal
        isOpen={createEstimateOpen}
        setIsOpen={setCreateEstimateOpen}
        defaultValues={createEstimateDefaults}
        onSave={(newEstimate) => {
          setEstimateTemplates(prev => [
            ...prev,
            {
              id: (prev.length + 1).toString(),
              name: newEstimate.name,
              total: newEstimate.total,
              currency: newEstimate.currency,
              description: newEstimate.description,
              items: newEstimate.items, // <-- Make sure this is present!
              date: new Date().toLocaleDateString(),
            }
          ]);
        }}
      />
    </PageWrapper>
  );
};

export default EstimateTemplate;