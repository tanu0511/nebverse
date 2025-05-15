/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
}


const formatTotalHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h > 0 ? `${h}h ` : ''}${m}m`;
};

const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '';
    const d = new Date(dateTime);
    return d.toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

const groupByEmployee = (data: any[]) => {
    const map: { [employee: string]: any[] } = {};
    data.forEach(row => {
        if (!map[row.employee]) map[row.employee] = [];
        map[row.employee].push(row);
    });
    return map;
};

const TimesheetSummaryPage: React.FC<Props> = ({ isOpen, onClose, onEdit, onDelete }) => {
    if (!isOpen) return null;

    // Read table data from localStorage
    const tableData = useMemo(() => {
        const saved = localStorage.getItem('timesheetTableData');
        return saved ? JSON.parse(saved) : [];
    }, []);

    // Group by employee
    const employeeMap = groupByEmployee(tableData);
    const employeeNames = Object.keys(employeeMap);

    // Expand/collapse state for each employee
    const [expanded, setExpanded] = useState<{ [employee: string]: boolean }>({});

    const toggleExpand = (employee: string) => {
        setExpanded(prev => ({
            ...prev,
            [employee]: !prev[employee],
        }));
    };

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Timesheet Summary</h5>
                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">
                        {employeeNames.length === 0 && (
                            <div className="text-center text-muted">No entries found.</div>
                        )}
                        {employeeNames.map(employee => {
                            const rows = employeeMap[employee];
                            const totalHours = rows.reduce((sum, row) => sum + (row.totalHours || 0), 0);
                            const totalEarnings = rows.reduce((sum, row) => sum + (row.earnings || 0), 0);
                            const isYou = true; // Add your logic if needed
                            return (
                                <div className="mb-4" key={employee}>
                                    <div className="card p-3 d-flex flex-row align-items-center justify-content-between" style={{ minHeight: 70 }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="rounded-circle bg-light d-inline-block" style={{ width: 32, height: 32 }}>
                                                <Icon icon="AccountCircle" size="lg" />
                                            </span>
                                            <span className="fw-medium">{employee}</span>
                                            {isYou && (
                                                <span className="badge bg-secondary ms-2" style={{ fontSize: 12 }}>It's you</span>
                                            )}
                                        </div>
                                        <div className="border-start border-end px-4 text-center flex-grow-1">
                                            <span className="fw-bold" style={{ fontSize: 18 }}>{formatTotalHours(totalHours)}</span>
                                            <span className="ms-2 text-muted">Logged</span>
                                        </div>
                                        <div className="border-end px-4 text-center">
                                            <span className="fw-bold" style={{ fontSize: 18 }}>₹{totalEarnings.toFixed(2)}</span>
                                            <span className="ms-2 text-muted">Earnings</span>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                isLight
                                                icon={expanded[employee] ? "Remove" : "Add"}
                                                onClick={() => toggleExpand(employee)}
                                            />
                                        </div>
                                    </div>
                                    {expanded[employee] && (
                                        <div className="mt-2">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Task</th>
                                                        <th>Time</th>
                                                        <th>Total Hours</th>
                                                        <th>Earnings</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
    {rows.map((row, idx) => (
        <tr key={idx}>
            <td>
                <div>{row.task}</div>
                <div className="text-muted small">Task</div>
            </td>
            <td>
                <div>{formatDateTime(row.startTime)}</div>
                <div className="text-muted small">{formatDateTime(row.endTime)}</div>
            </td>
            <td>{formatTotalHours(row.totalHours)}</td>
            <td>
                ₹{row.earnings?.toFixed(2) ?? '0.00'}{' '}
                <Icon icon="CheckCircle" color="primary" />
            </td>
            <td>
                <Dropdown>
                    <DropdownToggle hasIcon={false}>
                        <Button color="secondary" size="sm" className="ms-2">
                            <Icon icon="MoreVert" />
                        </Button>
                    </DropdownToggle>
                    <DropdownMenu isAlignmentEnd>
                        <Button
                            color="link"
                            className="dropdown-item"
                            onClick={() => onEdit(row)}
                        >
                            <Icon icon="Edit" className="me-2" /> Edit
                        </Button>
                        <Button
                            color="link"
                            className="dropdown-item text-danger"
                            onClick={() => onDelete(row)}
                        >
                            <Icon icon="Delete" className="me-2" /> Delete
                        </Button>
                    </DropdownMenu>
                </Dropdown>
            </td>
        </tr>
    ))}
</tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="modal-footer">
                        <Button color="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimesheetSummaryPage;