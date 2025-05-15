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

interface IAddDepartmentModalProps {
  id?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddDesignation: (newDesig: { name: string; parentDepartment?: string }) => void;
  selectedDesignation?: { name: string; parentDepartment?: string };
}

const AddDesignation: FC<IAddDepartmentModalProps> = ({
  isOpen,
  setIsOpen,
  onAddDesignation,
  selectedDesignation,
}) => {
  const formik = useFormik({
    initialValues: {
      name: selectedDesignation?.name || '',
      parentDepartment: selectedDesignation?.parentDepartment || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddDesignation(values);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>Added Successfully</span>
        </span>,
        `Designation "${values.name}" saved successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id='add-department-title'>Add Designation</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup id='name' label='Name *' className='col-md-6'>
            <Input
              name='name'
              placeholder='Team Lead'
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup id='parentDepartment' label='Parent' className='col-md-6'>
            <Select
              name='parentDepartment'
              onChange={formik.handleChange}
              value={formik.values.parentDepartment}
              ariaLabel='Parent Designation'
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

export default AddDesignation;
