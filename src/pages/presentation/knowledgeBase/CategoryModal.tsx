import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';

const CategoryModal = ({
  show,
  onClose,
  onAddCategory,
  onDeleteCategory,
  categories = [],
}: {
  show: boolean;
  onClose: () => void;
  onAddCategory: (cat: string) => void;
  onDeleteCategory: (cat: string) => void;
  categories: string[];
}) => {
  const [category, setCategory] = useState('');

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5 className="mb-3">Article Category</h5>
          <table className="table mb-0">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Category Name</th>
                <th style={{ width: 100 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    <div>
                      <i className="fa fa-list-alt" style={{ fontSize: 28, color: '#b0b8c1' }} />
                    </div>
                    <div className="text-muted mt-2">- No record found. -</div>
                  </td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr key={cat}>
                    <td>{idx + 1}</td>
                    <td>{cat}</td>
                    <td>
                      {onDeleteCategory && cat !== 'All' && (
                        <Button
                          color="light"
                          size="sm"
                          onClick={() => onDeleteCategory(cat)}
                        >
                          <i className="fa fa-trash" /> Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="my-3">
            <label className="form-label">Category Name <span className="text-danger">*</span></label>
            <input
              className="form-control"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="e.g. Potential Client"
            />
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Button color="secondary" onClick={onClose}>Close</Button>
            <Button
              color="primary"
              onClick={() => {
                if (category.trim() && !categories.includes(category.trim())) {
                  onAddCategory(category.trim());
                  setCategory('');
                  onClose();
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;