import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddJobModal from './AddJobModal';

interface Job {
  id: string | number;
  jobTitle?: string;
  recruiter?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  description?: string; // <-- Add this line
}
const jobs: Job[] = [];

const JobPage = () => {
  const [jobsList, setJobsList] = useState<Job[]>(jobs);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [searchTerm, setSearchTerm] = useState('');
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<(string | number)[]>([]);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleEditJob = (job: Job) => {
    setEditJob(job);
    setAddJobOpen(true);
  };

  const handleSaveJob = (job: Job) => {
    if (editJob) {
      // Edit mode: update existing job
      setJobsList(prev =>
        prev.map(j => (j.id === job.id ? { ...j, ...job } : j))
      );
      setEditJob(null);
    } else {
      // Add mode: add new job
      setJobsList(prev => [...prev, job]);
    }
    setAddJobOpen(false);
  };

  // Checkbox handlers
  const handleSelectJob = (id: string | number) => {
    setSelectedJobs(prev =>
      prev.includes(id) ? prev.filter(jid => jid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(dataPagination(filteredData, currentPage, perPage).map(j => j.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const filteredData = jobsList.filter(
    (item: Job) =>
      (item.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.recruiter || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.startDate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.endDate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.status || '').toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <PageWrapper title="Jobs">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Jobs..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => setAddJobOpen(true)}
          >
            Add Jobs
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
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>
                        <input
                          type="checkbox"
                          checked={
                            dataPagination(filteredData, currentPage, perPage).length > 0 &&
                            dataPagination(filteredData, currentPage, perPage).every(j => selectedJobs.includes(j.id))
                          }
                          onChange={e => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th>Job Title</th>
                      <th>Recruiter</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedJobs.includes(item.id)}
                              onChange={() => handleSelectJob(item.id)}
                            />
                          </td>
                          <td>{item.jobTitle || '-'}</td>
                          <td>{item.recruiter || '-'}</td>
                          <td>{item.startDate || '-'}</td>
                          <td>{item.endDate || '-'}</td>
                          <td>
                            <select
                              className="form-select"
                              style={{ minWidth: 50}}
                              value={item.status || '-'}
                              onChange={e => {
                                const newStatus = e.target.value;
                                setJobsList(prev =>
                                  prev.map(job =>
                                    job.id === item.id ? { ...job, status: newStatus } : job
                                  )
                                );
                              }}
                            >
                              <option value="Open">Open</option>
                              <option value="Closed">Closed</option>
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
                                  onClick={() => {
                                    navigate(`/jobs/view/${item.id}`, { state: { job: item } });
                                  }}
                                >
                                  <Icon icon="Visibility" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleEditJob(item);
                                    setIsDuplicate(false);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => {
                                    setJobsList(prev => prev.filter(job => job.id !== item.id));
                                    setSelectedJobs(prev => prev.filter(jid => jid !== item.id));
                                  }}
                                >
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditJob({ ...item, id: Date.now() });
                                    setIsDuplicate(true);
                                    setAddJobOpen(true);
                                  }}
                                >
                                  <Icon icon="ContentCopy" className="me-2" /> Duplicate
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
                label="Jobs"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <AddJobModal
        isOpen={addJobOpen}
        setIsOpen={(open: boolean) => {
          setAddJobOpen(open);
          if (!open) setEditJob(null);
          setIsDuplicate(false);
        }}
        onAddJob={handleSaveJob}
        job={editJob}
        isDuplicate={isDuplicate}
      />
    </PageWrapper>
  );
};

export default JobPage;