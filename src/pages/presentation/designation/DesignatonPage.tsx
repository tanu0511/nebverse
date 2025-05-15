import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddDesignation from './AddDesignation';
import FilterModal from './FilterModal';

interface Designation {
	id: number;
	name: string; // Ensure 'name' is typed as a primitive string
	parentDepartment?: string;
}

const DesignationPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [filterModalStatus, setFilterModalStatus] = useState<boolean>(false); // State for Filter Modal
	const [designations, setDesignations] = useState<Designation[]>([]);
	const [selectedDesignation, setSelectedDesignation] = useState<Designation | undefined>(undefined);

	const filteredData = designations;

	const { items } = useSortableData(filteredData);

	const handleDelete = (id: number) => {
		setDesignations((prev) => prev.filter((desig) => desig.id !== id));
	};

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
						placeholder='Search designation...'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = e.target.value.toLowerCase();
							setDesignations((prev) =>
								prev.filter((desig) => desig.name.toLowerCase().includes(value))
							);
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
					<SubheaderSeparator />
					<Button icon='PersonAdd' color='primary' isLight onClick={() => {
						setSelectedDesignation(undefined);
						setEditModalStatus(true);
					}}>
						Add Designation
					</Button>
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

			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Parent Designation</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											<tr key={i.id}>
												<td>{i.name}</td>
												<td>{i.parentDepartment || 'N/A'}</td>
												<td>
													<Dropdown>
														<DropdownToggle hasIcon={false}>
															<Button icon='MoreVert' color='primary' isLight className='btn-icon' />
														</DropdownToggle>
														<DropdownMenu isAlignmentEnd>
															<Button
																color='link'
																className='dropdown-item'
																onClick={() => {
																	setSelectedDesignation(i);
																	setEditModalStatus(true);
																}}>
																<Icon icon='Edit' className='me-2' />
																Update
															</Button>
															<Button
																color='link'
																className='dropdown-item text-danger'
																onClick={() => handleDelete(i.id)}>
																<Icon icon='Delete' className='me-2' />
																Delete
															</Button>
														</DropdownMenu>
													</Dropdown>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='Designations'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>

			<AddDesignation
				isOpen={editModalStatus}
				setIsOpen={setEditModalStatus}
				onAddDesignation={(newDesig) => {
					if (selectedDesignation) {
						// Update case
						setDesignations((prev) =>
							prev.map((desig) => (desig.id === selectedDesignation.id ? { ...desig, ...newDesig } : desig))
						);
					} else {
						// Add new case
						setDesignations((prev) => [...prev, { ...newDesig, id: Date.now() }]);
					}
				}}
			/>

<FilterModal
  isOpen={filterModalStatus}
  setIsOpen={setFilterModalStatus}
  designations={designations.map((desig) => desig.name)} // Convert to string[]
  onApplyFilters={(filters: Record<string, string>) => {
	const filteredDesignations = Object.values(filters); // Convert Record<string, string> to string[]
	setDesignations(
	  designations.filter((desig) =>
		filteredDesignations.includes(desig.name)
	  )
	);
  }}
/>
		</PageWrapper>
	);
};


export default DesignationPage;


