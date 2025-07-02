import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface AddProjectMembersModalProps {
  show: boolean;
  onClose: () => void;
  onSave?: (data: { name: string; department?: string }) => void;
}

const memberOptions = [
  { value: '', label: 'Nothing selected' },
  { value: 'john', label: 'john' },
  { value: 'nisha', label: 'nisha' },
  { value: 'ayushi', label: 'ayushi' },
  { value: 'tanushree', label: 'tanushree' },
];

const departmentOptions = [
  { value: '', label: 'Nothing selected' },
  { value: 'hr', label: 'HR' },
  { value: 'admin', label: 'ADMIN' },
  { value: 'frontend', label: 'FRONTEND DEVELOPER' },
  { value: 'backend', label: 'BACKEND DEVELOPER' },
];

const AddProjectMembersModal: React.FC<AddProjectMembersModalProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [memberType, setMemberType] = useState<'members' | 'department'>('members');
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleSave = () => {
    if (memberType === 'members' && selectedMember) {
      onSave?.({ name: selectedMember });
    } else if (memberType === 'department' && selectedDepartment) {
      onSave?.({ name: selectedDepartment, department: selectedDepartment });
    }
    onClose();
  };

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="lg">
      <ModalHeader>
        <ModalTitle id="add-project-members-title">Add Project Members</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center mb-3">
          <div className="form-check me-4">
            <input
              className="form-check-input"
              type="radio"
              id="chooseMembers"
              checked={memberType === 'members'}
              onChange={() => setMemberType('members')}
            />
            <label className="form-check-label" htmlFor="chooseMembers">
              Choose Members
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="chooseDepartment"
              checked={memberType === 'department'}
              onChange={() => setMemberType('department')}
            />
            <label className="form-check-label" htmlFor="chooseDepartment">
              Choose Department
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="projectMembersSelect">
            {memberType === 'members' ? 'Add Project Members' : 'Add Department'} <span className="text-danger">*</span>
          </label>
          {memberType === 'members' ? (
            <select
              id="projectMembersSelect"
              className="form-select"
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
            >
              {memberOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <select
              id="departmentSelect"
              className="form-select"
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
            >
              {departmentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={onClose}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          <Icon icon="Check" className="me-1" />
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddProjectMembersModal;