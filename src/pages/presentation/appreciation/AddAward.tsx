/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import AddAwardModal from './AddAwardModal';

import Dropdown from '../../../components/bootstrap/Dropdown';
import { DropdownToggle } from '../../../components/bootstrap/Dropdown';
import { DropdownMenu } from '../../../components/bootstrap/Dropdown';
import icon from 'react-syntax-highlighter/dist/cjs/languages/prism/icon';

interface IAddAwardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAward: (award: {
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
    icon?: string;
    color?: string;
  }) => void;
  selectedAward?: {
    id: number;
    name: string;
    parentDepartment?: string;
    date?: string;
    summary?: string;
    icon?: string;
    color?: string;
  };
}

const AddAward: FC<IAddAwardModalProps> = ({ isOpen, setIsOpen, onAddAward, selectedAward }) => {
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  // Add color to each award option
  const [awardOptions, setAwardOptions] = useState<{ value: string, label: string, icon: string, color?: string }[]>(
    [
      { value: 'Employee of the Month', label: 'Employee of the Month', icon: 'EmojiEvents', color: '#FFD700' },
      { value: 'Best Performer', label: 'Best Performer', icon: 'Star', color: '#A259E6' },
      { value: 'Team Player', label: 'Team Player', icon: 'ThumbUp', color: '#00B8D9' },
    ]
  );
  const [givenToOptions, setGivenToOptions] = useState<string[]>(['John', 'Sam', 'David']);
  const [awardDropdownOpen, setAwardDropdownOpen] = useState(false);

  interface FormValues {
    name: string;
    parentDepartment: string;
    date: string;
    summary: string;
    photo?: File;
    icon?: string; 
    color?: string; 
  }

  // Calculate selectedColor before useFormik so it can be used in initialValues
  const selectedAwardOptionInit = awardOptions.find(opt => opt.value === (selectedAward?.name || ''));
  const selectedColor = selectedAwardOptionInit?.color || '#A259E6';

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      name: selectedAward?.name || '',
      parentDepartment: selectedAward?.parentDepartment || '',
      date: selectedAward?.date || dayjs().format('YYYY-MM-DD'),
      summary: selectedAward?.summary || '',
      photo: undefined,
      icon: selectedAward?.icon || '',
      color: selectedColor,
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

  // When adding a new award, store its color as well
  const handleNewAward = (award: { title: string, icon: string, color: string }) => {
    if (!awardOptions.some(opt => opt.value === award.title)) {
      setAwardOptions(prev => [
        ...prev,
        { value: award.title, label: award.title, icon: award.icon, color: award.color }
      ]);
    }
    // Set the selected award in the form as soon as it's added
    formik.setFieldValue('name', award.title);
    formik.setFieldValue('icon', award.icon);
    formik.setFieldValue('color', award.color);
    setIsAwardModalOpen(false);
  };

  function addAward(newAward: { title: string; icon?: string; color?: string }) {
    // Ensure icon and color are included, with defaults if needed
    const awardWithIcon = {
      value: newAward.title,
      label: newAward.title,
      icon: newAward.icon || 'star',         // default icon if not provided
      color: newAward.color || '#FF5733',    // default color if not provided
    };
    awardOptions.push(awardWithIcon);
  }

  if (!isOpen) return null;

  const selectedAwardOption = awardOptions.find(opt => opt.value === formik.values.name);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop={true}>
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className='modal-title'>{selectedAward ? 'Edit Appreciation' : 'Add Appreciation'}</h5>
      </ModalHeader>
      <ModalBody>
        <div className='row g-4'>
          <FormGroup id="name" label="Award *" className="col-md-4">
            <div className="input-group">
              <Dropdown isOpen={awardDropdownOpen}>
                <DropdownToggle hasIcon={false}>
                  <Button
                    color="light"
                    className="d-flex align-items-center"
                    style={{ minWidth: 250, justifyContent: 'flex-start' }}
                    onClick={() => setAwardDropdownOpen(!awardDropdownOpen)}
                    type="button"
                  >
                    {selectedAwardOption && (
                      <>
                        <Icon
                          icon={selectedAwardOption.icon}
                          style={{
                            marginRight: 8,
                            fontSize: 20,
                            width: 50,
                            height: 20,
                            verticalAlign: 'middle',
                            color: selectedAwardOption.color || '#A259E6' // Use saved color
                          }}
                        />
                        <span>{selectedAwardOption.label}</span>
                      </>
                    )}
                    {!selectedAwardOption && 'Select Award'}
                  </Button>
                </DropdownToggle>
                <DropdownMenu>
                  {awardOptions.map(opt => (
                    <Button
                      key={opt.value}
                      color="link"
                      className="dropdown-item d-flex align-items-center"
                      style={{ minWidth: 250 }}
                      onClick={() => {
                        formik.setFieldValue('name', opt.value);
                        formik.setFieldValue('icon', opt.icon); // Set icon in form
                        formik.setFieldValue('color', opt.color || '#A259E6'); // Set color in form
                        setAwardDropdownOpen(false);
                      }}
                    >
                      <Icon
                        icon={opt.icon}
                        className="me-2"
                        style={{
                          fontSize: 20,
                          width: 20,
                          height: 20,
                          verticalAlign: 'middle',
                          color: opt.color || '#A259E6'
                        }}
                      />
                      <span>{opt.label}</span>
                    </Button>
                  ))}
                  <Button
                    type="button"
                    color="light"
                    className="dropdown-item"
                    onClick={() => {
                      setAwardDropdownOpen(false);
                      setIsAwardModalOpen(true);
                    }}
                  >
                    <Icon icon="Add" className="me-2" /> Add New Award
                  </Button>
                </DropdownMenu>
              </Dropdown>
            </div>
          </FormGroup>

          <FormGroup id='parentDepartment' label='Given to *' className='col-md-4'>
            <div className="input-group">
              <select
                name='parentDepartment'
                onChange={formik.handleChange}
                value={formik.values.parentDepartment}
                aria-label='Parent Department'
                className="form-select"
              >
                <option value=''>--</option>
                {givenToOptions.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
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

          <FormGroup id="photo" label="Photo" className="col-12">
            <span>
              <Icon icon="HelpOutline" size="sm" className="ms-1" />
            </span>
            <div
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                background: '#fff',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <label htmlFor="photo-upload" style={{ cursor: 'pointer', width: '100%' }}>
                <div style={{ color: '#bdbdbd', fontSize: 40 }}>
                  <Icon icon="CloudUpload" />
                </div>
                <div style={{ color: '#757575', marginTop: 8 }}>
                  Choose a file
                </div>
                <input
                  id="photo-upload"
                  name="photo"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    // If using Formik:
                    formik.setFieldValue('photo', e.currentTarget.files?.[0]);
                  }}
                />
              </label>
              {formik.values.photo && (
                <div style={{ marginTop: 12, fontSize: 14 }}>
                  Selected: {formik.values.photo.name}
                </div>
              )}
            </div>
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
