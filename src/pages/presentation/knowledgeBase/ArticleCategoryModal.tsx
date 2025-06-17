/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import Icon from '../../../components/icon/Icon';

interface ArticleCategoryModalProps {
  show: boolean;
  onClose: () => void;
  onAddCategory: (cat: string) => void;
  categories?: string[]; // Accept categories from parent if provided
  onDeleteCategory?: (cat: string) => void; // Optional delete handler from parent
}

const ArticleCategoryModal = ({
  show,
  onClose,
  onAddCategory,
  categories: parentCategories,
  onDeleteCategory,
}: ArticleCategoryModalProps) => {
  // Local state for new category input
  const [categoryName, setCategoryName] = useState('');
  // Local state for categories if not controlled by parent
  const [categories, setCategories] = useState<string[]>([]);
  const tableBodyRef = useRef<HTMLDivElement>(null);

  // If categories are passed from parent, use them; otherwise use local state
  const displayCategories = parentCategories ?? categories;

  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
    }
  }, [displayCategories]);

  // Save handler for local state (if not using parent)
  const handleSaveLocal = () => {
    if (categoryName.trim() === '') return;
    if (!categories.includes(categoryName.trim())) {
      setCategories(prev => [...prev, categoryName.trim()]);
    }
    setCategoryName('');
    onClose(); // <-- Close modal after save
  };

  // Save handler for parent state
  const handleSaveParent = () => {
    if (categoryName.trim() === '') return;
    if (!parentCategories?.includes(categoryName.trim())) {
      onAddCategory(categoryName.trim());
    }
    setCategoryName('');
    onClose(); // <-- Close modal after save
  };

  // Delete handler for local state (if not using parent)
  const handleDeleteLocal = (idx: number) => {
    setCategories(prev => prev.filter((_, i) => i !== idx));
  };

  // Delete handler for parent state
  const handleDeleteParent = (cat: string) => {
    if (onDeleteCategory) onDeleteCategory(cat);
  };

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">Article Category</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Category Name</th>
                <th style={{ width: 120, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center" style={{ height: 80 }}>
                    <div>
                      <i className="fa fa-list-alt" style={{ fontSize: 28, color: '#b0b8c1' }} />
                    </div>
                    <div className="text-muted mt-2">- No record found. -</div>
                  </td>
                </tr>
              ) : (
                displayCategories.map((cat, idx) => (
                  <tr key={cat}>
                    <td>{idx + 1}</td>
                    <td>{cat}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Button
                        color="light"
                        className="btn-sm"
                        onClick={() =>
                          parentCategories && onDeleteCategory
                            ? handleDeleteParent(cat)
                            : handleDeleteLocal(idx)
                        }
                      >
                        <Icon icon="delete" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Category Name <span className="text-danger">*</span>
          </label>
          <Input
            value={categoryName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
            placeholder="e.g. Potential Client"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                parentCategories ? handleSaveParent() : handleSaveLocal();
              }
            }}
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button color="secondary" className="me-2" onClick={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onClick={() => {
              parentCategories ? handleSaveParent() : handleSaveLocal();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ArticleCategoryModal;