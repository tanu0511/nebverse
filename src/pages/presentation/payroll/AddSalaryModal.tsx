import React, { FC } from 'react';
import { useFormik } from 'formik';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface AddSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  employeeName: string;
  initialValues?: any; // <-- Make sure this is present!
}

const AddSalaryModal: FC<AddSalaryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employeeName,
  initialValues,
}) => {
  const formik = useFormik({
    enableReinitialize: true, // <-- This is important!
    initialValues: initialValues || {
      annualCTC: '',
      basicPercent: '50',
      basicType: '% of CTC',
      basicFixed: '',
    },
    validate: (values) => {
      const errors: { annualCTC?: string; basicFixed?: string } = {};
      if (!values.annualCTC) {
        errors.annualCTC = 'Annual CTC is required';
      } else if (isNaN(Number(values.annualCTC))) {
        errors.annualCTC = 'Annual CTC must be a valid number';
      }
      if (values.basicType === 'Fixed' && (!values.basicFixed || isNaN(Number(values.basicFixed)))) {
        errors.basicFixed = 'Enter valid fixed amount';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      onClose();
      resetForm(); // <-- This will clear the form after saving
    },
  });

  if (!isOpen) return null;

  const annualCTC = parseFloat(formik.values.annualCTC) || 0;
  const basicPercent = parseFloat(formik.values.basicPercent) || 0;
  const basicType = formik.values.basicType;
  const basicFixed = parseFloat(formik.values.basicFixed) || 0;

  // Calculation logic
  let basicAnnual = 0;
  let basicMonthly = 0;
  if (basicType === '% of CTC') {
    basicAnnual = (annualCTC * basicPercent) / 100;
    basicMonthly = basicAnnual / 12;
  } else {
    basicMonthly = basicFixed;
    basicAnnual = basicMonthly * 12;
  }
  const specialAllowanceAnnual = annualCTC - basicAnnual;
  const specialAllowanceMonthly = specialAllowanceAnnual / 12;

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} isCentered size="xl">
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="employee-modal-title">Add Salary</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {/* Employee Info and CTC Input */}
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: 48, height: 48, fontSize: 22, color: '#fff' }}
            >
              <Icon icon="Person" />
            </div>
            <div className="ms-2">
              <div className="fw-bold">{employeeName}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>Ram</div>
            </div>
          </div>
          <div className="flex-grow-1" />
          <div style={{ minWidth: 320 }}>
            <FormGroup label="Annual CTC">
              <span className="text-danger">*</span>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <Input
                  name="annualCTC"
                  placeholder="Enter Annual CTC"
                  type="number"
                  value={formik.values.annualCTC}
                  onChange={formik.handleChange}
                  min={0}
                />
              </div>
              <small className="text-muted">
                (Cost to company value for the whole year.)
              </small>
              {typeof formik.errors.annualCTC === 'string' ? (
                <div className="text-danger">{formik.errors.annualCTC}</div>
              ) : <></>}
            </FormGroup>
          </div>
        </div>

        {/* Table Header */}
        <div className="row fw-semibold text-muted border-bottom pb-2 mb-2 mt-4">
          <div className="col-md-4">Salary Component</div>
          <div className="col-md-3">Calculation Type</div>
          <div className="col-md-2">Monthly Amount</div>
          <div className="col-md-3">Annual Amount</div>
        </div>

        {/* Earnings Section */}
        <div className="pt-2">
          <h6 className="fw-bold mb-3">Earnings</h6>
          {/* Basic Salary Row */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4">Basic Salary</div>
            <div className="col-md-3 d-flex">
              {basicType === '% of CTC' ? (
                <Input
                  name="basicPercent"
                  type="number"
                  value={formik.values.basicPercent}
                  onChange={formik.handleChange}
                  className="me-2"
                  min={0}
                  max={100}
                  style={{ width: 60 }}
                />
              ) : (
                <Input
                  name="basicFixed"
                  type="number"
                  value={formik.values.basicFixed}
                  onChange={formik.handleChange}
                  className="me-2"
                  min={0}
                  style={{ width: 100 }}
                />
              )}
              <select
                className="form-select"
                name="basicType"
                value={basicType}
                onChange={formik.handleChange}
                style={{ width: 110 }}
              >
                <option value="Fixed">Fixed</option>
                <option value="% of CTC">% of CTC</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <Input value={basicMonthly.toFixed(2)} disabled />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <Input value={basicAnnual.toFixed(2)} disabled />
              </div>
              {basicType === 'Fixed' && typeof formik.errors.basicFixed === 'string' && (
                <div className="text-danger">{formik.errors.basicFixed}</div>
              )}
            </div>
          </div>
          {/* Special Allowance Row */}
          <div className="row align-items-center mb-4">
            <div className="col-md-4 d-flex align-items-center">
              Special Allowance
              <i
                className="bi bi-question-circle ms-1 text-muted"
                title="Annual CTC - Sum of all other components"
              />
            </div>
            <div className="col-md-3 text-muted">Special Allowance</div>
            <div className="col-md-2">
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <Input value={specialAllowanceMonthly.toFixed(2)} disabled />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <Input value={specialAllowanceAnnual.toFixed(2)} disabled />
              </div>
            </div>
          </div>
        </div>

        {/* CTC Summary */}
        <div className="bg-light rounded p-3 mb-3">
          <h6 className="fw-bold mb-2">Cost To Company</h6>
          <div className="d-flex justify-content-between fw-semibold">
            <div>₹ {(annualCTC ? (annualCTC / 12).toFixed(2) : '0.00')}</div>
            <div>₹ {annualCTC ? annualCTC.toFixed(2) : '0.00'}</div>
          </div>
        </div>

        {/* Deductions */}
        <div className="bg-light rounded p-3 mb-4">
          <h6 className="fw-bold mb-2">Total Deductions</h6>
          <div className="d-flex justify-content-between fw-semibold">
            <div>₹ 0.00</div>
            <div>₹ 0.00</div>
          </div>
        </div>

        {/* Footer */}
        <ModalFooter>
          <Button type="submit" color="primary" onClick={formik.submitForm}>
            <Icon icon="Check" className="me-1" />
            Save
          </Button>
          <Button color="link" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default AddSalaryModal;
