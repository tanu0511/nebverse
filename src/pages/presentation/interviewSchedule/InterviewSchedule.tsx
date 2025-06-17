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
import AddInterviewScheduleModal from './AddInterviewScheduleModal';
import RescheduleInterviewModal from './RescheduleInterviewModal';
import ViewInterviewScheduleModal from './ViewInterviewScheduleModal';

type InterviewSchedule = {
  interviewer: string;
  scheduleDateandTime: string;
  interviewRound: string;
  candidate: string;
  id: number;
  name: string;
  status: string;
};

const InterviewSchedule = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [interviewSchedule, setInterviewSchedule] = useState<InterviewSchedule[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InterviewSchedule | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleItem, setRescheduleItem] = useState<InterviewSchedule | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [showAddInterviewModal, setShowAddInterviewModal] = useState(false);
  const [, setEditData] = useState<InterviewSchedule | null>(null);

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredData = interviewSchedule.filter(
    (item: InterviewSchedule) =>
      (item.candidate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.interviewer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scheduleDateandTime || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.interviewRound || '').toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  function handleDeleteInterviewSchedule(id: number) {
    setInterviewSchedule((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  }

  const handleStatusChange = (id: number, status: string) => {
    setInterviewSchedule(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleEdit = (data: InterviewSchedule) => {
    setEditData(data);
    setShowAddInterviewModal(true);
  };

  return (
    <PageWrapper title="InterviewSchedule">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Interview Schedule..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => setAddModalOpen(true)}
          >
            Add interview Schedule 
          </Button>
          <Button
            icon='FormatListBulleted'
            className='input-group-text'
            color='primary'
            isLight
          />
          <Button
            icon='CalendarToday'
            className='input-group-text'
            color='primary'
            isLight
          />
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: '15%', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={
                            filteredData.length > 0 &&
                            selectedIds.length === filteredData.length
                          }
                          onChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </th>
                      <th>Candidate</th>
                      <th>Interviewer</th>
                      <th>Schedule Date and Time</th>
                      <th>Interview Round</th>
                      <th>Status</th>
                      <th>Action</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id} style={{ height: '56px' }}>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onChange={(e) =>
                                handleSelectRow(item.id, e.target.checked)
                              }
                              aria-label={`Select ${item.name}`}
                            />
                          </td>
                          <td>{item.candidate || 'N/A'}</td>
                          <td>{item.interviewer || 'N/A'}</td>
                          <td>
                            {item.startOn && item.startTime
                              ? `${item.startOn} ${item.startTime}`
                              : 'N/A'}
                          </td>
                          <td>{item.round || 'N/A'}</td>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <span
                                  className="btn btn-light"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    minWidth: 120,
                                    textAlign: 'left',
                                  }}
                                >
                                  <span style={{
                                    display: 'inline-block',
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    marginRight: 8,
                                    background:
                                      item.status === 'Pending' ? '#ffc107' :
                                      item.status === 'Hired' ? '#28a745' :
                                      item.status === 'Completed' ? '#007bff' :
                                      item.status === 'Canceled' ? '#dc3545' : '#ccc'
                                  }} />
                                  {item.status}
                                </span>
                              </DropdownToggle>
                              <DropdownMenu>
                                <Button color="link" className="dropdown-item" onClick={() => handleStatusChange(item.id, 'Pending')}>
                                  <span style={{ color: '#ffc107', marginRight: 8, fontSize: 18 }}>●</span> Pending
                                </Button>
                                <Button color="link" className="dropdown-item" onClick={() => handleStatusChange(item.id, 'Hired')}>
                                  <span style={{ color: '#28a745', marginRight: 8, fontSize: 18 }}>●</span> Hired
                                </Button>
                                <Button color="link" className="dropdown-item" onClick={() => handleStatusChange(item.id, 'Completed')}>
                                  <span style={{ color: '#007bff', marginRight: 8, fontSize: 18 }}>●</span> Completed
                                </Button>
                                <Button color="link" className="dropdown-item" onClick={() => handleStatusChange(item.id, 'Canceled')}>
                                  <span style={{ color: '#dc3545', marginRight: 8, fontSize: 18 }}>●</span> Canceled
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button color="link" className="dropdown-item" onClick={() => {
                                  setViewItem(item);
                                  setViewModalOpen(true);
                                }}>
                                  <Icon icon="Visibility" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => handleEdit(item)}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setRescheduleItem(item);
                                    setRescheduleModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Autorenew" className="me-2" /> Reschedule Interview
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteInterviewSchedule(item.id)}
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
                        <td colSpan={7} className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Interview Schedule"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <AddInterviewScheduleModal
        isOpen={addModalOpen || !!editItem || showAddInterviewModal}
        setIsOpen={() => {
          setAddModalOpen(false);
          setEditItem(null);
          setShowAddInterviewModal(false);
        }}
        onSave={(schedule) => {
          if (editItem) {
            // Edit mode: update existing
            setInterviewSchedule(prev =>
              prev.map(item =>
                item.id === editItem.id ? { ...item, ...schedule } : item
              )
            );
            setEditItem(null);
          } else {
            // Add mode: add new
            setInterviewSchedule(prev => [
              ...prev,
              {
                ...schedule,
                id: Date.now(),
                name: schedule.candidate,
                round: schedule.round,
                startOn: schedule.startOn,
                startTime: schedule.startTime,
                interviewer: schedule.interviewer,
                candidate: schedule.candidate,
                status: "Pending",
              },
            ]);
            setAddModalOpen(false);
          }
        }}
      />
      <RescheduleInterviewModal
        isOpen={rescheduleModalOpen}
        setIsOpen={setRescheduleModalOpen}
        interview={rescheduleItem}
        onSave={(updated) => {
          setInterviewSchedule(prev =>
            prev.map(item =>
              item.id === updated.id
                ? { ...item, startOn: updated.startOn, startTime: updated.startTime }
                : item
            )
          );
          setRescheduleModalOpen(false);
          setRescheduleItem(null);
        }}
      />
      <ViewInterviewScheduleModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        data={viewItem}
        onEdit={handleEdit}
        onReschedule={(data) => {
          setViewModalOpen(false);
          setRescheduleItem(data);
          setRescheduleModalOpen(true);
        }}
        onDelete={(id) => handleDeleteInterviewSchedule(id)} // Pass your delete handler here
      />
    </PageWrapper>
  );
};

export default InterviewSchedule;