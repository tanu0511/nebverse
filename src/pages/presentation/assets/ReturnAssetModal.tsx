import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  asset: any;
  onSave: (data: { returnDate: string; notes: string }) => void;
};

const ReturnAssetModal: React.FC<Props> = ({ isOpen, setIsOpen, asset, onSave }) => {
  const [returnDate, setReturnDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!asset) return null;

  // Helper for formatting date and calculating weeks
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getWeeksDiff = (from?: string, to?: string) => {
    if (!from || !to) return '';
    const diff = (new Date(from).getTime() - new Date(to).getTime()) / (1000 * 60 * 60 * 24 * 7);
    const weeks = Math.abs(Math.round(diff));
    return `${weeks} week${weeks !== 1 ? 's' : ''} before`;
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="return-asset-modal-title">Return Asset</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row mb-3">
          <div className="col-md-6 d-flex align-items-center">
            <i className="bi bi-person-circle me-2" style={{ fontSize: 32 }} />
            <div>
              <div><b>{asset.lentTo || '-'}</b></div>
            </div>
          </div>
          <div className="col-md-6">
            <div><b>Date Given</b></div>
            <div>
              {formatDate(asset.startOn)}{' '}
              <span className="text-muted">{getWeeksDiff(asset.startOn, asset.estimatedReturn)}</span>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div><b>Estimated Date of Return</b></div>
            <div>
              {formatDate(asset.estimatedReturn)}{' '}
              <span className="text-muted">{getWeeksDiff(asset.estimatedReturn, asset.startOn)}</span>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="return-asset-date"><b>Date Of Return</b> <span className="text-danger">*</span></label>
            <Input
              id="return-asset-date"
              type="date"
              value={returnDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReturnDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label" htmlFor="return-asset-notes">Notes</label>
            <textarea
              id="return-asset-notes"
              className="form-control"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notes"
              rows={2}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" isLight onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={() => { onSave({ returnDate, notes }); setIsOpen(false); }}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReturnAssetModal;