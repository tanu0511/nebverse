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

interface IAddNoteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNote: (note: {
    title: string;
    type: string;
    detail: string;
  }) => void;
  selectedNote?: {
    id: number;
    title: string;
    type: string;
    detail: string;
  };
}

const AddNoteModal: FC<IAddNoteModalProps> = ({
  isOpen,
  setIsOpen,
  onAddNote,
  selectedNote,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedNote?.title || '',
      type: selectedNote?.type || 'Public',
      detail: selectedNote?.detail || '',
    },
    onSubmit: (values) => {
      onAddNote(values);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title">Client Note Details</h5>
      </ModalHeader>
      <ModalBody>
        <div className="row mb-3">
          <FormGroup id="title" label="Note Title *" className="col-md-6">
            <Input
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Enter note title"
              required
            />
          </FormGroup>
          <div className="col-md-6">
            <label className="form-label fw-bold">Note Type</label>
            <div className="d-flex align-items-center h-100">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="public"
                  value="Public"
                  checked={formik.values.type === 'Public'}
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="public">
                  Public
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="private"
                  value="Private"
                  checked={formik.values.type === 'Private'}
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="private">
                  Private
                </label>
              </div>
            </div>
          </div>
        </div>
        <FormGroup id="detail" label="Note Detail" className="mb-0">
          {/* Replace this textarea with your rich text editor if needed */}
          <textarea
            className="form-control"
            name="detail"
            rows={5}
            onChange={formik.handleChange}
            value={formik.values.detail}
            placeholder="Enter note details"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={formik.handleSubmit}>
          <Icon icon="Check" className="me-1" /> Save
        </Button>
        <Button color="link" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNoteModal;