import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';

const notificationOptions = [
  "New Expense/Added by Admin",
  "New Expense/Added by Member",
  "Expense Status Changed",
  "New Support Ticket Request",
  "New Leave Application",
  "Task Completed",
  "Task Status Updated",
  "Invoice Create/Update Notification",
  "Discussion Reply",
  "New Product Purchase Request",
  "Lead notification",
  "Order Create/Update Notification",
  "User Join Via Invitation",
  "Follow Up Reminder",
  "User Registration/Added by Admin",
  "Employee Assign to Project",
  "New Notice Published",
  "User Assign to Task",
  "Birthday Notification",
  "Payment Notification",
  "Employee Appreciation",
  "Holiday Notification",
  "Estimate Notification",
  "Event Notification",
  "Message Notification",
  "Project Mention Notification",
  "Task Mention Notification",
  "Shift Assign Notification",
  "Daily Schedule Notification",
  "Custom Notification 1",
  "Custom Notification 2",
  "Custom Notification 3",
  "Custom Notification 4",
  "Custom Notification 5",
];

const NotificationSettings = () => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(notificationOptions);
  const [activeNotifyTab, setActiveNotifyTab] = useState<'email' | 'slack' | 'push'>('email');

  const toggleAll = (isChecked: boolean) => {
    setSelectedNotifications(isChecked ? [...notificationOptions] : []);
  };

  const toggleOption = (option: string) => {
    setSelectedNotifications(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  return (
    <div className="container-fluid p-4">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeNotifyTab === 'email' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveNotifyTab('email')}
          >
            Email
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeNotifyTab === 'slack' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveNotifyTab('slack')}
          >
            Slack
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeNotifyTab === 'push' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveNotifyTab('push')}
          >
            Push Notification
          </button>
        </li>
      </ul>

      <div className="row">
        {/* Left: Instructions */}
        <div className="col-md-8 d-flex align-items-center justify-content-center" style={{ minHeight: 400 }}>
          <div className="text-center w-100">
            <span className="fs-5">
              Choose from right sidebar all the emails notifications you want to receive.
            </span>
          </div>
        </div>
        {/* Right: Notification Settings (Scrollable) */}
        <div className="col-md-4">
          <div
            className="border rounded p-4 bg-white"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            <h5 className="fw-semibold mb-3">
              {activeNotifyTab === 'email' && 'Email Notification Settings'}
              {activeNotifyTab === 'slack' && 'Slack Notification Settings'}
              {activeNotifyTab === 'push' && 'Push Notification Settings'}
            </h5>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={selectedNotifications.length === notificationOptions.length}
                onChange={e => toggleAll(e.target.checked)}
              />
              <label className="form-check-label fw-bold" htmlFor="selectAll">
                Select All
              </label>
            </div>

            {notificationOptions.map((option, index) => (
              <div className="form-check mb-3" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`notif-${index}`}
                  checked={selectedNotifications.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                <label className="form-check-label" htmlFor={`notif-${index}`}>
                  {option}
                </label>
              </div>
            ))}

          
          </div>
        </div>
      </div>
        {/* Save button small and left */}
            <Button color="primary" className="mt-3">
              Save
            </Button>
    </div>
  );
};

export default NotificationSettings;
