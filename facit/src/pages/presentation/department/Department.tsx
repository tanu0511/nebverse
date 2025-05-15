/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import useSortableData from '../../../hooks/useSortableData';
import Popovers from '../../../components/bootstrap/Popovers';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import FilterModal from './FilterModal';
import AddDepartmentModal from './AddDepartmentModal';

interface Department {
	id: number;
	name: string;
	parentDepartment?: string;
}

const Department = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [filterModalStatus, setFilterModalStatus] = useState<boolean>(false); // State for Filter Modal
	const [originalDepartments, setOriginalDepartments] = useState<Department[]>([]); // Store the original list
	const [departments, setDepartments] = useState<Department[]>([]); // Filtered list
	const [selectedTeam, setSelectedTeam] = useState<Department | undefined>(undefined);

	const filteredData = departments;

	const { items } = useSortableData(filteredData);

	const handleDelete = (id: number) => {
		setDepartments((prev) => prev.filter((dept) => dept.id !== id));
		setOriginalDepartments((prev) => prev.filter((dept) => dept.id !== id));
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
						placeholder='Search department...'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = e.target.value.toLowerCase();
							setDepartments((prev) =>
								prev.filter((dept) => dept.name.toLowerCase().includes(value))
							);
						}}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						icon="FilterAlt"
						color="dark"
						isLight
						className="btn-only-icon position-relative"
						aria-label="Filter"
						onClick={() => setFilterModalStatus(true)} // Open the Filter Modal
					>
						{departments.length !== filteredData.length && (
							<Popovers desc="Filtering applied" trigger="hover">
								<span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
									<span className="visually-hidden">Filtering applied</span>
								</span>
							</Popovers>
						)}
					</Button>
					<SubheaderSeparator />
					<Button icon='PersonAdd' color='primary' isLight onClick={() => {
						setSelectedTeam(undefined);
						setEditModalStatus(true);
					}}>
						Add Department
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
											<th>Parent Department</th>
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
																	setSelectedTeam(i);
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
								label='Departments'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>

			<AddDepartmentModal
				isOpen={editModalStatus}
				setIsOpen={setEditModalStatus}
				onAddDepartment={(newDept) => {
					if (selectedTeam) {
						// Update case
						setDepartments((prev) =>
							prev.map((dept) => (dept.id === selectedTeam.id ? { ...dept, ...newDept } : dept))
							);
						setOriginalDepartments((prev) =>
							prev.map((dept) => (dept.id === selectedTeam.id ? { ...dept, ...newDept } : dept))
						);
					} else {
						// Add new case
						setDepartments((prev) => [...prev, { ...newDept, id: Date.now() }]);
						setOriginalDepartments((prev) => [...prev, { ...newDept, id: Date.now() }]);
					}
				}}
			/>

			<FilterModal
				isOpen={filterModalStatus}
				setIsOpen={setFilterModalStatus}
				departments={originalDepartments.map((dept) => dept.name)} // Pass the list of department names
				onApplyFilters={(filters) => {
					if (Object.keys(filters).length === 0) {
						// Show all departments if "All" is selected
						setDepartments(originalDepartments);
					} else {
						// Filter departments based on the selected department
						setDepartments(
							originalDepartments.filter((dept) =>
								filters.department ? dept.name === filters.department : true
							)
						);
					}
				}}
			/>
		</PageWrapper>
	);
};
export default Department;
