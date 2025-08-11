import React, { useState, useEffect } from 'react';
import Icon from '../../../components/icon/Icon';

const timezones = [
  'Asia/Kolkata',
  'UTC',
  'America/New_York',
];
const currencies = [
  '₹ (INR)',
  '$ (USD)',
  '€ (EUR)',
];
const languages = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
];

const AppSettings = () => {
  const [dateFormats, setDateFormats] = useState<string[]>([]);
  const [timeFormats, setTimeFormats] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'app' | 'signup'>('app');
  const [dateFormat, setDateFormat] = useState('');
  const [timeFormat, setTimeFormat] = useState('');
  const [timezone, setTimezone] = useState(timezones[0]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [language, setLanguage] = useState(languages[0].value);
  const [rowLimit, setRowLimit] = useState('10');
  const [canExport, setCanExport] = useState(true);

  // Simulate fetching formats dynamically (replace with API call if needed)
  useEffect(() => {
    // Example: fetch from API or config
    setDateFormats([
      'D d M Y (Thu 07 Aug 2025)',
      'Y-m-d',
      'm/d/Y',
    ]);
    setTimeFormats([
      '12 Hour(s) (12:49 pm)',
      '24 Hour(s) (12:49)',
    ]);
    setDateFormat('D d M Y (Thu 07 Aug 2025)');
    setTimeFormat('12 Hour(s) (12:49 pm)');
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link${activeTab === 'app' ? ' active' : ''}`}
              onClick={() => setActiveTab('app')}
              type="button"
            >
              App Settings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link${activeTab === 'signup' ? ' active' : ''}`}
              onClick={() => setActiveTab('signup')}
              type="button"
            >
              Client Sign up Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {activeTab === 'app' && (
                <>
                  <div className="fw-bold fs-5 mb-4">App Settings</div>
                  <form>
                    <div className="row mb-4">
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">Date Format</label>
                        <select className="form-select" value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
                          {dateFormats.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">Time Format</label>
                        <select className="form-select" value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
                          {timeFormats.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">Default Timezone</label>
                        <select className="form-select" value={timezone} onChange={e => setTimezone(e.target.value)}>
                          {timezones.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">
                          Default Currency <Icon icon="HelpOutline" size="sm" className="ms-1" />
                        </label>
                        <select className="form-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                          {currencies.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">
                          Language <Icon icon="HelpOutline" size="sm" className="ms-1" />
                        </label>
                        <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                          {languages.map(f => (
                            <option key={f.value} value={f.value}>
                              {f.flag} {f.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">
                          Datatable Row Limit <Icon icon="HelpOutline" size="sm" className="ms-1" />
                        </label>
                        <select className="form-select" value={rowLimit} onChange={e => setRowLimit(e.target.value)}>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-md-6 d-flex align-items-center mt-4">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="canExport"
                          checked={canExport}
                          onChange={e => setCanExport(e.target.checked)}
                        />
                        <label htmlFor="canExport" className="form-check-label fw-semibold">
                          Employee can export data
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4">
                      <Icon icon="Check" className="me-2" /> Save
                    </button>
                  </form>
                </>
              )}

              {activeTab === 'signup' && (
                <>
                  <div className="fw-bold fs-5 mb-4">Client Sign up Settings</div>
                  <form>
                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="allowSignup"
                          // You can add state for this if needed
                        />
                        <label className="form-check-label fw-semibold" htmlFor="allowSignup">
                          Allow Client Signup
                          <Icon icon="HelpOutline" size="sm" className="ms-1" />
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Client Signup URL</label>
                      <div className="d-flex align-items-center">
                        <span className="me-2" style={{ wordBreak: 'break-all' }}>
                          https://nebverse.com/public/client-signup/40e0f6ff11e87832a089641b4ba953f2
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            navigator.clipboard.writeText('https://nebverse.com/public/client-signup/40e0f6ff11e87832a089641b4ba953f2');
                          }}
                        >
                          <Icon icon="ContentCopy" className="me-1" /> Copy
                        </button>
                      </div>
                      <div className="mt-2" style={{ color: '#6d28d9' }}>
                        (This URL will be used by the client to register on the website.)
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 mt-3">
                      <Icon icon="Check" className="me-2" /> Save
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;