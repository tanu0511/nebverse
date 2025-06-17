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
  jobTypes: string[];
  setJobTypes: (types: string[]) => void;
};

const JobTypeModal: React.FC<Props> = ({ isOpen, setIsOpen, jobTypes, setJobTypes }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Job type name is required');
      return;
    }
    if (jobTypes.includes(name.trim())) {
      setError('Job type already exists');
      return;
    }
    setJobTypes([...jobTypes, name.trim()]);
    setName('');
    setError('');
  };

  const handleDelete = (idx: number) => {
    setJobTypes(jobTypes.filter((_, i) => i !== idx));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="job-type-modal-title">Job Type</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Job Type</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobTypes.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">No job types</td>
              </tr>
            ) : (
              jobTypes.map((type, idx) => (
                <tr key={type}>
                  <td>{idx + 1}</td>
                  <td>{type}</td>
                  <td>
                    <Button color="danger" size="sm" onClick={() => handleDelete(idx)}>
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <FormGroup label="Name *">
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="e.g. Full time"
            required
          />
          {error ? <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error}</div> : <></>}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleAdd}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobTypeModal;