/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import CreateProposalModal from './CreateProposalModal';
import ViewProposalModal from './ViewProposalModal';
import FollowupModal from './FollowupModal';

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

const DEAL_STAGE_OPTIONS = [
  'Generated',
  'Qualified',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
  // Add more stages as needed
];

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
  const navigate = useNavigate();

  const handleView = (row: TableRow) => {
    navigate('/deals/view', { state: { deal: row } });
  };

  const handleEdit = (row: TableRow, index: number) => {
    setEditIdx(index);
    setSelectedProposal(row);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      setTableData((prev) => prev.filter((_, i) => i !== index));
      setEditIdx(null);
      setIsModalOpen(false);
      setIsViewModalOpen(false);
      setSelectedProposal(null);
    }
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
          <Button color="secondary" isLight icon="ForwardToInbox">
            Import
          </Button>
          <Button color="secondary" isLight icon="ForwardToInbox">
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
  {tableData.length > 0 ? (
    tableData.map((row, index) => (
      <tr key={index}>
        <td>
          <input type="checkbox" />
        </td>
        <td>{row.proposal}</td>
        <td>{row.contactName}</td>
        <td>{row.proposalData?.email || '--'}</td> {/* Show email from form */}
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
          <select
            className="form-select"
            value={row.dealStages}
            onChange={e => {
              const newStage = e.target.value;
              setTableData(prev =>
                prev.map((r, idx) =>
                  idx === index ? { ...r, dealStages: newStage } : r
                )
              );
            }}
            style={{ minWidth: 120 }}
          >
            {DEAL_STAGE_OPTIONS.map(stage => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
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
                onClick={() => handleEdit(row, index)}
              >
                <Icon icon="Edit" className="me-2" /> Update
              </Button>
              <Button
                color="link"
                className="dropdown-item text-danger"
                onClick={() => handleDelete(index)}
              >
                <Icon icon="Delete" className="me-2" /> Delete
              </Button>
              {/* Only show Follow Up if not "Won" */}
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
    ))
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