/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectPage from '../project/ProjectPage';
import { ProjectsProvider } from '../project/ProjectsContext';
import CommanUpcomingEvents from '../task/CommanUpcomingEvents';
import Attendance from '../attendance/Attendance';
import Leaves from '../leaves/Leaves';
import TimeSheet from '../timesheet/TimeSheet';
import Document from '../document/Document';
import TicketPage from '../ticket/TicketPage';
import EmergencyContactsPage from '../emergency/EmergencyContactsPage';
import PassportVisaPage from '../passport/PassportVisaPage';

const MAIN_TABS = [
  'Profile', 'Projects', 'Tasks', 'Attendance', 'Leaves', 'Leaves Quota', 'Timesheet',
  'Documents', 'Emergency Contacts', 'Ticket', 'Increments & Promotions',
];
const MORE_TABS = [
  'Appreciation', 'Shift Roaster', 'Permissions', 'Activity', 'Immigration'
];

const ViewEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Profile');
  const [showMore, setShowMore] = useState(false);

  // Fetch employees from localStorage
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  // Match both id and employeeId for compatibility
  const employee = employees.find(
    (emp: any) => String(emp.id) === String(id) || String(emp.employeeId) === String(id)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Details</h2>
      {employee ? (
        <>
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            {MAIN_TABS.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link${activeTab === tab ? ' active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => { setActiveTab(tab); setShowMore(false); }}
                  type="button"
                >
                  {tab}
                </button>
              </li>
            ))}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button
                className={`nav-link${MORE_TABS.includes(activeTab) ? ' active' : ''}`}
                style={{ cursor: 'pointer', minWidth: 70 }}
                onClick={() => setShowMore((prev) => !prev)}
                type="button"
              >
                More{showMore ? '↑' : '↓'}
              </button>
              {showMore && (
                <div
                  className="position-absolute bg-white border rounded shadow"
                  style={{
                    top: '100%',
                    left: 0,
                    zIndex: 10,
                    minWidth: 200,
                  }}
                >
                  {MORE_TABS.map((tab) => (
                    <div
                      key={tab}
                      className={`px-3 py-2 ${activeTab === tab ? 'bg-light fw-bold' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => { setActiveTab(tab); setShowMore(false); }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Profile Section */}
          {activeTab === 'Profile' && (
            <div className="row g-3">
              {/* Left: Profile Summary */}
              <div className="col-lg-8">
                <div className="card mb-3">
                  <div className="card-body d-flex align-items-center">
                    <div>
                      <img
                        src={employee.profilePicture || 'https://via.placeholder.com/120x120?text=No+Image'}
                        alt="Profile"
                        className="rounded"
                        style={{ width: 120, height: 120, objectFit: 'cover', marginRight: 24 }}
                      />
                    </div>
                    <div>
                      <h4 className="mb-1">
                        {employee.name}{' '}
                        {employee.country && (
                          <span title={employee.country} style={{ fontSize: 22 }}>
                            {/* You can use a flag emoji or icon here */}
                          </span>
                        )}
                      </h4>
                      <div className="mb-1 text-muted">
                        {employee.designation} • {employee.department} &nbsp;|&nbsp; User Role: {employee.userRole}
                      </div>
                      <div className="mb-2 text-muted" style={{ fontSize: 13 }}>
                        Last login at -- {/* Add last login if available */}
                      </div>
                      <div className="d-flex gap-4">
                        <div>
                          <div className="fw-bold text-center">0</div>
                          <div className="small text-muted">Open Tasks</div>
                        </div>
                        <div>
                          <div className="fw-bold text-center">0</div>
                          <div className="small text-muted">Projects</div>
                        </div>
                        <div>
                          <div className="fw-bold text-center">0</div>
                          <div className="small text-muted">Hours Logged</div>
                        </div>
                        <div>
                          <div className="fw-bold text-center">0</div>
                          <div className="small text-muted">Tickets</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="card">
                  <div className="card-header fw-bold">Profile Info</div>
                  <div className="card-body">
                    {[
                      ['Employee ID', employee.employeeId || employee.id || '--'],
                      ['Full Name', employee.name],
                      ['Designation', employee.designation],
                      ['Department', employee.department],
                      ['Gender', employee.gender ? `♂ ${employee.gender}` : '--'],
                      ['Work Anniversary', '--'],
                      ['Date of Birth', employee.dateOfBirth || '--'],
                      ['Email', employee.email],
                      ['Mobile', employee.mobile || '--'],
                      ['Slack Member ID', employee.slackMemberId || '--'],
                      ['User Role', employee.userRole],
                      ['Address', employee.address || '--'],
                      ['About', employee.about || '--'],
                      ['Country', employee.country || '--'],
                      ['Marital Status', employee.maritalStatus || '--'],
                      ['Language', employee.language || '--'],
                      ['Exit Date', employee.exitDate || '--'],
                      ['Notice Period Start Date', employee.noticePeriodStartDate || '--'],
                      ['Notice Period End Date', employee.noticePeriodEndDate || '--'],
                      ['Probation End Date', employee.probationEndDate || '--'],
                      ['Skills', employee.skills || '--'],
                      ['Employment Type', employee.employmentType || '--'],
                      ['Hourly Rate', employee.hourlyRate || '--'],
                    ].map(([label, value], idx) => (
                      <div className="row mb-2" key={idx}>
                        <div className="col-5 text-muted">{label}</div>
                        <div className="col-7">{value || '--'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Side Widgets */}
              <div className="col-lg-4">
                {/* Appreciation */}
                <div className="card mb-3">
                  <div className="card-header fw-bold">Appreciation</div>
                  <div className="card-body text-center text-muted">
                    <span style={{ fontSize: 32 }}>🏅</span>
                    <div>- No record found. -</div>
                  </div>
                </div>

                {/* Reporting To & Team */}
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-7 text-center">
                        <div className="text-muted mb-2">Reporting To</div>
                        <div className="d-flex flex-column align-items-center">
                          <div className="fw-bold">{employee.reportingTo || '--'}</div>
                          <div className="small text-muted">{employee.reportingToDesignation || employee.department || '--'}</div>
                        </div>
                      </div>
                      <div className="col-5 text-center">
                        <div className="text-muted mb-2">Reporting Team</div>
                        <div className="fw-bold">--</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance & Leaves */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <div className="text-muted mb-1">
                          Late Attendance <span title="Late Attendance">?</span>
                        </div>
                        <div className="fw-bold" style={{ fontSize: 20 }}>0</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <div className="text-muted mb-1">
                          Leaves Taken <span title="Leaves Taken">?</span>
                        </div>
                        <div className="fw-bold" style={{ fontSize: 20 }}>0</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="card" style={{ minHeight: 220 }}>
                  <div className="card-header fw-bold">Tasks</div>
                  <div className="card-body text-center text-muted d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <span style={{ fontSize: 32 }}>⏳</span>
                    <div>- Not enough data -</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Projects' && (
            <ProjectsProvider>
              <ProjectPage />
            </ProjectsProvider>
          )}
          {activeTab === 'Tasks' && (
            <CommanUpcomingEvents />
          )}
          {activeTab === 'Attendance' && (
            <Attendance />
          )}
          {activeTab === 'Leaves' && (
            <Leaves />
          )}
          {activeTab === 'Timesheet' && (
            <TimeSheet />
          )}
          {activeTab === 'Documents' && (
            <Document />
          )}
          {activeTab === 'Ticket' && (
            <TicketPage />
          )}
          {activeTab === 'Emergency Contacts' && (
            <EmergencyContactsPage />
          )}
          {activeTab === 'Immigration' && (
            <PassportVisaPage />
          )}
        </>
      ) : (
        <p>No employee details available.</p>
      )}
    </div>
  );
};

export default ViewEmployeePage;