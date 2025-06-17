/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
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

interface IAddDepartmentModalProps {
  id?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddDepartment: (newDept: { name: string; parentDepartment?: string }) => void;
}

const AddDepartmentModal: FC<IAddDepartmentModalProps> = ({ isOpen, setIsOpen, onAddDepartment }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      parentDepartment: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/departments/departments',
          {
            name: values.name,
            parent: values.parentDepartment || null,
          },
          {
            headers: {
              'Authorization': 'Bearer 91|tjNgM2tl2RSRG0SfXztWt0qtgOK3bxefy5ZK4GK',
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
            },
          }
        );

        showNotification(
          <span className='d-flex align-items-center'>
            <Icon icon='Info' size='lg' className='me-1' />
            <span>Added Successfully</span>
          </span>,
          `Department "${values.name}" added successfully!`
        );

        onAddDepartment(values); // if needed for parent state
        formik.resetForm();
        setIsOpen(false);
      } catch (error: any) {
        console.error('Error adding department:', error);
        showNotification(
          <span className='d-flex align-items-center text-danger'>
            <Icon icon='AlertCircle' size='lg' className='me-1' />
            <span>Error</span>
          </span>,
          error?.response?.data?.message || 'Something went wrong!'
        );
      }
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id='add-department-title'>Add Department</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup id='name' label='Name *' className='col-md-6'>
            <Input
              name='name'
              placeholder='e.g. Human Resource'
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup id='parentDepartment' label='Parent' className='col-md-6'>
            <Select
              name='parentDepartment'
              onChange={formik.handleChange}
              value={formik.values.parentDepartment}
              ariaLabel='Parent Department'
            >
              <option value=''>--</option>
              <option value='HR Manager'>HR Manager</option>
              <option value='Finance'>Finance</option>
              <option value='Operations'>Operations</option>
            </Select>
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={formik.handleSubmit}>
          <Icon icon='Check' className='me-1' /> Save
        </Button>
        <Button color='secondary' onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddDepartmentModal;
