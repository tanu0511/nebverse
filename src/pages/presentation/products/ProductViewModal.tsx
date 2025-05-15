/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import Modal from '../../../components/bootstrap/Modal'; // Adjust import as needed
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';// Import Dropdown components
import Icon from '../../../components/icon/Icon';

const ProductViewModal = ({
  show,
  onClose,
  product,
  onUpdateImages,
}: {
  show: boolean,
  onClose: () => void,
  product: any,
  onUpdateImages: (images: { url: string; name: string; date: Date }[]) => void
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'history'>('overview');
  const [showAddImage, setShowAddImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<{ url: string; name: string; date: Date }[]>(product?.images || []);
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);

  useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  // Handle image upload
  const handleSaveImage = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const newImages = [
        ...images,
        {
          url,
          name: selectedFile.name,
          date: new Date(),
        },
      ];
      setImages(newImages);
      onUpdateImages(newImages);
      setShowAddImage(false);
      setSelectedFile(null);
    }
  };

  // Format date as "x seconds/minutes ago"
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
    return date.toLocaleString();
  };

  if (!product) return null;

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="lg" isStaticBackdrop={true} >
      <div className="modal-header">
        <h5 className="modal-title">Product Info</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: 24 }}>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
            <li
              style={{
                padding: '8px 24px',
                cursor: 'pointer',
                borderBottom: activeTab === 'overview' ? '3px solid #1976d2' : 'none',
                color: activeTab === 'overview' ? '#1976d2' : '#6c757d',
                fontWeight: 500,
              }}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </li>
            <li
              style={{
                padding: '8px 24px',
                cursor: 'pointer',
                borderBottom: activeTab === 'images' ? '3px solid #1976d2' : 'none',
                color: activeTab === 'images' ? '#1976d2' : '#6c757d',
                fontWeight: 500,
              }}
              onClick={() => setActiveTab('images')}
            >
              Images
            </li>
            <li
              style={{
                padding: '8px 24px',
                cursor: 'pointer',
                borderBottom: activeTab === 'history' ? '3px solid #1976d2' : 'none',
                color: activeTab === 'history' ? '#1976d2' : '#6c757d',
                fontWeight: 500,
              }}
              onClick={() => setActiveTab('history')}
            >
              History
            </li>
          </ul>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <div className="row">
              <div className="col-md-6 ">
                <div className='mb-2'><strong>Name:</strong> {product.name || '--'}</div>
                <div className='mb-2'><strong>Product Type:</strong> {product.type || '--'}</div>
                <div className='mb-2'><strong>Unit Type:</strong> {product.unitType || '--'}</div>
                <div className="mb-2"><strong>Tax:</strong> {product.tax || '--'}</div>
                <div className="mb-2"><strong>Hsn/Sac:</strong> {product.hsnSac || '--'}</div>
                <div className="mb-2"><strong>Product Category:</strong> {product.category || '--'}</div>
                <div className="mb-2"><strong>Product Sub Category:</strong> {product.subCategory || '--'}</div>
                <div className="mb-2">
                  <strong>Client can purchase:</strong>{' '}
                  {product.clientCanPurchase ? (
                    <span style={{ background: '#28a745', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>Yes</span>
                  ) : (
                    <span style={{ background: '#dc3545', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>No</span>
                  )}
                </div>
                <div className="mb-2">
                  <strong>Downloadable:</strong>{' '}
                  {product.downloadable ? (
                    <span style={{ background: '#28a745', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>Yes</span>
                  ) : (
                    <span style={{ background: '#dc3545', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>No</span>
                  )}
                </div>
                <div><strong>Description:</strong> {product.description || '--'}</div>
              </div>
              <div className="col-md-6">
                <div className="mb-2"><strong>Opening Stock:</strong> {product.openingStock || '--'}</div>
                <div className="mb-2"><strong>Stock On Hand:</strong> {product.stockOnHand || '--'}</div>
                <div className="mb-2"><strong>Committed Stock:</strong> {product.committedStock || '--'}</div>
                <div className="mb-2"><strong>Available For Sale:</strong> {product.availableForSale || '--'}</div>
              </div>
            </div>
            <div style={{ marginTop: 24 }} className="mb-2">
              <strong>Sales Information</strong>
              <div className="mb-2"><strong>Selling Price:</strong> {product.sellingPrice ? `₹${product.sellingPrice}` : '--'}</div>
            </div>
            <div style={{ marginTop: 16 }} className="mb-2">
              <strong>Purchase Information</strong>
              <div><strong>Cost Price:</strong> {product.costPrice ? `₹${product.costPrice}` : '--'}</div>
            </div>
          </div>
        )}
        {activeTab === 'images' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-primary" onClick={() => setShowAddImage(true)}>
                <span style={{ fontWeight: 'bold', fontSize: 18, marginRight: 6 }}>+</span> Add Images
              </button>
            </div>
            <div style={{ background: '#fff', borderRadius: 6, padding: 0 }}>
              <table className="table mb-0" style={{ borderRadius: 6 }}>
                <thead>
                  <tr>
                    <th style={{ width: '60%' }}>File name</th>
                    <th style={{ width: '20%' }}>Date</th>
                    <th style={{ width: '20%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {images.length === 0 ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: 120 }}>
                          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="No file" style={{ width: 32, opacity: 0.4 }} />
                          <div style={{ color: '#8a94a6', marginTop: 8 }}>- No file uploaded. -</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    images.map((img: { url: string; name: string; date: Date }, idx: number) => (
                      <tr key={idx}>
                        <td>
                          <img src={img.url} alt={img.name} style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 4, marginRight: 8, border: '1px solid #eee' }} />
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{timeAgo(img.date)}</td>
                        <td style={{ verticalAlign: 'middle', position: 'relative' }}>
                          <Dropdown isOpen={openMenuIdx === idx} >
                            <DropdownToggle hasIcon={false}>
                              <button className="btn btn-outline-secondary btn-sm">
                                <span style={{ fontSize: 18, fontWeight: 'bold', verticalAlign: 'middle' }}>⋮</span>
                              </button>
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = img.url;
                                  link.download = img.name;
                                  link.click();
                                  setOpenMenuIdx(null);
                                }}
                              >
                                <Icon icon='Download'/> Download
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item text-danger"
                                onClick={() => {
                                  const newImages = images.filter((_, i) => i !== idx);
                                  setImages(newImages);
                                  onUpdateImages(newImages);
                                  setOpenMenuIdx(null);
                                }}
                              >
                                <Icon icon='Delete'/> Delete
                              </Button>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            {/* History tab content */}
            <div>No history available.</div>
          </div>
        )}
      </div>
      <Modal isOpen={showAddImage} setIsOpen={() => setShowAddImage(false)} isStaticBackdrop={true}  >
        <div className="modal-header">
          <h5 className="modal-title">Add Images</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddImage(false)}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">
                Add Images <span style={{ color: 'red' }}>*</span>
              </label>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 6,
                  height: 120,
                  cursor: 'pointer',
                  background: '#fafbfc'
                }}
                onClick={() => document.getElementById('image-upload-input')?.click()}
              >
                <input
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                />
                <span style={{ color: '#6c757d' }}>
                  {selectedFile ? selectedFile.name : 'Choose a file'}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => setShowAddImage(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!selectedFile}
                onClick={handleSaveImage}
              >
                <span style={{ fontWeight: 500 }}>✓ Save</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Modal>
  );
};

export default ProductViewModal;