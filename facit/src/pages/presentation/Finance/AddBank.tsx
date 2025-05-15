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
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface IAddBankModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddBank: (newBank: any) => void;
}

const AddBank: FC<IAddBankModalProps> = ({ isOpen, setIsOpen, onAddBank }) => {
  const formik = useFormik({
    initialValues: {
      type: 'Bank',
      bankName: '',
      accountHolderName: '',
      accountNumber: '',
      accountType: 'Saving',
      currency: 'INR',
      contactNumber: '',
      openingBalance: '',
      status: '',
      cashLocation: '',
    },
    onSubmit: (values) => {
      onAddBank(values);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>Added Successfully</span>
        </span>,
        `Account of type "${values.type}" added successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl'>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id='add-bank-title'>Add Bank Account</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup label="Type" className="col-md-12">
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="type-bank"
                  name="type"
                  value="Bank"
                  checked={formik.values.type === "Bank"}
                  onChange={formik.handleChange}
                  className="form-check-input"
                />
                <label htmlFor="type-bank" className="form-check-label">
                  Bank
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="type-cash"
                  name="type"
                  value="Cash"
                  checked={formik.values.type === "Cash"}
                  onChange={formik.handleChange}
                  className="form-check-input"
                />
                <label htmlFor="type-cash" className="form-check-label">
                  Cash
                </label>
              </div>
            </div>
          </FormGroup>

          {formik.values.type === 'Bank' && (
            <>
              <FormGroup label='Bank Name *' className='col-md-4'>
                <Input
                  name='bankName'
                  placeholder='e.g. Federal Bank'
                  onChange={formik.handleChange}
                  value={formik.values.bankName}
                  required
                />
              </FormGroup>

             

              <FormGroup label='Account Number *' className='col-md-4'>
                <Input
                  name='accountNumber'
                  placeholder='e.g. 123456789'
                  onChange={formik.handleChange}
                  value={formik.values.accountNumber}
                
                />
              </FormGroup>

              <FormGroup label='Account Type' className='col-md-4'>
                <Select
                  name='accountType'
                  onChange={formik.handleChange}
                  value={formik.values.accountType}
                  ariaLabel='Account Type'
                >
                  <option value='Saving'>Saving</option>
                  <option value='Current'>Current</option>
                  <option value='Other'>Other</option>
                </Select>
              </FormGroup>

             

            </>
          )}

          {/* Common Fields */}
          
          <FormGroup label='Account Holder Name *' className='col-md-4'>
                <Input
                  name='accountHolderName'
                  placeholder='e.g. John Doe'
                  onChange={formik.handleChange}
                  value={formik.values.accountHolderName}
                />
              </FormGroup>
              <FormGroup label='Currency *' className='col-md-4'>
                <Select
                  name='currency'
                  onChange={formik.handleChange}
                  value={formik.values.currency}
                  ariaLabel='Currency'
                >
                  <option value='INR'>INR (₹)</option>
                  <option value='USD'>USD ($)</option>
                  <option value='EUR'>EUR (€)</option>
                </Select>
              </FormGroup>
              
              <FormGroup label='Contact Number *' className='col-md-4'>
                <Input
                  name='contactNumber'
                  placeholder='e.g. 1234567890'
                  onChange={formik.handleChange}
                  value={formik.values.contactNumber}
                />
              </FormGroup>
          <FormGroup label='Opening Balance *' className='col-md-6'>
            <Input
              name='openingBalance'
              placeholder='e.g. 10000'
              onChange={formik.handleChange}
              value={formik.values.openingBalance}
              type='number'
            />
          </FormGroup>

          <FormGroup label='Status *' className='col-md-6'>
            <Select
              name='status'
              onChange={formik.handleChange}
              value={formik.values.status}
              ariaLabel='Status'
            >
              <option value=''>--</option>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </Select>
          </FormGroup>

          {/* Extra field for Cash */}
          
          {formik.values.type === 'Cash' && (
            <FormGroup label='Cash Location' className='col-md-6'>
              <Input
                name='cashLocation'
                placeholder='e.g. Office safe'
                onChange={formik.handleChange}
                value={formik.values.cashLocation}
              />
            </FormGroup>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={formik.handleSubmit}>
          <Icon icon='Check' className='me-1' /> Save
        </Button>
        <Button color='link' onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBank;
