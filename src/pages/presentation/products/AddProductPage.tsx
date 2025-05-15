import React, { useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';

interface Product {
  name: string;
  price: number;
  stockOnHand: number;
  unitType: string;
  clientCanPurchase: boolean;
  status: string;
  productImage?: string | null; // Added productImage property
  // Add other fields as needed
}

interface AddProductPageProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

const AddProductPage: React.FC<AddProductPageProps> = ({ onClose, onSave, product }) => {
  const [form, setForm] = useState<Product>(
    product || {
      name: '',
      price: 0,
      stockOnHand: 0,
      unitType: '',
      clientCanPurchase: false,
      status: 'Active',
      // Add other default fields as needed
    }
  );

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const [type, setType] = useState<'Goods' | 'Service'>('Goods');
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategories, setSubCategories] = useState<{ category: string; subCategory: string }[]>([]);
  const [subCategoryModalCategory, setSubCategoryModalCategory] = useState('');
  const [subCategoryModalName, setSubCategoryModalName] = useState('');
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [taxes, setTaxes] = useState<{ name: string; rate: string }[]>([]);
  const [taxName, setTaxName] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [selectedTax, setSelectedTax] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    // Add validation logic here
    if (Object.keys(newErrors).length === 0) {
      onSave({
        ...form,
        productImage: productImage ? URL.createObjectURL(productImage) : null,
        // Add other fields as needed
      });
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Products</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSaveProduct}>
              <div className="row mb-3">
                <div className="col-md-2">
                  <label className="form-label">Type <span className="text-danger">*</span></label>
                  <div>
                    <label className="me-3">
                      <input
                        type="radio"
                        checked={type === 'Goods'}
                        onChange={() => setType('Goods')}
                      /> Goods
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={type === 'Service'}
                        onChange={() => setType('Service')}
                      /> Service
                    </label>
                  </div>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Web Hosting, Laptop, Notebook, Mobile App e"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Unit Type</label>
                  <select
                    className="form-select"
                    value={form.unitType}
                    onChange={e => setForm({ ...form, unitType: e.target.value })}
                  >
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>
              </div>

              {type === 'Goods' && (
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 995431"
                      value={form.stockOnHand}
                      onChange={e => setForm({ ...form, stockOnHand: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Product Category</label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value="">--</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <Button color="secondary" type="button" onClick={() => setShowCategoryModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Product Sub Category</label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={subCategory}
                        onChange={e => setSubCategory(e.target.value)}
                      >
                        <option value="">No product sub-category added.</option>
                        {subCategories
                          .filter(sc => sc.category === category)
                          .map(sc => (
                            <option key={sc.subCategory} value={sc.subCategory}>
                              {sc.subCategory}
                            </option>
                          ))}
                      </select>
                      <Button color="secondary" type="button" onClick={() => setShowSubCategoryModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Sales Information</label>
                </div>
              </div>
              <div className="row mb-3 align-items-end">
                <div className="col-md-6">
                  <label className="form-label">Selling Price <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text">INR</span>
                    <input
                      type="number"
                      className="form-control"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                      min={0}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cost Price <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text">INR</span>
                    <input
                      type="number"
                      className="form-control"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                      min={0}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Tax</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      value={selectedTax}
                      onChange={e => setSelectedTax(e.target.value)}
                    >
                      <option value="">Nothing selected</option>
                      {taxes.map((tax, idx) => (
                        <option key={tax.name + tax.rate + idx} value={tax.name}>
                          {tax.name} ({tax.rate}%)
                        </option>
                      ))}
                    </select>
                    <Button color="secondary" type="button" onClick={() => setShowTaxModal(true)}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Hsn/Sac</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 995431"
                  />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check me-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="clientCanPurchase"
                      checked={form.clientCanPurchase}
                      onChange={e => setForm({ ...form, clientCanPurchase: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="clientCanPurchase">
                      Client can purchase
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="downloadable" />
                    <label className="form-check-label" htmlFor="downloadable">
                      Downloadable <span title="Downloadable product"><i className="fa fa-question-circle" /></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="trackInventory" />
                    <label className="form-check-label" htmlFor="trackInventory">
                      Track Inventory for this Item
                    </label>
                  </div>
                  <small className="text-muted">
                    You can't enable/disable inventory tracking once you've created transactions for this item.
                  </small>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Add Images</label>
                  <div className="border rounded d-flex align-items-center justify-content-center" style={{ height: 120 }}>
                    <input
                      type="file"
                      className="form-control border-0"
                      style={{ height: '100%' }}
                      onChange={e => setProductImage(e.target.files?.[0] || null)}
                    />
                    <span className="text-muted">Choose a file</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-end">
                <Button color="secondary" onClick={onClose}>Cancel</Button>
                <Button color="primary" className="ms-2" type="submit">
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showCategoryModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowCategoryModal(false)} />
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Category Name</th>
                      <th style={{ width: 80 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted" style={{ fontSize: 18 }}>
                          <i className="fa fa-list-ul" style={{ fontSize: 32 }} /><br />
                          - No record found. -
                        </td>
                      </tr>
                    ) : (
                      categories.map((cat, idx) => (
                        <tr key={cat}>
                          <td>{idx + 1}</td>
                          <td>{cat}</td>
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => setCategories(categories.filter(c => c !== cat))}
                            >
                              <i className="fa fa-trash" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="mb-3">
                  <label className="form-label">Category Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a category name"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer justify-content-end">
                <Button color="secondary" onClick={() => setShowCategoryModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  className="ms-2"
                  onClick={() => {
                    if (categoryName.trim() && !categories.includes(categoryName.trim())) {
                      setCategories([...categories, categoryName.trim()]);
                      setCategoryName('');

                      setShowCategoryModal(false); // <-- Close the modal after save
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSubCategoryModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Sub Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowSubCategoryModal(false)} />
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th style={{ width: 80 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategories.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-muted" style={{ fontSize: 18 }}>
                          <i className="fa fa-list-ul" style={{ fontSize: 32 }} /><br />
                          - No record found. -
                        </td>
                      </tr>
                    ) : (
                      subCategories.map((item, idx) => (
                        <tr key={item.category + item.subCategory}>
                          <td>{idx + 1}</td>
                          <td>{item.category}</td>
                          <td>{item.subCategory}</td>
                          <td>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() =>
                                setSubCategories(subCategories.filter(
                                  sc => !(sc.category === item.category && sc.subCategory === item.subCategory)
                                ))
                              }
                            >
                              <i className="fa fa-trash" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Category Name <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={subCategoryModalCategory}
                      onChange={e => setSubCategoryModalCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Product Sub Category <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Potential Client"
                      value={subCategoryModalName}
                      onChange={e => setSubCategoryModalName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-end">
                <Button color="secondary" onClick={() => setShowSubCategoryModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  className="ms-2"
                  onClick={() => {
                    if (
                      subCategoryModalCategory &&
                      subCategoryModalName.trim() &&
                      !subCategories.some(
                        sc =>
                          sc.category === subCategoryModalCategory &&
                          sc.subCategory === subCategoryModalName.trim()
                      )
                    ) {
                      setSubCategories([
                        ...subCategories,
                        { category: subCategoryModalCategory, subCategory: subCategoryModalName.trim() }
                      ]);
                      setSubCategoryModalName('');
                      setSubCategoryModalCategory(''); // reset category selection
                      setShowSubCategoryModal(false);  // close modal after save
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTaxModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tax</h5>
                <button type="button" className="btn-close" onClick={() => setShowTaxModal(false)} />
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Tax Name</th>
                      <th>Rate %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxes.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted" style={{ fontSize: 18 }}>
                          <i className="fa fa-list-ul" style={{ fontSize: 32 }} /><br />
                          - No record found. -
                        </td>
                      </tr>
                    ) : (
                      taxes.map((tax, idx) => (
                        <tr key={tax.name + tax.rate + idx}>
                          <td>{idx + 1}</td>
                          <td>{tax.name}</td>
                          <td>{tax.rate}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Tax Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={taxName}
                      onChange={e => setTaxName(e.target.value)}
                      placeholder="Tax Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Rate <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      value={taxRate}
                      onChange={e => setTaxRate(e.target.value)}
                      placeholder="Rate"
                      min={0}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-end">
                <Button color="secondary" onClick={() => setShowTaxModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  className="ms-2"
                  onClick={() => {
                    if (
                      taxName.trim() &&
                      taxRate.trim() &&
                      !taxes.some(t => t.name === taxName.trim())
                    ) {
                      setTaxes([...taxes, { name: taxName.trim(), rate: taxRate.trim() }]);
                      setTaxName('');
                      setTaxRate('');
                      setShowTaxModal(false);
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;