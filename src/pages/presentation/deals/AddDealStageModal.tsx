import React, { useState, useEffect } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface AddDealStageModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onSave: (data: { pipeline: string; dealStage: string; labelColor: string }) => void;
    initialData?: { pipeline?: string; dealStage?: string; labelColor?: string };
}

const pipelineOptions = [
    { value: '', label: 'Nothing selected' },
    { value: 'Sales Pipeline', label: 'Sales Pipeline' },
    { value: 'Marketing Pipeline', label: 'Marketing Pipeline' },
];

const AddDealStageModal: React.FC<AddDealStageModalProps> = ({
    isOpen,
    setIsOpen,
    onSave,
    initialData,
}) => {
    const [form, setForm] = useState({
        pipeline: '',
        dealStage: '',
        labelColor: '#16813D',
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setForm({
                pipeline: initialData.pipeline || '',
                dealStage: initialData.dealStage || '',
                labelColor: initialData.labelColor || '#16813D',
            });
        } else if (isOpen) {
            setForm({
                pipeline: '',
                dealStage: '',
                labelColor: '#16813D',
            });
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="add-deal-stage-modal-title">Add New Deal Stage</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className="row align-items-end">
                        {/* Pipeline */}
                        <div className="mb-3 col-md-4">
                            <label htmlFor="pipeline" className="form-label">
                                Pipeline <span className="text-danger">*</span>
                            </label>
                            <select
                                id="pipeline"
                                name="pipeline"
                                className="form-control"
                                value={form.pipeline}
                                onChange={handleChange}
                                required
                            >
                                {pipelineOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Deal Stage */}
                        <div className="mb-3 col-md-4">
                            <label htmlFor="dealStage" className="form-label">
                                Deal Stage <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                id="dealStage"
                                name="dealStage"
                                className="form-control"
                                placeholder="e.g. In Progress"
                                value={form.dealStage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Label Color */}
                        <div className="mb-3 col-md-4">
                            <label htmlFor="labelColor" className="form-label">
                                Label Color <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="labelColor"
                                    name="labelColor"
                                    className="form-control"
                                    value={form.labelColor}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="input-group-text p-0" style={{ background: 'none', border: 'none' }}>
                                    <input
                                        type="color"
                                        name="labelColor"
                                        value={form.labelColor}
                                        onChange={handleChange}
                                        style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer' }}
                                        tabIndex={-1}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setIsOpen(false)} type="button">
                            Close
                        </Button>
                        <Button color="primary" type="submit">
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default AddDealStageModal;