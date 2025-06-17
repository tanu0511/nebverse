import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import AssetTypeModal from './AssetTypeModal';

const initialAssetTypes = ['--', 'Laptop', 'Phone', 'Monitor'];

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (asset: any) => void;
};

const AddAssetModal: React.FC<Props> = ({ isOpen, setIsOpen, onSave }) => {
  const [assetTypes, setAssetTypes] = useState(initialAssetTypes);
  const [assetType, setAssetType] = useState('--');
  const [showAssetTypeModal, setShowAssetTypeModal] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');
  const [, setAssetPicture] = useState<File | null>(null);
  const [assetPicturePreview, setAssetPicturePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAssetName('');
      setSerialNumber('');
      setValue('');
      setLocation('');
      setStatus('Available');
      setDescription('');
      setAssetPicture(null);
      setAssetPicturePreview(null);
      setAssetType('--');
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAssetPicture(file);

      // Convert file to base64 for preview and saving
      const reader = new FileReader();
      reader.onloadend = () => {
        setAssetPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      assetName,
      assetType,
      serialNumber,
      value,
      location,
      status,
      description,
      assetPicture: assetPicturePreview, // Save as base64 string
    });
    setIsOpen(false);
    // Optionally reset form here
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-asset-info-title">Add Asset Info</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" htmlFor="assetNameInput">Asset Name <span className="text-danger">*</span></label>
            <Input
              id="assetNameInput"
              value={assetName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssetName(e.target.value)}
              placeholder="e.g. Laptop, iPhone, etc"
              required
            />
            {/* Serial Number just below Asset Name */}
            <div className="mt-3">
              <label className="form-label" htmlFor="serialNumberInput">Serial Number <span className="text-danger">*</span></label>
              <Input
                id="serialNumberInput"
                value={serialNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="assetTypeSelect">Asset Type <span className="text-danger">*</span></label>
            <div className="input-group">
              <select
                id="assetTypeSelect"
                className="form-select"
                value={assetType}
                onChange={e => setAssetType(e.target.value)}
                required
              >
                {assetTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Button color="light" type="button" onClick={() => setShowAssetTypeModal(true)}>
                Add
              </Button>
            </div>
            {/* Value just below Asset Type */}
            <div className="mt-3">
              <label className="form-label" htmlFor="valueInput">Value</label>
              <Input
                id="valueInput"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                placeholder="Value"
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="assetPictureInput">
              Asset Picture <i className="bi bi-question-circle" title="Upload asset image" />
            </label>
            <div className="border rounded d-flex align-items-center justify-content-center" style={{ height: 100 }}>
              <label className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer" htmlFor="assetPictureInput">
                {assetPicturePreview ? (
                  <img src={assetPicturePreview} alt="Preview" style={{ maxHeight: 80, maxWidth: '100%' }} />
                ) : (
                  <>
                    <i className="bi bi-cloud-upload" style={{ fontSize: 32 }} />
                    <span>Choose a file</span>
                  </>
                )}
                <input
                  id="assetPictureInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <label className="form-label" htmlFor="locationInput">Location</label>
            <Input
              id="locationInput"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="col-md-6 mt-3">
            <label className="form-label" htmlFor="status-Available">Status</label>
            <div>
              {['Available', 'Non Functional', 'Lost', 'Damaged', 'Under Maintenance'].map(opt => (
                <label
                  key={opt}
                  className="me-3"
                  htmlFor={`status-${opt.replace(/\s+/g, '-')}`}
                >
                  <input
                    id={`status-${opt.replace(/\s+/g, '-')}`}
                    type="radio"
                    name="status"
                    value={opt}
                    checked={status === opt}
                    onChange={() => setStatus(opt)}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <label className="form-label" htmlFor="descriptionInput">Description</label>
            <textarea
              id="descriptionInput"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter Description (optional)"
              rows={2}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>

      {/* Asset Type Add Modal */}
      <AssetTypeModal
        isOpen={showAssetTypeModal}
        setIsOpen={setShowAssetTypeModal}
        assetTypes={assetTypes}
        setAssetTypes={setAssetTypes}
        setAssetType={setAssetType}
      />
    </Modal>
  );
};

export default AddAssetModal;