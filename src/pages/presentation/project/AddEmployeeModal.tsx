/* eslint-disable @typescript-eslint/no-unused-vars */
 

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Icon from '../../../components/icon/Icon';
import AddDesignation from '../designation/AddDesignation';
import AddDepartmentModal from '../department/AddDepartmentModal';
import { Employee} from './Employee'; // Import the Employee interface

interface AddEmployeeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddEmployee: (employee: Employee) => void;
  onSave: (employee: Employee) => void;
  selectedEmployee?: Employee;
  onAddDepartment?: (newDepartment: string) => void;
}

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({
  isOpen,
  setIsOpen,
  onAddEmployee,
  selectedEmployee,
  onAddDepartment,
}) => {
  const [isAddDesignationOpen, setIsAddDesignationOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [showOtherDetails, setShowOtherDetails] = useState(false); // State to toggle "Other Details"

  // State to manage the list of designations
  const [designationOptions, setDesignationOptions] = useState<string[]>([
    'Manager',
    'Developer',
    'Designer',
  ]);

  // State to manage the list of departments
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([
    'HR',
    'IT',
    'Finance',
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: selectedEmployee?.employeeId || '',
      salutation: selectedEmployee?.salutation || '',
      employeeName: selectedEmployee?.employeeName || '',
      employeeEmail: selectedEmployee?.employeeEmail || '',
      profilePicture: null,
      dateOfBirth: selectedEmployee?.dateOfBirth || '',
      designation: selectedEmployee?.designation || '',
      department: selectedEmployee?.department || '',
      country: selectedEmployee?.country || '',
      mobile: selectedEmployee?.mobile || '',
      gender: selectedEmployee?.gender || '',
      joiningDate: selectedEmployee?.joiningDate || '',
      reportingTo: selectedEmployee?.reportingTo || '',
      language: selectedEmployee?.language || 'English',
      userRole: selectedEmployee?.userRole || 'Employee',
      address: selectedEmployee?.address || '',
      about: selectedEmployee?.about || '',
      loginAllowed: selectedEmployee?.loginAllowed || 'Yes',
      emailNotifications: selectedEmployee?.emailNotifications || 'Yes',
      // hourlyRate: selectedEmployee?.hourlyRate || '',
      slackMemberId: selectedEmployee?.slackMemberId || '',
      skills: selectedEmployee?.skills || [],
      probationEndDate: selectedEmployee?.probationEndDate || '',
      noticePeriodStartDate: selectedEmployee?.noticePeriodStartDate || '',
      noticePeriodEndDate: selectedEmployee?.noticePeriodEndDate || '',
      // employmentType: selectedEmployee?.employmentType || '',
      maritalStatus: selectedEmployee?.maritalStatus || '',
      businessAddress: selectedEmployee?.businessAddress || '',
      status: selectedEmployee?.status || 'Active',
      exitDate: selectedEmployee?.exitDate || '',
      employmentType: selectedEmployee?.employmentType || 'N/A',
      hourlyRate: selectedEmployee?.hourlyRate || 0,
    },
    onSubmit: (values) => {
      const newEmployee: Employee = {
          id: Date.now(), // Generate a unique ID for 'id'
          skillSet: Array.isArray(values.skills) ? values.skills : [], // Ensure 'skillSet' is an array
          name: values.employeeName, // Map 'employeeName' to 'name'
          employeeId: Date.now().toString(),
          salutation: values.salutation,
          employeeName: values.employeeName,
          employeeEmail: values.employeeEmail,
          profilePicture: values.profilePicture,
          dateOfBirth: values.dateOfBirth,
          designation: values.designation,
          department: values.department,
          country: values.country,
          mobile: values.mobile,
          gender: values.gender,
          joiningDate: values.joiningDate,
          reportingTo: values.reportingTo,
          language: values.language,
          userRole: values.userRole,
          address: values.address,
          about: values.about,
          loginAllowed: values.loginAllowed,
          emailNotifications: values.emailNotifications,
          hourlyRate: values.hourlyRate.toString(),
          slackMemberId: values.slackMemberId,
          skills: Array.isArray(values.skills) ? values.skills.join(', ') : values.skills,
          probationEndDate: values.probationEndDate,
          noticePeriodStartDate: values.noticePeriodStartDate,
          noticePeriodEndDate: values.noticePeriodEndDate,
          maritalStatus: values.maritalStatus,
          businessAddress: values.businessAddress,
          status: values.status,
          exitDate: values.exitDate,
          employmentType: values.employmentType,
      };
      onAddEmployee(newEmployee); // Pass the new employee to the parent
      formik.resetForm();
      setIsOpen(false);
  },
  });

  if (!isOpen) return null;

  const handleAddDesignation = (newDesignation: { name: string }) => {
    setDesignationOptions((prevOptions) => [...prevOptions, newDesignation.name]); // Add the new designation to the list
  };

  const handleAddDepartment = (newDepartment: { name: string }) => {
    setDepartmentOptions((prevOptions) => [...prevOptions, newDepartment.name]); // Add the new department to the list
  };

  const handleAddNewDepartment = (newDepartment: string) => {
    if (onAddDepartment) {
      onAddDepartment(newDepartment); // Call the function passed from CustomersList
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isStaticBackdrop={true}>
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">
          {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        </h5>
      </ModalHeader>
      <ModalBody>
        <div className="row g-4">
          {/* Employee ID */}
          <FormGroup label="Employee ID *" className="col-md-4">
            <Input
              name="employeeId"
              placeholder="e.g. 1"
              onChange={formik.handleChange}
              value={formik.values.employeeId}
              required
            />
          </FormGroup>

          {/* Salutation */}
          <FormGroup label="Salutation" className="col-md-4">
            <Select
              name="salutation"
              onChange={formik.handleChange}
              value={formik.values.salutation}
              ariaLabel="Salutation"
            >
              <option value="">--</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </Select>
          </FormGroup>

          {/* Employee Name */}
          <FormGroup label="Employee Name *" className="col-md-4">
            <Input
              name="employeeName"
              placeholder="e.g. John Doe"
              onChange={formik.handleChange}
              value={formik.values.employeeName}
              required
            />
          </FormGroup>

          {/* Employee Email */}
          <FormGroup label="Employee Email *" className="col-md-4">
            <Input
              name="employeeEmail"
              type="email"
              placeholder="e.g. johndoe@example.com"
              onChange={formik.handleChange}
              value={formik.values.employeeEmail}
              required
            />
          </FormGroup>

          {/* Profile Picture */}
          <FormGroup label="Profile Picture" className="col-md-4">
            <Input
              name="profilePicture"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formik.setFieldValue('profilePicture', e.target.files?.[0])
              }
            />
          </FormGroup>

          {/* Date of Birth */}
          <FormGroup label="Date of Birth" className="col-md-4">
            <Input
              name="dateOfBirth"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.dateOfBirth}
            />
          </FormGroup>

          {/* Designation */}
          <FormGroup label="Designation *" className="col-md-4">
            <div className="input-group">
              <Select
                name="designation"
                onChange={formik.handleChange}
                value={formik.values.designation}
                ariaLabel="Designation"
                className="form-select"
              >
                <option value="">--</option>
                {designationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                color="light"
                className="input-group-text"
                onClick={() => setIsAddDesignationOpen(true)}
              >
                Add
              </Button>
            </div>
          </FormGroup>

          {/* Department */}
          <FormGroup label="Department *" className="col-md-4">
            <div className="input-group">
              <Select
                name="department"
                onChange={formik.handleChange}
                value={formik.values.department}
                ariaLabel="Department"
                className="form-select"
              >
                <option value="">--</option>
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                color="light"
                className="input-group-text"
                onClick={() => setIsAddDepartmentOpen(true)}
              >
                Add
              </Button>
            </div>
          </FormGroup>

          {/* Country */}
          <FormGroup label="Country" className="col-md-4">
            <Input
              name="country"
              placeholder="e.g. USA"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
          </FormGroup>

          {/* Mobile */}
          <FormGroup label="Mobile" className="col-md-4">
            <Input
              name="mobile"
              placeholder="e.g. +1234567890"
              onChange={formik.handleChange}
              value={formik.values.mobile}
            />
          </FormGroup>

          {/* Gender */}
          <FormGroup label="Gender" className="col-md-4">
            <Select
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              ariaLabel="Gender"
            >
              <option value="">--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>

          {/* Joining Date */}
          <FormGroup label="Joining Date *" className="col-md-4">
            <Input
              name="joiningDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.joiningDate}
              required
            />
          </FormGroup>

          {/* Reporting To */}
          <FormGroup label="Reporting To" className="col-md-4">
            <Input
              name="reportingTo"
              placeholder="e.g. Manager Name"
              onChange={formik.handleChange}
              value={formik.values.reportingTo}
            />
          </FormGroup>

          {/* Language */}
          <FormGroup label="Language" className="col-md-4">
            <Select
              name="language"
              onChange={formik.handleChange}
              value={formik.values.language}
              ariaLabel="Language"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </Select>
          </FormGroup>

          {/* User Role */}
          <FormGroup label="User Role" className="col-md-4">
            <Select
              name="userRole"
              onChange={formik.handleChange}
              value={formik.values.userRole}
              ariaLabel="User Role"
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </Select>
          </FormGroup>

          {/* Address */}
          <FormGroup label="Address" className="col-md-12">
            <textarea
              name="address"
              className="form-control"
              placeholder="e.g. 132, My Street, Kingston, New York 12401"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </FormGroup>

          {/* About */}
          <FormGroup label="About" className="col-md-12">
            <textarea
              name="about"
              className="form-control"
              placeholder="Write something about the employee..."
              onChange={formik.handleChange}
              value={formik.values.about}
            />
          </FormGroup>

          {/* Other Details Toggle */}
          <div className="col-md-12">
            <h5
              className="mt-4 cursor-pointer "
              onClick={() => setShowOtherDetails(!showOtherDetails)}
              style={{ cursor: 'pointer', color: 'black' }}
            >
              Other Details {showOtherDetails ? '▲' : '▼'}
            </h5>
          </div>

          {/* Other Details Fields */}
          {showOtherDetails && (
            <div className="row g-4">
              {/* Login Allowed */}
              <FormGroup label="Login Allowed?" className="col-md-4">
                <Select
                  name="loginAllowed"
                  onChange={formik.handleChange}
                  value={formik.values.loginAllowed}
                  ariaLabel="Login Allowed"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormGroup>

              {/* Receive Email Notifications */}
              <FormGroup label="Receive Email Notifications?" className="col-md-4">
                <Select
                  name="emailNotifications"
                  onChange={formik.handleChange}
                  value={formik.values.emailNotifications}
                  ariaLabel="Receive Email Notifications"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormGroup>

              {/* Hourly Rate */}
              <FormGroup label="Hourly Rate" className="col-md-4">
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="₹"
                  onChange={formik.handleChange}
                  value={formik.values.hourlyRate}
                />
              </FormGroup>

              {/* Slack Member ID */}
              <FormGroup label="Slack Member ID" className="col-md-4">
                <Input
                  name="slackMemberId"
                  placeholder="@"
                  onChange={formik.handleChange}
                  value={formik.values.slackMemberId}
                />
              </FormGroup>

              {/* Skills */}
              <FormGroup label="Skills" className="col-md-4">
                <Input
                  name="skills"
                  placeholder="e.g. communication, ReactJS"
                  onChange={formik.handleChange}
                  value={formik.values.skills}
                />
              </FormGroup>

              {/* Probation End Date */}
              <FormGroup label="Probation End Date" className="col-md-4">
                <Input
                  name="probationEndDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.probationEndDate}
                />
              </FormGroup>

              {/* Notice Period Start Date */}
              <FormGroup label="Notice Period Start Date" className="col-md-4">
                <Input
                  name="noticePeriodStartDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.noticePeriodStartDate}
                />
              </FormGroup>

              {/* Notice Period End Date */}
              <FormGroup label="Notice Period End Date" className="col-md-4">
                <Input
                  name="noticePeriodEndDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.noticePeriodEndDate}
                />
              </FormGroup>

              {/* Employment Type */}
              <FormGroup label="Employment Type" className="col-md-4">
                <Select
                  name="employmentType"
                  onChange={formik.handleChange}
                  value={formik.values.employmentType}
                  ariaLabel="Employment Type"
                >
                   <option value="--">All</option>
            <option value="On-Probation">On Probation</option>
            <option value="On-Internship">On Internship</option>
            <option value="On-Notice-Period">On Notice Period</option>
            <option value="New-Hire">New Hire</option>
            <option value="Long-Stading">Long Standing</option>
                </Select>
              </FormGroup>

              {/* Marital Status */}
              <FormGroup label="Marital Status" className="col-md-4">
                <Select
                  name="maritalStatus"
                  onChange={formik.handleChange}
                  value={formik.values.maritalStatus}
                  ariaLabel="Marital Status"
                >
                  <option value="">--</option>
                  <option value="Single">Single</option>
                  <option value="Widow">Widow</option>
                  <option value="Widower">Widower</option>
                  <option value="Separated">Separated</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </Select>
              </FormGroup>

              {/* Business Address */}
              <FormGroup label="Business Address" className="col-md-4">
                <Input
                  name="businessAddress"
                  placeholder="e.g. Office Address"
                  onChange={formik.handleChange}
                  value={formik.values.businessAddress}
                />
              </FormGroup>
            </div>
          )}
        </div>

        {/* Status and Exit Date (Only in Edit Mode) */}
        {selectedEmployee && (
          <div className="row g-4 mt-2">
            {/* Status */}
            <FormGroup label="Status" className="col-md-4">
              <div className="d-flex align-items-center">
                <label className="me-3">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formik.values.status === 'Active'}
                    onChange={formik.handleChange}
                  />{' '}
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formik.values.status === 'Inactive'}
                    onChange={formik.handleChange}
                  />{' '}
                  Inactive
                </label>
              </div>
            </FormGroup>

            {/* Exit Date */}
            <FormGroup label="Exit Date" className="col-md-4">
              <Input
                name="exitDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.exitDate || ''}
              />
            </FormGroup>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={formik.handleSubmit}>
          <Icon icon="Check" className="me-1" /> Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
      <AddDesignation
        isOpen={isAddDesignationOpen}
        setIsOpen={setIsAddDesignationOpen}
        onAddDesignation={handleAddDesignation}
      />
      <AddDepartmentModal
        isOpen={isAddDepartmentOpen}
        setIsOpen={setIsAddDepartmentOpen}
        onAddDepartment={handleAddDepartment}
      />
    </Modal>
  );
};

export default AddEmployeeModal;
