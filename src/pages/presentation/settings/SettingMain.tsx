/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import BuisnessAdd from './BuisnessAdd';
import AppSettings from './AppSettings';
import ProfileSettings from './ProfileSettings';
import NotificationSetting from './NotificationSetting';
import CurrencySetting from './CurrencySetting';
import SettingsAside from './SettingsAside';

const settingsMenu = [
  'Company Settings',
  'Business Address',
  'App Settings',
  'Profile Settings',
  'Notification Settings',
  'Currency Settings',
  'Payment Credentials',
  'Finance Settings',
  'Contract Settings',
  'Tax Settings',
  'Ticket Settings',
  'Project Settings',
  'Attendance Settings',
  'Leaves Settings',
  'Custom Fields',
  'Roles & Permissions',
  'Message Settings',
  'Lead Settings',
  'Time Log Settings',
  'Task Settings',
  'Security Settings',
  'Theme Settings',
  'Module Settings',
  'Google Calendar Settings',
  'Custom Link Settings',
  'GDPR Settings',
  'Database Backup Settings',
  'Sign Up Settings',
  'Asset Settings',
  'E-Invoice Settings',
  'Payroll Settings',
  'Overtime Settings',
  'Purchase Settings',
  'Recuirt',
  'SMS Settings',
  'Zoom Settings',
  'Billing'
];

const SettingMain = () => {
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState('Company Settings');


  return (
    <div className="container-fluid px-4 py-4">
      <div className="row" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="col-auto p-0">
          <SettingsAside
            menu={settingsMenu}
            active={activeMenu}
            onSelect={setActiveMenu}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="col d-flex align-items-start" style={{ height: '100%' }}>
          <div className="card w-100">
            <div className="card-body">
              {activeMenu === 'Business Address' ? (
                <BuisnessAdd />
              ) : activeMenu === 'App Settings' ? (
                <AppSettings />
              ) : activeMenu === 'Notification Settings' ? (
                <NotificationSetting />
              ) : activeMenu === 'Profile Settings' ? (
                <ProfileSettings />
              ) : activeMenu === 'Currency Settings' ? (
                <CurrencySetting />
              ) : activeMenu === 'Company Settings' ? (
                <>
                  <h4 className="mb-4 fw-bold">Company Settings</h4>
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Company Name <span className="text-danger">*</span>
                          <span className="ms-1" title="Enter your company name">ⓘ</span>
                        </label>
                        <input className="form-control" defaultValue="nisha jasnani" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Company Email <span className="text-danger">*</span>
                        </label>
                        <input className="form-control" defaultValue="nishujaswani@gmail.com" />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Company Phone <span className="text-danger">*</span>
                        </label>
                        <input className="form-control" defaultValue="8770099047" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Company Website</label>
                        <input className="form-control" defaultValue="https://nisha.app/" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4" style={{ background: '#5b21b6', border: 'none' }}>
                      <i className="bi bi-check2 me-2"></i>Save
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <h4 className="mb-4">Settings for {activeMenu}</h4>
                  <p>Content for {activeMenu} will be implemented here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar custom styles */}
      <style>{`
        .sidebar-menu-item.active,
        .sidebar-menu-item:hover {
          background: #7c3aed !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default SettingMain;