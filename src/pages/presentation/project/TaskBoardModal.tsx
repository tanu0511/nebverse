import React from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';

interface TaskBoardModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    projectName?: string;
}

const columns = [
    { label: 'To Do', color: 'warning' },
    { label: 'abc', color: 'danger' },
    { label: 'Incomplete', color: 'danger' },
    { label: 'Doing', color: 'info' },
    { label: 'Completed', color: 'success' },
];

const TaskBoardModal: React.FC<TaskBoardModalProps> = ({ isOpen, setIsOpen, projectName }) => (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
        <div className="modal-header">
            <h5 className="modal-title">{projectName || 'Task Board'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
        </div>
        <div className="modal-body" style={{ background: '#f6f8fa' }}>
            <div className="row">
                {columns.map((col) => (
                    <div className="col" key={col.label}>
                        <Card className="mb-3">
                            <CardBody>
                                <div className="d-flex align-items-center mb-2">
                                    <span className={`badge bg-${col.color} me-2`} style={{ width: 12, height: 12, borderRadius: '50%' }} />
                                    <strong>{col.label}</strong>
                                    <span className="badge bg-light text-dark ms-2">0</span>
                                </div>
                                <div className="text-center" style={{ minHeight: 120 }}>
                                    <Icon icon="FormatListBulleted" className="mb-2" />
                                    <div>- No record found. -</div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    </Modal>
);

export default TaskBoardModal;