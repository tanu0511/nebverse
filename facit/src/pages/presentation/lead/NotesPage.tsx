/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { Plus, Upload } from 'lucide-react';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Input from '../../../components/bootstrap/forms/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { Eye, Edit, Trash, UserCheck, MoreVertical } from 'lucide-react';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';

interface Lead {
	notetitle: string;
	notetype: string;
	visibility: 'Public' | 'Private';
	leadSource?: string;
	employee?: string;
	id: number;
	askPassword?: boolean;
	noteDetail?: string;
	created: string;
	action: string;
	isSelected?: boolean;
}
const LOCAL_STORAGE_KEY = 'notesData';
type FilterValues = {
	dateFilter: string;
	leadSource: string;
	leadOwner: string;
	addedBy: string;
};

const NotesPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [leads, setLeads] = useState<Lead[]>([]); // State for table data
	useEffect(() => {
		const storedLeads = localStorage.getItem('leads');
		if (storedLeads) {
			setLeads(JSON.parse(storedLeads));
		}
	}, []);

	// Step 2: Jab leads update ho, localStorage me save karo
	useEffect(() => {
		localStorage.setItem('leads', JSON.stringify(leads));
	}, [leads]);

	const formik = useFormik({
		initialValues: {
			notetitle: '',
			notetype: '',
			visibility: 'Public' as 'Public' | 'Private',
			leadSource: '',
			employee: '',
			askPassword: false,
			noteDetail: '',
		},
		onSubmit: (values, { resetForm }) => {
			if (isEditModalOpen && selectedLead) {
				// Update the existing note
				setLeads((prevLeads) =>
					prevLeads.map((lead) =>
						lead === selectedLead ? { ...selectedLead, ...values } : lead,
					),
				);
			} else {
				// Add a new note
				const newLead: Lead = {
					...values,
					id: Date.now(), // Generate a unique ID using the current timestamp
					created: new Date().toLocaleDateString(),
					action: 'Added',
				};
				setLeads((prev) => [...prev, newLead]);
			}
			resetForm();
			setIsModalOpen(false);
			setIsEditModalOpen(false);
			setSelectedLead(null);
		},
	});
	const handleAdd = () => {
		setIsEditModalOpen(false); // Set to Add mode
		formik.resetForm(); // Reset form for new note
		setIsModalOpen(true);
	};
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null); // State for the selected lead
	const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for modal visibility

	// Function to handle viewing a lead
	const handleView = (lead: Lead) => {
		setSelectedLead(lead); // Set the selected lead
		setIsViewModalOpen(true); // Open the modal
	};
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleEdit = (lead: Lead) => {
		setSelectedLead(lead); // Set the selected lead
		formik.setValues({
			notetitle: lead.notetitle || '',
			notetype: lead.notetype || '',
			visibility: lead.visibility || 'Public',
			leadSource: lead.leadSource || '',
			employee: lead.employee || '',
			askPassword: lead.askPassword || false,
			noteDetail: lead.noteDetail || '',
		}); // Populate the formik with the selected lead's data
		setIsModalOpen(true);
		setIsEditModalOpen(true); // Open the edit modal
	};
	const handleDelete = (idx: number) => setLeads((prev) => prev.filter((_, i) => i !== idx));
	const [masterEmployeeList, setMasterEmployeeList] = useState<Lead[]>([]);
	const [employees, setEmployees] = useState<Lead[]>([]);
	const [selectedEmployee, setSelectedEmployee] = useState<Lead | null>(null);
	const [selectAll, setSelectAll] = useState<boolean>(false);

	const handleSelectAll = (isChecked: boolean) => {
		setSelectAll(isChecked);
		const updatedEmployees = employees.map((emp) => ({
			...emp,
			isSelected: isChecked, // Add an isSelected property to each employee
		}));
		setEmployees(updatedEmployees);
	};

	const handleRowSelect = (id: number, isChecked: boolean) => {
		const updatedEmployees = employees.map((emp) =>
			emp.id === id ? { ...emp, isSelected: isChecked } : emp,
		);
		setEmployees(updatedEmployees);

		// Update the select-all checkbox state
		const allSelected = updatedEmployees.every((emp) => emp.isSelected);
		setSelectAll(allSelected);
	};
	const [expenses, setExpenses] = useState([]); // for badge logic
	const filteredData = expenses; // apply real filter logic here
	const [filters, setFilters] = useState<FilterValues>({
		dateFilter: 'created',
		leadSource: 'all',
		leadOwner: 'all',
		addedBy: 'all',
	});
	const handleChange = (key: keyof FilterValues, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleClear = () => {
		setFilters({
			dateFilter: 'created',
			leadSource: 'all',
			leadOwner: 'all',
			addedBy: 'all',
		});
	};
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	return (
		<PageWrapper title='Notes'>
			<SubHeader>
				<SubHeaderRight>
					<Button icon='PersonAdd' color='primary' isLight onClick={handleAdd}>
						Add Note
					</Button>
					{/* <Button
								icon='PersonAdd'
								color='primary'
								isLight
								onClick={() => {
									setIsFormOpen(true)}
								}
							>
							   Add Lead Contact
							  </Button> */}
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
				</SubHeaderRight>
			</SubHeader>

			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} size='lg' isStaticBackdrop>
				<ModalHeader setIsOpen={setIsModalOpen}>
					<h5 className='modal-title'>{isEditModalOpen ? 'Edit Note' : 'Add Note'}</h5>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={formik.handleSubmit} className='space-y-4'>
						<FormGroup label='Note Title'>
							<Input
								name='notetitle'
								placeholder='Enter note title'
								ariaLabel='Note Title'
								value={formik.values.notetitle}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								required
							/>
						</FormGroup>

						<FormGroup label='Note Type'>
							<Input
								name='notetype'
								placeholder='Note type'
								ariaLabel='Note Type'
								value={formik.values.notetype}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								required
							/>
						</FormGroup>

						<FormGroup label='Visibility'>
							<div className='flex gap-4'>
								{['Public', 'Private'].map((opt) => (
									<label key={opt} className='inline-flex items-center gap-1'>
										<input
											type='radio'
											name='visibility'
											value={opt}
											checked={formik.values.visibility === opt}
											onChange={() => formik.setFieldValue('visibility', opt)}
										/>
										{opt}
									</label>
								))}
							</div>
						</FormGroup>

						{formik.values.visibility === 'Private' && (
							<>
								<FormGroup label='Lead Source'>
									<Select
										name='leadSource'
										ariaLabel='Lead Source'
										value={formik.values.leadSource}
										onChange={formik.handleChange}>
										<option value=''>Select Source</option>
										<option value='Email'>Email</option>
										<option value='Phone'>Phone</option>
										<option value='Referral'>Referral</option>
									</Select>
								</FormGroup>

								<FormGroup label='Employee'>
									<Select
										name='employee'
										ariaLabel='Employee'
										value={formik.values.employee}
										onChange={formik.handleChange}>
										<option value=''>Select Employee</option>
										<option value='John Smith'>John Smith</option>
										<option value='Jane Doe'>Jane Doe</option>
									</Select>
								</FormGroup>

								<label className='inline-flex items-center gap-2'>
									<input
										type='checkbox'
										name='askPassword'
										checked={formik.values.askPassword}
										onChange={formik.handleChange}
									/>
									Ask to re-enter password
								</label>

								<FormGroup label='Note Detail'>
									<ReactQuill
										theme='snow'
										value={formik.values.noteDetail}
										onChange={(value) =>
											formik.setFieldValue('noteDetail', value)
										}
									/>
								</FormGroup>
							</>
						)}
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						type='button'
						onClick={() => {
							formik.resetForm();
							setIsModalOpen(false);
						}}>
						Cancel
					</Button>
					<Button color='primary' type='submit' onClick={() => formik.handleSubmit()}>
						Save
					</Button>
				</ModalFooter>
			</Modal>

			<Page>
				{/* Table inside Card */}
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>
												<input
													type='checkbox'
													checked={selectAll}
													onChange={(e) =>
														handleSelectAll(e.target.checked)
													}
												/>
											</th>
											<th>Note Title</th>
											<th>Note Type</th>
											<th>Visibility</th>
											<th>Created</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{leads.length === 0 ? (
											<tr>
												<td colSpan={6} className='text-center'>
													No notes added
												</td>
											</tr>
										) : (
											leads.map((lead, idx) => (
												<tr key={idx}>
													<td>
														<input
															type='checkbox'
															checked={lead.isSelected || false}
															onChange={(e) =>
																handleRowSelect(
																	lead.id,
																	e.target.checked,
																)
															}
														/>
													</td>
													<td>{lead.notetitle}</td>
													<td>{lead.notetype}</td>
													<td>{lead.visibility}</td>
													<td>{lead.created}</td>
													<td className='d-flex align-items-center'>
														<Dropdown>
															<DropdownToggle>
																<MoreVertical size={16} />
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleView(lead)
																	}>
																	<>
																		<Eye
																			size={14}
																			className='me-2'
																		/>{' '}
																		View
																	</>
																</DropdownItem>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleEdit(lead)
																	}>
																	<>
																		<Edit
																			size={14}
																			className='me-2'
																		/>{' '}
																		Edit
																	</>
																</DropdownItem>

																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleDelete(idx)
																	}
																	className='text-danger'>
																	<>
																		<Trash
																			size={14}
																			className='me-2'
																		/>{' '}
																		Delete
																	</>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>

								{/* View Modal */}
								{isViewModalOpen && selectedLead && (
									<Modal
										isOpen={isViewModalOpen}
										setIsOpen={setIsViewModalOpen}
										size='lg'>
										<ModalHeader setIsOpen={setIsViewModalOpen}>
											<h5 className='modal-title'>Lead Details</h5>
										</ModalHeader>
										<ModalBody>
											<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base text-gray-700'>
												{[
													['Note Title', selectedLead.notetitle || '--'],
													['Note Type', selectedLead.notetype || '--'],
													['Visibility', selectedLead.visibility || '--'],
													[
														'Lead Source',
														selectedLead.leadSource || '--',
													],
													['Employee', selectedLead.employee || '--'],
													[
														'Note Detail',
														selectedLead.noteDetail || '--',
													],
													['Created', selectedLead.created || '--'],
												].map(([label, value]) => (
													<div key={label} className='p-2 m-4 flex'>
														<span className='min-w-[130px] font-semibold'>
															{label}:
														</span>
														<span className='break-all'>{value}</span>
													</div>
												))}
											</div>
										</ModalBody>
										<ModalFooter>
											<Button
												color='secondary'
												onClick={() => setIsViewModalOpen(false)}>
												Close
											</Button>
										</ModalFooter>
									</Modal>
								)}

								<div className='d-flex justify-content-between align-items-center mt-6'>
									<div>
										Show{' '}
										<select className='form-select d-inline w-auto ms-1'>
											<option>10</option>
											<option>25</option>
											<option>50</option>
										</select>{' '}
										entries
									</div>
									<div>
										Showing {leads.length} of {leads.length} entries
									</div>
									<div>
										<Button color='light' isLight className='me-1'>
											Previous
										</Button>
										<Button color='light' isLight>
											Next
										</Button>
									</div>
								</div>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='Expenses'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default NotesPage;