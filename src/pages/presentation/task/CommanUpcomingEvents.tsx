/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { FC, useEffect, useState } from 'react';
import Card, {
    CardBody,
} from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from "../../../menu";
import ProjectEditModal from './ProjectEditModal';
import { Modal, ModalTitle } from 'react-bootstrap';

import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import TaskDetailsModal from './TaskDetailsModal';
import { ButtonGroup } from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons'; // Import the PaginationButtons component
interface ICommonUpcomingEventsProps {
    isFluid?: boolean;
}


const CommonUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
    useDarkMode();
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const updateTasks = () => {
            const saved = localStorage.getItem('tasks');
            setTableData(saved ? JSON.parse(saved) : []);
        };
        updateTasks(); // <-- Load tasks on mount
        window.addEventListener('storage', updateTasks);
        return () => window.removeEventListener('storage', updateTasks);
    }, []);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const navigate = useNavigate();
    const [columns, setColumns] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('statusColumns');
        setColumns(saved ? JSON.parse(saved) : []);
    }, []);

    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tableData));
}, [tableData]);


    const handleStatusChange = (index: number, newStatus: string) => {
        setTableData((prevData) =>
            prevData.map((task, i) =>
                i === index ? { ...task, status: newStatus } : task
            )
        );
    };
    const handleAction = (index: number, action: string) => {
        if (action === 'view') {
            setSelectedTask(tableData[index]); // Set the selected task
            setIsViewModalOpen(true); // Open the modal
        } else if (action === 'edit') {
            setSelectedTask({ ...tableData[index], index }); // Pass the task and its index
            setEditingIndex(index); // Set the index of the row being edited
            setIsModalOpen(true);
        } else if (action === 'duplicate') {
            setSelectedTask({ ...tableData[index] }); // Pre-fill the form with the duplicated task's data
            setEditingIndex(null); // Ensure a new row is created
            setIsModalOpen(true); // Open the modal
        } else if (action === 'delete') {
            setTableData((prevData) => prevData.filter((_, i) => i !== index));
        }
    };

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Added state for isModalOpen
    const [defaultStatus, setDefaultStatus] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the row being edited
    const [defaultValues, setDefaultValues] = useState(null);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false); // Track if the pin confirmation modal is open
    const [pinningIndex, setPinningIndex] = useState<number | null>(null); // Track the row being pinned
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10); // or PER_COUNT['10'] if you use that constant

    const handlePinTask = (index: number) => {
        setTableData((prevData) => {
            const updatedData = prevData.map((row, i) =>
                i === index ? { ...row, isPinned: !row.isPinned } : row
            );

            // Sort the table so pinned rows are at the top
            return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
        });

        // Only show the confirmation modal for pinning, not unpinning
        if (!tableData[index].isPinned) {
            setPinningIndex(index); // Set the index of the row being pinned
            setIsPinModalOpen(true); // Open the confirmation modal
        }
    };

    const confirmPinTask = () => {
        if (pinningIndex !== null) {
            setTableData((prevData) => {
                const updatedData = prevData.map((row, i) =>
                    i === pinningIndex ? { ...row, isPinned: true } : row
                );

                // Sort the table so pinned rows are at the top
                return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
            });
        }
        setIsPinModalOpen(false); // Close the confirmation modal
        setPinningIndex(null); // Reset the pinning index
    };
    const handleEdit = (index: number) => {
        setEditingIndex(index); // Set the index of the row being edited
        setDefaultValues(tableData[index]); // Pass the row data to the modal
        setIsModalOpen(true);
    };
    // const [isProjectModalOpen2, setIsProjectModalOpen2] = useState(false);
    const openModalWithStatus = (status: string) => {
        setDefaultStatus(status); // Set the default status
        setIsModalOpen(true); // Open the modal
    };
    // When submitting the form
    const handleModalSubmit = (updatedData: any, index: number | null) => {
        // updatedData.labelColor should be set to the selected color from the label form
        // Example: updatedData.labelColor = "#BFFF00";
        if (index !== null) {
            // Update the existing row
            setTableData((prevData) =>
                prevData.map((row, i) => (i === index ? updatedData : row))
            );
        } else {
            // Add a new row
            setTableData((prevData) => [...prevData, updatedData]);
        }
        setIsModalOpen(false);
    };




    const getStatusColor = (status: string) => {
        const found = columns.find((col: any) =>
            typeof col === 'object' ? col.name === status : col === status
        );
        return found && typeof found === 'object' ? found.color : '#ffe4ec';
    };

    // const defaultStatus = { name: 'Pending', color: 'warning' }; // Define defaultStatus

    return (
        
        <PageWrapper>
                    <SubHeader>
                        <SubHeaderLeft>
                            <Button
                                icon="Add"
                                color="primary"
                                isLight
                                className="btn-icon-only"
                                onClick={() => openModalWithStatus('Incomplete')}
                            >
                                Add Tasks
                            </Button>
                            <Button icon='Layers' color='primary' isLight >
                                My Task
                            </Button>
                            <Button
                                color='info'
                                icon='CloudDownload'
                                isLight
                                tag='a'
                                to='/somefile.txt'
                                target='_blank'
                                download>
                                Export
                            </Button>

                        </SubHeaderLeft>
                        <SubHeaderRight>
                            <ButtonGroup>

                        
                            <Button
                                icon="List"
                                color="info"
                                isLight
                                                        />
                            <Button
                                icon="Assessment"
                                color="info"
                                isLight
                                onClick={() => navigate('/task-management')}
                            />
                            <Button
                                icon="CalendarToday"
                                color="info"
                                isLight
                                onClick={() => navigate('/calendar')}
                            />
                            <Button
                                icon="AssignmentLate"
                                color="info"
                                isLight
                                onClick={() => navigate(`${demoPagesMenu.listPages.subMenu.listBoxed.path}`)}
                            />
                                </ButtonGroup>
                        </SubHeaderRight>
                    </SubHeader>
<Page>         
    <div className='row h-100'>
        <div className='col-12'>
            <Card stretch>
               <CardBody isScrollable className='table-responsive' style={{ overflow: 'visible' }}>
                        <table className="table table-modern">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Task</th>
                                    <th>Completed On</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Estimate Time</th>
                                    <th>Hours Logged</th>
                                    <th>Assigned To</th>
                                    <th>Stauts</th>
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {dataPagination(tableData, currentPage, perPage).length > 0 ? (
    dataPagination(tableData, currentPage, perPage).map((task, index) => (
                                        <tr key={index}>
                                            <td>--</td>
                                            <td>
                                                {/* Project Name always visible */}
                                                {task.project && (
                                                    <div
                                                        style={{
                                                            fontWeight: 600,
                                                            color: "#3730a3",
                                                            fontSize: "0.95rem",
                                                            marginBottom: 2,
                                                        }}
                                                    >
                                                       { console.log(task)}
                                                        {task.project}
                                                    </div>
                                                )}
                                                {/* Label as colored badge */}
                                                {task.label && (
                                                    <span
                                                        style={{
                                                            background: task.labelColor || "#6366f1",
                                                            color: "#fff",
                                                            borderRadius: 6,
                                                            padding: "2px 10px",
                                                            fontSize: "0.85rem",
                                                            fontWeight: 500,
                                                            marginRight: 6,
                                                            display: "inline-block",
                                                            marginBottom: 4,
                                                        }}
                                                    >
                                                        {task.label}
                                                    </span>
                                                )}
                                                {/* Task Title (not number) */}
                                                <div>{task.title}</div>
                                                {task.isPinned && (
                                                    <div className="text-primary mt-1">
                                                        <strong>Pinned</strong>
                                                    </div>
                                                )}
                                            </td>
                                            <td>--</td>
                                            <td>{task.startDate}</td>
                                            <td>{task.dueDate}</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>


                                            <td>
                                                <Dropdown>
                                                    <DropdownToggle>
                                                        <span className="d-flex align-items-center">
                                                            <span
                                                                className="me-2"
                                                                style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: getStatusColor(task.status),
                                                                }}
                                                            />
                                                            {task.status}
                                                        </span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {columns.map(col => (
                                                          <DropdownItem key={col.name} onClick={() => handleStatusChange(index, col.name)}>
                                                            <span className="d-flex align-items-center">
                                                              <span
                                                                className="me-2"
                                                                style={{
                                                                  width: '10px',
                                                                  height: '10px',
                                                                  borderRadius: '50%',
                                                                  backgroundColor: col.color,
                                                                }}
                                                              />
                                                              {col.name}
                                                            </span>
                                                          </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                            <td>
                                                <Dropdown>
                                                    <DropdownToggle hasIcon={false}>
                                                        <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                                                    </DropdownToggle>
                                                    <DropdownMenu isAlignmentEnd>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleAction(index, 'view')}
                                                        >
                                                            <Icon icon="RemoveRedEye" className="me-2" /> View
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleEdit(index)}
                                                        >
                                                            <Icon icon="Edit" className="me-2" /> Edit
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleAction(index, 'duplicate')}
                                                        >
                                                            <Icon icon="ContentCopy" className="me-2" /> Duplicate
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handlePinTask(index)}
                                                        >
                                                            <Icon icon="PushPin" className="me-2" />
                                                            {task.isPinned ? "Unpin Task" : "Pin Task"}
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item text-danger"
                                                            onClick={() => handleAction(index, 'delete')}
                                                        >
                                                            <Icon icon="Delete" className="me-2" /> Delete
                                                        </Button>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="text-center">
                                            No tasks available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                    </CardBody>
                      <PaginationButtons
    data={tableData}
    label="Tasks"
    setCurrentPage={setCurrentPage}
    currentPage={currentPage}
    perPage={perPage}
    setPerPage={setPerPage}
            />
                    </Card>
                    </div>
    </div>
              </Page>

            <ProjectEditModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSubmit={(data) => handleModalSubmit(data, editingIndex)} // Pass index to onSubmit
                defaultValues={selectedTask} // Pass default values for editing
                defaultStatus={defaultStatus}
                columns={columns} // Pass the columns array
            />
            <TaskDetailsModal
                task={selectedTask}
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            />
            <Modal show={isPinModalOpen} onHide={() => setIsPinModalOpen(false)}>
                <Modal.Header closeButton>
                    <ModalTitle>Are you sure?</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    Do you want to pin this task?
                </Modal.Body>
                <Modal.Footer>
                    <Button color="secondary" onClick={() => setIsPinModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={confirmPinTask}>
                        Yes, Pin It!
                    </Button>
                </Modal.Footer>
            </Modal>
          

        </PageWrapper>
    );
};

export default CommonUpcomingEvents;