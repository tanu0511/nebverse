import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';

interface CopyProjectModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    projectData: any; // Data of the project to duplicate
    onDuplicate: (newProject: any) => void; // Callback to add the duplicated project
}

const CopyProjectModal: FC<CopyProjectModalProps> = ({
    isOpen,
    setIsOpen,
    projectData,
    onDuplicate,
}) => {
    const [includeTask, setIncludeTask] = useState(false);
    const [includeMilestone, setIncludeMilestone] = useState(false);
    const [includeFiles, setIncludeFiles] = useState(false);
    const [includeTimesheet, setIncludeTimesheet] = useState(false);
    const [includeNotes, setIncludeNotes] = useState(false);
    const [noDeadline, setNoDeadline] = useState(false);
    const [createPublicProject, setCreatePublicProject] = useState(false);

    const formik = useFormik({
        initialValues: {
            shortCode: projectData?.code || '',
            projectName: projectData?.projectName || '',
            startDate: projectData?.startDate || '',
            deadline: projectData?.deadline || '',
            department: projectData?.department || '',
            client: projectData?.client || '',
        },
        onSubmit: (values) => {
            const newProject = {
                ...projectData,
                ...values,
                code: `${values.shortCode}-copy`, // Append "-copy" to the short code
                includeTask,
                includeMilestone,
                includeFiles,
                includeTimesheet,
                includeNotes,
                createPublicProject,
            };
            onDuplicate(newProject); // Pass the duplicated project to the parent
            setIsOpen(false); // Close the modal
        },
    });

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="copy-project-modal-title">Copy Project</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                    {/* Checkboxes for Task, Milestone, Files, Timesheet, Notes */}
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="includeTask"
                                className="form-check-input"
                                checked={includeTask}
                                onChange={() => setIncludeTask(!includeTask)}
                            />
                            <label htmlFor="includeTask" className="form-check-label">
                                Task
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="includeMilestone"
                                className="form-check-input"
                                checked={includeMilestone}
                                onChange={() => setIncludeMilestone(!includeMilestone)}
                            />
                            <label htmlFor="includeMilestone" className="form-check-label">
                                Milestone
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="includeFiles"
                                className="form-check-input"
                                checked={includeFiles}
                                onChange={() => setIncludeFiles(!includeFiles)}
                            />
                            <label htmlFor="includeFiles" className="form-check-label">
                                Files
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="includeTimesheet"
                                className="form-check-input"
                                checked={includeTimesheet}
                                onChange={() => setIncludeTimesheet(!includeTimesheet)}
                            />
                            <label htmlFor="includeTimesheet" className="form-check-label">
                                Timesheet
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="includeNotes"
                                className="form-check-input"
                                checked={includeNotes}
                                onChange={() => setIncludeNotes(!includeNotes)}
                            />
                            <label htmlFor="includeNotes" className="form-check-label">
                                Notes
                            </label>
                        </div>
                    </div>

                    {/* Short Code */}
                    <FormGroup label="Short Code">
                        <Input
                            name="shortCode"
                            value={formik.values.shortCode}
                            onChange={formik.handleChange}
                            placeholder="Enter short code"
                        />
                    </FormGroup>

                    {/* Project Name */}
                    <FormGroup label="Project Name">
                        <Input
                            name="projectName"
                            value={formik.values.projectName}
                            onChange={formik.handleChange}
                            placeholder="Enter project name"
                        />
                    </FormGroup>

                    {/* Start Date */}
                    <FormGroup label="Start Date">
                        <Input
                            type="date"
                            name="startDate"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                        />
                    </FormGroup>

                    {/* Deadline */}
                    <FormGroup label="Deadline">
                        <Input
                            type="date"
                            name="deadline"
                            value={formik.values.deadline}
                            onChange={formik.handleChange}
                            disabled={noDeadline}
                        />
                        <div className="form-check mt-2">
                            <input
                                type="checkbox"
                                id="noDeadline"
                                className="form-check-input"
                                checked={noDeadline}
                                onChange={() => setNoDeadline(!noDeadline)}
                            />
                            <label htmlFor="noDeadline" className="form-check-label">
                                There is no project deadline
                            </label>
                        </div>
                    </FormGroup>

                    {/* Create Public Project */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            id="createPublicProject"
                            className="form-check-input"
                            checked={createPublicProject}
                            onChange={() => setCreatePublicProject(!createPublicProject)}
                        />
                        <label htmlFor="createPublicProject" className="form-check-label">
                            Create Public Project
                        </label>
                    </div>

                    {/* Department */}
                    <FormGroup label="Department">
                        <Select
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            ariaLabel="Department Select"
                        >
                            <option value="">Select department</option>
                            <option value="HR">HR</option>
                            <option value="Admin">Admin</option>
                        </Select>
                    </FormGroup>

                    {/* Add Project Members */}
                    <FormGroup label="Add Project Members">
                        <Select
                            name="members"
                            ariaLabel="Add Project Members"
                        >
                            <option value="">Nothing selected</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Jane Smith">Jane Smith</option>
                        </Select>
                    </FormGroup>

                    {/* Client */}
                    <FormGroup label="Client">
                        <Select
                            name="client"
                            ariaLabel="client"
                        >
                            <option value="">Nothing selected</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Jane Smith">Jane Smith</option>
                        </Select>
                    </FormGroup>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
                <Button color="primary" onClick={formik.handleSubmit}>
                    Copy Project
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CopyProjectModal;