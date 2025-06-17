import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';

const JobView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get job from location state (sent from JobPage)
  const job = location.state?.job;

  if (!job) {
    return (
      <PageWrapper title="Job Not Found">
        <Page>
          <Card>
            <CardBody>
              <div className="text-center py-5">
                <Icon icon="ErrorOutline" size="2x" color="danger" />
                <h4 className="mt-3">Job not found</h4>
                <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
                  Go Back
                </button>
              </div>
            </CardBody>
          </Card>
        </Page>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={job.jobTitle}>
      <Page>
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3" style={{ borderBottom: '2px solid #f1f3f6' }}>
          <li className="nav-item" style={{ minWidth: 120, textAlign: 'center' }}>
            <a className="nav-link active" href="#">Profile</a>
          </li>
          <li className="nav-item" style={{ minWidth: 120, textAlign: 'center' }}>
            <a className="nav-link" href="#">Candidate</a>
          </li>
          <li className="nav-item" style={{ minWidth: 120, textAlign: 'center' }}>
            <a className="nav-link" href="#">Interview</a>
          </li>
          <li className="nav-item" style={{ minWidth: 120, textAlign: 'center' }}>
            <a className="nav-link" href="#">Offer Letter</a>
          </li>
          <li className="nav-item" style={{ minWidth: 120, textAlign: 'center' }}>
            <a className="nav-link" href="#">History</a>
          </li>
        </ul>

        <div className="row mb-4">
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <Card>
                  <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Openings</div>
                      <div className="fw-bold fs-4">{job.totalOpenings}</div>
                    </div>
                    <Icon icon="ListAlt" size="lg" color="secondary" />
                  </CardBody>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>In Progress</div>
                      <div className="fw-bold fs-4">0</div>
                    </div>
                    <Icon icon="AccessTime" size="lg" color="secondary" />
                  </CardBody>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Interview scheduled</div>
                      <div className="fw-bold fs-4">0</div>
                    </div>
                    <Icon icon="EventNote" size="lg" color="secondary" />
                  </CardBody>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Offer Released</div>
                      <div className="fw-bold fs-4">0</div>
                    </div>
                    <Icon icon="Layers" size="lg" color="secondary" />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Card className="h-100">
              <CardBody className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 180 }}>
                <Icon icon="SentimentDissatisfied" size="2x" color="secondary" />
                <div className="text-muted small mt-2">- Not enough data -</div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Job Details Box */}
        <Card>
          <CardBody>
            <div className="mb-3">
              <h4 className="mb-0">{job.jobTitle}</h4>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2"><span className="text-muted">Category</span>: {job.jobCategory}</div>
                <div className="mb-2"><span className="text-muted">Sub Category</span>: {job.jobSubCategory}</div>
                <div className="mb-2"><span className="text-muted">Department</span>: {job.department}</div>
                <div className="mb-2"><span className="text-muted">Total Openings</span>: {job.totalOpenings}</div>
                <div className="mb-2"><span className="text-muted">Start Date</span>: {job.startDate ? new Date(job.startDate).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                <div className="mb-2"><span className="text-muted">End Date</span>: {job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                <div className="mb-2">
                  <span className="text-muted">Status</span>:
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: job.status === 'Closed' ? '#f44336' : '#00e676',
                      marginRight: 6,
                    }} />
                    <span style={{ textTransform: 'lowercase' }}>{job.status}</span>
                  </span>
                </div>
                <div className="mb-2"><span className="text-muted">Description</span>: {job.description}</div>
              </div>
              <div className="col-md-6">
                <div className="mb-2">
                  <span className="text-muted">Recruiter</span>:
                  <span className="ms-2 d-inline-flex align-items-center">
                    <Icon icon="AccountCircle" className="me-1" />
                    {job.recruiter}
                    {job.isYou && (
                      <span className="badge bg-secondary ms-2" style={{ fontSize: 10 }}>It's you</span>
                    )}
                  </span>
                </div>
                <div className="mb-2"><span className="text-muted">Job Type</span>: {job.jobType}</div>
                <div className="mb-2"><span className="text-muted">Work Experience</span>: {job.workExperience}</div>
                <div className="mb-2"><span className="text-muted">Show Pay By</span>: {job.showPayBy}</div>
                <div className="mb-2"><span className="text-muted">Minimum Salary Amount</span>: {job.minSalary}</div>
                <div className="mb-2"><span className="text-muted">Rate</span>: {job.rate}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Page>
    </PageWrapper>
  );
};

export default JobView;