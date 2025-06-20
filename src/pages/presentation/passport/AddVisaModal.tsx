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

interface IAddVisaModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddVisa: (visa: {
    visaNumber: string;
    country: string;
    issueDate: string;
    expiryDate: string;
    scanCopy?: File | null;
  }) => void;
  selectedVisa?: {
    visaNumber: string;
    country: string;
    issueDate: string;
    expiryDate: string;
    scanCopy?: File | null;
  };
}

const countryOptions = [
  { value: 'ALBANIA', label: 'ALBANIA' },
  { value: 'INDIA', label: 'INDIA' },
  { value: 'USA', label: 'USA' },
  // ...add more as needed
];

const AddVisaModal: FC<IAddVisaModalProps> = ({
  isOpen,
  setIsOpen,
  onAddVisa,
  selectedVisa,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      visaNumber: selectedVisa?.visaNumber || '',
      country: selectedVisa?.country || '',
      issueDate: selectedVisa?.issueDate || '',
      expiryDate: selectedVisa?.expiryDate || '',
      scanCopy: null as File | null,
    },
    onSubmit: (values) => {
      onAddVisa(values);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Add Visa</h5>
      </ModalHeader>
      <ModalBody>
        <div className="row mb-3">
          <FormGroup id="visaNumber" label="Visa Number *" className="col-md-3">
            <Input
              name="visaNumber"
              onChange={formik.handleChange}
              value={formik.values.visaNumber}
              placeholder="Enter visa number"
              required
            />
          </FormGroup>
          <FormGroup id="country" label="Country *" className="col-md-3">
            <select
              className="form-select"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              required
            >
              <option value="">--</option>
              {countryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
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
        <Button color="primary" onClick={formik.submitForm}>
          <Icon icon="Check" className="me-2" />
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddVisaModal;