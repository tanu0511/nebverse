/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface IAddNoticeModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNotice: (notice: {
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
    recipientType?: string;
    selectedEmployee?: string;
    selectedClient?: string;
  }) => void;
  selectedNotice?: {
    id: number;
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
    recipientType?: string;
    selectedEmployee?: string;
    selectedClient?: string;
  };
}

const AddNotice: FC<IAddNoticeModalProps> = ({
  isOpen,
  setIsOpen,
  onAddNotice,
  selectedNotice,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedNotice?.name || '',
      parentDepartment: selectedNotice?.parentDepartment || '',
      date: selectedNotice?.date || dayjs().format('YYYY-MM-DD'),
      summary: selectedNotice?.summary || '',
      recipientType: selectedNotice?.recipientType || 'Employees',
      selectedEmployee: selectedNotice?.selectedEmployee || '',
      selectedClient: selectedNotice?.selectedClient || '',
    },
    onSubmit: (values) => {
      onAddNotice(values);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>{selectedNotice ? 'Updated' : 'Added'} Successfully</span>
        </span>,
        `Notice "${values.name}" ${selectedNotice ? 'updated' : 'added'} successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className='modal-title'>{selectedNotice ? 'Edit Notice' : 'Add Notice'}</h5>
      </ModalHeader> 
      <ModalBody>
        {/* Send Notice To */}
        <div className='mb-3'>
          <label className='form-label d-block fw-bold'>Send Notice</label>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='recipientType'
              id='toEmployees'
              value='Employees'
              onChange={formik.handleChange}
              checked={formik.values.recipientType === 'Employees'}
            />
            <label className='form-check-label' htmlFor='toEmployees'>
              To Employees
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='recipientType'
              id='toClients'
              value='Clients'
              onChange={formik.handleChange}
              checked={formik.values.recipientType === 'Clients'}
            />
            <label className='form-check-label' htmlFor='toClients'>
              To Clients
            </label>
          </div>
        </div>

        {/* Conditional Fields */}
        <div className='row g-4'>
          <FormGroup id='name' label='Title *' className='col-md-4'>
            <Input
              name='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder='Notice Title'
            />
          </FormGroup>

          {/* Show Department only for Employees */}
          {formik.values.recipientType === 'Employees' && (
            <FormGroup id='parentDepartment' label='Department *' className='col-md-4'>
              <Select
                name='parentDepartment'
                onChange={formik.handleChange}
                value={formik.values.parentDepartment}
                ariaLabel='To Department'
              >
                <option value=''>--</option>
                <option value='HR'>HR</option>
                <option value='Sales'>Sales</option>
                <option value='All Employees'>All Employees</option>
              </Select>
            </FormGroup>
          )}

          {/* Show Client dropdown if recipient is Client */}
          {formik.values.recipientType === 'Clients' && (
            <FormGroup id='selectedClient' label='Select Client *' className='col-md-4'>
              <Select
                name='selectedClient'
                onChange={formik.handleChange}
                value={formik.values.selectedClient}
                ariaLabel='Select a client'
              >
                <option value=''>-- Select Client --</option>
                <option value='Acme Corp'>Acme Corp</option>
                <option value='Globex Ltd'>Globex Ltd</option>
                <option value='Techno Solutions'>Techno Solutions</option>
              </Select>
            </FormGroup>
          )}

          <FormGroup id='date' label='Date *' className='col-md-4'>
            <Input
              type='date'
              name='date'
              onChange={formik.handleChange}
              value={formik.values.date}
            />
          </FormGroup>

          {/* Select Employee if sending to Employees */}
          {formik.values.recipientType === 'Employees' && (
            <FormGroup id='selectedEmployee' label='Select Employee *' className='col-md-6'>
              <Select
                name='selectedEmployee'
                onChange={formik.handleChange}
                value={formik.values.selectedEmployee}
                ariaLabel='Select an employee'
              >
                <option value=''>-- Select Employee --</option>
                <option value='John Doe'>John Doe</option>
                <option value='Jane Smith'>Jane Smith</option>
                <option value='Ravi Kumar'>Ravi Kumar</option>
                <option value='Priya Sharma'>Priya Sharma</option>
              </Select>
            </FormGroup>
          )}

          <FormGroup id='summary' label='Notice Details' className='col-12'>
            <textarea
              className='form-control'
              name='summary'
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.summary}
              placeholder='Write notice details here...'
            />
          </FormGroup>
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

export default AddNotice;
