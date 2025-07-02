import React, { useState } from 'react';
import Modal, { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Icon from '../../../components/icon/Icon';

const allotmentTypes = [
  'Monthly Leave Type',
  'Yearly Leave Type',
  'Quarterly Leave Type',
];

const paidStatusOptions = [
  'Paid',
  'Unpaid',
];

interface AddLeaveTypeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (data: any) => void;
}

const AddLeaveTypeModal: React.FC<AddLeaveTypeModalProps> = ({ isOpen, setIsOpen, onSave }) => {
  const [leaveType, setLeaveType] = useState('');
  const [allotmentType, setAllotmentType] = useState(allotmentTypes[0]);
  const [monthlyLeaves, setMonthlyLeaves] = useState('0');
  const [paidStatus, setPaidStatus] = useState(paidStatusOptions[0]);
  const [colorCode, setColorCode] = useState('#16813D');
  const [activeTab, setActiveTab] = useState<'General' | 'Entitlement' | 'Applicability'>('General');

  const handleSave = () => {
    if (!leaveType.trim()) return; // Prevent empty
    onSave({
      leaveType,
      paidStatus,
      allotmentType,
      monthlyLeaves,
      colorCode,
    });
    setLeaveType('');
    setAllotmentType(allotmentTypes[0]);
    setMonthlyLeaves('0');
    setPaidStatus(paidStatusOptions[0]);
    setColorCode('#16813D');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCentered size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-leave-type-modal-title">Add New Leave Type</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="mb-4 border-bottom pb-2">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <span
                className={`nav-link ${activeTab === 'General' ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('General')}
              >
                General
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`nav-link ${activeTab === 'Entitlement' ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('Entitlement')}
              >
                Entitlement
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`nav-link ${activeTab === 'Applicability' ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('Applicability')}
              >
                Applicability
              </span>
            </li>
          </ul>
        </div>

        {activeTab === 'General' && (
          <div>
            <h5 className="mb-3">General</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label" htmlFor="leaveTypeInput">
                  Leave Type <span className="text-danger">*</span>
                </label>
                <Input
                  id="leaveTypeInput"
                  type="text"
                  placeholder="E.g. Sick, Casual"
                  value={leaveType}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeaveType(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="allotmentTypeSelect">Leave Allotment Type</label>
                <Select
                  id="allotmentTypeSelect"
                  ariaLabel="Leave Allotment Type"
                  value={allotmentType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAllotmentType(e.target.value)}
                >
                  {allotmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="monthlyLeavesInput">
                  No of Monthly Leaves{' '}
                  <Icon icon="HelpOutline" size="sm" title="Number of leaves per month" />
                </label>
                <Input
                  id="monthlyLeavesInput"
                  type="number"
                  value={monthlyLeaves}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyLeaves(e.target.value)}
                  min={0}
                />
              </div>
              <div className="col-md-3 mt-3">
                <label className="form-label" htmlFor="paidStatusSelect">
                  Leave Paid Status{' '}
                  <Icon icon="HelpOutline" size="sm" title="Is this leave paid?" />
                </label>
                <Select
                  id="paidStatusSelect"
                  ariaLabel="Leave Paid Status"
                  value={paidStatus}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaidStatus(e.target.value)}
                >
                  {paidStatusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="colorCodeInput">
                  Color Code <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <Input
                    id="colorCodeInput"
                    type="text"
                    value={colorCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColorCode(e.target.value)}
                  />
                  <span className="input-group-text p-0" style={{ background: 'none', border: 'none' }}>
                    <input
                      type="color"
                      value={colorCode}
                      onChange={e => setColorCode(e.target.value)}
                      style={{
                        width: 32,
                        height: 32,
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      tabIndex={-1}
                      aria-label="Pick color"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Entitlement' && (
          <div>
            <h5 className="mb-3">Entitlement</h5>
            {/* First row */}
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label" htmlFor="effectiveAfterInput">
                  Effective After <Icon icon="HelpOutline" size="sm" title="After how many days/months/years of joining" />
                </label>
                <div className="input-group">
                  <input
                    id="effectiveAfterInput"
                    type="number"
                    min={0}
                    className="form-control"
                  />
                  <Select ariaLabel="Effective After Unit" style={{ maxWidth: 130 }}>
                    <option>Day(s)</option>
                    <option>Month(s)</option>
                    <option>Year(s)</option>
                  </Select>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="unusedLeavesSelect">
                  Unused Leaves <Icon icon="HelpOutline" size="sm" title="What to do with unused leaves" />
                </label>
                <Select id="unusedLeavesSelect" ariaLabel="Unused Leaves">
                  <option>Carry Forward</option>
                  <option>Lapse</option>
                  <option>paid</option>
                </Select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="overUtilizationSelect">
                  Over Utilization <Icon icon="HelpOutline" size="sm" title="Allow over utilization?" />
                </label>
                <Select id="overUtilizationSelect" ariaLabel="Over Utilization">
                  <option>Do not allow</option>
                  <option>Allow and mark paid</option>
                  <option>Allow and mark unpaid</option>
                </Select>
              </div>
            </div>
            {/* Second row */}
            <div className="row g-3 align-items-end mt-2">
              <div className="col-md-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="allowedProbation" defaultChecked />
                  <label className="form-check-label" htmlFor="allowedProbation">
                    Allowed in probation <Icon icon="HelpOutline" size="sm" title="Allow during probation period" />
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="allowedNotice" defaultChecked />
                  <label className="form-check-label" htmlFor="allowedNotice">
                    Allowed in notice period <Icon icon="HelpOutline" size="sm" title="Allow during notice period" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Applicability' && (
          <div>
            <h5 className="mb-3">Applicability</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="genderSelect">
                  Gender <span className="text-danger">*</span>
                  <Icon icon="HelpOutline" size="sm" title="Select applicable genders" />
                </label>
                <Select id="genderSelect" ariaLabel="Gender">
                  <option>Male, Female, Others</option>
                </Select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="maritalStatusSelect">
                  Marital Status <span className="text-danger">*</span>
                  <Icon icon="HelpOutline" size="sm" title="Select applicable marital statuses" />
                </label>
                <Select id="maritalStatusSelect" ariaLabel="Marital Status">
                  <option>Single, Married, Widower, Widow, Separate, Divorced</option>
                </Select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="departmentSelect">
                  Department <span className="text-danger">*</span>
                  <Icon icon="HelpOutline" size="sm" title="Select applicable departments" />
                </label>
                <Select id="departmentSelect" ariaLabel="Department">
                  <option>HR, ADMIN, FRONTEND DEVELOPER, BACKEND</option>
                </Select>
              </div>
            </div>
            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <label className="form-label" htmlFor="designationSelect">
                  Designation <span className="text-danger">*</span>
                  <Icon icon="HelpOutline" size="sm" title="Select applicable designations" />
                </label>
                <Select id="designationSelect" ariaLabel="Designation">
                  <option>Ram, nisha, ayushi, hiii</option>
                </Select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="userRoleSelect">
                  User Role <span className="text-danger">*</span>
                  <Icon icon="HelpOutline" size="sm" title="Select applicable user roles" />
                </label>
                <Select id="userRoleSelect" ariaLabel="User Role">
                  <option>App Administrator, Employee, HR, manager, tanu, g</option>
                </Select>
              </div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={handleClose} className="me-2">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
        >
           Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddLeaveTypeModal;
