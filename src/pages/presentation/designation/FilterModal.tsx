import React, { FC } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Button from '../../../components/bootstrap/Button';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilters: (filters: Record<string, string>) => void;
  designations: string[]; // List of designations to filter
}

const FilterModal: FC<FilterModalProps> = ({ isOpen, setIsOpen, onApplyFilters, designations }) => {
  const [filters, setFilters] = React.useState<Record<string, string>>({
    designation: 'All', // Default filter value
  });

  // Handle changes in the filter inputs
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply the filters and close the modal
  const handleApply = () => {
    if (filters.designation === 'All') {
      onApplyFilters({}); // Pass an empty filter to indicate "All"
    } else {
      onApplyFilters(filters); // Pass the selected filters
    }
    setIsOpen(false); // Close the modal
  };

  // Clear the filters
  const handleClear = () => {
    setFilters({
      designation: 'All', // Reset to default
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Filters</h5>
      </ModalHeader>
      <ModalBody>
        <FormGroup label="Designation">
          <Select
            name="designation"
            value={filters.designation}
            onChange={handleChange}
            ariaLabel="Filter by Designation"
          >
            <option value="All">All</option>
            {designations.map((des) => (
              <option key={des} value={des}>
                {des}
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
