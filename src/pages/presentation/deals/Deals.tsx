/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight,  } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';

import Icon from '../../../components/icon/Icon';
import CreateProposalModal from './CreateProposalModal';
import ViewProposalModal from './ViewProposalModal';
import FollowupModal from './FollowupModal';
import Button from '../../../components/bootstrap/Button';
import AddSatgeData from './AddSatge.json';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Select from 'react-select';

interface TableRow {
  proposal: string;
  deals: string;
  contactName: string;
  date: string;
  validTill: string;
  status: string;
  items: any[];
  dealAgent?: string;
  dealWatcher?: string;
  dealStages?: string;
  dealValue?: number;
  proposalData?: any;
  followupDate?: string;   // <-- add this
  followupTime?: string;   // <-- add this
}

const DEAL_STAGE_OPTIONS = AddSatgeData.AddStage
  .filter(stage => stage.title)
  .map(stage => ({
    value: stage.title,
    label: stage.title,
    color: stage.color,
  }));

const Deals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<TableRow | null>(null);
  const [selectedFollowup, setSelectedFollowup] = useState<TableRow | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [followupForm, setFollowupForm] = useState({
    leadName: '',
    date: '',
    time: '',
    sendReminder: false,
    remark: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const navigate = useNavigate();

  useEffect(() => {
    const deals = JSON.parse(localStorage.getItem('deals') || '[]');
    setTableData(deals);
  }, []);

  const handleView = (row: TableRow) => {
    navigate('/deals/view', { state: { deal: row } });
  };

  const handleEdit = (row: TableRow, index: number) => {
    setEditIdx(index);
    setSelectedProposal(row);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    // Remove the deal at the given index
    const updatedDeals = tableData.filter((_, i) => i !== index);
    setTableData(updatedDeals);
    // Update localStorage
    localStorage.setItem('deals', JSON.stringify(updatedDeals));
  };

  const handleFollowUp = (row: TableRow) => {
    setSelectedFollowup(row);
    setFollowupForm({
      leadName: row.contactName || '',
      date: row.followupDate || '',
      time: row.followupTime || '',
      sendReminder: false,
      remark: '',
    });
    setIsFollowupModalOpen(true);
  };

  const handleSave = (formData: any) => {
    const newRow: TableRow = {
      proposal: `Proposal#${editIdx !== null ? editIdx + 1 : tableData.length + 1}`,
      deals: formData.deal,
      contactName: formData.leadContacts,
      date: new Date().toLocaleDateString(),
      validTill: formData.validTill,
      status: formData.requireSignature ? 'Pending Signature' : 'Completed',
      items: formData.items || [],
      dealAgent: formData.dealAgent,
      dealWatcher: formData.dealWatcher,
      dealStages: formData.dealStages,
      dealValue: formData.dealValue,
      proposalData: formData,
      
    };
    if (editIdx !== null) {
      setTableData((prev) =>
        prev.map((row, idx) => (idx === editIdx ? newRow : row))
      );
      setEditIdx(null);
    } else {
      setTableData((prev) => [...prev, newRow]);
    }
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  const handleFollowupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFollowupForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFollowupSave = () => {
    if (!selectedFollowup) return;
    setTableData(prev =>
      prev.map(row =>
        row === selectedFollowup
          ? { ...row, followupDate: followupForm.date, followupTime: followupForm.time }
          : row
      )
    );
    setIsFollowupModalOpen(false);
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
            placeholder="Search deals..."
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => {
              setEditIdx(null);
              setSelectedProposal(null);
              setIsModalOpen(true);
            }}
          >
            Add Deal
          </Button>
          <Button color="info" isLight icon="ForwardToInbox">
            Import
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
        
         
                    {/* {Object.keys(TABS).map((key) => (
                      <Button
                        key={key}
                        color={activeTab === TABS[key] ? 'success' : themeStatus}
                        onClick={() => setActiveTab(TABS[key])}
                      >
                        {TABS[key]}
                    
                      </Button>
                    ))} */}
                  <Button
                    color="primary"
                    isLight
                    // icon="ViewList"
                    onClick={() => navigate('/leads/deals')}
                  >
                    <Icon icon="List" size='lg'/>
                  </Button>
          <Button
            color="primary"
            isLight
            // icon="ViewModule"
            onClick={() => navigate('/deals/stage')}
          >
            <Icon icon="Assessment" size='lg'/>
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
                        <input type="checkbox" />
                      </th>
                      <th>Deal Name</th>
                      <th>Lead Name</th>
                      <th>Contact Details (Email)</th>
                      <th>Value</th>
                      <th>Close Date</th>
                      <th>Next Follow Up</th>
                      <th>Deal Agent</th>
                      <th>Deal Watcher</th>
                      <th>Deal Stage</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
  {dataPagination(tableData, currentPage, perPage).length > 0 ? (
    dataPagination(tableData, currentPage, perPage).map((row, index) => {
      const globalIndex = (currentPage - 1) * perPage + index;
      return (
        <tr key={globalIndex}>
          <td>
            <input type="checkbox" />
          </td>
          <td>{row.deals}</td>
          <td>{row.contactName}</td>
          <td>{row.proposalData?.email || '--'}</td>
          <td>{row.dealValue ? `${row.dealValue}` : '--'}</td>
          <td>{row.validTill}</td>
          <td>
            {row.followupDate && row.followupTime
              ? `${row.followupDate} ${row.followupTime}`
              : '--'}
          </td>
          <td>{row.dealAgent || '--'}</td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <img
                src="/path/to/avatar.jpg"
                alt="Watcher Avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px' }}
              />
              <span>{row.dealWatcher || '--'}</span>
            </div>
          </td>
          <td>
            <Select
              value={DEAL_STAGE_OPTIONS.find(opt => opt.value === row.dealStages) || null}
              onChange={option => {
                const newStage = option?.value || '';
                setTableData(prev =>
                  prev.map((r, idx) =>
                    idx === globalIndex ? { ...r, dealStages: newStage } : r
                  )
                );
              }}
              options={DEAL_STAGE_OPTIONS}
              isSearchable={false}
              menuPlacement="auto"
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: '32px',
                  borderColor: '#ced4da',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  fontSize: '1rem',
                }),
                option: (provided) => ({
                  ...provided,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  display: 'flex',
                  alignItems: 'center',
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: 4,
                }),
                clearIndicator: (provided) => ({
                  ...provided,
                  padding: 4,
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '0 6px',
                }),
                input: (provided) => ({
                  ...provided,
                  margin: 0,
                  padding: 0,
                }),
              }}
              formatOptionLabel={option => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: option.color,
                      marginRight: 8,
                      border: '1px solid #888',
                    }}
                  />
                  {option.label}
                </div>
              )}
              placeholder="Select Stage"
            />
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
                  onClick={() => handleView(row)}
                >
                  <Icon icon="RemoveRedEye" className="me-2" /> View
                </Button>
                <Button
                  color="link"
                  className="dropdown-item" 
                  onClick={() => handleEdit(row, globalIndex)}
                >
                  <Icon icon="Edit" className="me-2" /> Update
                </Button>
                <Button
                  color="link"
                  className="dropdown-item text-danger"
                  onClick={() => handleDelete(globalIndex)}
                >
                  <Icon icon="Delete" className="me-2" /> Delete
                </Button>
                {row.dealStages !== "Won" && (
                  <Button
                    color="link"
                    className="dropdown-item"
                    onClick={() => handleFollowUp(row)}
                  >
                    <Icon icon="EventNote" className="me-2" /> Follow Up
                  </Button>
                )}
              </DropdownMenu>
            </Dropdown>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={12} className="text-center">
        No data available in table
      </td>
    </tr>
  )}
</tbody>
                </table>
  
              </CardBody>
                  <PaginationButtons
  data={tableData}
  label="Deals"
  setCurrentPage={setCurrentPage}
  currentPage={currentPage}
  perPage={perPage}
  setPerPage={setPerPage}
/>
            </Card>
          </div>
        </div>
       
      </Page>

      <CreateProposalModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSave={handleSave}
        proposalData={editIdx !== null && tableData[editIdx] ? tableData[editIdx] : null}
      />
      <ViewProposalModal
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        proposalData={selectedProposal}
      />
      <FollowupModal
        isOpen={isFollowupModalOpen}
        setIsOpen={setIsFollowupModalOpen}
        form={followupForm}
        onChange={handleFollowupChange}
        onSave={handleFollowupSave}
        editIndex={null}
      />
     
    </PageWrapper>
  );
};

export default Deals;