
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
  workExperiences: string[];
  setWorkExperiences: (list: string[]) => void;
};

const WorkExperienceModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  workExperiences,
  setWorkExperiences,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Work experience name is required');
      return;
    }
    if (workExperiences.includes(name.trim())) {
      setError('Work experience already exists');
      return;
    }
    setWorkExperiences([...workExperiences, name.trim()]);
    setName('');
    setError('');
  };

  const handleDelete = (idx: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx: number, value: string) => {
    setEditIdx(idx);
    setEditValue(value);
  };

  const handleEditSave = (idx: number) => {
    if (!editValue.trim()) {
      setError('Work experience name is required');
      return;
    }
    if (
      workExperiences.some(
        (exp, i) => exp.toLowerCase() === editValue.trim().toLowerCase() && i !== idx
      )
    ) {
      setError('Work experience already exists');
      return;
    }
    const updated = [...workExperiences];
    updated[idx] = editValue.trim();
    setWorkExperiences(updated);
    setEditIdx(null);
    setEditValue('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="work-experience-modal-title">Work Experience</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Work Experience</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workExperiences.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">No work experience</td>
              </tr>
            ) : (
              workExperiences.map((exp, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {editIdx === idx ? (
                      <div>
                        <Input
                          value={editValue}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
                          size="sm"
                          autoFocus
                        />
                        <Button
                          color="primary"
                          size="sm"
                          className="mt-1 me-1"
                          onClick={() => handleEditSave(idx)}
                        >
                          Save
                        </Button>
                        <Button
                          color="secondary"
                          size="sm"
                          className="mt-1"
                          onClick={() => setEditIdx(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div>
                        {exp}
                        <div>
                          <span
                            style={{ color: '#007bff', cursor: 'pointer', fontSize: 12 }}
                            onClick={() => handleEdit(idx, exp)}
                          >
                            Click to edit
                          </span>
                        </div>
                      </div>
                    )}
                  </td>
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
            placeholder="e.g: Fresher"
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

export default WorkExperienceModal;