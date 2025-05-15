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
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface IAddAwardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAward: (award: {
    title: string;
    icon: string;
    color: string;
    summary?: string;
  }) => void;
  selectedAward?: {
    id: number;
    title: string;
    icon: string;
    color: string;
    summary?: string;
  };
}

const AddAwardModal: FC<IAddAwardModalProps> = ({ isOpen, setIsOpen, onAddAward, selectedAward }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedAward?.title || '',
      icon: selectedAward?.icon || '',
      color: selectedAward?.color || '#FF0000',
      summary: selectedAward?.summary || '',
    },
    onSubmit: (values) => {
      onAddAward(values);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>{selectedAward ? 'Updated' : 'Added'} Successfully</span>
        </span>,
        `Award "${values.title}" ${selectedAward ? 'updated' : 'added'} successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' >
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className='modal-title'>{selectedAward ? 'Edit Award' : 'Add Award'}</h5>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup id='title' label='Title *' className='col-md-6'>
            <Input
              type='text'
              name='title'
              placeholder='e.g. Employee of the month'
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </FormGroup>

          <FormGroup id='icon' label='Choose Icon *' className='col-md-6'>
            <Select
              name='icon'
              value={formik.values.icon}
              onChange={formik.handleChange}
              ariaLabel='Choose Icon'
            >
              <option value=''>--</option>
              <option value='trophy'>🏆 Trophy</option>
              <option value='star'>⭐ Star</option>
              <option value='medal'>🎖️ Medal</option>
            </Select>
          </FormGroup>

          <FormGroup id='color' label='Color Code *' className='col-md-6'>
            <Input
              type='color'
              name='color'
              value={formik.values.color}
              onChange={formik.handleChange}
            />
          </FormGroup>

          <FormGroup id='summary' label='Summary' className='col-12'>
            <textarea
              className='form-control'
              name='summary'
              rows={3}
              value={formik.values.summary}
              onChange={formik.handleChange}
              placeholder='Write a brief description...'
            />
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={formik.handleSubmit}>
          <Icon icon='Check' className='me-1' /> Save
        </Button>
        <Button color='link' onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddAwardModal;
