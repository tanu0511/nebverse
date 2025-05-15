/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { useFormik } from 'formik';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Icon from '../../../components/icon/Icon';
import { Checkbox } from '../../../stories/components/bootstrap/forms/Checks.stories';


interface IAddRecurModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddRecur: (recur: {
    itemName: string;
    currency: string;
    price: string;
    employee?: string;
    project?: string;
    bankAccount?: string;
    expenseCategory?: string;
    purchasedFrom?: string;
  }) => void;
  selectedRecur?: {
    id: number;
    itemName: string;
    currency: string;
    price: string;
    employee?: string;
    project?: string;
    bankAccount?: string;
    expenseCategory?: string;
    purchasedFrom?: string;
    billFrequency?: string;
    status?: string;
  };
}

const AddRecurr: FC<IAddRecurModalProps> = ({
  isOpen,
  setIsOpen,
  onAddRecur,
  selectedRecur,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: selectedRecur?.itemName || '',
      currency: selectedRecur?.currency || 'INR',
      price: selectedRecur?.price || '',
      employee: selectedRecur?.employee || '',
      project: selectedRecur?.project || '',
      bankAccount: selectedRecur?.bankAccount || '',
      expenseCategory: selectedRecur?.expenseCategory || '',
      purchasedFrom: selectedRecur?.purchasedFrom || '',
      billFrequency: selectedRecur?.billFrequency || 'daily',
      status: selectedRecur?.status || 'approved',
      startDate: '',
      immediateStart: false,
    },
    onSubmit: (values) => {
      onAddRecur(values);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">
          {selectedRecur ? 'Edit Recurring Expense' : 'Add Recurring Expense'}
        </h5>
      </ModalHeader>
      <ModalBody>
        <div className="row g-4">
          {/* Item Name */}
          <FormGroup label="Item Name *" className="col-md-4">
            <Input
              name="itemName"
              placeholder="e.g. Wireless Keyboard"
              onChange={formik.handleChange}
              value={formik.values.itemName}
              required
            />
          </FormGroup>

          {/* Currency */}
          <FormGroup label="Currency *" className="col-md-4">
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

          {/* Price */}
          <FormGroup label="Price *" className="col-md-4">
            <Input
              name="price"
              placeholder="e.g. 10000"
              onChange={formik.handleChange}
              value={formik.values.price}
              required
            />
          </FormGroup>

          {/* Employee */}
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

          {/* Project */}
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

          {/* Bank Account */}
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

          {/* Expense Category */}
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

          {/* Purchased From */}
          <FormGroup label="Purchased From" className="col-md-4">
            <Input
              name="purchasedFrom"
              placeholder="e.g. Acme Corporation"
              onChange={formik.handleChange}
              value={formik.values.purchasedFrom}
            />
          </FormGroup>

          {/* Bill Frequency */}
          <FormGroup label="Bill Frequency" className="col-md-4">
            <Select
              name="billFrequency"
              onChange={formik.handleChange}
              value={formik.values.billFrequency}
              ariaLabel="Bill Frequency"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="annually">Annually</option>
            </Select>
          </FormGroup>

          {/* Status */}
          <FormGroup label="Status" className="col-md-4">
            <Select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              ariaLabel="Status"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </Select>
          </FormGroup>

          {/* Start Date */}
          <FormGroup label="Start Date" className="col-md-6">
            <div className="d-flex align-items-center">
              <Input
                type="date"
                name="startDate"
                onChange={formik.handleChange}
                value={formik.values.startDate}
                className="me-3"
              />
              <Checkbox
                checked={formik.values.immediateStart}
                label="Immediate start (Expense will generate from now)"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue('immediateStart', e.target.checked)
                }
              />
            </div>
            <small className="text-muted">
              Date from which the invoice will be created
            </small>
          </FormGroup>

          {/* Description */}
          <div className="col-md-6">
            <div className="border p-3">
              <p>The expense will be generated <strong>{formik.values.billFrequency || 'Daily'}</strong></p>
              <p>First Expense will be generated on <strong>{formik.values.startDate || 'Invalid date'}</strong></p>
              <p>Next Expense Date will be <strong>Invalid date</strong></p>
              <p>And so on...</p>
            </div>
          </div>
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

export default AddRecurr;
