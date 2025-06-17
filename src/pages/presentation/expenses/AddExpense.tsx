import React, { FC } from 'react';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface IAddExpenseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddExpense: (newExpense: any) => void;
  expenseToUpdate: ExpenseItem | null;
  onUpdateExpense: (updatedExpense: ExpenseItem) => void;
}

interface ExpenseItem {
  id: number;
  itemName: string;
  price?: string;
  employee?: string;
  purchasedFrom?: string;
  purchaseDate?: string;
  status?: string;
  paymentMethod?: string;
  notes?: string;
  category?: string;
  currency?: string;
}

const AddExpense: FC<IAddExpenseModalProps> = ({
  isOpen,
  setIsOpen,
  onAddExpense,
  expenseToUpdate,
  onUpdateExpense,
}) => {
  const formik = useFormik({
    enableReinitialize: true, // <-- This is important!
    initialValues: {
      itemName: expenseToUpdate?.itemName || '',
      currency: expenseToUpdate?.currency || 'INR',
      exchangeRate: '1',
      price: expenseToUpdate?.price || '',
      purchaseDate: expenseToUpdate?.purchaseDate || '',
      employee: expenseToUpdate?.employee || '',
      project: '',
      expenseCategory: expenseToUpdate?.category || '',
      purchasedFrom: expenseToUpdate?.purchasedFrom || '',
      bankAccount: expenseToUpdate?.paymentMethod || '',
      status: expenseToUpdate?.status || '',
      summary: expenseToUpdate?.notes || '',
    },
    onSubmit: (values, { resetForm }) => {
      const expense: ExpenseItem = {
        id: expenseToUpdate ? expenseToUpdate.id : Date.now(),
        itemName: values.itemName,
        price: values.price,
        employee: values.employee,
        purchasedFrom: values.purchasedFrom,
        purchaseDate: values.purchaseDate,
        status: values.status,
        paymentMethod: values.bankAccount,
        notes: values.summary,
        category: values.expenseCategory,
      };

      if (expenseToUpdate) {
        onUpdateExpense(expense);
        showNotification('Expense updated successfully!', 'success');
      } else {
        onAddExpense(expense);
        showNotification('Expense added successfully!', 'success');
      }

      resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-expense-title">
          {expenseToUpdate ? 'Edit Expense' : 'Add Expense'}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="row g-4">
          <FormGroup label="Item Name *" className="col-md-3">
            <Input
              name="itemName"
              placeholder="e.g. Wireless Keyboard"
              onChange={formik.handleChange}
              value={formik.values.itemName}
              required
            />
          </FormGroup>

          <FormGroup label="Currency *" className="col-md-3">
            <Select
              name="currency"
              onChange={formik.handleChange}
              value={formik.values.currency}
              ariaLabel="Currency"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </Select>
          </FormGroup>

          <FormGroup label="Exchange Rate *" className="col-md-3">
            <Input
              name="exchangeRate"
              type="number"
              value={formik.values.exchangeRate}
              onChange={formik.handleChange}
              disabled
            />
          </FormGroup>

          <FormGroup label="Price *" className="col-md-3">
            <Input
              name="price"
              placeholder="e.g. 10000"
              onChange={formik.handleChange}
              value={formik.values.price}
              required
            />
          </FormGroup>

          <FormGroup label="Purchase Date *" className="col-md-4">
            <Input
              name="purchaseDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.purchaseDate}
              required
            />
          </FormGroup>

          <FormGroup label="Employee" className="col-md-4">
            <Select
              name="employee"
              onChange={formik.handleChange}
              value={formik.values.employee}
              ariaLabel="Employee"
            >
              <option value="">--</option>
              <option value="emp1">Employee 1</option>
              <option value="emp2">Employee 2</option>
            </Select>
          </FormGroup>

          <FormGroup label="Project" className="col-md-4">
            <Select
              name="project"
              onChange={formik.handleChange}
              value={formik.values.project}
              ariaLabel="Project"
            >
              <option value="">--</option>
              <option value="proj1">Project 1</option>
              <option value="proj2">Project 2</option>
            </Select>
          </FormGroup>

          <FormGroup label="Expense Category" className="col-md-4">
            <Select
              name="expenseCategory"
              onChange={formik.handleChange}
              value={formik.values.expenseCategory}
              ariaLabel="Expense Category"
            >
              <option value="">--</option>
              <option value="office">Office Supplies</option>
              <option value="travel">Travel</option>
            </Select>
          </FormGroup>

          <FormGroup label="Purchased From" className="col-md-4">
            <Input
              name="purchasedFrom"
              placeholder="e.g. Acme Corporation"
              onChange={formik.handleChange}
              value={formik.values.purchasedFrom}
            />
          </FormGroup>

          <FormGroup label="Bank Account" className="col-md-4">
            <Select
              name="bankAccount"
              onChange={formik.handleChange}
              value={formik.values.bankAccount}
              ariaLabel="Bank Account"
            >
              <option value="">--</option>
              <option value="account1">Account 1</option>
              <option value="account2">Account 2</option>
            </Select>
          </FormGroup>

          <FormGroup label="Status" className="col-md-4">
            <Select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              ariaLabel="Status"
            >
              <option value="">--</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </FormGroup>

          <FormGroup id="summary" label="Description" className="col-12">
            <textarea
              className="form-control"
              name="summary"
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.summary}
              placeholder="Write details here..."
            />
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={formik.handleSubmit}>
          <Icon icon="Check" className="me-1" /> Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddExpense;
