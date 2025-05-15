/* eslint-disable react/self-closing-comp */
import React from 'react';
import Button from '../../../components/bootstrap/Button';

interface TaskDetailsModalProps {
    task: any;
    isOpen: boolean;
    onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose }) => {
    if (!task) return null;

    return (
        <div className={`modal ${isOpen ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Task</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <h4>{task.title}</h4>
                        <Button color="primary" className="mb-3">
                            Mark As Complete
                        </Button>
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Project:</strong> {task.project || '--'}
                                </p>
                                <p>
                                    <strong>Priority:</strong>{' '}
                                    <span style={{ color: task.priorityColor || 'yellow' }}>
                                        {task.priority || 'Medium'}
                                    </span>
                                </p>
                                <p>
                                    <strong>Assigned To:</strong> {task.assignedTo || '--'}
                                </p>
                                <p>
                                    <strong>Short Code:</strong> {task.shortCode || '--'}
                                </p>
                                <p>
                                    <strong>Milestones:</strong> {task.milestones || '--'}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    <strong>Created On:</strong> {task.createdOn || '--'}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {task.startDate || '--'}
                                </p>
                                <p>
                                    <strong>Due Date:</strong> {task.dueDate || '--'}
                                </p>
                                <p>
                                    <strong>Hours Logged:</strong> {task.hoursLogged || '0s'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;