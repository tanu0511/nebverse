/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Card, {
    CardBody,
    CardFooter,
    CardHeader,
} from '../../../components/bootstrap/Card';
import ProjectEditModal from './ProjectEditModal';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import { demoPagesMenu } from '../../../menu';
import './TaskMangmentPage.css'; 
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from '../../../components/bootstrap/Button';

const TaskManagementPage: React.FC = () => {
    const navigate = useNavigate();
    type ColumnType = string | { name: string; color: string };
    const [columns, setColumns] = useState<ColumnType[]>([
        'Incomplete',
        'To Do',
        'Doing',
        'Complete',
        'Waiting for Approval',
    ]);
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const [newColumnPosition, setNewColumnPosition] = useState('Before To Do');
    const [newColumnColor, setNewColumnColor] = useState('#FF0000');
    const [editingColumnIndex, setEditingColumnIndex] = useState<number | null>(null);

    // Function to add a new task
    const handleAddColumn = () => {
        if (!newColumnName.trim()) {
            alert('Column name is required!');
            return;
        }

        const updatedColumns = [...columns];
        const newColumn = { name: newColumnName, color: newColumnColor };

        if (editingColumnIndex !== null) {
            // Edit mode
            updatedColumns[editingColumnIndex] = newColumn;
        } else {
            // Add mode (your existing logic)
            if (newColumnPosition === 'Before To Do') {
                const positionIndex = columns.findIndex(col => (typeof col === 'object' ? col.name : col) === 'To Do');
                if (positionIndex !== -1) {
                    updatedColumns.splice(positionIndex, 0, newColumn);
                }
            } else if (newColumnPosition.startsWith('After')) {
                const targetColumn = newColumnPosition.replace('After ', '');
                const positionIndex = columns.findIndex(col => (typeof col === 'object' ? col.name : col) === targetColumn);
                if (positionIndex !== -1) {
                    updatedColumns.splice(positionIndex + 1, 0, newColumn);
                }
            }
        }

        setColumns(updatedColumns);
        setIsStatusModalOpen(false);
        setNewColumnName('');
        setNewColumnColor('#FF0000');
        setNewColumnPosition('Before To Do');
        setEditingColumnIndex(null);
    };

    // Example for adding a task
    const handleAddTask = (newTask: any) => {
        setTasks((prev: any[]) => [...prev, newTask]);
    };

    // Example for editing a task
    const handleEditTask = (updatedTask: any, index: number) => {
        setTasks((prev: any[]) => prev.map((task, i) => i === index ? updatedTask : task));
    };

    // Example for deleting a task
    const handleDeleteTask = (index: number) => {
        setTasks((prev: any[]) => prev.filter((_, i) => i !== index));
    };

    const openModalWithStatus = (status: string) => {
        setDefaultStatus(status);
        setIsModalOpen(true);
    };

    const handleDeleteColumn = (index: number) => {
        // Optionally: prevent deleting if only one column left
        if (columns.length === 1) {
            alert("At least one column is required.");
            return;
        }
        // Remove column at index
        const updatedColumns = columns.filter((_, i) => i !== index);
        setColumns(updatedColumns);
        // Optionally: remove tasks with this status
        const colName = typeof columns[index] === 'object' ? columns[index].name : columns[index];
        setTasks(tasks.filter((task: any) => task.status !== colName));
    };

    useEffect(() => {
        localStorage.setItem('statusColumns', JSON.stringify(columns));
    }, [columns]);

    // Listen for changes from other tabs/components
    useEffect(() => {
        const updateTasks = () => {
            const saved = localStorage.getItem('tasks');
            setTasks(saved ? JSON.parse(saved) : []);
        };
        window.addEventListener('storage', updateTasks);
        return () => window.removeEventListener('storage', updateTasks);
    }, []);

    // When tasks change, save to localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container  md-5">
            <SubHeader>
                <SubHeaderLeft>
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <div>
                            <Button
                                color="primary"
                                isLight
                                onClick={() => openModalWithStatus('Incomplete')}
                                style={{ marginRight: '16px' }}
                            >
                                + Add Task
                            </Button>
                        </div>
                        <div>
                            <Button color="primary" isLight onClick={() => setIsStatusModalOpen(true)}>
                                + Add Status Column
                            </Button>
                        </div>
                    </div>
                </SubHeaderLeft>
                <SubHeaderRight>
                    <ButtonGroup>
                    <Button
                        icon="list"
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
                        onClick={() => navigate(demoPagesMenu.listPages.subMenu.listBoxed.path)}
                    />
                    </ButtonGroup>
                </SubHeaderRight>
            </SubHeader>

            <div
                className="d-flex overflow-auto task-scroll-thin"
                style={{
                    whiteSpace: 'nowrap',
                    gap: '16px',
                    paddingBottom: '16px',
                }}
            >
                {columns.map((column, index) => {
                    const colName = typeof column === 'object' ? column.name : column;
                    const colColor = typeof column === 'object' ? column.color : '#ffe4ec';

                    const tasksForColumn = tasks.filter((task: any) => {
                        const status = typeof task.status === 'object' ? task.status.name : task.status;
                        return status === colName;
                    });

                    return (
                        <div
                            key={colName}
                            className="flex-shrink-0"
                            style={{
                                width: '300px',
                            }}
                        >
                            <Card
                                borderColor="primary"
                                className="mt-5 mb-5"
                                borderSize={1}
                                shadow="sm"
                                stretch={true}
                                style={{ backgroundColor: colColor }}
                            >
                                <CardHeader className="d-flex justify-content-between align-items-center" size='lg' style={{ backgroundColor: colColor }}>
                                    <span>{colName}</span>
                                    <span className="badge bg-secondary">
                                        {tasks.filter((task: any) => task.status === colName).length}
                                    </span>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="light" size="sm" style={{ border: 'none', background: 'transparent' }}>
                                            <span style={{ fontSize: 16, fontWeight: 'bold' }}>⋮</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => openModalWithStatus(colName)}>Add Task</Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={() => {
                                                setEditingColumnIndex(index);
                                                const col = columns[index];
                                                setNewColumnName(typeof col === 'object' ? col.name : col);
                                                setNewColumnColor(typeof col === 'object' ? col.color : '#ffe4ec');
                                                setIsStatusModalOpen(true);
                                              }}
                                            >
                                              Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteColumn(index)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </CardHeader>
                                <CardBody style={{ backgroundColor: colColor }}>
                                    {tasksForColumn.map((task: any) => (
                                            <Card key={task.id} className="mb-2">
                                                <CardBody>
                                                    <h6>{task.title}</h6>
                                                    <p className="text-muted">{task.description}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="badge bg-light text-dark">Task</span>
                                                        <span className="text-muted">{task.dueDate}</span>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))}
                                </CardBody>
                                <CardFooter style={{ backgroundColor: colColor }}>
                                    <Button
                                        color="primary"
                                        isOutline
                                        className="w-100 mt-2"
                                        onClick={() => openModalWithStatus(colName)}
                                        style={{ backgroundColor: "#fcf5f7" }}
                                    >
                                        + Add Task
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    );
                })}
            </div>
            {isStatusModalOpen && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Status Column</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsStatusModalOpen(false)}
                                />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="columnName" className="form-label">
                                            Column Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="columnName"
                                            className="form-control"
                                            value={newColumnName}
                                            onChange={(e) => setNewColumnName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="columnPosition" className="form-label">
                                            Board Column Position
                                        </label>
                                        <select
                                            id="columnPosition"
                                            className="form-select"
                                            value={newColumnPosition}
                                            onChange={(e) => setNewColumnPosition(e.target.value)}
                                        >
                                            <option value="Before To Do">Before To Do</option>
                                            {columns.map((column) => {
                                                const colName = typeof column === 'object' ? column.name : column;
                                                return (
                                                    <option key={`After ${colName}`} value={`After ${colName}`}>
                                                        After {colName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="columnColor" className="form-label">
                                            Label Color <span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="text"
                                                id="columnColor"
                                                className="form-control"
                                                value={newColumnColor}
                                                onChange={e => setNewColumnColor(e.target.value)}
                                                style={{ maxWidth: 120, marginRight: 8 }}
                                                required
                                            />
                                            <input
                                                type="color"
                                                value={newColumnColor}
                                                onChange={e => setNewColumnColor(e.target.value)}
                                                style={{ width: 40, height: 40, border: 'none', background: 'none' }}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    color="light"
                                    onClick={() => {
                                        setIsStatusModalOpen(false);
                                        setEditingColumnIndex(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleAddColumn}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ProjectEditModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSubmit={handleAddTask}
                defaultStatus={defaultStatus}
                columns={columns.map(col => typeof col === 'object' ? col.name : col)}
            />
        </div>
    );
};

export default TaskManagementPage;