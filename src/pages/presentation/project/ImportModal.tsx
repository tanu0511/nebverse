import React, { FC, useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface ImportModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const ImportModal: FC<ImportModalProps> = ({ isOpen, setIsOpen }) => {
    const [containsHeader, setContainsHeader] = useState(false); // State for toggle button

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('File uploaded:', file.name);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isStaticBackdrop>
            <ModalHeader setIsOpen={setIsOpen}>
                <h5 className="modal-title">Import Projects</h5>
            </ModalHeader>
            <ModalBody>
                <p className="text-warning">
                    Date format should be in Y-m-d (e.g. 2022-04-21) format. Make sure the date format is correct in the excel file.
                </p>
                <div className="mb-3">
                    <label htmlFor="file-upload" className="form-label">
                        Upload File (file must be a file of type: xls, xlsx, csv)
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="form-control"
                        onChange={handleFileUpload}
                    />
                </div>
                <div className="form-check">
                    <label htmlFor="file-contains-header" className="form-check-label">
                        File Contains Headings Row
                    </label> 
                    <div className="form-switch mt-2">
                        <input
                            type="checkbox"
                            id="file-contains-header"
                            className="form-check-input"
                            checked={containsHeader}
                            onChange={() => setContainsHeader(!containsHeader)} // Toggle state
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => setIsOpen(false)}>
                    Upload And Move To Next Step
                </Button>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ImportModal;