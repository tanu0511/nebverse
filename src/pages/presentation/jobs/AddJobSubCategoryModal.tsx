import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

type AddJobSubCategoryModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: string[];
  subCategories: string[];
  onSave: (subCategory: string) => void;
};

const AddJobSubCategoryModal: React.FC<AddJobSubCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  categories,
  subCategories: initialSubCategories,
  onSave,
}) => {
  const [subCategories, setSubCategories] = useState<string[]>(initialSubCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [error, setError] = useState<{ category?: string; subCategory?: string }>({});

  const handleAdd = () => {
    let hasError = false;
    const err: typeof error = {};
    if (!selectedCategory) {
      err.category = 'Job Category is required';
      hasError = true;
    }
    if (!subCategoryName.trim()) {
      err.subCategory = 'Sub Category Name is required';
      hasError = true;
    }
    setError(err);
    if (hasError) return;

    const newSubCategory = subCategoryName.trim();
    setSubCategories(prev => [...prev, newSubCategory]);
    onSave(newSubCategory);
    setSubCategoryName('');
    setError({});
  };

  const handleDelete = (subCategoryToDelete: string) => {
    setSubCategories(prev => prev.filter(sc => sc !== subCategoryToDelete));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">Add Job Sub Category</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Sub Category</th>
              <th>Category</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">No sub categories</td>
              </tr>
            ) : (
              subCategories.map((sc, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{sc}</td>
                  <td>{selectedCategory}</td>
                  <td>
                    <Button color="danger" size="sm" onClick={() => handleDelete(sc)}>
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="row mb-2">
          <div className="col-md-6">
            <label className="form-label" htmlFor="jobCategorySelect">
              Job Category <span className="text-danger">*</span>
            </label>
            <select
              id="jobCategorySelect"
              className="form-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            {error.category && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error.category}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="subCategoryNameInput">
              Sub Category Name <span className="text-danger">*</span>
            </label>
            <input
              id="subCategoryNameInput"
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={subCategoryName}
              onChange={e => setSubCategoryName(e.target.value)}
            />
            {error.subCategory && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error.subCategory}</div>}
          </div>
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

export default AddJobSubCategoryModal;