/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/react-in-jsx-scope */
import { FC, useEffect, useState } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import useDarkMode from '../../../hooks/useDarkMode';
import ProjectEditModal from './ProjectEditModal';
import { Modal, ModalTitle } from 'react-bootstrap';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import TaskDetailsModal from './TaskDetailsModal';
import { ButtonGroup } from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';

const WaitingPage: FC = () => {
    useDarkMode();
    const [tableData, setTableData] = useState<any[]>([]);
    const [columns, setColumns] = useState<any[]>([]);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [defaultValues, setDefaultValues] = useState(null);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [pinningIndex, setPinningIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);

    const navigate = useNavigate();

    useEffect(() => {
        const updateTasks = () => {
            const saved = localStorage.getItem('tasks');
            setTableData(saved ? JSON.parse(saved) : []);
        };
        updateTasks();
        window.addEventListener('storage', updateTasks);
        return () => window.removeEventListener('storage', updateTasks);
    }, []);

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
            setSelectedTask(tableData[index]);
            setIsViewModalOpen(true);
        } else if (action === 'edit') {
            setSelectedTask({ ...tableData[index], index });
            setEditingIndex(index);
            setIsModalOpen(true);
        } else if (action === 'duplicate') {
            setSelectedTask({ ...tableData[index] });
            setEditingIndex(null);
            setIsModalOpen(true);
        } else if (action === 'delete') {
            setTableData((prevData) => prevData.filter((_, i) => i !== index));
        }
    };

    const handlePinTask = (index: number) => {
        setTableData((prevData) => {
            const updatedData = prevData.map((row, i) =>
                i === index ? { ...row, isPinned: !row.isPinned } : row
            );
            return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
        });
        if (!tableData[index]?.isPinned) {
            setPinningIndex(index);
            setIsPinModalOpen(true);
        }
    };

    const confirmPinTask = () => {
        if (pinningIndex !== null) {
            setTableData((prevData) => {
                const updatedData = prevData.map((row, i) =>
                    i === pinningIndex ? { ...row, isPinned: true } : row
                );
                return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
            });
        }
        setIsPinModalOpen(false);
        setPinningIndex(null);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setDefaultValues(tableData[index]);
        setIsModalOpen(true);
    };

    const openModalWithStatus = (status: string) => {
        setDefaultStatus(status);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (updatedData: any, index: number | null) => {
        if (index !== null) {
            setTableData((prevData) =>
                prevData.map((row, i) => (i === index ? updatedData : row))
            );
        } else {
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

    return (
        <PageWrapper title="Waiting Tasks">
            <SubHeader>
                <SubHeaderLeft>
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
                            onClick={() => navigate('/work/task')}
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
                            onClick={() => navigate(`/waiting`)}
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
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPagination(tableData, currentPage, perPage).length > 0 ? (
                                            dataPagination(tableData, currentPage, perPage).map((task, index) => (
                                                <tr key={index}>
                                                    <td>--</td>
                                                    <td>
                                                        {task.project && (
                                                            <div
                                                                style={{
                                                                    fontWeight: 600,
                                                                    color: "#3730a3",
                                                                    fontSize: "0.95rem",
                                                                    marginBottom: 2,
                                                                }}
                                                            >
                                                                {task.project}
                                                            </div>
                                                        )}
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
                                                <td colSpan={10} className="text-center">
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
                onSubmit={(data) => handleModalSubmit(data, editingIndex)}
                defaultValues={selectedTask}
                defaultStatus={defaultStatus}
                columns={columns}
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

export default WaitingPage;