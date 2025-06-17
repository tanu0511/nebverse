import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import CustomerEditModal from './CustomerEditModal';
import PaginationButtons from '../../../components/PaginationButtons';
import ImportModal from './ImportModal'; // Import the new ImportModal component
import CopyProjectModal from './CopyProjectModal'; // Import the CopyProjectModal component
import ConfirmationModal from './ConfirmationModal';
import ProjectViewModal from './ProjectViewModal';
import { useProjects, Project } from './ProjectsContext';
import TaskBoardModal from './TaskBoardModal'; // Add this import
import PublicGanttChartModal from './PublicGanttChartModal';
import GanttChartModal from './GanttChartModal';

const ProjectPage: React.FC = () => {
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const { projects, setProjects } = useProjects();
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [importModalStatus, setImportModalStatus] = useState<boolean>(false);
    const [copyModalStatus, setCopyModalStatus] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
    const [taskBoardOpen, setTaskBoardOpen] = useState(false);
    const [, setTaskBoardProject] = useState<Project | null>(null);
    const [publicGanttOpen, setPublicGanttOpen] = useState(false);
    const [publicGanttProject, setPublicGanttProject] = useState<Project | null>(null);
    const [ganttOpen, setGanttOpen] = useState(false);
    const [ganttProject, setGanttProject] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // <-- Add searchTerm state
    const navigate = useNavigate();

    // Dynamic search filter for all relevant fields
    const filteredProjects = projects.filter((item) =>
        searchTerm === '' ||
        (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.members && item.members.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.startDate && item.startDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.deadline && item.deadline.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.status && item.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filtered data for pagination
    const filteredData = [...filteredProjects]
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) // Sort pinned projects to the top
        .slice((currentPage - 1) * perPage, currentPage * perPage);

    const confirmPinProject = () => {
        if (selectedProjectIndex !== null) {
            setProjects((prevProjects) =>
                prevProjects.map((project, index) =>
                    index === selectedProjectIndex ? { ...project, pinned: true } : project,
                ),
            );
            console.log(`Pinned project at index ${selectedProjectIndex}`);
        }
        setConfirmationModalOpen(false); // Close the modal
    };

    const handlePinProject = (index: number) => {
        setSelectedProjectIndex(index); // Set the selected project index
        setConfirmationModalOpen(true); // Open the confirmation modal
    };

    const handleDuplicate = (index: number) => {
        const projectToDuplicate = projects[index];
        if (projectToDuplicate) {
            setSelectedProject(projectToDuplicate); // Set the selected project
            setCopyModalStatus(true); // Open the "Copy Project" modal
        }
    };

    const handleDuplicateSubmit = (newProject: Project) => {
        setProjects((prevProjects) => [...prevProjects, newProject]); // Add the duplicated project
    };

    const handleAddProject = (newProject: Project) => {
        setProjects((prevProjects) => [...prevProjects, newProject]); // Add new project to the list
    };

    function handleStatusChange(index: number, value: string): void {
        setProjects((prevProjects) =>
            prevProjects.map((project, i) =>
                i === index ? { ...project, status: value } : project,
            ),
        );
    }

    const handleView = (index: number) => {
        setSelectedProject(projects[index]);
        setViewModalOpen(true);
    };

    const handleEdit = (index: number) => {
        console.log(`Edit project at index ${index}`);
        setEditModalStatus(true); 
    };

    const handleGanttChart = (index: number) => {
        setGanttProject(projects[index]);
        setGanttOpen(true);
    };

    const handlePublicGanttChart = (index: number) => {
        setPublicGanttProject(projects[index]);
        setPublicGanttOpen(true);
    };

    const handlePublicTaskBoard = (index: number) => {
        setTaskBoardProject(projects[index]);
        setTaskBoardOpen(true);
    };

    const handleArchive = (index: number) => {
        console.log(`Archive project at index ${index}`);
    };

    const handleDelete: (index: number) => void = (index: number) => {
        console.log(`Delete project at index ${index}`);
        setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
    };

    return (
        <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <label
                        className='border-0 bg-transparent cursor-pointer me-0'
                        htmlFor='searchInput'
                        aria-label='Search'>
                        <Icon icon='Search' size='2x' color='primary' />
                    </label>
                    <Input
                        id='searchInput'
                        type='search'
                        className='border-0 shadow-none bg-transparent'
                        placeholder='Search..'
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon='FilterAlt'
                        color='primary'
                        isLight
                        className='btn-only-icon position-relative'
                        aria-label='Filter'
                    />
                    <Button
                        icon='Add'
                        color='primary'
                        isLight
                        onClick={() => setEditModalStatus(true)}>
                        Add Project
                    </Button>

                    <Button
                        icon='Layers'
                        color='primary'
                        isLight
                        onClick={() => navigate('/project-template')}
                    >
                        Project Template
                    </Button>

                    <Button
                        icon='CloudUpload'
                        color='primary'
                        isLight
                        onClick={() => setImportModalStatus(true)}>
                        import
                    </Button>

                    <Button
                        color='primary'
                        icon='CloudDownload'
                        isLight
                        tag='a'
                        to='/somefile.txt'
                        target='_blank'
                        download>
                        Export
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className='row h-100'>
                    <div className='col-12'>
                        <Card stretch>
                            <CardBody isScrollable className='table-responsive' style={{ overflow: 'visible' }}>
                                <table className='table table-modern table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Project Name</th>
                                            <th>Members</th>
                                            <th>Start Date</th>
                                            <th>Deadline</th>
                                            <th>Client</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.code || 'N/A'}</td>
                                                    <td>{item?.projectName || 'N/A'}</td>
                                                    <td>{item?.members || 'N/A'}</td>
                                                    <td>{item?.startDate || 'N/A'}</td>
                                                    <td>{item?.deadline || 'N/A'}</td>
                                                    <td>{item?.client || 'N/A'}</td>
                                                    <td>
                                                        <select
                                                            value={item.status}
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    index,
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className='form-select'>
                                                            <option value='in progress'>
                                                                In Progress
                                                            </option>
                                                            <option value='not started'>
                                                                Not Started
                                                            </option>
                                                            <option value='on hold'>On Hold</option>
                                                            <option value='canceled'>
                                                                Canceled
                                                            </option>
                                                            <option value='finished'>
                                                                Finished
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td className="position-static">
                                                        <div className='dropdown'>
                                                            <Button
                                                                color='primary'
                                                                isLight
                                                                className='dropdown-toggle'
                                                                data-bs-toggle='dropdown'
                                                                aria-expanded='false'>
                                                                <Icon icon='MoreVert' />
                                                            </Button>
                                                            <ul className='dropdown-menu'>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleView(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Visibility'
                                                                            className='me-2'
                                                                        />
                                                                        View
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleEdit(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Edit'
                                                                            className='me-2'
                                                                        />
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleDuplicate(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='ContentCopy'
                                                                            className='me-2'
                                                                        />
                                                                        Duplicate
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleGanttChart(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Timeline'
                                                                            className='me-2'
                                                                        />
                                                                        Gantt Chart
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handlePublicGanttChart(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Public'
                                                                            className='me-2'
                                                                        />
                                                                        Public Gantt Chart
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handlePublicTaskBoard(
                                                                                index,
                                                                            )
                                                                        }>
                                                                        <Icon
                                                                            icon='Dashboard'
                                                                            className='me-2'
                                                                        />
                                                                        Public Task Board
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handlePinProject(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='PushPin'
                                                                            className='me-2'
                                                                        />
                                                                        Pin Project
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleArchive(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Archive'
                                                                            className='me-2'
                                                                        />
                                                                        Archive
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleDelete(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Delete'
                                                                            className='me-2'
                                                                        />
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className='text-center'>
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={filteredProjects}
                                label='items'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>
            <CustomerEditModal
                setIsOpen={setEditModalStatus}
                isOpen={editModalStatus}
                onAddProject={handleAddProject}
            />
            <ImportModal isOpen={importModalStatus} setIsOpen={setImportModalStatus} />
            <CopyProjectModal
                isOpen={copyModalStatus}
                setIsOpen={setCopyModalStatus}
                projectData={selectedProject}
                onDuplicate={handleDuplicateSubmit}
            />
            <ConfirmationModal
                isOpen={confirmationModalOpen}
                setIsOpen={setConfirmationModalOpen}
                title='Are you sure?'
                message='Do you want to pin this project?'
                onConfirm={confirmPinProject}
            />
            <ProjectViewModal
                isOpen={viewModalOpen}
                setIsOpen={setViewModalOpen}
                project={selectedProject}
            />
            <TaskBoardModal
                isOpen={taskBoardOpen}
                setIsOpen={setTaskBoardOpen}
            />
            <PublicGanttChartModal
                isOpen={publicGanttOpen}
                setIsOpen={setPublicGanttOpen}
                projectName={publicGanttProject?.projectName}
            />
            <GanttChartModal
                isOpen={ganttOpen}
                setIsOpen={setGanttOpen}
                projectName={ganttProject?.projectName}
            />
        </PageWrapper>
    );
};

export default ProjectPage;