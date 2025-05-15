/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreate: (order: {
    orderNumber: string;
    client: string;
    clientCompany: string;
    total: number;
    date: string | Date;
    status: string;
    products: any[];
    clientNote: string;
    discount: number;
    discountType: string;
    tax: number;
    shippingAddress?: string;
    generatedBy: string;
  }) => void;
  editOrder?: {
    id: string;
    orderNumber: string;
    client: string;
    clientCompany: string;
    total: number;
    date: string | Date;
    status: string;
    products: any[];
    clientNote: string;
    discount: number;
    discountType: string;
    tax: number;
    shippingAddress?: string;
  } | null;
}

interface Order {
  orderNumber: string;
  client: string;
  clientCompany: string;
  total: number;
  date: string | Date;
  status: string;
  products: any[];
  clientNote: string;
  discount: number;
  discountType: string;
  tax: number;
  shippingAddress?: string;
  generatedBy: string;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onOrderCreate, editOrder }) => {
  if (!isOpen) return null;

  const STATUS_OPTIONS = [
    { value: 'Pending', label: 'Pending', color: '#ffc107' },
    { value: 'On Hold', label: 'On Hold', color: '#17a2b8' },
    { value: 'Failed', label: 'Failed', color: '#6c757d' },
    { value: 'Processing', label: 'Processing', color: '#007bff' },
    { value: 'Completed', label: 'Completed', color: '#28a745' },
    { value: 'Canceled', label: 'Canceled', color: '#dc3545' },
  ];

  // Client modal state
  const [showClientModal, setShowClientModal] = useState(false);
  const [clients, setClients] = useState<{ name: string; email: string; company: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [showShippingInput, setShowShippingInput] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  // Order form state (add more fields as needed)
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS[0].value);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [generatedBy, setGeneratedBy] = useState('rana');
  const [product, setProduct] = useState('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategories, setSubCategories] = useState<{ category: string; subCategory: string }[]>([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [selectedSubCategoryCategory, setSelectedSubCategoryCategory] = useState('');
  const [selectedProductSubCategory, setSelectedProductSubCategory] = useState('');
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [taxes, setTaxes] = useState<{ name: string; rate: string }[]>([]);
  const [newTaxName, setNewTaxName] = useState('');
  const [newTaxRate, setNewTaxRate] = useState('');
  const [selectedTax, setSelectedTax] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductSubCategory, setNewProductSubCategory] = useState('');
  const [newProductTax, setNewProductTax] = useState('');
  const [newProductSKU, setNewProductSKU] = useState('');
  const [newProductUnit, setNewProductUnit] = useState('Pcs');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<'%' | 'flat'>('%');
  const [tax, setTax] = useState<number>(0);
  const [clientNote, setClientNote] = useState('');

  useEffect(() => {
    if (editOrder) {
      setOrderNumber(editOrder.orderNumber || '');
      setSelectedClient(editOrder.client || '');
      setClientCompany(editOrder.clientCompany || '');
      setProducts(editOrder.products || []);
      setStatus(editOrder.status || 'Pending');
      setShippingAddress(editOrder.shippingAddress || '');
      // ...set other fields as needed...
    } else {
      // Clear form if not editing
      setOrderNumber('');
      setSelectedClient('');
      setClientCompany('');
      setProducts([]);
      setStatus('Pending');
      setShippingAddress('');
      // ...clear other fields as needed...
    }
  }, [editOrder, isOpen]);

  // Handle Save Client
  const handleSaveClient = () => {
    if (!clientName) return;
    const newClient = { name: clientName, email: clientEmail, company: clientCompany };
    setClients(prev => [...prev, newClient]);
    setSelectedClient(clientName);
    setShowClientModal(false);
    setClientName('');
    setClientEmail('');
    setClientCompany('');
  };

  // Handle Add Product (dummy)
  const handleAddProduct = () => {
    if (product && !products.includes(product)) {
      setProducts(prev => [...prev, product]);
      setProduct('');
    }
  };
  const subTotal = products.reduce((sum, p) => sum + (Number(p.price) * (p.quantity || 1)), 0);

  const discountAmount = discountType === '%'
    ? (subTotal * discount) / 100
    : discount;

  const taxedAmount = tax > 0 ? ((subTotal - discountAmount) * tax) / 100 : 0;

  const total = subTotal - discountAmount + taxedAmount;

  // Handle Save Order (dummy, you can expand as needed)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      orderNumber,
      client: selectedClient,
      clientCompany,
      total: products.reduce((sum, p) => sum + (Number(p.price) * (p.quantity || 1)), 0),
      date: new Date().toISOString(),
      status,
      products,
      clientNote: '', // Add if you have a field for this
      discount: 0,    // Add if you have a field for this
      discountType: '', // Add if you have a field for this
      tax: 0,         // Add if you have a field for this
      generatedBy,
      shippingAddress,
    };
    onOrderCreate(order); // <-- This sends the order to the parent
    onClose();
  };

  const handleOrder = (order: Order) => {
    // ...existing code...
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Order</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Order Number *</label>
                  <div className="input-group">
                    <span className="input-group-text">ODR#00</span>
                    <input
                      className="form-control"
                      type="text"
                      value={orderNumber}
                      onChange={e => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label>Client *</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      value={selectedClient}
                      onChange={e => setSelectedClient(e.target.value)}
                      required
                    >
                      <option value="">--</option>
                      {clients.map((client, idx) => (
                        <option key={idx} value={client.name}>
                          {client.name} {client.company && (`${client.company}`)}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowClientModal(true)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <label>Billing Address</label>
                  <div className="form-text">Select the client to show billing address.</div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label>Shipping Address</label>
                  {shippingAddress && !showShippingInput ? (
                    <div className="d-flex align-items-center">
                      <span>{shippingAddress}</span>
                      <Button color="link" size="sm" className="ms-2 p-0" onClick={() => setShowShippingInput(true)}>
                        Edit
                      </Button>
                    </div>
                  ) : showShippingInput ? (
                    <div className="d-flex align-items-center">
                      <input
                        className="form-control"
                        placeholder="Enter shipping address"
                        value={shippingAddress}
                        onChange={e => setShippingAddress(e.target.value)}
                        autoFocus
                      />
                      <Button
                        color="link"
                        size="sm"
                        className="ms-2 p-0"
                        onClick={() => setShowShippingInput(false)}
                        isDisable={!shippingAddress}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        color="link"
                        className="p-0"
                        onClick={() => setShowShippingInput(true)}
                      >
                        <i className="fa fa-plus me-1 text-primary" /> Add Shipping Address
                      </Button>
                    </div>
                  )}
                </div>
                <div className="col-md-4 position-relative" style={{ maxWidth: 385 }}>
                  <label>Status*</label>
                  <div
                    className="form-control d-flex align-items-center justify-content-between"
                    style={{ cursor: 'pointer', minHeight: 38 }}
                    onClick={() => setShowStatusDropdown(s => !s)}
                  >
                    <span>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: STATUS_OPTIONS.find(opt => opt.value === status)?.color,
                          marginRight: 8,
                          verticalAlign: 'middle',
                        }}
                      />
                      {STATUS_OPTIONS.find(opt => opt.value === status)?.label}
                    </span>
                    <i className="fa fa-caret-down ms-2" />
                  </div>
                  {showStatusDropdown && (
                    <div
                      className="border bg-white shadow position-absolute w-100"
                      style={{ zIndex: 10, top: '100%', left: 0 }}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <div
                          key={opt.value}
                          className="dropdown-item d-flex align-items-center p-3"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setStatus(opt.value);
                            setShowStatusDropdown(false);
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              background: opt.color,
                              marginRight: 8,
                              verticalAlign: 'middle',
                            }}
                          />
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <label>Generated By</label>
                  <select
                    className="form-select"
                    value={generatedBy}
                    onChange={e => setGeneratedBy(e.target.value)}
                  >
                    <option>rana</option>
                  </select>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-4">
                  <label>Select Product</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      value={product}
                      onChange={e => setProduct(e.target.value)}
                    >
                      <option value="">--</option>
                      {products.map((prod, idx) => (
                        <option key={idx} value={prod.name}>{prod.name}</option>
                      ))}
                    </select>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"

                    >
                      <Icon icon="FilterAlt" className="me-1" />
                    </button>
                    <button className="btn btn-primary" type="button" onClick={() => setShowProductModal(true)}>Add</button>
                  </div>
                  {products.length === 0 && (
                    <div className="alert alert-danger mt-3 w-100">
                      <div className="d-flex justify-content-center">
                        <span className="w-100 text-center" style={{ fontSize: '1.1rem' }}>
                          Add at-least 1 item.
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
              {products.length > 0 && (
                <div className="mt-4">
                  <table className="table table-bordered align-middle">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>SKU</th>
                        <th>Unit</th>
                        <th>Unit Price</th>
                        <th>Tax</th>
                        <th>Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="form-control bg-light">{item.name}</div>
                            <div className="text-muted small">{item.description}</div>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={item.quantity}
                              min={1}
                              onChange={e => {
                                const val = Number(e.target.value);
                                setProducts(items =>
                                  items.map((it, i) => i === idx ? { ...it, quantity: val } : it)
                                );
                              }}
                            />
                          </td>
                          <td>{item.sku}</td>
                          <td>{item.unit}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={item.price}
                              onChange={e => {
                                const val = e.target.value;
                                setProducts(items =>
                                  items.map((it, i) => i === idx ? { ...it, price: val } : it)
                                );
                              }}
                            />
                          </td>
                          <td>{item.tax}</td>
                          <td>{(item.quantity * item.price).toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => setProducts(items => items.filter((_, i) => i !== idx))}
                              type="button"
                            >
                              <Icon icon="Delete" className="me-1" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Sub Total</td>
                        <td className="text-end">{subTotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>
                          Discount
                          <input
                            type="number"
                            className="form-control d-inline-block ms-2"
                            style={{ width: 80 }}
                            value={discount}
                            min={0}
                            onChange={e => setDiscount(Number(e.target.value))}
                          />
                          <select
                            className="form-select d-inline-block ms-2"
                            style={{ width: 60 }}
                            value={discountType}
                            onChange={e => setDiscountType(e.target.value as '%' | 'flat')}
                          >
                            <option value="%">%</option>
                            <option value="flat">₹</option>
                          </select>
                        </td>
                        <td className="text-end">-{discountAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>
                          Tax
                          <input
                            type="number"
                            className="form-control d-inline-block ms-2"
                            style={{ width: 80 }}
                            value={tax}
                            min={0}
                            onChange={e => setTax(Number(e.target.value))}
                          />
                          <span className="ms-2">%</span>
                        </td>
                        <td className="text-end">{taxedAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <th className="text-end">{total.toFixed(2)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label>Client Note</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={clientNote}
                    onChange={e => setClientNote(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer justify-content-end">
              <Button color="secondary" onClick={onClose}>Cancel</Button>
              <Button color="primary" className="ms-2" type="submit">Save Order</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Client Modal */}
      {showClientModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Client</h5>
                <button type="button" className="btn-close" onClick={() => setShowClientModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Client Name *</label>
                  <input
                    className="form-control"
                    placeholder="e.g. John Doe"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>
                    Email <i className="fa fa-question-circle ms-1" title="Email" />
                  </label>
                  <input
                    className="form-control"
                    placeholder="e.g. johndoe@example.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Company Name</label>
                  <input
                    className="form-control"
                    placeholder="e.g. Acme Corporation"
                    value={clientCompany}
                    onChange={e => setClientCompany(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Login Allowed?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="loginAllowed" id="loginYes" value="yes" />
                      <label className="form-check-label" htmlFor="loginYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="loginAllowed" id="loginNo" value="no" defaultChecked />
                      <label className="form-check-label" htmlFor="loginNo">No</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button color="secondary" onClick={() => setShowClientModal(false)}>Close</Button>
                <Button color="primary" onClick={handleSaveClient}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showProductModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Products</h5>
                <button type="button" className="btn-close" onClick={() => setShowProductModal(false)} />
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label>Name *</label>
                    <input
                      className="form-control"
                      placeholder="e.g. Web Hosting, Laptop, Notebook, Mobile App etc."
                      value={newProductName}
                      onChange={e => setNewProductName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Price *</label>
                    <input
                      className="form-control"
                      type="number"
                      value={newProductPrice}
                      onChange={e => setNewProductPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Product Category</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option>--</option>
                        {categories.map((cat, idx) => (
                          <option key={idx}>{cat}</option>
                        ))}
                      </select>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => setShowCategoryModal(true)}>Add</button>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label>Product Sub Category</label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedProductSubCategory}
                        onChange={e => setSelectedProductSubCategory(e.target.value)}
                      >
                        <option value="">--</option>
                        {subCategories.map((item, idx) => (
                          <option key={idx} value={item.subCategory}>
                            {item.subCategory} {item.category ? (`${item.category}`) : ''}
                          </option>
                        ))}
                      </select>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => setShowSubCategoryModal(true)}>Add</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>Tax</label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedTax}
                        onChange={e => setSelectedTax(e.target.value)}
                      >
                        <option value="">Nothing selected</option>
                        {taxes.map((tax, idx) => (
                          <option key={idx} value={tax.name}>
                            {tax.name} ({tax.rate}%)
                          </option>
                        ))}
                      </select>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => setShowTaxModal(true)}>Add</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>Hsn/Sac</label>
                    <input className="form-control" placeholder="e.g. 995431" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label>Unit Type</label>
                    <select className="form-select">
                      <option>Pcs</option>
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <input type="checkbox" className="form-check-input me-2" id="clientCanPurchase" />
                    <label htmlFor="clientCanPurchase" className="form-check-label">Client can purchase</label>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <input type="checkbox" className="form-check-input me-2" id="downloadable" />
                    <label htmlFor="downloadable" className="form-check-label">
                      Downloadable <i className="fa fa-question-circle ms-1" />
                    </label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>SKU</label>
                    <input className="form-control" placeholder="Write the product's sku here" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Description</label>
                    <textarea className="form-control" rows={3}></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Add File</label>
                    <div className="border rounded d-flex align-items-center justify-content-center" style={{ minHeight: 120 }}>
                      <input type="file" className="form-control border-0" style={{ height: '90%' }} />
                      <span className="text-muted position-absolute">Choose a file</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button color="secondary" onClick={() => setShowProductModal(false)}>Close</Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (newProductName.trim()) {
                      setProducts(prev => [
                        ...prev,
                        {
                          name: newProductName.trim(),
                          price: Number(newProductPrice), // Ensure price is a number
                          category: newProductCategory,
                          subCategory: newProductSubCategory,
                          tax: newProductTax,
                          sku: newProductSKU,
                          unit: newProductUnit,
                          description: newProductDescription,
                          quantity: 1
                        }
                      ]);
                      // Reset fields
                      setNewProductName('');
                      setNewProductPrice('');
                      setNewProductCategory('');
                      setNewProductSubCategory('');
                      setNewProductTax('');
                      setNewProductSKU('');
                      setNewProductUnit('Pcs');
                      setNewProductDescription('');
                      setShowProductModal(false);
                    }
                  }}
                >
                  <i className="fa fa-check me-1" /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowCategoryModal(false)} />
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
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{cat}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                setCategories(categories.filter((_, i) => i !== idx));
                              }}
                              type="button"
                            >
                              <i className="fa fa-trash" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="mb-3">
                  <label>Category Name *</label>
                  <input
                    className="form-control"
                    placeholder="Enter a category name"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <Button color="link" onClick={() => setShowCategoryModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (newCategory.trim()) {
                      setCategories(prev => [...prev, newCategory.trim()]);
                      // Auto-select the new category in the dropdown
                      setTimeout(() => {
                        const lastCategory = newCategory.trim();
                        const select = document.querySelector('select.form-select');
                        if (select instanceof HTMLSelectElement) select.value = lastCategory;
                      }, 0);
                      setNewCategory('');
                      setShowCategoryModal(false);
                    }
                  }}
                >
                  <i className="fa fa-check me-1" /> Save
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
                <table className="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}>#</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th style={{ width: 100 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategories.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">
                          <i className="fa fa-list fa-lg mb-2 d-block" />
                          - No record found. -
                        </td>
                      </tr>
                    ) : (
                      subCategories.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item.category}</td>
                          <td>{item.subCategory}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => setSubCategories(subCategories.filter((_, i) => i !== idx))}
                              type="button"
                            >
                              <i className="fa fa-trash" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Category Name *</label>
                    <select
                      className="form-select"
                      value={selectedSubCategoryCategory}
                      onChange={e => setSelectedSubCategoryCategory(e.target.value)}
                      required
                    >
                      <option value="">--</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Product Sub Category *</label>
                    <input
                      className="form-control"
                      placeholder="e.g. Potential Client"
                      value={newSubCategory}
                      onChange={e => setNewSubCategory(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button color="link" onClick={() => setShowSubCategoryModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (selectedSubCategoryCategory && newSubCategory.trim()) {
                      setSubCategories(prev => [
                        ...prev,
                        { category: selectedSubCategoryCategory, subCategory: newSubCategory.trim() }
                      ]);
                      setSelectedProductSubCategory(newSubCategory.trim()); // Auto-select in dropdown
                      setNewSubCategory('');
                      setSelectedSubCategoryCategory('');
                      setShowSubCategoryModal(false);
                    }
                  }}
                >
                  <i className="fa fa-check me-1" /> Save
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
                <table className="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}>#</th>
                      <th>Tax Name</th>
                      <th>Rate %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxes.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted">No record found.</td>
                      </tr>
                    ) : (
                      taxes.map((tax, idx) => (
                        <tr key={idx}>
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
                    <label>Tax Name *</label>
                    <input
                      className="form-control"
                      value={newTaxName}
                      onChange={e => setNewTaxName(e.target.value)}
                      placeholder="Tax Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Rate *</label>
                    <input
                      className="form-control"
                      value={newTaxRate}
                      onChange={e => setNewTaxRate(e.target.value)}
                      placeholder="Rate"
                      type="number"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button color="link" onClick={() => setShowTaxModal(false)}>Cancel</Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (newTaxName.trim() && newTaxRate.trim()) {
                      setTaxes(prev => [...prev, { name: newTaxName.trim(), rate: newTaxRate.trim() }]);
                      setSelectedTax(newTaxName.trim()); // Auto-select new tax
                      setNewTaxName('');
                      setNewTaxRate('');
                      setShowTaxModal(false);
                    }
                  }}
                >
                  <i className="fa fa-check me-1" /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrderModal;