import React, { useState } from 'react';
import Modal, { ModalBody } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import AddFileModal from './AddFileModal';

interface FileData {
  name: string;
  url: string;
  date: Date;
}

interface ViewInventoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: any;
}

const ViewInventoryModal: React.FC<ViewInventoryModalProps> = ({ isOpen, setIsOpen, item }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'history'>('overview');
  const [showAddFile, setShowAddFile] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);

  // Helper to format "x day ago"
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
  };

  // Handle file add from modal
  const handleFileAdd = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFiles(prev => [
        ...prev,
        { name: file.name, url, date: new Date() }
      ]);
    }
  };

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isStaticBackdrop={true}>
      {/* Custom Modal Header */}
      <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <h5 className="modal-title">Inventory Info</h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        />
      </div>
      {/* Custom Tabs */}
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
              borderBottom: activeTab === 'files' ? '3px solid #1976d2' : 'none',
              color: activeTab === 'files' ? '#1976d2' : '#6c757d',
              fontWeight: 500,
            }}
            onClick={() => setActiveTab('files')}
          >
            Files
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
      <ModalBody>
        {activeTab === 'overview' && (
          <div>
            <div className="mb-3">
              <div><strong>Date</strong>: {item.date || '--'}</div>
              <div><strong>Reason</strong>: {item.reason || '--'}</div>
              <div><strong>Mode Of adjustment</strong>: {item.mode || '--'}</div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Item name</th>
                  <th>Quantity on hand</th>
                  <th>Quantity adjusted</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {item.selectedProduct === 'Product 1'
                      ? 'laptop'
                      : item.selectedProduct === 'Product 2'
                      ? 'desktop'
                      : '--'}
                  </td>
                  <td>
                    {item.selectedProduct === 'Product 1'
                      ? item.product1OnHand
                      : item.selectedProduct === 'Product 2'
                      ? item.product2OnHand
                      : '--'}
                  </td>
                  <td>
                    {item.selectedProduct === 'Product 1'
                      ? 10 - Number(item.product1OnHand || 0)
                      : item.selectedProduct === 'Product 2'
                      ? 20 - Number(item.product2OnHand || 0)
                      : '--'}
                  </td>
                  <td>{item.description || '--'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'files' && (
          <div style={{ background: '#f6f8fa', borderRadius: 8, padding: 16 }}>
            <Button
              icon="Add"
              color="primary"
              isLight
              onClick={() => setShowAddFile(true)}
              style={{ minWidth: 120, marginBottom: 12 }}
            >
              Add Files
            </Button>
            <table className="table mt-3" style={{ background: '#fff', borderRadius: 6 }}>
              <thead>
                <tr>
                  <th style={{ width: '60%' }}>File name</th>
                  <th style={{ width: '20%' }}>Date</th>
                  <th style={{ width: '20%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ background: '#ececec', textAlign: 'center', height: 120 }}>
                      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: 120 }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="No file" style={{ width: 32, opacity: 0.4 }} />
                        <div style={{ color: '#8a94a6', marginTop: 8 }}>- No file uploaded. -</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  files.map((file, idx) => (
                    <tr key={idx}>
                      <td>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                      </td>
                      <td>{timeAgo(file.date)}</td>
                      <td>
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={() => window.open(file.url, '_blank')}
                          style={{ marginRight: 8 }}
                        >
                          View
                        </Button>
                        {/* Add more actions here if needed */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            {/* History tab content */}
            <div>No history available.</div>
          </div>
        )}
      </ModalBody>
      <AddFileModal
        isOpen={showAddFile}
        setIsOpen={setShowAddFile}
        onFileAdd={handleFileAdd}
      />
    </Modal>
  );
};

export default ViewInventoryModal;