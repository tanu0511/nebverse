import React, { useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import EditSalaryHistoryModal from './EditSalaryHistoryModal';

interface SalaryHistoryEntry {
  date: string;
  type: string; // 'initial' | 'increment' | 'decrement'
  amount: number; // annual amount for increment/decrement, full annual for initial
  annualCTC: number;
}

interface SalaryHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: {
    name?: string;
    salaryHistory?: SalaryHistoryEntry[];
  };
  onEditHistory?: (entry: SalaryHistoryEntry, idx: number) => void;
  onDeleteHistory?: (idx: number) => void;
}

const SalaryHistoryModal: React.FC<SalaryHistoryModalProps> = ({
  isOpen,
  onClose,
  employee,
  onEditHistory,
  onDeleteHistory,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editHistoryEntry, setEditHistoryEntry] = useState<SalaryHistoryEntry | null>(null);
  const [editHistoryIndex, setEditHistoryIndex] = useState<number | null>(null);

  // Find the initial salary entry
  const initialEntry = (employee?.salaryHistory || []).find(e => e.type === 'initial');
  const incrementEntries = (employee?.salaryHistory || []).filter(e => e.type !== 'initial');

  const initialMonthly = initialEntry ? initialEntry.amount / 12 : 0;

  // Calculate total: initial + all increments - all decrements
  const total = (employee?.salaryHistory || []).reduce((sum, row) => {
    const type = row.type.toLowerCase();
    if (type === 'initial') {
      return sum + row.amount / 12;
    } else if (type === 'increment') {
      return sum + row.amount / 12;
    } else if (type === 'decrement') {
      return sum - Math.abs(row.amount / 12);
    }
    return sum;
  }, 0);

  console.log(employee?.salaryHistory);

  const handleEditHistory = (entry: SalaryHistoryEntry, idx: number) => {
    setEditHistoryEntry(entry);
    setEditHistoryIndex(idx);
    setShowEditModal(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={onClose} size="lg" isStaticBackdrop isCentered>
        <ModalHeader setIsOpen={onClose}>
          <ModalTitle id="salary-history-modal-title">View Salary History</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/* Employee Info */}
          <div className="d-flex align-items-center mb-3">
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: 48, height: 48, fontSize: 22, color: '#fff' }}
            >
              <Icon icon="Person" />
            </div>
            <div className="ms-2">
              <div className="fw-bold">{employee?.name || 'Employee'}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>Ram</div>
            </div>
          </div>
          {/* Salary History Table */}
          <table className="table table-modern table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount (Monthly)</th>
                <th>Value Type</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Initial Salary Row */}
              {initialEntry && (
                <tr>
                  <td>1</td>
                  <td>₹{initialMonthly.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>initial</td>
                  <td>{initialEntry.date}</td>
                  <td>
                    {/* No actions for initial salary */}
                  </td>
                </tr>
              )}
              {/* Increment/Decrement Rows */}
              {incrementEntries.map((row, idx) => {
                const monthly = row.amount / 12;
                return (
                  <tr key={idx + 1}>
                    <td>{idx + 2}</td>
                    <td>
                      <span style={{ color: row.type === 'increment' ? 'green' : row.type === 'decrement' ? 'red' : undefined }}>
                        {row.type === 'increment'
                          ? '+'
                          : row.type === 'decrement'
                          ? '-'
                          : ''}
                        ₹{Math.abs(monthly).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td>{row.type}</td>
                    <td>{row.date}</td>
                    <td>
                      <Button
                        color="secondary"
                        size="sm"
                        className="me-1"
                        onClick={() => handleEditHistory(row, idx + 1)}
                      >
                        <Icon icon="Edit" /> Edit
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => onDeleteHistory && onDeleteHistory(idx + 1)}
                      >
                        <Icon icon="Delete" /> Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={1}><b>Total</b></td>
                <td colSpan={4}>
                  <b>
                    ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                  </b>
                </td>
              </tr>
            </tfoot>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>Close</Button>
        </ModalFooter>
      </Modal>
      <EditSalaryHistoryModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        entry={editHistoryEntry}
        onSave={(type, amount, date) => {
          // Update the salaryHistory at editHistoryIndex
          if (employee && employee.salaryHistory && editHistoryIndex !== null) {
            const updatedHistory = [...employee.salaryHistory];
            updatedHistory[editHistoryIndex] = {
              ...updatedHistory[editHistoryIndex],
              type,
              amount,
              date,
            };
            // Optionally call a prop to update parent state
            if (onEditHistory) {
              onEditHistory(updatedHistory[editHistoryIndex], editHistoryIndex);
            }
          }
          setShowEditModal(false);
        }}
      />
    </>
  );
};

export default SalaryHistoryModal;