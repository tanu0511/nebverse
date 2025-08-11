import React, { useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';

interface SubCategory {
  category: string;
  subCategory: string;
}

interface SubCategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: string[];
  subCategories: SubCategory[];
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategory[]>>;
}

const SubCategoryModal: React.FC<SubCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  categories,
  subCategories,
  setSubCategories,
}) => {
  const [category, setCategory] = useState(categories[0] || '');
  const [subCategory, setSubCategory] = useState('');

  const handleAdd = () => {
    if (category && subCategory) {
      setSubCategories([...subCategories, { category, subCategory }]);
      setSubCategory('');
    }
  };

  const handleDelete = (idx: number) => {
    setSubCategories(subCategories.filter((_, i) => i !== idx));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="sub-category-modal-title">Product Sub Category</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Select
                      ariaLabel="Category"
                      value={item.category}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const updated = [...subCategories];
                        updated[idx].category = e.target.value;
                        setSubCategories(updated);
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Select>
                  </td>
                  <td>{item.subCategory}</td>
                  <td>
                    <Button color="light" onClick={() => handleDelete(idx)}>
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label" htmlFor="categorySelect">
              Category Name <span className="text-danger">*</span>
            </label>
            <Select
              id="categorySelect"
              ariaLabel="Category Name"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="subCategoryInput">
              Product Sub Category <span className="text-danger">*</span>
            </label>
            <Input
              id="subCategoryInput"
              placeholder="e.g. Potential Client"
              value={subCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubCategory(e.target.value)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isOutline onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleAdd} isDisable={!category || !subCategory}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SubCategoryModal;