/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent, FC, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import AddLeadsForm  from './AddLeadsForm';
import Icon from '../../../components/icon/Icon';


import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { demoPagesMenu } from '../../../menu';

import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';

type FilterValues = {
	dateFilter: string;
	leadSource: string;
	leadOwner: string;
	addedBy: string;
};
import ProfileTab from './ProfileTab';
import Deals from './Deals';
import Notes from './Notes';
import { X } from 'lucide-react';

const CustomersList: FC = () => {
	
	const [leads, setLeads] = useState<Lead[]>(() => {
    const savedLeads = localStorage.getItem('leads');
    try {
        const parsed = savedLeads ? JSON.parse(savedLeads) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
});

	const [deals, setDeals] = useState<any[]>(() => {
		// Load deals from localStorage on initial render
		const savedDeals = localStorage.getItem('dealsData');
		return savedDeals ? JSON.parse(savedDeals) : [];
	});
	useEffect(() => {
		const savedLeads = localStorage.getItem('leads');
		setLeadToEdit(null); // Ensure the form is not prefilled
		setEditIndex(null); // Reset the edit index
		if (savedLeads) {
			try {
				const parsed = JSON.parse(savedLeads);
				setLeads(Array.isArray(parsed) ? parsed : []);
			} catch {
				setLeads([]);
			}
		}
	}, []);
	useEffect(() => {
  localStorage.setItem('leads', JSON.stringify(leads));
}, [leads]);
	

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [viewingLead, setViewingLead] = useState<Lead | null>(null);

	useEffect(() => {
		setLeadToEdit(null); // Ensure the form is not prefilled
		setEditIndex(null); // Reset the edit index
	}, [isFormOpen]);
	

	const handleAddLead = (newLead: any) => {
  if (!newLead || typeof newLead !== 'object' || Array.isArray(newLead)) return;
  setLeads((prev) => Array.isArray(prev) ? [...prev, newLead] : [newLead]);
};

	const handleView = (lead: Lead) => {
		console.log('view');
		setViewingLead(lead);
		setIsModalOpen(true);
	};

	// const [isModalOpen, setIsModalOpen] = useState(false);
	const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const handleEdit = (lead: Lead, index: number) => {
		setLeadToEdit(lead); // Set the lead to edit
		setEditIndex(index); // Track the index of the lead being edited
		setIsFormOpen(true); // Open the AddLeadsForm
	};
	const handleSubmit = (updatedLead: Lead) => {
		if (editIndex !== null) {
			// Update the lead in the leads array
			setLeads((prevLeads) =>
				prevLeads.map(
					(lead, idx) =>
						idx === editIndex ? { ...updatedLead, created: lead.created } : lead, // Preserve the original created date
				),
			);
		} else {
			const leadWithDate = {
				...updatedLead,
				created: new Date().toLocaleDateString(), // Add the current date
			};
			setLeads((prevLeads) => [...prevLeads, leadWithDate]);
		}
		setIsFormOpen(false); // Close the form
		setLeadToEdit(null); // Reset the leadToEdit state
		setEditIndex(null); // Reset the editIndex state
	};
	const handleChangeToClient = (lead: Lead) => {
		console.log('Changing to client:', lead);

		// Navigate to another component and pass the lead data
		window.location.href = `/client-details/${lead.name}`;
	};
	const handleDelete = (index: number) => {
		const isConfirmed = window.confirm('Are you sure you want to delete this item?');
		if (isConfirmed) {
			setLeads((prevLeads) => prevLeads.filter((_, i) => i !== index));
		}
	};

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
	type Lead = {
		name: string;
		email: string;
		leadOwner: string;
		addedBy: string;
		companyName?: string;
		mobile?: string;
		website?: string;
		officephonenumber?: string;
		country?: string;
		state?: string;
		city?: string;
		postalcode?: string;
		address?: string;
		created: string;
		createDeal?: boolean; // Added property
		id: number;
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
		isSelected?: boolean; 
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [activeTab, setActiveTab] = useState<'Profile' | 'Deals' | 'Notes'>('Profile');
	  const [filterModalStatus, setFilterModalStatus] = useState<boolean>(false); // State for Filter Modal
	    const [masterEmployeeList, setMasterEmployeeList] = useState<Lead[]>([]);
		const [employees, setEmployees] = useState<Lead[]>([]);
		// const [selectedEmployee, setSelectedEmployee] = useState<Lead | null>(null);
		  const [selectAll, setSelectAll] = useState<boolean>(false);
		
	  
	  const handleSearch = (value: string) => {
		const filtered = masterEmployeeList.filter((emp) =>
		  emp.name.toLowerCase().includes(value.toLowerCase())
		);
		setEmployees(filtered);
	  };
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
		  emp.id === id ? { ...emp, isSelected: isChecked } : emp
		);
		setEmployees(updatedEmployees);
	
		// Update the select-all checkbox state
		const allSelected = updatedEmployees.every((emp) => emp.isSelected);
		setSelectAll(allSelected);
	  };

	const [searchTerm, setSearchTerm] = useState('');

	// Filter and paginate leads for display in the table and PaginationButtons
	const filteredData = Array.isArray(leads)
  ? leads.filter(
      (lead) =>
        lead &&
        typeof lead === 'object' &&
        typeof lead.name === 'string' &&
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader>
					<SubHeaderLeft>
					  <label className='border-0 bg-transparent cursor-pointer me-0' htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					  </label>
					  <Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search employee...'
						value={searchTerm}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSearchTerm(e.target.value);
							handleSearch(e.target.value);
						}}
					  />
					</SubHeaderLeft>
					<SubHeaderRight>
					<Button
            icon='FilterAlt'
            color='primary'
            isLight
            aria-label='Filter'
            onClick={() => setFilterModalStatus(true)} // Open the Filter Modal
          >
            Filter
          </Button>

					<Button
            icon='PersonAdd'
            color='primary'
            isLight
            onClick={() => {
				setIsFormOpen(true)}
			}
        >
           Add Lead Contact
          </Button>
		  <Button
            color='info'
            icon='CloudDownload'
            isLight
            tag='a'
            to='/somefile.txt'
            target='_blank'
            download
          >
           Lead Form
          </Button>
					<Button
            color='info'
            icon='CloudDownload'
            isLight
            tag='a'
            to='/somefile.txt'
            target='_blank'
            download
          >
            Import
          </Button>
					<Button
            color='info'
            icon='CloudDownload'
            isLight
            tag='a'
            to='/somefile.txt'
            target='_blank'
            download
          >
            Export
          </Button>
				
					</SubHeaderRight>
					 </SubHeader>
			{/* Buttons outside Card */}
			<Page>
				
				{/* Table inside Card */}
				<div className='row h-100'>
          <div className='col-12'>
            <Card stretch>
              <CardBody isScrollable className='table-responsive'>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
											<th>Contact Name</th>
											<th>Email</th>
											<th>Lead Owner</th>
											<th>Added By</th>
											<th>Created</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{filteredData.length === 0 ? (
											<tr>
												<td colSpan={10} className='text-center'>
													No data available in table
												</td>
											</tr>
										) : (
											filteredData.map((lead, idx) => (
												<tr key={idx}>
													 <td>
                          <input
                            type="checkbox"
							checked={lead.isSelected || false}
							onChange={(e) => handleRowSelect(lead.id, e.target.checked)}
                          />
                        </td>
													<td>{lead.name}</td>
													<td>{lead.email}</td>
													<td>{lead.leadOwner}</td>
													<td>{lead.addedBy}</td>
													<td>{lead.created}</td>
													<td className='d-flex align-items-center'>
														<Dropdown>
															<DropdownToggle>
																<Icon icon='MoreVert' size='2x' color='primary' />
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleView(lead)
																	}>
																	<>
																		<Icon icon='Visibility' size='2x' color='primary' className='me-2' />
																			
																		View
																	</>
																</DropdownItem>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleEdit(lead, idx)
																	}>
																	<>
																		<Icon icon='Edit' size='2x' color='primary' className='me-2' />
																		Edit
																	</>
																</DropdownItem>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleChangeToClient(lead)
																	}>
																	<>
																		<Icon icon='Person' size='2x' color='primary' className='me-2' />
																		Change to Client
																	</>
																</DropdownItem>
																<DropdownItem
																	style={{ cursor: 'pointer' }}
																	onClick={() =>
																		handleDelete(idx)
																	}
																	className='text-danger'>
																	<>
																		<Icon icon='Delete' size='2x' color='danger' className='me-2' />
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
								{/* Modal */}
								{viewingLead && isModalOpen && (
									<div
										className='modal fade show d-block'
										tabIndex={-1}
										style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
										{/* <div className="modal-dialog modal-lg modal-dialog-centered"> */}
										<div className='modal-dialog modal-lg w-auto h-auto'>
											<div className='modal-content  shadow-lg overflow-hidden'>
												{/* Modal Header */}
												<div className='modal-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom'>
													<h4 className='modal-title mb-0 text-lg fw-bold'>
														{viewingLead.name}
													</h4>
													{/* Close X Icon */}
													<div
														className='cursor-pointer'
														onClick={() => {
															setViewingLead(null);
															setIsModalOpen(false);
														}}>
														<X className='w-5 h-5 text-gray-500' />
													</div>
												</div>

												{/* Modal Tabs */}
												<div className='border-bottom px-4 pt-3 pb-2 d-flex gap-3'>
													{['Profile', 'Deals', 'Notes'].map((tab) => (
														<button
															key={tab}
															onClick={() =>
																setActiveTab(
																	tab as
																		| 'Profile'
																		| 'Deals'
																		| 'Notes',
																)
															}
															className={`btn px-3 py-1 rounded-pill ${
																activeTab === tab
																	? 'btn-primary text-white'
																	: 'btn-light text-muted'
															}`}>
															{tab}
														</button>
													))}
												</div>

												{/* Modal Body */}
												<div className='modal-body p-4 fullscreen-modal  '>
													{activeTab === 'Profile' && (
														<ProfileTab lead={viewingLead} />
													)}
													{activeTab === 'Deals' && <Deals />}
													{activeTab === 'Notes' && <Notes />}
												</div>
											</div>
										</div>
									</div>
								)}
								{isFormOpen && (
									<AddLeadsForm
										isOpen={isFormOpen}
										setIsOpen={setIsFormOpen}
										onSubmit={handleAddLead} // This should update your leads array
										leadToEdit={leadToEdit || undefined} // Pass the lead to edit
										isCreateDeal={false} // Add the required isCreateDeal property
										mode='lead' // Add the required 'mode' property
										onAddLead={handleAddLead} // Add the missing onAddLead prop
										onClose={() => setIsFormOpen(false)} // Add the missing onClose prop
									/>
								)}
							</CardBody>
	
						</Card>
					</div>
				</div>
				<PaginationButtons
    data={filteredData}
    label="Employees"
    setCurrentPage={setCurrentPage}
    currentPage={currentPage}
    perPage={perPage}
    setPerPage={setPerPage}
/>
			</Page>
		</PageWrapper>
	);
};

export default CustomersList;