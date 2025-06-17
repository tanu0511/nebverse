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
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Dropdown from '../../../components/bootstrap/Dropdown';
import {DropdownToggle} from '../../../components/bootstrap/Dropdown';
import {DropdownMenu} from '../../../components/bootstrap/Dropdown';


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

const iconOptions = [
  { value: '', label: '--', icon: '' }, // use undefined, not ''
  { value: 'trophy', label: 'Trophy', icon: 'EmojiEvents' },
  { value: 'thumbs-up', label: 'Thumbs up', icon: 'ThumbUp' },
  { value: 'award', label: 'Award', icon: 'Star' },
  { value: 'book', label: 'Book', icon: 'Book' },
  { value: 'gift', label: 'Gift', icon: 'CardGiftcard' },
  { value: 'watch', label: 'Watch', icon: 'Watch' },
  { value: 'cup', label: 'Cup', icon: 'Coffee' },
  { value: 'puzzle', label: 'Puzzle', icon: 'Extension' },
  { value: 'plane', label: 'Plane', icon: 'AirplanemodeActive' },
  { value: 'money', label: 'Money', icon: 'Savings' }
];

const customOptions = iconOptions.map(opt => ({
  value: opt.value,
  label: (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {opt.icon ? <Icon icon={opt.icon} style={{ marginRight: 8 }} /> : <span style={{ width: 24, display: 'inline-block' }} />}
      {opt.label}
    </span>
  ) as React.ReactNode, // Ensure label is always a valid ReactNode
}));

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
      onAddAward({
        title: formik.values.title,
        icon: formik.values.icon,      // <-- must be set!
        color: formik.values.color,    // <-- must be set!
        // ...other fields
      });
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon='Info' size='lg' className='me-1' />
          <span>{selectedAward ? 'Updated' : 'Added'} Successfully</span>
        </span>,
        `Award "${values.icon}" "${values.title}" ${selectedAward ? 'updated' : 'added'} successfully!`
      );
      formik.resetForm();
      setIsOpen(false);
    },
  });

  const formatOptionLabel = (option : any)=> {
    const iconObj = iconOptions.find(opt => opt.value === option.value);
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {iconObj?.icon ? (
          <Icon
            icon={iconObj.icon}
            style={{
              marginRight: 8,
              color: formik.values.color,
              fontSize: 22,
              width: 22,
              height: 22,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle'
            }}
          />
        ) : (
          <span style={{ width: 24, display: 'inline-block' }} />
        )}
        {iconObj?.label}
      </span>
    );
  }

  const [iconDropdownOpen, setIconDropdownOpen] = React.useState(false);
  const selectedIconOption = iconOptions.find(opt => opt.value === formik.values.icon);

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

          <FormGroup id='icon' label='Icon *' className='col-md-6'>
            <Dropdown isOpen={iconDropdownOpen}>
              <DropdownToggle hasIcon={false}>
                <Button
                  color="light"
                  className="d-flex align-items-center w-100"
                  style={{ minWidth: 180, justifyContent: 'flex-start' }}
                  type="button"
                  onClick={() => setIconDropdownOpen(!iconDropdownOpen)}
                >
                  {selectedIconOption && selectedIconOption.icon && (
                    <Icon
                      icon={selectedIconOption.icon}
                      style={{
                        marginRight: 8,
                        color: formik.values.color,
                        fontSize: 22,
                        width: 22,
                        height: 22,
                        verticalAlign: 'middle'
                      }}
                    />
                  )}
                  {selectedIconOption ? selectedIconOption.label : 'Select Icon'}
                </Button>
              </DropdownToggle>
              <DropdownMenu>
                {iconOptions.map(opt => (
                  <Button
                    key={opt.value}
                    color="link"
                    className="dropdown-item d-flex align-items-center"
                    style={{ minWidth: 180 }}
                    onClick={() => {
                      formik.setFieldValue('icon', opt.value);
                      setIconDropdownOpen(false);
                    }}
                  >
                    {opt.icon && (
                      <Icon
                        icon={opt.icon}
                        className="me-2"
                        style={{
                          color: formik.values.color,
                          fontSize: 22,
                          width: 22,
                          height: 22,
                          verticalAlign: 'middle'
                        }}
                      />
                    )}
                    {opt.label}
                  </Button>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup id='color' label='Color Code *' className='col-md-6 d-flex align-items-center'>
            <Input
              type='color'
              name='color'
              value={formik.values.color}
              onChange={formik.handleChange}
            />
            {(() => {
              const iconName = iconOptions.find(opt => opt.value === formik.values.icon)?.icon;
              return iconName && typeof iconName === 'string' && iconName.length > 0 ? (
                <span
                  style={{
                    marginLeft: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#f5f5f5',
                    borderRadius: 6,
                    padding: 6,
                  }}
                >
                  <Icon
                    icon={iconName}
                    style={{ color: formik.values.color, fontSize: 24 }}
                  />
                </span>
              ) : <></>;
            })()}
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
