import React from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  asset: any;
};

const statusColor = (status: string) => {
  switch (status) {
    case 'Available': return '#2ecc40';
    case 'Lent': return '#ffb300';
    case 'Lost': return '#ffc107';
    case 'Damaged': return '#ff69b4';
    case 'Non Functional': return '#e53935';
    case 'Under Maintenance': return '#343a40';
    default: return '#adb5bd';
  }
};

const ViewAssetModal: React.FC<Props> = ({ isOpen, setIsOpen, asset }) => {
  if (!asset) return null;

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : '--';

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="view-asset-modal-title">Asset Info</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row mb-4">
          <div className="col-md-8">
            <div><b>Asset Name</b>: {asset.assetName || '--'}</div>
            <div><b>Asset Type</b>: {asset.assetType || '--'}</div>
            <div>
              <b>Status</b>:
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    marginRight: 6,
                    background: statusColor(asset.status),
                  }}
                />
                {asset.status || '--'}
              </span>
            </div>
            <div><b>Serial Number</b>: {asset.serialNumber || '--'}</div>
            <div><b>Value</b>: {asset.value || '--'}</div>
            <div><b>Location</b>: {asset.location || '--'}</div>
          </div>
          <div className="col-md-4 text-end">
            {asset.assetPicture && (
              <img src={asset.assetPicture} alt="Asset" style={{ maxWidth: 250, maxHeight: 180, objectFit: 'contain' }} />
            )}
          </div>
        </div>
        <h5 className="mb-3">History</h5>
        <div className="row">
          <div className="col-md-12">
            <div><b>Lent To</b>: {asset.lentTo ? <><i className="bi bi-person-circle me-2" />{asset.lentTo}</> : '--'}</div>
            <div><b>Date Given</b>: {formatDate(asset.startOn)}</div>
            <div><b>Estimated Date of Return</b>: {formatDate(asset.estimatedReturn)}</div>
            <div><b>Date Of Return</b>: {formatDate(asset.returnDate)}</div>
            <div><b>Returned By</b>: --</div>
            <div><b>Notes</b>: {asset.notes || '--'}</div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewAssetModal;