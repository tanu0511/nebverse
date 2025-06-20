/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface AddOfferLetterPageProps {
  onClose: () => void;
  onSave: (offer: any) => void;
  initialValues?: any;
}

const AddOfferLetterPage: React.FC<AddOfferLetterPageProps> = ({ onClose, onSave, initialValues }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSalaryStructure, setShowSalaryStructure] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add state for form fields
  const [job, setJob] = useState('');
  const [applicant, setApplicant] = useState('');
  const [salary, setSalary] = useState('');
  const [expiry, setExpiry] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');

  // Initialize form fields with initialValues prop
  useEffect(() => {
    if (initialValues) {
      setJob(initialValues.job || '');
      setApplicant(initialValues.applicant || '');
      setSalary(initialValues.salary || '');
      setExpiry(initialValues.expiry || '');
      setJoiningDate(initialValues.joiningDate || '');
      setDescription(initialValues.description || '');
      setDepartment(initialValues.department || '');
      // setSelectedFile(initialValues.file || null); // Handle file separately if needed
    }
  }, [initialValues]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      job,
      applicant,
      addedBy: 'Current User',
      expiry,
      joiningDate,
      salary,
      description,
      department,
      // status, // Remove or define 'status' if needed
      // ...add other fields as needed
    });
  };

  return (
    <PageWrapper title="Add Offer Letter">
      <Page>
        <div className="card p-4">
          <h3 className="mb-4">Job Offer Details</h3>
          <form onSubmit={handleSave}>
            <div className="row mb-3">
              <div className="col-md-3">
                <label className="form-label">Job <span className="text-danger">*</span></label>
                <select className="form-select" value={job} onChange={e => setJob(e.target.value)}>
                  <option>--</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  {/* ... */}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Job Applicant <span className="text-danger">*</span></label>
                <select className="form-select" value={applicant} onChange={e => setApplicant(e.target.value)}>
                  <option>--</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  {/* ... */}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Offer Expire On <span className="text-danger">*</span></label>
                <input type="date" className="form-control" value={expiry} onChange={e => setExpiry(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Expected Joining Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label className="form-label">Salary <span className="text-danger">*</span></label>
                <input className="form-control" value={salary} onChange={e => setSalary(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Rate</label>
                <select className="form-select"><option>--</option></select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="signatureRequired" />
                  <label className="form-check-label" htmlFor="signatureRequired">Signature Required</label>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="addSalaryStructure"
                    checked={showSalaryStructure}
                    onChange={e => setShowSalaryStructure(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="addSalaryStructure">
                    Add Salary Structure
                  </label>
                </div>
              </div>
            </div>

            {/* Salary Structure Section */}
            {showSalaryStructure && (
              <div className="card p-3 mb-4">
                <h5 className="mb-3">Salary Structure</h5>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Select Salary Components</label>
                    <textarea className="form-control" rows={4} placeholder="Earnings&#10;Deductions" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Annual CTC <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Basic Salary <span className="text-danger">*</span></label>
                    <input className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Basic Value Type <span className="text-danger">*</span></label>
                    <select className="form-select">
                      <option>Fixed</option>
                      <option>Percentage</option>
                    </select>
                  </div>
                </div>
                <div className="table-responsive mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Salary Component</th>
                        <th>Calculation Type</th>
                        <th>Monthly Amount</th>
                        <th>Annual Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Basic Salary</td>
                        <td>--</td>
                        <td>
                          <div className="input-group">
                            <span className="input-group-text">₹</span>
                            <input className="form-control" value="0.00" readOnly />
                          </div>
                        </td>
                        <td>
                          <div className="input-group">
                            <span className="input-group-text">₹</span>
                            <input className="form-control" value="0.00" readOnly />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h6 className="fw-bold mt-4 mb-3">Earnings</h6>
                <div className="row mb-2 align-items-center">
                  <div className="col-md-3 fw-bold">Basic Salary</div>
                  <div className="col-md-3 text-muted">--</div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input className="form-control" value="0.00" readOnly />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input className="form-control" value="0.00" readOnly />
                    </div>
                  </div>
                </div>
                <div className="row mb-2 align-items-center">
                  <div className="col-md-3">Special Allowance</div>
                  <div className="col-md-3 text-muted">Special Allowance</div>
                  <div className="col-md-3 text-muted">₹0.00</div>
                  <div className="col-md-3 text-muted">₹0.00</div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <small className="text-muted">
                      (Annual CTC - Sum of all other components)
                    </small>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-3 fw-bold fs-5">Gross Salary</div>
                  <div className="col-md-3" />
                  <div className="col-md-3 fw-bold fs-5">₹0.00</div>
                  <div className="col-md-3 fw-bold fs-5">₹0.00</div>
                </div>
              </div>
            )}

            {/* Description box comes after salary structure */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            {/* Add Files Section */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#007bff" }}>Add Files</label>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  minHeight: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  cursor: "pointer"
                }}
                onClick={handleFileClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {selectedFile ? (
                  <span>{selectedFile.name}</span>
                ) : (
                  <span style={{ color: "#888" }}>Choose a file</span>
                )}
              </div>
            </div>
            <hr />

            {/* Save Dropdown Buttons */}
            <div className="d-flex align-items-center mt-3">
              <div className="btn-group">
                <Button color="primary" type="submit">
                  Save
                </Button>
                <Button
                  color="primary"
                  type="button"
                  className="dropdown-toggle dropdown-toggle-split"
                  onClick={() => setShowDropdown(d => !d)}
                  aria-expanded={showDropdown}
                />
                {showDropdown && (
                  <div
                    className="dropdown-menu show"
                    style={{ minWidth: 170 }}
                    ref={dropdownRef} // <-- Move ref here!
                  >
                    <button className="dropdown-item" type="submit" onClick={() => setShowDropdown(false)}>
                      <Icon icon='save' /> Save
                    </button>
                    <button className="dropdown-item" type="button" onClick={() => setShowDropdown(false)}>
                      <Icon icon='send' /> Save &amp; Send
                    </button>
                  </div>
                )}
              </div>
              <Button color="secondary" type="button" className="ms-2" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default AddOfferLetterPage;