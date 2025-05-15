import React, { FC, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
   ModalTitle,} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import AddProjectCategory from './AddProjectCategory';
import Select from '../../../components/bootstrap/forms/Select';

interface AddProjectTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        projectName: string;
        projectCategory: string;
        allowManualLogs: boolean;
        summary: string;
        notes: string;
    }) => void;
    editData?: {
        projectName: string;
        projectCategory: string;
    };
}

const AddProjectTemplateModal: FC<AddProjectTemplateModalProps> = ({
    isOpen,
    onClose,
    onSave,
    editData,
}) => {
    const [projectName, setProjectName] = useState('');
    const [projectCategory, setProjectCategory] = useState('');
    const [allowManualLogs, setAllowManualLogs] = useState(false);
    const [summary, setSummary] = useState('');
    const [notes, setNotes] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>(['Category 1', 'Category 2']);

    useEffect(() => {
        if (editData) {
            setProjectName(editData.projectName);
            setProjectCategory(editData.projectCategory);
        }
    }, [editData]);

    useEffect(() => {
        if (!isOpen) {
            setProjectName('');
            setProjectCategory('');
            setAllowManualLogs(false);
            setSummary('');
            setNotes('');
        }
    }, [isOpen]);

    const handleSave = () => {
        onSave({ projectName, projectCategory, allowManualLogs, summary, notes });
        setProjectName('');
        setProjectCategory('');
        setAllowManualLogs(false);
        setSummary('');
        setNotes('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={onClose} size="xl" isStaticBackdrop>
                <ModalHeader setIsOpen={onClose}>
                    <ModalTitle id="project-details-title">Project Details</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="row g-3">
                        {/* Project Name */}
                        <div className="col-md-6">
                            <label className="form-label">Project Name <span className="text-danger">*</span></label>
                            <Input
                                type="text"
                                placeholder="Write a project name"
                                value={projectName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                            />
                        </div>

                        {/* Project Category */}
                        <div className="col-md-6">
                            <label className="form-label">Project Category</label>
                            <div className="input-group">
                                    <Select
                                        name="projectCategory"
                                        value={projectCategory}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjectCategory(e.target.value)}
                                        ariaLabel="Project Category"
                                    >
                                        <option value="">--</option>
										{categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Select>
                                <Button
                                    color="light"
                                    className="input-group-text"
                                    onClick={() => setIsCategoryModalOpen(true)}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {/* Allow Manual Time Logs */}
                        <div className="col-md-12">
                            <label className="form-label">Allow manual time logs</label>
                            <input
                                type="checkbox"
                                checked={allowManualLogs}
                                onChange={(e) => setAllowManualLogs(e.target.checked)}
                                className="form-check-input ms-2"
                            />
                        </div>

                        {/* Project Summary */}
                        <div className="col-md-6">
                            <label className="form-label">Project Summary</label>
                            <ReactQuill
                                theme="snow"
                                value={summary}
                                onChange={(val) => setSummary(val)}
                            />
                        </div>

                        {/* Notes */}
                        <div className="col-md-6">
                            <label className="form-label">Notes</label>
                            <ReactQuill
                                theme="snow"
                                value={notes}
                                onChange={(val) => setNotes(val)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Project Category Modal */}
            <AddProjectCategory 
                isOpen={isCategoryModalOpen}
                setIsOpen={setIsCategoryModalOpen}
                categories={categories}
                setCategories={setCategories}
            />
        </>
    );
};

export default AddProjectTemplateModal;