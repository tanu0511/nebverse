
import React from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import { Project } from './ProjectsContext';

interface ProjectViewModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    project: Project | null;
}

const ProjectViewModal: React.FC<ProjectViewModalProps> = ({ isOpen, setIsOpen, project }) => (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
        <div className="modal-header">
            <h5 className="modal-title">Project Overview</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)} />
        </div>
        <div className="modal-body">
            {project && (
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-bold mb-2">Project Progress</div>
                                            <div>0% Progress</div>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Start Date</div>
                                            <div>{project.startDate || '-'}</div>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Deadline</div>
                                            <div>{project.deadline || '-'}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <CardBody className="text-center">
                                    <Icon icon="Person" size="2x" />
                                    <div>- No client assigned to the project -</div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <Card>
                                <CardBody className="text-center">
                                    <Icon icon="Info" size="2x" />
                                    <div>- Not enough data -</div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <CardBody>
                                    <div className="fw-bold">Statistics</div>
                                    <div>Project Budget: 0</div>
                                    <div>Hours Logged: 0Hour(s) 0Minute(s)</div>
                                    <div>Earnings: ₹0.00</div>
                                    <div>Expenses: ₹0.00</div>
                                    <div>Profit: ₹0.00</div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Card>
                                <CardBody>
                                    <div className="fw-bold">Hours Logged</div>
                                    <div>Planned: 0 | Actual: 0</div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <CardBody>
                                    <div className="fw-bold">Project Budget</div>
                                    <div>Planned: 0 | Actual: 0</div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <CardBody>
                                    <div className="fw-bold">Project Details</div>
                                    {/* Add more details as needed */}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </Modal>
);

export default ProjectViewModal;