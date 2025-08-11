/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Emergency from './Emergency'; 
import Document from '../document/Document';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'emergency' | 'documents'>('profile');

  // Profile form states
  const [prefix, setPrefix] = useState('--');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotif, setEmailNotif] = useState('enable');
  const [googleCal, setGoogleCal] = useState('yes');
  const [country, setCountry] = useState('India');
  const [mobile, setMobile] = useState('');
  const [language, setLanguage] = useState('English');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [slackId, setSlackId] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState<string>('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) setProfilePic(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'emergency' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('emergency')}
          >
            Emergency Contacts
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </li>
      </ul>

      {/* Content */}
      {activeTab === 'profile' && (
        <>
          {/* Profile Picture */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Profile Picture <Icon icon="HelpOutline" size="sm" className="ms-1" />
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
            <div className="d-flex justify-content-center mb-4">
              <div
                className="rounded"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  background: '#f3f4f6',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #e5e7eb'
                }}
                onClick={handleProfilePicClick}
                title="Click to change profile picture"
              >
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form>
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Your Name</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    style={{ maxWidth: 80 }}
                    value={prefix}
                    onChange={e => setPrefix(e.target.value)}
                  >
                    <option>--</option>
                    <option>Ms</option>
                    <option>Mr</option>
                  </select>
                  <Input
                    className="form-control"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Your Email <span className="text-danger">*</span></label>
                <Input
                  className="form-control"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Your Password</label>
                <div className="input-group">
                  <Input
                    className="form-control"
                    placeholder="Must have at least 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    tabIndex={-1}
                  >
                    <Icon icon={showPassword ? "VisibilityOff" : "Visibility"} />
                  </button>
                  <button className="btn btn-outline-primary" type="button" tabIndex={-1}>
                    <Icon icon="Settings" />
                  </button>
                </div>
                <div className="form-text">Leave blank to keep the current password.</div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Receive email notifications?</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="emailNotif"
                      id="notifEnable"
                      value="enable"
                      checked={emailNotif === "enable"}
                      onChange={e => setEmailNotif(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="notifEnable">Enable</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="emailNotif"
                      id="notifDisable"
                      value="disable"
                      checked={emailNotif === "disable"}
                      onChange={e => setEmailNotif(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="notifDisable">Disable</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Enable Google Calendar</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="googleCal"
                      id="calYes"
                      value="yes"
                      checked={googleCal === "yes"}
                      onChange={e => setGoogleCal(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="calYes">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="googleCal"
                      id="calNo"
                      value="no"
                      checked={googleCal === "no"}
                      onChange={e => setGoogleCal(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="calNo">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Country</label>
                <div className="input-group">
                  <span className="input-group-text"><span role="img" aria-label="India">🇮🇳</span></span>
                  <select
                    className="form-select"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Mobile</label>
                <div className="input-group">
                  <span className="input-group-text"><span role="img" aria-label="IN">🇮🇳 +91</span></span>
                  <Input
                    className="form-control"
                    placeholder="e.g. 1234567890"
                    value={mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Change Language</label>
                <div className="input-group">
                  <span className="input-group-text"><span role="img" aria-label="EN">🇬🇧</span></span>
                  <select
                    className="form-select"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Date of Birth</label>
                <Input
                  className="form-control"
                  type="date"
                  value={dob}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Slack Member ID</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <Input
                    className="form-control"
                    value={slackId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlackId(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Marital Status</label>
                <select
                  className="form-select"
                  value={maritalStatus}
                  onChange={e => setMaritalStatus(e.target.value)}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Your Address</label>
              <textarea
                className="form-control mb-3"
                rows={3}
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <Button color="primary" className="px-4">
              <Icon icon="Check" className="me-2" /> Save
            </Button>
          </form>
        </>
      )}

      {activeTab === 'emergency' && <Emergency />}

      {activeTab === 'documents' && (
       <Document/>
      )}
     
    </div>
  );
};

export default ProfileSettings;
