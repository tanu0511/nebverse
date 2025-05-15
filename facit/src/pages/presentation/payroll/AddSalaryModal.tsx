/* eslint-disable prettier/prettier */

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
}

const AddSalaryModal: FC<AddSalaryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employeeName,
}) => {
  const formik = useFormik({
    initialValues: {
      annualCTC: '',
      basicPercent: '50',
    },
    validate: (values) => {
      const errors: { annualCTC?: string } = {};
      if (!values.annualCTC) {
        errors.annualCTC = 'Annual CTC is required';
      } else if (isNaN(Number(values.annualCTC))) {
        errors.annualCTC = 'Annual CTC must be a valid number';
      }
      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  if (!isOpen) return null;

  const annualCTC = parseFloat(formik.values.annualCTC) || 0;
  const basicPercent = parseFloat(formik.values.basicPercent) || 0;
  const basicAnnual = (annualCTC * basicPercent) / 100;
  const basicMonthly = basicAnnual / 12;
  const specialAnnual = annualCTC - basicAnnual;
  const specialMonthly = specialAnnual / 12;

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} isCentered size='lg'>
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="employee-modal-title">{employeeName}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup label='Annual CTC'><span className="text-danger">*</span>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <Input
                name='annualCTC'
                placeholder='Enter Annual CTC'
                type='number'
                value={formik.values.annualCTC}
                onChange={formik.handleChange}
              />
            </div>
            <small className='text-muted'>
              (Cost to company value for the whole year.)
            </small>
          </FormGroup>

          {/* Earnings Breakdown */}
          <div className='border-top pt-3'>
            <h6 className='fw-bold mb-3'>Earnings</h6>
            <div className='row fw-semibold text-muted border-bottom pb-2 mb-2'>
              <div className='col-md-4'>Salary Component</div>
              <div className='col-md-3'>Calculation Type</div>
              <div className='col-md-2'>Monthly Amount</div>
              <div className='col-md-3'>Annual Amount</div>
            </div>

            {/* Basic Salary Row */}
            <div className='row align-items-center mb-3'>
              <div className='col-md-4'>Basic Salary</div>
              <div className='col-md-3 d-flex'>
                <Input
                  name='basicPercent'
                  type='number'
                  value={formik.values.basicPercent}
                  onChange={formik.handleChange}
                  className='me-2'
                />
                <select className='form-select' disabled>
                  <option>% of CTC</option>
                </select>
              </div>
              <div className='col-md-2'>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <Input value={basicMonthly.toFixed(2)} disabled />
                </div>
              </div>
              <div className='col-md-3'>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <Input value={basicAnnual.toFixed(2)} disabled />
                </div>
              </div>
            </div>

            {/* Special Allowance Row */}
            <div className='row align-items-center mb-4'>
              <div className='col-md-4 d-flex align-items-center'>
                Special Allowance
                <i
                  className='bi bi-question-circle ms-1 text-muted'
                  title='Annual CTC - Sum of all other components'
                />
              </div>
              <div className='col-md-3 text-muted'>Special Allowance</div>
              <div className='col-md-2'>
                <div className="input-group">
                  <span className="input-group-text">₹ 0.00</span>
                </div>
              </div>
              <div className='col-md-3'>
                <div className="input-group">
                  <span className="input-group-text">₹ 0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTC Summary */}
          <div className='bg-light rounded p-3 mb-3'>
            <h6 className='fw-bold mb-2'>Cost To Company</h6>
            <div className='d-flex justify-content-between fw-semibold'>
              <div>₹ {(annualCTC / 12).toFixed(2)}</div>
              <div>₹ {annualCTC.toFixed(2)}</div>
            </div>
          </div>

          {/* Deductions */}
          <div className='bg-light rounded p-3 mb-4'>
            <h6 className='fw-bold mb-2'>Total Deductions</h6>
            <div className='d-flex justify-content-between fw-semibold'>
              <div>₹ 0.00</div>
              <div>₹ 0.00</div>
            </div>
          </div>

          {/* Footer */}
          <ModalFooter>
            <Button type='submit' color='primary'>
              <Icon icon='Check' className='me-1' />
              Save
            </Button>
            <Button color='link' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddSalaryModal;
