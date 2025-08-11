
import React, { useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

interface CategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, setIsOpen, categories, setCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName.trim() && !categories.includes(categoryName.trim())) {
      setCategories([...categories, categoryName.trim()]);
      setCategoryName('');
    }
  };

  const handleDelete = (name: string) => {
    setCategories(categories.filter(cat => cat !== name));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="category-modal-title">Category</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat}>
                  <td>{idx + 1}</td>
                  <td>{cat}</td>
                  <td>
                    <Button color="light" onClick={() => handleDelete(cat)}>
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <label htmlFor="categoryNameInput" className="form-label">Category Name <span className="text-danger">*</span></label>
          <Input
            id="categoryNameInput"
            placeholder="Enter a category name"
            value={categoryName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isOutline onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleAddCategory} isDisable={!categoryName.trim()}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CategoryModal;