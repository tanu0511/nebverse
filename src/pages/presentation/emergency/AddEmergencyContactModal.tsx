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

interface EmergencyContact {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  relationship: string;
  address?: string;
}

interface AddEmergencyContactModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddContact: (contact: EmergencyContact) => void;
  selectedContact?: EmergencyContact;
}

const AddEmergencyContactModal: FC<AddEmergencyContactModalProps> = ({
  isOpen,
  setIsOpen,
  onAddContact,
  selectedContact,
}) => {
  const formik = useFormik({
    initialValues: {
      name: selectedContact?.name || '',
      email: selectedContact?.email || '',
      mobile: selectedContact?.mobile || '',
      relationship: selectedContact?.relationship || '',
      address: selectedContact?.address || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddContact({
        ...values,
        id: selectedContact?.id || Date.now(),
      });
      setIsOpen(false);
      formik.resetForm();
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="emergency-contact-modal-title">
          {selectedContact ? 'Edit Emergency Contact' : 'Add New Emergency Contact'}
        </ModalTitle>
      </ModalHeader>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <div className="row g-3">
            <FormGroup id="name" label="Name *" className="col-md-6">
              <Input
                name="name"
                placeholder="e.g. John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>
            <FormGroup id="email" label="Email" className="col-md-6">
              <Input
                name="email"
                type="email"
                placeholder="e.g. johndoe@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </FormGroup>
            <FormGroup id="mobile" label="Mobile *" className="col-md-6">
              <Input
                name="mobile"
                placeholder="e.g. 1234567890"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>
            <FormGroup id="relationship" label="Relationship *" className="col-md-6">
              <Input
                name="relationship"
                placeholder="e.g. father"
                value={formik.values.relationship}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>
            <FormGroup id="address" label="Address" className="col-12">
              <textarea
                className="form-control"
                name="address"
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                value={formik.values.address}
                onChange={formik.handleChange}
                rows={2}
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setIsOpen(false)} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit" >
            Save
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddEmergencyContactModal;