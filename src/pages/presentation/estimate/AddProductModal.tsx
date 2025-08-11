import React, { useRef, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import TaxModal from './TaxModal';
import CategoryModal from './CategoryModal';
import SubCategoryModal from './SubCategoryModal';

type AddProductModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave?: (productName: string) => void; // <-- Add this line
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, setIsOpen, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [subCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [taxes, setTaxes] = useState([
    { name: 'tex1', rate: '200' },
    { name: 'tex2', rate: '100' },
    { name: 'lk', rate: '4' },
  ]);
  const [categories, setCategories] = useState<string[]>(['anything', 'fan']); // initial categories
  const [subCategories, setSubCategories] = useState<{ category: string; subCategory: string }[]>([]);
  const [selectedTax, setSelectedTax] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(''); // <-- Add this line

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-product-modal-title">Add Products</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="fw-bold mb-3">Add Products</div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-name">Name <span className="text-danger">*</span></label>
            <Input
              id="add-product-name"
              placeholder="e.g. Web Hosting, Laptop, Notebook, Mobile App etc."
              value={productName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-price">Price <span className="text-danger">*</span></label>
            <Input
              id="add-product-price"
              type="number"
              min={0}
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-category">Product Category</label>
            <div className="input-group">
              <Select id="add-product-category" ariaLabel="Product Category">
                <option>--</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </Select>
              <Button color="light" className="input-group-text" onClick={() => setCategoryModalOpen(true)}>
                Add
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-sub-category">Product Sub Category</label>
            <div className="input-group">
              <Select id="add-product-sub-category" ariaLabel="Product Sub Category">
                <option>--</option>
                {subCategories.map((item, idx) => (
                  <option key={idx} value={item.subCategory}>
                    {item.subCategory} ({item.category})
                  </option>
                ))}
              </Select>
              <Button color="light" className="input-group-text" onClick={() => setSubCategoryModalOpen(true)}>
                Add
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-tax">Tax</label>
            <div className="input-group">
              <Select
                id="add-product-tax"
                ariaLabel="Tax"
                value={selectedTax}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTax(e.target.value)}
              >
                <option value="">Nothing selected</option>
                {taxes.map((tax, idx) => (
                  <option key={idx} value={tax.name}>
                    {tax.name} ({tax.rate}%)
                  </option>
                ))}
              </Select>
              <Button color="light" className="input-group-text" onClick={() => setTaxModalOpen(true)}>
                Add
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-hsn-sac">Hsn/Sac</label>
            <Input id="add-product-hsn-sac" placeholder="e.g. 995431" />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-unit-type">Unit Type</label>
            <Select id="add-product-unit-type" ariaLabel="Unit Type">
              <option>Pcs</option>
              <option>Kg</option>
              <option>Liters</option>
            </Select>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <div className="form-check me-3">
              <input className="form-check-input" type="checkbox" id="clientCanPurchase" />
              <label className="form-check-label" htmlFor="clientCanPurchase">
                Client can purchase
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="downloadable" />
              <label className="form-check-label" htmlFor="downloadable">
                Downloadable <i className="bi bi-info-circle ms-1" />
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="add-product-sku">SKU</label>
            <Input id="add-product-sku" placeholder="Write the product's sku here" />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="add-product-description">Description</label>
            <Textarea id="add-product-description" rows={3} />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="add-file-input">Add File</label>
            <div
              className="border rounded d-flex flex-column justify-content-center align-items-center p-5"
              style={{ minHeight: 100, cursor: 'pointer' }}
              onClick={() => fileInputRef.current?.click()}>
              <i className="bi bi-cloud-upload fs-1 mb-2" />
              <div>Choose a file</div>
            </div>
            <input
              id="add-file-input"
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            if (onSave && productName.trim()) {
              // Optionally pass price as well: onSave({ name: productName.trim(), price });
              onSave(productName.trim());
              setProductName('');
              setPrice(''); // <-- Reset price
            }
            setIsOpen(false);
          }}
        >
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
        <Button color="primary" isOutline>
          Save & Add More
        </Button>
        <Button color="light" isOutline onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
      <TaxModal
        isOpen={taxModalOpen}
        setIsOpen={setTaxModalOpen}
        taxes={taxes}
        setTaxes={setTaxes}
      />
      <CategoryModal
        isOpen={categoryModalOpen}
        setIsOpen={setCategoryModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <SubCategoryModal
        isOpen={subCategoryModalOpen}
        setIsOpen={setSubCategoryModalOpen}
        categories={categories}
        subCategories={subCategories}
        setSubCategories={setSubCategories}
      />
    </Modal>
  );
};

export default AddProductModal;