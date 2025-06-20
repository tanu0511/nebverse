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
import Icon from '../../../components/icon/Icon';

interface IAddPassportModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddPassport: (passport: {
    passportNumber: string;
    nationality: string;
    issueDate: string;
    expiryDate: string;
    scanCopy?: File | null;
  }) => void;
  selectedPassport?: {
    passportNumber: string;
    nationality: string;
    issueDate: string;
    expiryDate: string;
    scanCopy?: File | null;
  };
}

const nationalityOptions = [
  { value: 'AL', label: 'Albanian (ALBANIA)', flag: '🇦🇱' },
  { value: 'IN', label: 'Indian (INDIA)', flag: '🇮🇳' },
  { value: 'US', label: 'American (USA)', flag: '🇺🇸' },
  // ...add more as needed
];

const AddPassportModal: FC<IAddPassportModalProps> = ({
  isOpen,
  setIsOpen,
  onAddPassport,
  selectedPassport,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      passportNumber: selectedPassport?.passportNumber || '',
      nationality: selectedPassport?.nationality || '',
      issueDate: selectedPassport?.issueDate || '',
      expiryDate: selectedPassport?.expiryDate || '',
      scanCopy: null as File | null,
    },
    onSubmit: (values) => {
      onAddPassport(values);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Add Passport</h5>
      </ModalHeader>
      <ModalBody>
        <div className="row mb-3">
          <FormGroup id="passportNumber" label="Passport Number *" className="col-md-3">
            <Input
              name="passportNumber"
              onChange={formik.handleChange}
              value={formik.values.passportNumber}
              placeholder="Enter passport number"
              required
            />
          </FormGroup>
          <FormGroup id="nationality" label="Nationality *" className="col-md-3">
            <select
              className="form-select"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              required
            >
              <option value="">--</option>
              {nationalityOptions.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup id="issueDate" label="Issue Date *" className="col-md-3">
            <Input
              name="issueDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.issueDate}
              required
            />
          </FormGroup>
          <FormGroup id="expiryDate" label="Expiry Date *" className="col-md-3">
            <Input
              name="expiryDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.expiryDate}
              required
            />
          </FormGroup>
        </div>
        <FormGroup id="scanCopy" label="Scan Copy" className="mb-0">
          <div className="border rounded-3 p-4 text-center" style={{ minHeight: 120 }}>
            <label htmlFor="scanCopyInput" className="w-100 h-100 cursor-pointer d-flex flex-column align-items-center justify-content-center">
              <Icon icon="CloudUpload" size="3x" color="secondary" />
              <div className="mt-2 text-muted">Choose a file</div>
              <Input
                id="scanCopyInput"
                name="scanCopy"
                type="file"
                className="d-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue('scanCopy', e.currentTarget.files ? e.currentTarget.files[0] : null);
                }}
              />
            </label>
            {formik.values.scanCopy && (
              <div className="mt-2 text-success">{(formik.values.scanCopy as File).name}</div>
            )}
          </div>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={formik.submitForm} >
          <Icon icon="Check" className="me-1" /> Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPassportModal;