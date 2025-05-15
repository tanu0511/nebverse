/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { Eye, Edit, Trash, UserCheck, MoreVertical } from 'lucide-react';

import { useFormik } from 'formik';
import AddFollowUpForm from './AddFollowUpForm';
import AddLeadsForm from './AddLeadsForm';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
interface Lead {
	lead: string;
	leadContact: string;
	dealName: string;
	pipeline: string;
	dealStage: string;
	dealValue: number;
	closeDate: string;
	dealCategory: string;
	dealAgent: string;
	products: string;
	dealWatcher: string;
	id: number;
	isSelected?: boolean;
}
// interface LeadsTableProps {
// 	leads: Lead[]; // Array of leads
// }
type FilterValues = {
	dateFilter: string;
	leadSource: string;
	leadOwner: string;
	addedBy: string;
};
const Deals: React.FC = () => {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false); // State to track if it's edit mode
	const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(null); // Index of the
	const [masterEmployeeList, setMasterEmployeeList] = useState<Lead[]>([]);
	const [employees, setEmployees] = useState<Lead[]>([]);
	// const [selectedEmployee, setSelectedEmployee] = useState<Lead | null>(null);
	const [selectAll, setSelectAll] = useState<boolean>(false);

	useEffect(() => {
		const handleStorageChange = () => {
			const storedDeals = localStorage.getItem('dealsData');
			if (storedDeals) {
				setLeads(JSON.parse(storedDeals));
			}
		};

		// Listen for storage changes
		window.addEventListener('storage', handleStorageChange);

		// Cleanup listener on unmount
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);
	// Save data to localStorage whenever leads state changes
	useEffect(() => {
		localStorage.setItem('dealsData', JSON.stringify(leads));
	}, [leads]);

	const formik = useFormik({
		initialValues: {
			lead: 'some lead',
			leadContact: '',
			dealName: '',
			pipeline: '',
			dealStage: '',
			dealValue: 0,
			closeDate: '',
			dealCategory: '',
			dealAgent: '',
			products: '',
			dealWatcher: 'atharvraj singh rana',
		},
		onSubmit: (values) => {
			if (isEditMode && selectedLeadIndex !== null) {
				// Update the existing lead
				setLeads((prevLeads) =>
					prevLeads.map((lead, idx) =>
						idx === selectedLeadIndex ? { ...lead, ...values } : lead,
					),
				);
			} else {
				// Add a new lead
				setLeads((prev) => [...prev, { ...values, id: Date.now() }]);
			}
			setIsModalOpen(false);
			setIsEditMode(false);
			setSelectedLeadIndex(null);
			formik.resetForm();
		},
	});

	// const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const handleAddLead = (newLead: Lead): void => {
		console.log('New Lead:', newLead); // Debugging
		const leadWithDate = {
			...newLead,
			created: new Date().toLocaleDateString(),
		};
		setLeads((prev) => [...prev, leadWithDate]);
		setIsModalOpen(false);
	};

	const handleView = (lead: Lead) => {
		console.log('View', lead);
		// Navigate to another component and pass the lead data
		window.location.href = `/Deals-details/${lead.lead}`;
	};
	const handleEdit = (lead: Lead, index: number) => {
		setIsEditMode(true); // Set to Edit mode
		setSelectedLeadIndex(index); // Store the index of the lead being edited
		formik.setValues(lead); // Populate the form with the selected lead's data
		setIsModalOpen(true); // Open the modal
	};

	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
	const handlefollowup = (lead: Lead) => {
		console.log('Change to client', lead);
		setSelectedLead(lead);
	};
	const handleDelete = (idx: number) => setLeads((prev) => prev.filter((_, i) => i !== idx));
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
	const [filters, setFilters] = useState<FilterValues>({
		dateFilter: 'created',
		leadSource: 'all',
		leadOwner: 'all',
		addedBy: 'all',
	});

	const [expenses, setExpenses] = useState([]); // for badge logic
	const filteredData = expenses; // apply real filter logic here
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
		<PageWrapper title='Deals'>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setIsModalOpen(true)}>
						Add Deal
					</Button>
					{isModalOpen && (
						<AddLeadsForm
							onSubmit={(lead) => handleAddLead(lead)}
							onAddLead={handleAddLead}
							onClose={() => setIsModalOpen(false)}
							isOpen={isModalOpen}
							setIsOpen={setIsModalOpen}
							mode='deal' // ✅ Only show the Create Deal section
							isCreateDeal={false}
						/>
					)}
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
				</SubHeaderLeft>
			</SubHeader>

			{/* Table inside Card */}
			<div className='row h-100'>
				<div className='col-12'>
					<Card>
						<CardBody  isScrollable className='table-responsive'>
							<table className='table table-modern table-hover'>
								<thead>
									<tr>
										<th>
											<input
												type='checkbox'
												checked={selectAll}
												onChange={(e) => handleSelectAll(e.target.checked)}
											/>
										</th>
										<th>Lead Contacts</th>
										<th>Deal Name</th>
										<th>Pipeline</th>
										<th>Stage</th>
										<th>Value</th>
										<th>Close Date</th>
										<th>Category</th>
										<th>Agent</th>
										<th>Products</th>
										<th>Watcher</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{leads.length === 0 ? (
										<tr>
											<td colSpan={11} className='text-center'>
												No data available
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
												<td>{lead.leadContact}</td>
												<td>{lead.dealName}</td>
												<td>{lead.pipeline}</td>
												<td>{lead.dealStage}</td>
												<td>{lead.dealValue}</td>
												<td>{lead.closeDate}</td>
												<td>{lead.dealCategory}</td>
												<td>{lead.dealAgent}</td>
												<td>{lead.products}</td>
												<td>{lead.dealWatcher}</td>
												<td className='d-flex align-items-center'>
													<Dropdown>
														<DropdownToggle>
															<MoreVertical size={16} />
														</DropdownToggle>
														<DropdownMenu isAlignmentEnd>
															<DropdownItem
																style={{ cursor: 'pointer' }}
																onClick={() => handleView(lead)}>
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
																	handleEdit(lead, idx)
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
																	handlefollowup(lead)
																}>
																<>
																	<UserCheck
																		size={14}
																		className='me-2'
																	/>{' '}
																	Add Follow Up
																</>
															</DropdownItem>

															<DropdownItem
																style={{ cursor: 'pointer' }}
																onClick={() => handleDelete(idx)}
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

							{selectedLead && (
								<AddFollowUpForm
									lead={selectedLead?.lead || ''}
									isOpen={!!selectedLead}
									onClose={() => setSelectedLead(null)}
									onSave={(updatedLead) => {
										console.log('Follow-up saved:', updatedLead);
										setSelectedLead(null);
									}}
									leadName={selectedLead?.dealName || ''}
								/>
							)}
							<div className='d-flex justify-content-between align-items-center mt-8'>
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
		</PageWrapper>
	);
};

export default Deals;