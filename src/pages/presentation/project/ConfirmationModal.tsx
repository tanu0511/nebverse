
import React, { FC } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface ConfirmationModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    title?: string;
    message?: string;
    onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
    isOpen,
    setIsOpen,
    title = 'Are you sure?',
    message = '',
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="confirmation-modal-title">{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="text-center">
                    <Icon icon="Warning" size="3x" color="warning" />
                    <p className="mt-3">{message}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button color="primary" onClick={onConfirm}>
                    Yes, Pin It!
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;