import React, { useState } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';

interface ShippingAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (address: string) => void;
  defaultValue?: string;
}

const ShippingAddressModal: React.FC<ShippingAddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultValue = '',
}) => {
  const [address, setAddress] = useState(defaultValue);

  React.useEffect(() => {
    setAddress(defaultValue);
  }, [defaultValue, isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={onClose} isCentered>
      <ModalHeader setIsOpen={onClose}>
        <ModalTitle id="shipping-address-modal-title">Add Shipping Address</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormGroup label="Shipping Address *">
          <Textarea
            value={address}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
            placeholder="e.g. 132, My Street, Kingston, New York 12401"
            rows={3}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (onSave) onSave(address);
            onClose();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShippingAddressModal;