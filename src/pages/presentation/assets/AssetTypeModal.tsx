import React, { useState } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  assetTypes: string[];
  setAssetTypes: (types: string[]) => void;
  setAssetType: (type: string) => void;
};

const AssetTypeModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  assetTypes,
  setAssetTypes,
  setAssetType,
}) => {
  const [assetTypeInput, setAssetTypeInput] = useState('');

  const handleAdd = () => {
    if (
      assetTypeInput &&
      !assetTypes.includes(assetTypeInput) &&
      assetTypeInput !== '--'
    ) {
      setAssetTypes([...assetTypes, assetTypeInput]);
      setAssetType(assetTypeInput);
      setAssetTypeInput('');
    }
  };

  const handleDelete = (type: string) => {
    setAssetTypes(assetTypes.filter((t) => t !== type));
    setAssetType('--');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="asset-type-modal-title">Asset Type</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Name</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {assetTypes.filter((t) => t !== '--').length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  No asset types
                </td>
              </tr>
            ) : (
              assetTypes
                .filter((t) => t !== '--')
                .map((type, idx) => (
                  <tr key={type}>
                    <td>{idx + 1}</td>
                    <td>{type}</td>
                    <td>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(type)}
                      >
                        <i className="bi bi-trash" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <div className="mb-2">
          <label className="form-label" htmlFor="assetTypeInput">
            Name <span className="text-danger">*</span>
          </label>
          <Input
            id="assetTypeInput"
            value={assetTypeInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAssetTypeInput(e.target.value)
            }
            placeholder="Name"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={handleAdd}>
          <i className="bi bi-check-lg me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AssetTypeModal;