import React, { useState } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (recruiter: string) => void;
};

const AddRecruiterModal: React.FC<Props> = ({ isOpen, setIsOpen, onSave }) => {
  const [recruiterName, setRecruiterName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!recruiterName.trim()) {
      setError('Recruiter name is required');
      return;
    }
    onSave(recruiterName.trim());
    setRecruiterName('');
    setError('');
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-recruiter-modal-title">Add New Recruiter</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormGroup label="Recruiter *">
          <Input
            value={recruiterName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecruiterName(e.target.value)}
            placeholder="Enter recruiter name"
            required
          />
          {error ? (
            <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error}</div>
          ) : (
            <></>
          )}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddRecruiterModal;