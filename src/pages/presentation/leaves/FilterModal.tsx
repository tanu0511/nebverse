import React, { FC } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Button from '../../../components/bootstrap/Button';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilters: (filters: { employee: string; leaveType: string; status: string }) => void;
  employees: string[];
  leaveTypes: string[];
  statuses: string[];
}

const FilterModal: FC<FilterModalProps> = ({
  isOpen,
  setIsOpen,
  onApplyFilters,
  employees,
  leaveTypes,
  statuses,
}) => {
  const [filters, setFilters] = React.useState<{ employee: string; leaveType: string; status: string }>({
    employee: 'All',
    leaveType: 'All',
    status: 'All',
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
      employee: 'All',
      leaveType: 'All',
      status: 'All',
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Filters</h5>
      </ModalHeader>
      <ModalBody>
        <FormGroup label="Employee">
          <Select name="employee" value={filters.employee} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            {employees.map((emp) => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Leave Type">
          <Select name="leaveType" value={filters.leaveType} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            {leaveTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Status">
          <Select name="status" value={filters.status} onChange={handleChange} ariaLabel="">
            <option value="All">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleApply}>Apply</Button>
        <Button color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FilterModal;