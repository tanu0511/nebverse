import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddProductPage from './AddProductPage';
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

type Product = {
  productImage?: string | null;
  name: string;
  price: number;
  stockOnHand: number;
  unitType: string;
  clientCanPurchase: boolean;
  status: string;
  images?: { url: string; name: string; date: Date }[];
  isSelected?: boolean;
};

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

const Products: React.FC = () => {
  const [perPage, setPerPage] = useState(PER_COUNT['10']);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);

  const [items, setItems] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProductIdx, setEditProductIdx] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  // Filtered and paginated data
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unitType && item.unitType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedItems = dataPagination(filteredItems, currentPage, perPage);

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

  // Select all handler
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setItems(items => items.map(item => ({ ...item, isSelected: checked })));
  };

  // Row select handler
  const handleRowSelect = (idx: number, checked: boolean) => {
    setItems(items =>
      items.map((item, i) => (i === idx ? { ...item, isSelected: checked } : item))
    );
    // Update selectAll state
    const allSelected = items.every((item, i) => (i === idx ? checked : item.isSelected));
    setSelectAll(allSelected);
  };

  return (
    <PageWrapper title="Products">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search product..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => setShowAddProduct(true)}
          >
            Add Product
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/somefile.txt"
            target="_blank"
            download
          >
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={e => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      {columns.map(col => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length + 1} className="text-center text-muted">
                          No data available in table
                        </td>
                      </tr>
                    ) : (
                      paginatedItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isSelected || false}
                              onChange={e => handleRowSelect(idx + (currentPage - 1) * perPage, e.target.checked)}
                            />
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
                          <td>
                            <StatusDropdown
                              value={item.status || 'Active'}
                              onChange={newStatus => {
                                setItems(items =>
                                  items.map((it, i) =>
                                    i === idx + (currentPage - 1) * perPage ? { ...it, status: newStatus } : it
                                  )
                                );
                              }}
                            />
                          </td>
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
                                  onClick={() => handleEditProduct(item, idx + (currentPage - 1) * perPage)}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteProduct(idx + (currentPage - 1) * perPage)}
                                >
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    const duplicate = { ...item };
                                    setEditProduct(duplicate);
                                    setEditProductIdx(null);
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
              </CardBody>
              <PaginationButtons
                data={filteredItems}
                label="Products"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <AddProductPage
          onClose={() => {
            setShowAddProduct(false);
            setEditProductIdx(null);
            setEditProduct(null);
          }}
          onSave={editProduct ? handleSaveEditProduct : handleAddProduct}
          product={editProduct}
        />
      )}
      {/* View Product Modal */}
      {viewProduct && (
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
      )}
    </PageWrapper>
  );
};

export default Products;