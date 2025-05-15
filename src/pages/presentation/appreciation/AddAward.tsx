/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import AddAwardModal from './AddAwardModal';

interface IAddAwardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAward: (award: {
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
  }) => void;
  selectedAward?: {
    id: number;
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
  };
}

const AddAward: FC<IAddAwardModalProps> = ({ isOpen, setIsOpen, onAddAward, selectedAward }) => {
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awardOptions, setAwardOptions] = useState<string[]>([
    'Employee of the Month',
    'Best Performer',
    'Team Player',
  ]);
  const [givenToOptions, setGivenToOptions] = useState<string[]>(['John', 'Sam', 'David']);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedAward?.name || '',
      parentDepartment: selectedAward?.parentDepartment || '',
      date: selectedAward?.date || dayjs().format('YYYY-MM-DD'),
      summary: selectedAward?.summary || '',
    },
    onSubmit: (values) => {
      onAddAward(values);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>{selectedAward ? 'Updated' : 'Added'} Successfully</span>
        </span>,
        `Award "${values.name}" ${selectedAward ? 'updated' : 'added'} successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  const handleNewAward = (award: { title: string }) => {
    if (!awardOptions.includes(award.title)) {
      setAwardOptions((prev) => [...prev, award.title]);
    }
    setIsAwardModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop={true}>
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className='modal-title'>{selectedAward ? 'Edit Appreciation' : 'Add Appreciation'}</h5>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup id="name" label="Award *" className="col-md-4">
            <div className="input-group">
              <Select
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                ariaLabel="Award"
                className="form-select"
              >
                <option value="">--</option>
                {awardOptions.map((award, index) => (
                  <option key={index} value={award}>{award}</option>
                ))}
              </Select>
              <Button
                type="button"
                color="light"
                className="input-group-text"
                onClick={() => setIsAwardModalOpen(true)}
              >
                Add
              </Button>
            </div>
          </FormGroup>

          <FormGroup id='parentDepartment' label='Given to *' className='col-md-4'>
            <div className="input-group">
              <Select
                name='parentDepartment'
                onChange={formik.handleChange}
                value={formik.values.parentDepartment}
                ariaLabel='Parent Department'
                className="form-select"
              >
                <option value=''>--</option>
                {givenToOptions.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </Select>
              {/* <Button
                type="button"
                color="light"
                className="input-group-text"
                onClick={() => {
                  const newName = prompt('Enter new name');
                  if (newName && !givenToOptions.includes(newName)) {
                    setGivenToOptions((prev) => [...prev, newName]);
                  }
                }}
              >
                Add
              </Button> */}
            </div>
          </FormGroup>

          <FormGroup id='date' label='Date *' className='col-md-4'>
            <Input type='date' name='date' onChange={formik.handleChange} value={formik.values.date} />
          </FormGroup>

          <FormGroup id='summary' label='Summary' className='col-12'>
            <textarea
              className='form-control'
              name='summary'
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.summary}
              placeholder='Write appreciation details here...'
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

      <AddAwardModal
        isOpen={isAwardModalOpen}
        setIsOpen={setIsAwardModalOpen}
        onAddAward={handleNewAward}
      />
    </Modal>
  );
};

export default AddAward;
