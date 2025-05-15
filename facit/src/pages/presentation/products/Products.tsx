/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import PaginationButtons from '../../../components/PaginationButtons';
import AddProductPage from './AddProductPage'; // Adjust path if needed
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import ProductViewModal from './ProductViewModal'; 
 
const columns = [
  'Product Image',
  'Products',
  'Price (inclusive of all taxes)',
  'Stock On Hand',
  'Unit Type',
  'Client can purchase',
  'Status',
  'Action'
];

const StatusDropdown = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);

  const options = [
    { label: 'Active', color: '#28e60b', value: 'Active' },
    { label: 'Inactive', color: '#dc3545', value: 'Inactive' },
  ];

  const selected = options.find(opt => opt.value === value) || options[0];

  return (
    <div style={{ position: 'relative', minWidth: 100 }}>
      <div
        style={{
          cursor: 'pointer',
          border: '1px solid #e0e0e0',
          borderRadius: 6,
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          minWidth: 90,
        }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{
          display: 'inline-block',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: selected.color,
          marginRight: 8,
        }} />
        <span style={{ fontWeight: 500 }}>{selected.label}</span>
        <i className="fa fa-chevron-down ms-2" style={{ fontSize: 12 }} />
      </div>
      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            marginTop: 2,
            minWidth: 120,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          {options.map(opt => (
            <div
              key={opt.value}
              style={{
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                background: value === opt.value ? '#2684ff' : '#fff',
                color: value === opt.value ? '#fff' : '#222',
              }}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <span style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: opt.color,
                marginRight: 8,
              }} />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example Product type
type Product = {
  productImage?: string | null;
  name: string;
  price: number;
  stockOnHand: number;
  unitType: string;
  clientCanPurchase: boolean;
  status: string;
  images?: { url: string; name: string; date: Date }[];
};

const Products: React.FC = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
//   const [actionOpenIdx, setActionOpenIdx] = useState<number | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);

  const [items, setItems] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [editProductIdx, setEditProductIdx] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Handler to add new product
  const handleAddProduct = (product: Product) => {
    setItems(prev => [...prev, product]);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product: Product, idx: number) => {
    setEditProduct(product);
    setEditProductIdx(idx);
    setShowAddProduct(true);
  };

  const handleSaveEditProduct = (updatedProduct: Product) => {
    if (editProductIdx !== null) {
      setItems(items =>
        items.map((item, i) => (i === editProductIdx ? updatedProduct : item))
      );
      setEditProductIdx(null);
      setEditProduct(null);
      setShowAddProduct(false);
    }
  };

  const handleViewProduct = (product: any) => {
    setViewProduct(product);
    setViewModalOpen(true);
  };

  const handleDeleteProduct = (idx: number) => {
    setItems(items => items.filter((_, i) => i !== idx));
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-3 gap-2">
        <Button
          color="primary"
          className="px-4"
          onClick={() => setShowAddProduct(true)}
        >
          <Icon icon=''/> Add Product
        </Button>
        <Button color="secondary" className="px-4">
          <i className="fa fa-file-export me-2" /> Export
        </Button>
      </div>
      {showAddProduct && (
        <div className="mb-4">
          <AddProductPage
            onClose={() => {
              setShowAddProduct(false);
              setEditProductIdx(null);
              setEditProduct(null);
            }}
            onSave={editProduct ? handleSaveEditProduct : handleAddProduct}
            product={editProduct}
          />
        </div>
      )}
      <div className="card p-3">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                {/* <td></td> */}
                <td colSpan={columns.length} className="text-center text-muted">
                  No data available in table
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    {item.productImage ? (
                      <img src={item.productImage} alt="Product" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.stockOnHand || '-'}</td>
                  <td>{item.unitType}</td>
                  {/* Client can purchase */}
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: 6,
                        padding: '4px 12px',
                        minWidth: 90,
                        background: '#fff',
                        fontWeight: 500,
                        height: 36,
                        width: 120
                      }}
                    >
                      <span style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: item.clientCanPurchase ? '#28e60b' : '#dc3545',
                        marginRight: 8,
                      }} />
                      <span>
                        {item.clientCanPurchase ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                  </td>
                  {/* Status */}
                  <td>
                    <StatusDropdown
                      value={item.status || 'Active'}
                      onChange={newStatus => {
                        setItems(items =>
                          items.map((it, i) =>
                            i === idx ? { ...it, status: newStatus } : it
                          )
                        );
                      }}
                    />
                  </td>
                  {/* Action */}
                  <td>
                    <Dropdown>
                      <DropdownToggle hasIcon={false}>
                        <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                      </DropdownToggle>
                      <DropdownMenu isAlignmentEnd>
                        <Button
                          color="link"
                          className="dropdown-item"
                          onClick={() => handleViewProduct(item)}
                        >
                          <Icon icon="RemoveRedEye" className="me-2" /> View
                        </Button>
                        <Button
                          color="link"
                          className="dropdown-item"
                          onClick={() => handleEditProduct(item, idx)}
                        >
                          <Icon icon="Edit" className="me-2" /> Edit
                        </Button>
                        <Button
                          color="link"
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteProduct(idx)}
                        >
                          <Icon icon="Delete" className="me-2" /> Delete
                        </Button>
                        <Button
                          color="link"
                          className="dropdown-item"
                          onClick={() => {
                            // Open the form with a copy of the product (remove unique fields if needed)
                            const duplicate = { ...item };
                            // If you have an 'id' field, remove or regenerate it:
                            // delete duplicate.id;
                            setEditProduct(duplicate);
                            setEditProductIdx(null); // null means it's not editing an existing one
                            setShowAddProduct(true);
                          }}
                        >
                          <Icon icon="CopyAll" className="me-2" /> Duplicate
                        </Button>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PaginationButtons
          data={items}
          label="items"
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          perPage={perPage}
          setPerPage={setPerPage}
        />

<ProductViewModal
        show={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        product={viewProduct}
        onUpdateImages={(images) => {
          setItems(items =>
            items.map(item =>
              item === viewProduct ? { ...item, images } : item
            )
          );
          setViewProduct((prev: Product | null) => prev ? { ...prev, images } : prev);
        }}
      />
      </div>
    </div>
  );
};

export default Products;