import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';

interface AddFileModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFileAdd?: (file: File | null) => void;
}

const AddFileModal: React.FC<AddFileModalProps> = ({ isOpen, setIsOpen, onFileAdd }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    if (onFileAdd) onFileAdd(selectedFile);
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop>
      <div className="modal-header">
        <h5 className="modal-title">Add Files</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="file-upload-input">
              Add Files <span style={{ color: 'red' }}>*</span>
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
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <input
                id="file-upload-input"
                type="file"
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!selectedFile}
              onClick={handleSave}
            >
              <span style={{ fontWeight: 500 }}>✓ Save</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddFileModal;