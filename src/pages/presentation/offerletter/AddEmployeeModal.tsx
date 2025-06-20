import React, { useState, useMemo } from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Icon from '../../../components/icon/Icon';

const defaultEmployee = {
  employeeId: '',
  employeeName: '',
  employeeEmail: '',
  password: '',
  designation: '',
  department: '',
  country: '',
  mobile: '',
  joiningDate: '',
  reportingTo: '',
};

type Employee = typeof defaultEmployee;

interface AddEmployeeModalProps {
  show: boolean;
  onClose: () => void;
  initialValues?: Employee;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ show, onClose, initialValues }) => {
  const [form, setForm] = useState(initialValues || defaultEmployee);
  const [showPassword, setShowPassword] = useState(false);
  const [showDesignationModal, setShowDesignationModal] = useState(false);
  const [newDesignation, setNewDesignation] = useState('');

  // Country options for react-select
  const countryOptions = useMemo(() => countryList().getData(), []);

  React.useEffect(() => {
    setForm(initialValues || defaultEmployee);
  }, [initialValues, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for react-select country
  const handleCountryChange = (selected: any) => {
    setForm({ ...form, country: selected ? selected.label : '' });
  };

  // Generate a random password
  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm({ ...form, password });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle save logic here
    onClose();
  };

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="xl" isStaticBackdrop={true}>
      <ModalHeader>
        <h4 className="modal-title">Add Employee</h4>
      </ModalHeader>
      <ModalBody>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Employee ID *</label>
                <input className="form-control" name="employeeId" value={form.employeeId} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label>Employee Name *</label>
                <input className="form-control" name="employeeName" value={form.employeeName} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label>Employee Email *</label>
                <input className="form-control" name="employeeEmail" value={form.employeeEmail} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label>Password *</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {/* Use the correct icon name for your Icon component */}
                    <Icon icon={showPassword ? "VisibilityOff" : "Visibility"} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    tabIndex={-1}
                    onClick={generatePassword}
                  >
                    <Icon icon="Add" />
                  </button>
                </div>
                <small>Must have at least 8 characters</small>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Designation *</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    tabIndex={-1}
                    onClick={() => setShowDesignationModal(true)}
                  >
                    <Icon icon="Add" />
                  </button>
                </div>
              </div>
              <div className="col-md-3">
                <label>Department *</label>
                <input className="form-control" name="department" value={form.department} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label>Country</label>
                <Select
                  options={countryOptions}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: '#F8F9FA',
                      borderColor: state.isFocused ? '#F8F9FA' : '#F8F9FA',
                      borderRadius: '0.900rem',
                      minHeight: '38px',
                      height: '38px',
                      boxShadow: state.isFocused ? '0 0 0 0.2rem #6d5dd344' : 'none',
                      fontSize: '1rem',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                      borderWidth: '0.5px',
                      paddingLeft: 0,
                      paddingRight: 0,
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      height: '38px',
                      padding: '0 0.75rem',
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: 0,
                      padding: 0,
                      fontFamily: 'inherit',
                    }),
                    indicatorSeparator: () => ({
                      display: 'none',
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: '38px',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? '#232a4b'
                        : state.isFocused
                        ? '#e9ecef'
                        : '#fff',
                      color: state.isSelected ? '#e9ecef' : '#070707',
                      fontSize: '1rem',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                      padding: '6px 8px',
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#080808',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#0a0a0a',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                    }),
                  }}
                  value={countryOptions.find((option: { label: string; value: string }) => option.label === form.country) || null}
                  onChange={handleCountryChange}
                  isClearable
                  placeholder="Select country"
                />
              </div>
              <div className="col-md-3">
                <label>Mobile</label>
                <input className="form-control" name="mobile" value={form.mobile} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Joining Date *</label>
                <input className="form-control" name="joiningDate" value={form.joiningDate} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label>Reporting To</label>
                <input className="form-control" name="reportingTo" value={form.reportingTo} onChange={handleChange} />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Button color="light" onClick={onClose} type="button" className="me-2">Cancel</Button>
              <Button color="primary" type="submit"><i className="fa fa-check me-2" />Save</Button>
            </div>
          </form>
        </div>

        {showDesignationModal && (
  <Modal isOpen={showDesignationModal} setIsOpen={setShowDesignationModal}>
    <ModalHeader>
      <h5>Add New Designation</h5>
    </ModalHeader>
    <ModalBody>
      <form
        onSubmit={e => {
          e.preventDefault();
          setForm({ ...form, designation: newDesignation });
          setShowDesignationModal(false);
          setNewDesignation('');
        }}
      >
        <div className="mb-3">
          <label>Designation Name</label>
          <input
            className="form-control"
            value={newDesignation}
            onChange={e => setNewDesignation(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button color="light" type="button" onClick={() => setShowDesignationModal(false)} className="me-2">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </ModalBody>
  </Modal>
)}
      </ModalBody>
    </Modal>
  );
};

export default AddEmployeeModal;