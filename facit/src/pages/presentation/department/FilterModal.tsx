/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
import React, { FC } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Button from '../../../components/bootstrap/Button';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilters: (filters: Record<string, string>) => void;
  departments: string[]; // List of departments to filter
}

const FilterModal: FC<FilterModalProps> = ({ isOpen, setIsOpen, onApplyFilters, departments }) => {
  const [filters, setFilters] = React.useState<Record<string, string>>({
    department: 'All', // Default filter value
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (filters.department === 'All') {
      onApplyFilters({}); // Pass an empty filter to indicate "All"
    } else {
      onApplyFilters(filters); // Pass the selected filters
    }
    setIsOpen(false); // Close the modal
  };

  const handleClear = () => {
    setFilters({
      department: 'All', // Reset to default
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Filter Departments</h5>
      </ModalHeader>
      <ModalBody>
        <FormGroup label="Department">
          <Select
            name="department"
            value={filters.department}
            onChange={handleChange}
            ariaLabel="Filter by Department"
          >
            <option value="All">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
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
