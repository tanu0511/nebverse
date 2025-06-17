import React, { useState, useEffect } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
};

const SkillsModal: React.FC<Props> = ({ isOpen, setIsOpen, skills, setSkills }) => {
  const [skillName, setSkillName] = useState('');
  const [error, setError] = useState('');
  const [tempSkills, setTempSkills] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTempSkills(skills);
      setSkillName('');
      setError('');
    }
  }, [isOpen, skills]);

  const handleAdd = () => {
    if (!skillName.trim()) {
      setError('Skill name is required');
      return;
    }
    if (tempSkills.includes(skillName.trim())) {
      setError('Skill already exists');
      return;
    }
    setTempSkills([...tempSkills, skillName.trim()]);
    setSkillName('');
    setError('');
  };

  const handleDelete = (idx: number) => {
    setTempSkills(tempSkills.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    setSkills(tempSkills);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modal-header">
        <h5 className="modal-title">Add Skill</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Skill</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempSkills.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">No skills</td>
              </tr>
            ) : (
              tempSkills.map((name, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
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
        <div className="mb-2">
          <label className="form-label" htmlFor="skillNameInput">
            Skills <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              id="skillNameInput"
              type="text"
              className="form-control"
              placeholder="Skill Name"
              value={skillName}
              onChange={e => setSkillName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
          </div>
          {error && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error}</div>}
        </div>
      </div>
      <div className="modal-footer">
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default SkillsModal;