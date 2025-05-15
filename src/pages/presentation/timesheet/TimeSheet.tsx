/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PaginationButtons from '../../../components/PaginationButtons';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import TimesheetLifecycleModal from './TimesheetLifecycleModal';
import TimesheetSummaryPage from './TimeSheetSummryPage';
import CalendarModal from './CalendarModal';
import WeeklyTimesheetModal from './WeeklyTimesheetModal';

const defaultForm = {
	project: '',
	task: '',
	employee: '',
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: '',
	memo: '',
	totalHours: 0,
	earnings: 0,
};

function calculateTotalHours(startDate: string, startTime: string, endDate: string, endTime: string) {
	if (!startDate || !startTime || !endDate || !endTime) return 0;
	const start = new Date(`${startDate}T${startTime}`);
	const end = new Date(`${endDate}T${endTime}`);
	const diffMs = end.getTime() - start.getTime();
	if (isNaN(diffMs) || diffMs < 0) return 0;
	return +(diffMs / (1000 * 60 * 60)).toFixed(2); // hours, 2 decimals
}

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

const formatTotalHours = (hours: number) => {
	const h = Math.floor(hours);
	const m = Math.round((hours - h) * 60);
	return `${h > 0 ? `${h}h ` : ''}${m}m`;
};

const TimeSheet = () => {
	const [tableData, setTableData] = useState<any[]>(() => {
		const saved = localStorage.getItem('timesheetTableData');
		return saved ? JSON.parse(saved) : [];
	});
	const [perPage, setPerPage] = useState(10); // Default items per page
	const [currentPage, setCurrentPage] = useState(1); // Default current page
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const [form, setForm] = useState(defaultForm);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [viewRow, setViewRow] = useState<any | null>(null);
	const [showLifecycle, setShowLifecycle] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);
	const [showWeeklyTimesheet, setShowWeeklyTimesheet] = useState(false);

	useEffect(() => {
		localStorage.setItem('timesheetTableData', JSON.stringify(tableData));
	}, [tableData]);
	const handleOpenModal = () => {
		setForm(defaultForm);
		setIsModalOpen(true);
	};

	const handleEdit = (index: number) => {
		setForm(tableData[index]);
		setEditIndex(index);
		setIsModalOpen(true);
	};

	const handleFieldChange = (field: string, value: string) => {
		const updatedForm = { ...form, [field]: value };
		// Calculate total hours if relevant fields change
		if (
			['startDate', 'startTime', 'endDate', 'endTime'].includes(field)
		) {
			updatedForm.totalHours = calculateTotalHours(
				updatedForm.startDate,
				updatedForm.startTime,
				updatedForm.endDate,
				updatedForm.endTime
			);
		}
		setForm(updatedForm);
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (editIndex !== null) {
			setTableData(prev => prev.map((row, idx) =>
				idx === editIndex
					? { ...form, id: row.id, code: row.code }
					: row
			));
			setEditIndex(null);
		} else {
			setTableData(prev => [
				...prev,
				{
					id: prev.length + 1,
					code: `TL${prev.length + 1}`,
					project: form.project,
					task: form.task,
					employee: form.employee,
					startTime: `${form.startDate}T${form.startTime}`,
					endTime: `${form.endDate}T${form.endTime}`,
					totalHours: form.totalHours,
					earnings: form.earnings,
					memo: form.memo,
				},
			]);
		}
		setIsModalOpen(false);
	};

	const handleDelete = (index: number) => {
		setTableData(prev => prev.filter((_, idx) => idx !== index));
	};


	// Summary calculation
	const totalHours = tableData.reduce((sum, row) => sum + (row.totalHours || 0), 0);
	const totalEarnings = tableData.reduce((sum, row) => sum + (row.earnings || 0), 0);
	const firstRow = tableData[0] || {};
	const userName = firstRow.employee || 'No Entries';
	const isYou = true;
	const formatTotalHours = (hours: number) => {
		const h = Math.floor(hours);
		const m = Math.round((hours - h) * 60);
		return `${h} Hours ${m} Minutes`;
	};


	interface DataItem {
		id: number;
		code: string;
		project: string;
		task: string;
		employee: string;
		startTime: string;
		endTime: string;
		totalHours: number;
		earnings: number;
		memo: string;
	}

	const filteredData: DataItem[] = tableData;

	return (
		<PageWrapper title="Time Log">
			<Page container="fluid">
				<div className="d-flex align-items-center gap-3 mb-4 mt-3">
					<Button color="primary" icon="Add" className="px-4" onClick={handleOpenModal}>
						Log Time
					</Button>
					<Button color="secondary" className="px-4">
						<Icon icon="CloudDownload" className="me-2" />Export
					</Button>
					<div className="ms-auto d-flex align-items-center gap-2">
						<Button color="primary" icon="List" isLight />
						<Button color="primary" icon="CalendarViewWeek" isLight onClick={() => setShowWeeklyTimesheet(true) }/>
						<Button color="primary" icon="CalendarToday" isLight onClick={() => setShowCalendar(true)} />
						<Button color="primary" icon="Person" isLight onClick={() => setShowSummary(true)} />
						<Button color="primary" icon="Help" isLight onClick={() => setShowLifecycle(true)} />
					</div>
				</div>
				<Card stretch>
					<CardBody isScrollable className="table-responsive">
						<table className="table table-modern table-hover">
							<thead>
								<tr>
									<th style={{ width: 40 }}>
										<input type="checkbox" />
									</th>
									<th style={{ width: 40 }}>#</th>
									<th>Code</th>
									<th>Task</th>
									<th>Employee</th>
									<th>Start Time</th>
									<th>End Time</th>
									<th>Total Hours</th>
									<th>Earnings</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{tableData.length === 0 ? (
									<tr>
										<td colSpan={10} className="text-center">
											No data available in table
										</td>
									</tr>
								) : (
									tableData.map((row, idx) => (
										<tr key={row.id}>
											<td>
												<input type="checkbox" />
											</td>
											<td>{idx + 1}</td>
											<td>{row.code}</td>
											<td>{row.task}</td>
											<td>{row.employee}</td>
											<td>{formatDateTime(row.startTime)}</td>
											<td>{formatDateTime(row.endTime)}</td>
											<td>{formatTotalHours(row.totalHours)}</td>
											<td>₹{row.earnings?.toFixed(2) ?? '0.00'}</td>
											<td>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button icon="MoreVert" color="primary" isLight className="btn-icon" />
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<Button
															color="link"
															className="dropdown-item"
															onClick={() => setViewRow(row)}
														>
															<Icon icon="RemoveRedEye" className="me-2" /> View
														</Button>
														<Button
															color="link"
															className="dropdown-item"
															onClick={() => handleEdit(idx)}
														>
															<Icon icon="Edit" className="me-2" /> Edit
														</Button>
														<Button
															color="link"
															className="dropdown-item text-danger"
															onClick={() => handleDelete(idx)}
														>
															<Icon icon="Delete" className="me-2" /> Delete
														</Button>
													</DropdownMenu>
												</Dropdown>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={filteredData}
						label="Employees"
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>

				{/* View Modal */}
				{viewRow && (
					<div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
						<div className="modal-dialog modal-xl">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">TimeLog Details</h5>
									<button type="button" className="btn-close" onClick={() => setViewRow(null)} />
								</div>
								<div className="modal-body">
									<div className="row">
										{/* Details Card */}
										<div className="col-md-8">
											<div className="card mb-3">
												<div className="card-body">
													<div className="mb-2"><strong>Start Time</strong>: {formatDateTime(viewRow.startTime)}</div>
													<div className="mb-2"><strong>End Time</strong>: {formatDateTime(viewRow.endTime)}</div>
													<div className="mb-2"><strong>Total Hours</strong>: {formatTotalHours(viewRow.totalHours)}</div>
													<div className="mb-2"><strong>Earnings</strong>: ₹{viewRow.earnings?.toFixed(2) ?? '0.00'}</div>
													<div className="mb-2"><strong>Memo</strong>: {viewRow.memo || '-'}</div>
													<div className="mb-2"><strong>Project</strong>: {viewRow.project || '-'}</div>
													<div className="mb-2"><strong>Task</strong>: {viewRow.task || '-'}</div>
													<div className="mb-2"><strong>Employee</strong>: {viewRow.employee || '-'}</div>
												</div>
											</div>
										</div>
										{/* History Card */}
										<div className="col-md-4">
											<div className="card">
												<div className="card-header fw-bold">History</div>
												<div className="card-body">
													<div className="mb-2">
														<Icon icon="AccessTime" className="me-2" />
														<strong>Start Time</strong>: {formatDateTime(viewRow.startTime)}
													</div>
													<div className="mb-2">
														<Icon icon="Assignment" className="me-2" />
														<strong>Task</strong>: {viewRow.task || '-'}
													</div>
													<div className="mb-2">
														<Icon icon="AccessTime" className="me-2" />
														<strong>End Time</strong>: {formatDateTime(viewRow.endTime)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<Button color="secondary" type="button" onClick={() => setViewRow(null)}>
										Close
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Add/Edit Modal */}
				{isModalOpen && (
					<div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<form onSubmit={handleSave}>
									<div className="modal-header">
										<h5 className="modal-title">TimeLog Details</h5>
										<button type="button" className="btn-close" onClick={() => { setIsModalOpen(false); setEditIndex(null); }} />
									</div>
									<div className="modal-body">
										<div className="row mb-3">
											<div className="col-md-4">
												<label className="form-label">Project</label>
												<select
													className="form-select"
													value={form.project}
													onChange={e => handleFieldChange('project', e.target.value)}
												>
													<option value="">--</option>
													<option value="Project A">Project A</option>
													<option value="Project B">Project B</option>
												</select>
											</div>
											<div className="col-md-4">
												<label className="form-label">Task <span className="text-danger">*</span></label>
												<select
													className="form-select"
													value={form.task}
													onChange={e => handleFieldChange('task', e.target.value)}
													required
												>
													<option value="">--</option>
													<option value="Design">Design</option>
													<option value="Development">Development</option>
												</select>
											</div>
											<div className="col-md-4">
												<label className="form-label">Employee <span className="text-danger">*</span></label>
												<select
													className="form-select"
													value={form.employee}
													onChange={e => handleFieldChange('employee', e.target.value)}
													required
												>
													<option value="">--</option>
													<option value="John Doe">John Doe</option>
													<option value="Jane Smith">Jane Smith</option>
												</select>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-md-3">
												<label className="form-label">Start Date <span className="text-danger">*</span></label>
												<input
													type="date"
													className="form-control"
													value={form.startDate}
													onChange={e => handleFieldChange('startDate', e.target.value)}
													required
												/>
											</div>
											<div className="col-md-3">
												<label className="form-label">Start Time <span className="text-danger">*</span></label>
												<input
													type="time"
													className="form-control"
													value={form.startTime}
													onChange={e => handleFieldChange('startTime', e.target.value)}
													required
												/>
											</div>
											<div className="col-md-3">
												<label className="form-label">End Date <span className="text-danger">*</span></label>
												<input
													type="date"
													className="form-control"
													value={form.endDate}
													onChange={e => handleFieldChange('endDate', e.target.value)}
													required
												/>
											</div>
											<div className="col-md-3">
												<label className="form-label">End Time <span className="text-danger">*</span></label>
												<input
													type="time"
													className="form-control"
													value={form.endTime}
													onChange={e => handleFieldChange('endTime', e.target.value)}
													required
												/>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-md-8">
												<label className="form-label">Memo <span className="text-danger">*</span></label>
												<input
													type="text"
													className="form-control"
													placeholder="e.g. Working on new logo"
													value={form.memo}
													onChange={e => handleFieldChange('memo', e.target.value)}
													required
												/>
											</div>
											<div className="col-md-4 d-flex align-items-end">
												<div>
													<label className="form-label">Total Hours</label>
													<div className="fw-bold text-primary fs-5">{form.totalHours} hrs</div>
												</div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<Button color="primary" type="submit">
											Save
										</Button>
										<Button color="secondary" type="button" onClick={() => { setIsModalOpen(false); setEditIndex(null); }}>
											Cancel
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
				<TimesheetLifecycleModal isOpen={showLifecycle} onClose={() => setShowLifecycle(false)} />
				<TimesheetSummaryPage
					isOpen={showSummary}
					onClose={() => setShowSummary(false)}
					onEdit={(row) => {
						setForm({
							...row,
							startDate: row.startTime?.split('T')[0] || '',
							startTime: row.startTime?.split('T')[1] || '',
							endDate: row.endTime?.split('T')[0] || '',
							endTime: row.endTime?.split('T')[1] || '',
						});
						setEditIndex(tableData.findIndex(r => r.id === row.id));
						setIsModalOpen(true);
						setShowSummary(false);
					}}
					onDelete={(row) => {
						setTableData(prev => prev.filter(r => r.id !== row.id));
					}}
				/>

<CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
<WeeklyTimesheetModal isOpen={showWeeklyTimesheet} onClose={() => setShowWeeklyTimesheet(false)} />
			</Page>
		</PageWrapper>
	);
};

export default TimeSheet;