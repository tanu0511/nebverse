/* eslint-disable prettier/prettier */
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
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ProjectCategoryModal from './ProjectCategoryModal';
import ClientModal from './ClientModal';
import AddEmployeeModal from './AddEmployeeModal';
import { Employee } from './Employee'

interface Client {
    name: string;
    email: string;
    companyName: string;
    loginAllowed: boolean;
}


interface CustomerEditModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onAddProject: (project: any) => void; // Callback to add a project
}

const CustomerEditModal: FC<CustomerEditModalProps> = ({
    isOpen,
    setIsOpen,
    onAddProject,
}) => {

    const [enableGanttChart, setEnableGanttChart] = useState(false);
    const [enableTaskBoard, setEnableTaskBoard] = useState(false);
    const [enableTaskneedsapproval, setEnableTaskneedsapproval] = useState(false);
    const [showOtherDetails, setShowOtherDetails] = useState(false); // Added state for showOtherDetails
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State for category modal
    const [categories, setCategories] = useState<string[]>(['Category 1', 'Category 2']); // State for categories
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);  
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]); // Define employees state


    const handleSaveEmployee = (employee: Employee) => {
        setEmployees((prev) => [...prev, employee]);
    
    };

	const handleSaveClient = (client: Client) => {
        setClients((prev) => [...prev, client]); // Add the new client to the list
        console.log('Saved Client:', client);
    };
 
    const formik = useFormik({
        initialValues: {
            shortCode: '',
            projectName: '',
            startDate: '',
            deadline: '',
            projectCategory: '',
            department: '',
            client: '',
            projectSummary: '',
            notes: '',
            addProjectMembers: '',
            currency: 'INR',
            projectBudget: '',
            hoursEstimate: '',
            miroBoardId: '',
            allowManualTimeLogs: false,
            enableTaskBoard: false,
            sendTaskNotification: false,
            clientCanAccessMiro: false,
            
        },
        onSubmit: (values) => {
            const newProject = {
                code: values.shortCode || 'N/A',
                projectName: values.projectName,
                members: employees.map((e) => e.employeeName).join(', ') || 'N/A',
                startDate: values.startDate,
                deadline: values.deadline,
                client: values.client || 'N/A',
                status: 'In Progress', // Default status
            };
            onAddProject(newProject); // Pass the new project to the parent
            setIsOpen(false);
        },
    });

    if (!isOpen) return null;

    function handleSubmit() {
        formik.handleSubmit();
    }
    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
                <ModalHeader setIsOpen={setIsOpen}>
                    <ModalTitle id="project-details-title">Project Details</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row g-3">
                            {/* Short Code */}
                            <FormGroup label="Short Code" className="col-md-6">
                                <Input
                                    name="shortCode"
                                    value={formik.values.shortCode}
                                    onChange={formik.handleChange}
                                    placeholder="Project unique short code"
                                />
                            </FormGroup>

                            {/* Project Name */}
                            <FormGroup label="Project Name *" className="col-md-6">
                                <Input
                                    name="projectName"
                                    value={formik.values.projectName}
                                    onChange={formik.handleChange}
                                    placeholder="Write a project name"
                                    required
                                />
                            </FormGroup>

                            {/* Start Date */}
                            <FormGroup label="Start Date *" className="col-md-6">
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={formik.values.startDate}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </FormGroup>

                            {/* Deadline */}
                            <FormGroup label="Deadline *" className="col-md-6">
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={formik.values.deadline}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>

                            {/* Project Category */}
                            <FormGroup label="Project Category" className="col-md-4">
                                <div className="input-group">
                                    <Select
                                        name="projectCategory"
                                        value={formik.values.projectCategory}
                                        onChange={formik.handleChange}
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
									type="button" 
									color="light" 
									className="input-group-text"
                                    onClick={() => setIsCategoryModalOpen(true)} // Open the modal
                                    >
                                        Add
                                    </Button>
                                </div>
                            </FormGroup>

                            {/* Department */}
                            <FormGroup label="Department" className="col-md-4">
                                <Select
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    ariaLabel="Department"
                                >
                                    <option value="">Nothing selected</option>
                                    <option value="department1">Department 1</option>
                                    <option value="department2">Department 2</option>
                                </Select>
                            </FormGroup>

                            {/* Client */}
                            <FormGroup label="Client" className="col-md-4">
                                <div className="input-group">
                                    <Select
                                        name="client"
                                        value={formik.values.client}
                                        onChange={formik.handleChange}
                                        ariaLabel="Client"
                                    >
                                        <option value="">--</option>
                                        {clients.map((client, index) => (
                                    <option key={index} value={client.name}>
                                        {client.name} - {client.companyName}
                                    </option>
                                    ))}
                                    </Select>
                                    <Button type="button" color="light" className="input-group-text"
									 onClick={() => setIsClientModalOpen(true)}>Add</Button>
                                </div>
                            </FormGroup>

                            {/* Project Summary */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Project Summary
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={formik.values.projectSummary}
                                    onChange={(value) => formik.setFieldValue('projectSummary', value)}
                                />
                            </div>

                            {/* Notes */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Notes
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={formik.values.notes}
                                    onChange={(value) => formik.setFieldValue('notes', value)}
                                />
                            </div>

                            {/* Public Gantt Chart */}
                            <FormGroup label="Public Gantt Chart" className="col-md-4">
                                <div className="d-flex gap-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="ganttEnable"
                                            name="enableGanttChart"
                                            value="true"
                                            checked={enableGanttChart}
                                            onChange={() => setEnableGanttChart(true)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="ganttEnable" className="form-check-label">
                                            Enable
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="ganttDisable"
                                            name="enableGanttChart"
                                            value="false"
                                            checked={!enableGanttChart}
                                            onChange={() => setEnableGanttChart(false)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="ganttDisable" className="form-check-label">
                                            Disable
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>

                            {/* Public Task Board */}
                            <FormGroup label="Public Task Board" className="col-md-4">
                                <div className="d-flex gap-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="TaskEnable"
                                            name="enableTaskBoard"
                                            value="true"
                                            checked={enableTaskBoard}
                                            onChange={() => setEnableTaskBoard(true)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="taskEnable" className="form-check-label">
                                            Enable
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="taskDisable"
                                            name="enableTaskBoard"
                                            value="false"
                                            checked={!enableTaskBoard}
                                            onChange={() => setEnableTaskBoard(false)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="taskDisable" className="form-check-label">
                                            Disable
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>

                            {/* Task needs approval by Admin/Project Admin */}
                            <FormGroup label="Task needs approval by Admin/Project Admin" className="col-md-4">
                                <div className="d-flex gap-3">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="TaskEnable"
                                            name="enableTaskneedsapproval"
                                            value="true"
                                            checked={enableTaskneedsapproval}
                                            onChange={() => setEnableTaskneedsapproval(true)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="taskEnable" className="form-check-label">
                                            Enable
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="taskDisable"
                                            name="enableTaskneedsapproval"
                                            value="false"
                                            checked={!enableTaskneedsapproval}
                                            onChange={() => setEnableTaskneedsapproval(false)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor="taskDisable" className="form-check-label">
                                            Disable
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>

                            {/* Add Project Members */}
                            <FormGroup label="Add Project Members *" className="col-md-6">
                                <div className="input-group">
                                    <Select
                                        name="addProjectMembers"
                                        
                                        ariaLabel="Add Project Members"
                                    >
                                        <option value="">Select a member</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.employeeName}>
                                                {employee.employeeName}
                                            </option>
                                        ))}
                                    </Select>
                                    <Button type="button" color="light" className="input-group-text"
                                     onClick={() => setIsEmployeeModalOpen(true)}>Add</Button>
                                </div>
                            </FormGroup>

                            {/* Toggle Button for Other Details */}
                            <div className="col-md-12">
                                <h5
                                    className="mt-4 cursor-pointer"
                                    onClick={() => setShowOtherDetails(!showOtherDetails)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>{showOtherDetails ? '▼' : '▶'} Other Details</span>
                                </h5>
                                <hr />
                            </div>

                            {/* Other Details Section */}
                            {showOtherDetails && (
                                <>
                                    {/* Add File */}
                                    <FormGroup label="Add File" className="col-md-12">
                                        <Input
                                            type="file"
                                            name="addFile"
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </FormGroup>

                                    {/* Currency */}
                                    <FormGroup label="Currency" className="col-md-4">
                                        <Select
                                            name="currency"
                                            value={formik.values.currency}
                                            onChange={formik.handleChange}
                                            ariaLabel="Currency"
                                        >
                                            <option value="INR">₹ (INR)</option>
                                            <option value="USD">$ (USD)</option>
                                        </Select>
                                    </FormGroup>

                                    {/* Project Budget */}
                                    <FormGroup label="Project Budget" className="col-md-4">
                                        <Input
                                            name="projectBudget"
                                            value={formik.values.projectBudget}
                                            onChange={formik.handleChange}
                                            placeholder="e.g. 10000"
                                        />
                                    </FormGroup>

                                    {/* Hours Estimate */}
                                    <FormGroup label="Hours Estimate (in Hours)" className="col-md-4">
                                        <Input
                                            name="hoursEstimate"
                                            value={formik.values.hoursEstimate}
                                            onChange={formik.handleChange}
                                            placeholder="e.g. 500"
                                        />
                                    </FormGroup>

                                    {/* Checkboxes */}
                                    <div className="col-md-8 d-flex align-items-center gap-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                id="allowManualTimeLogs"
                                                name="allowManualTimeLogs"
                                                checked={formik.values.allowManualTimeLogs}
                                                onChange={formik.handleChange}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="allowManualTimeLogs" className="form-check-label">
                                                Allow manual time logs
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                id="clientCanAccessMiro"
                                                name="clientCanAccessMiro"
                                                checked={formik.values.clientCanAccessMiro}
                                                onChange={formik.handleChange}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="clientCanAccessMiro" className="form-check-label">
                                                Client Can Access Miro
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                id="sendTaskNotification"
                                                name="sendTaskNotification"
                                                checked={formik.values.sendTaskNotification}
                                                onChange={formik.handleChange}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="sendTaskNotification" className="form-check-label">
                                                Send task notification to client
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                id="enableTaskBoard"
                                                name="enableTaskBoard"
                                                checked={formik.values.enableTaskBoard}
                                                onChange={formik.handleChange}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="enableTaskBoard" className="form-check-label">
                                                Enable Miroboard
                                            </label>
                                        </div>
                                    </div>

                                    {/* Miro Board ID */}
                                    <FormGroup label="Miro Board ID *" className="col-md-4">
                                        <Input
                                            name="miroBoardId"
                                            value={formik.values.miroBoardId}
                                            onChange={formik.handleChange}
                                            placeholder="Enter Miro Board ID"
                                        />
                                    </FormGroup>
                                </>
                            )}
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Project Category Modal */}
            <ProjectCategoryModal
                isOpen={isCategoryModalOpen}
                setIsOpen={setIsCategoryModalOpen}
				categories={categories}
                setCategories={setCategories}
            />

			{/* Client Modal */}
            <ClientModal
                isOpen={isClientModalOpen}
                setIsOpen={setIsClientModalOpen}
                onSave={handleSaveClient}
            />

            {/* Add Employee Modal */}
            <AddEmployeeModal
                isOpen={isEmployeeModalOpen}
                setIsOpen={setIsEmployeeModalOpen}
                onSave={(employee: Employee) => handleSaveEmployee(employee)}
                onAddEmployee={handleSaveEmployee} // Pass the callback to update employees
            />
        </>
    );
};

export default CustomerEditModal;
