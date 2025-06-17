import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type Category = {
  id: number;
  name: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (categoryName: string) => void; // <-- Add this prop
};

const AddJobCategoryModal: React.FC<Props> = ({ isOpen, setIsOpen, onSave }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!categoryName.trim()) {
      setError('Category Name is required');
      return;
    }
    setCategories(prev => [
      ...prev,
      { id: prev.length + 1, name: categoryName.trim() }
    ]);
    onSave(categoryName.trim()); // <-- Call parent onSave
    setCategoryName('');
    setError('');
    setIsOpen(false); // Optionally close modal after save
  };

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modal-header">
        <h5 className="modal-title">Add Job Category</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Category Name</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">No categories</td>
              </tr>
            ) : (
              categories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <Button color="danger" size="sm" onClick={() => handleDelete(cat.id)}>
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mb-2">
          <label className="form-label" htmlFor="categoryNameInput">
            Category <span className="text-danger">*</span>
          </label>
          <input
            id="categoryNameInput"
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
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

export default AddJobCategoryModal;