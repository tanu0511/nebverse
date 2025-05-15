import React, { FC } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Button from '../../../components/bootstrap/Button';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilters: (filters: Record<string, string>) => void;
  departments: string[]; // Add departments prop
  designations: string[]; // Add designations prop
}

const FilterModal: FC<FilterModalProps> = ({ isOpen, setIsOpen, onApplyFilters, departments, designations }) => {
  const [filters, setFilters] = React.useState<Record<string, string>>({
    department: 'All',
    designation: 'All',
    role: 'All',
    status: 'Active',
    gender: 'All',
    employmentType: 'All',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilters({
      department: 'All',
      designation: 'All',
      role: 'All',
      status: 'Active',
      gender: 'All',
      employmentType: 'All',
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Filters</h5>
      </ModalHeader>
      <ModalBody>
        {/* <FormGroup label="Department">
          <Select name="department" value={filters.department} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
        </FormGroup> */}
        <FormGroup label="Department">
  <Select name="department" value={filters.department} onChange={handleChange} ariaLabel="">
    <option value="All">All</option>
    {departments.map((dept) => (
      <option key={dept} value={dept}>
        {dept}
      </option>
    ))}
  </Select>
</FormGroup>
        <FormGroup label="Designation">
          <Select name="designation" value={filters.designation} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            {designations.map((des) => (
              <option key={des} value={des}>
                {des}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Role">
          <Select name="role" value={filters.role} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </Select>
        </FormGroup>
        <FormGroup label="Status">
          <Select name="status" value={filters.status} onChange={handleChange} ariaLabel="">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </FormGroup>
        <FormGroup label="Gender">
          <Select name="gender" value={filters.gender} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </FormGroup>
        <FormGroup label="Employment Type">
          <Select name="employmentType" value={filters.employmentType} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            <option value="On-Probation">On Probation</option>
            <option value="On-Internship">On Internship</option>
            <option value="On-Notice-Period">On Notice Period</option>
            <option value="New-Hire">New Hire</option>
            <option value="Long-Stading">Long Standing</option>
          </Select>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleApply}>
          Apply
        </Button>
        <Button color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FilterModal;
