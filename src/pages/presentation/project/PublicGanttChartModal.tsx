import React from 'react';
import Modal from '../../../components/bootstrap/Modal';

interface PublicGanttChartModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    projectName?: string;
}

const PublicGanttChartModal: React.FC<PublicGanttChartModalProps> = ({ isOpen, setIsOpen, projectName }) => (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
        <div className="modal-header">
            <h5 className="modal-title">{projectName ? `${projectName} Gantt Chart` : 'Gantt Chart'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
        </div>
        <div className="modal-body" style={{ background: '#f6f8fa', minHeight: 500 }}>
            <div className="mb-2">
                <input type="checkbox" id="hide-completed" className="me-2" />
                <label htmlFor="hide-completed">Hide completed task</label>
            </div>
            <div className="table-responsive" style={{ background: '#fff', borderRadius: 4 }}>
                <table className="table table-bordered align-middle mb-0" style={{ minWidth: 1200 }}>
                    <thead>
                        <tr>
                            <th style={{ width: 200 }}>Task name</th>
                            <th style={{ width: 120 }}>Start time</th>
                            <th style={{ width: 120 }}>Duration</th>
                            <th colSpan={3} className="text-center" style={{ minWidth: 600 }}>
                                12 May, 25 - 18 May, 25
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th />
                            <th />
                            <th className="text-primary">14, Wed</th>
                            <th className="text-primary">
                                15, Thu <span className="badge bg-danger ms-1">Today</span>
                            </th>
                            <th className="text-primary">16, Fri</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6} style={{ height: 400, background: '#fff' }} />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-2 text-muted" style={{ fontSize: 13 }}>
                © 2025 | rana
            </div>
        </div>
    </Modal>
);

export default PublicGanttChartModal;