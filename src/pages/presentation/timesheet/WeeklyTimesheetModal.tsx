import React from 'react';
import Button from '../../../components/bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const WeeklyTimesheetModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); 
      if (!isOpen) return null;
    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Weekly Timesheet</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                        <Button
                                color="secondary"
                                onClick={() => {
                                    onClose(); // Optionally close the modal
                                    navigate('/PendingApprovalPage'); // 3. Navigate to Pending Approval page
                                }}
                            >
                                Approve Timesheets <span className="badge bg-warning text-dark ms-1">0</span>
                            </Button>
                        </div>
                        <div className="card p-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div>
                                    <Button color="light" className="me-2">{'<'}</Button>
                                    <span className="fw-bold">21 Apr - 27 Apr</span>
                                    <Button color="light" className="ms-2">{'>'}</Button>
                                </div>
                                <span className="badge bg-success fs-6">Approved</span>
                            </div>
                            <table className="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th className="text-center">21<br /><span className="text-muted small">Monday<br />Apr</span></th>
                                        <th className="text-center">22<br /><span className="text-muted small">Tuesday<br />Apr</span></th>
                                        <th className="text-center">23<br /><span className="text-muted small">Wednesday<br />Apr</span></th>
                                        <th className="text-center">24<br /><span className="text-muted small">Thursday<br />Apr</span></th>
                                        <th className="text-center">25<br /><span className="text-muted small">Friday<br />Apr</span></th>
                                        <th className="text-center">26<br /><span className="text-muted small">Saturday<br />Apr</span></th>
                                        <th className="text-center">27<br /><span className="text-muted small">Sunday<br />Apr</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select className="form-select">
                                                <option>Task</option>
                                            </select>
                                        </td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-center">0.00</td>
                                        <td className="text-center">--</td>
                                        <td className="text-center">--</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Total</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                        <th className="text-center">0.00 hrs</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyTimesheetModal;