/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
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
}

const Deals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<TableRow | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const handleView = (row: TableRow) => {
    setSelectedProposal(row);
    setIsViewModalOpen(true);
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
                      <th>Contact Details</th>
                      <th>Value</th>
                      <th>Close Date</th>
                      <th>Next Follow Up</th>
                      <th>Deal Agent</th>
                      <th>Deal Watcher</th>
                      <th>Stage</th>
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

        <td>{row.dealValue ? `${row.dealValue}` : '--'}</td>
        <td>{row.validTill}</td>
        <td>--</td>
        <td>{row.dealAgent || '--'}</td>
        <td>
          <div className="d-flex align-items-center gap-2">
            <img
              src="/path/to/avatar.jpg"
              alt="Watcher Avatar"
              className="rounded-circle"
              style={{ width: '30px', height: '30px' }}
            />
            <span>{row.dealWatcher || 'atharvraj singh rana'}</span>
          </div>
        </td>
        <td>
          <span
            className={`badge ${
              row.status === 'Lost'
                ? 'bg-danger'
                : row.status === 'Initial Contact'
                ? 'bg-info'
                : 'bg-success'
            }`}
          >
            {row.dealStages || row.status}
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
              <Button
                color="link"
                className="dropdown-item"
            
              >
                <Icon icon="EventNote" className="me-2" /> Follow Up
              </Button>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={11} className="text-center">
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
    </PageWrapper>
  );
};

export default Deals;