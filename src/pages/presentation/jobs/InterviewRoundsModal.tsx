import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  rounds: string[];
  setRounds: (rounds: string[]) => void;
};

const InterviewRoundsModal: React.FC<Props> = ({ isOpen, setIsOpen, rounds, setRounds }) => {
  const [roundName, setRoundName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!roundName.trim()) {
      setError('Round Name is required');
      return;
    }
    setRounds([...rounds, roundName.trim()]);
    setRoundName('');
    setError('');
  };

  const handleDelete = (idx: number) => {
    setRounds(rounds.filter((_, i) => i !== idx));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modal-header">
        <h5 className="modal-title">Add Round</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Round</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rounds.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">No rounds</td>
              </tr>
            ) : (
              rounds.map((round, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{round}</td>
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
          <label className="form-label" htmlFor="roundNameInput">
            Round <span className="text-danger">*</span>
          </label>
          <input
            id="roundNameInput"
            type="text"
            className="form-control"
            placeholder="Round Name"
            value={roundName}
            onChange={e => setRoundName(e.target.value)}
          />
          {error && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error}</div>}
        </div>
      </div>
      <div className="modal-footer">
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleAdd}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </div>
    </Modal>
  );
};

export default InterviewRoundsModal;