/* eslint-disable prettier/prettier */
import React from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TimesheetLifecycleModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Timesheet Lifecycle</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-row align-items-center justify-content-center" style={{ gap: 24 }}>
                            <div className="d-flex flex-row align-items-center">
                                <Button color="light" className="me-2" isDisable>
                                    <Icon icon="Work" className="me-2" /> Work
                                </Button>
                                <span className="mx-2">--&gt;</span>
                                <Button color="light" className="me-2" isDisable>
                                    <Icon icon="Assignment" className="me-2" /> Time Sheet
                                </Button>
                                <span className="mx-2">--&gt;</span>
                                <Button color="light" className="me-2" isDisable>
                                    <Icon icon="AccessTime" className="me-2" /> Log Time For Tasks
                                </Button>
                                <span className="mx-2">--&gt;</span>
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <Button color="light" className="me-2" isDisable>
                                            <Icon icon="Receipt" className="me-2" /> Billable
                                        </Button>

                                        <span className="mx-2">-----&gt;</span>
                                        <Button color="light" className="me-2" isDisable>
                                            <Icon icon="Receipt" className="me-2" /> Include Time Entries In Invoice
                                        </Button>
                                        <span className="mx-2">--&gt;</span>
                                        <Button color="light" className="me-2" isDisable>
                                            <Icon icon="CheckCircle" className="me-2" /> Get Paid
                                        </Button>
                                    </div>
                                    <span className="mx-2">¦</span>
                                    <span className="mx-2">¦</span>
                                    <div className="d-flex align-items-center">
                                        <Button color="light" className="me-2" isDisable>
                                            <Icon icon="Receipt" className="me-2" /> Non-Billable
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button color="secondary" type="button" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimesheetLifecycleModal;