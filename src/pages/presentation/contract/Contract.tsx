import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import useSortableData from '../../../hooks/useSortableData';
import ContractModal from './ContractModal';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import Signature from './Signature';
import Public from './Public';
import CustomerEditModal from './CustomerEditModal';
import { useNavigate } from 'react-router-dom';




const Contract = () => {
	const [contractModalStatus, setContractModalStatus] = useState<boolean>(false);
	const [tableData, setTableData] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [openSignatureModal, setOpenSignatureModal] = useState(false);
	const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

	// Public Link Modal state
	const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const [editContract, setEditContract] = useState<any | null>(null);


	
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			searchInput: '',
		},
		onSubmit: () => {},
	});

	const filteredData = tableData.filter((f) =>
		f.subject.toLowerCase().includes(formik.values.searchInput.toLowerCase()),
	);

	const { items } = useSortableData(filteredData);

	const handleSaveContract = (newContract: any) => {
		if (editContract) {
			// Update the existing contract
			setTableData((prevData) =>
				prevData.map((contract) =>
					contract.id === editContract.id ? { ...contract, ...newContract } : contract
				)
			);
		} else {
			// Add a new contract
			setTableData((prevData) => [...prevData, { ...newContract, id: Date.now() }]);
		}
		setEditContract(null); // Reset the edit state
		setContractModalStatus(false); // Close the modal
	};

	const priceFormat = (amount: number): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	const handleOpenPublicModal = (customer: any) => {
		setSelectedCustomer(customer);
		setIsPublicModalOpen(true);
	};


	// Dummy functions abhi ke liye

	function handleDeleteCustomer(id: number) {
		alert(`Delete Customer ID: ${id}`);
	}

	function handleDeleteContract(id: number) {
		setTableData((prevData) => prevData.filter((contract) => contract.id !== id));
		alert('Contract deleted successfully!');
	}

	const handleSignatureSave = (signatureDataUrl: string) => {
		console.log('Saved signature:', signatureDataUrl);
	};

	function togglePublicModal(): void {
		setIsPublicModalOpen((prev) => !prev); // Toggle the modal state
	}

	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search contracts...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
				<Button
    icon="Add"
    color="primary"
    isLight
    onClick={() => {
        setEditContract(null); // Clear any prefilled data
        setContractModalStatus(true); // Open the modal
    }}
>
    Create Contract
</Button>

					<Button
						icon='Layer'
						color='primary'
						isLight
						onClick={() => navigate('/contract-template')}>
						Contract Template
					</Button>

					<Button
						icon='Export'
						color='primary'
						isLight
						onClick={() => setContractModalStatus(true)}>
						Export
					</Button>
				</SubHeaderRight>
			</SubHeader>

			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch style={{ overflow: 'visible' }}>
							<CardBody className='table-responsive' style={{ overflow: 'visible' }}>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>#</th>
											<th>Subject</th>
											<th>Client</th>
											<th>Project</th>
											<th>Amount</th>
											<th>Start Date</th>
											<th>End Date</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).length > 0 ? (
											dataPagination(items, currentPage, perPage).map(
												(i, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{i.subject}</td>
														<td>{i.client}</td>
														<td>{i.project}</td>
														<td>{priceFormat(i.amount)}</td>
														<td>{i.startDate}</td>
														<td>{i.endDate}</td>
														<td>
															<Dropdown>
																<DropdownToggle hasIcon={false}>
																	<Button
																		icon='MoreVert'
																		color='primary'
																		isLight
																		className='btn-icon'
																	/>
																</DropdownToggle>
																<DropdownMenu className='dropdown-menu-end'>
																	<Button
																		color='link'
																		className='dropdown-item'
																		onClick={() =>
																			handleOpenPublicModal(i)
																		}>
																		<Icon
																			icon='RemoveRedEye'
																			className='me-2'
																		/>{' '}
																		View
																	</Button>

																	<Button
																		color='link'
																		className='dropdown-item'
																		onClick={() =>
																			setOpenSignatureModal(
																				true,
																			)
																		}>
																		<Icon
																			icon='Check'
																			className='me-2'
																		/>{' '}
																		Company Signature
																	</Button>

																	<Button
																		color='link'
																		className='dropdown-item'
																		onClick={() =>
																			handleOpenPublicModal(i)
																		}>
																		<Icon
																			icon='Link'
																			className='me-2'
																		/>{' '}
																		Public Link
																	</Button>

																	<Button
																		color='link'
																		className='dropdown-item'
																		onClick={() =>
																			setContractModalStatus(
																				true,
																			)
																		}>
																		<Icon
																			icon='FileCopy'
																			className='me-2'
																		/>{' '}
																		Copy Contract
																	</Button>
																	<Button
    color="link"
    className="dropdown-item"
    onClick={() => {
        setEditContract(i); // Set the selected contract for editing
        setContractModalStatus(true); // Open the modal
    }}
>
    <Icon icon="Edit" className="me-2" /> Edit
</Button>

																	<Button
    color="link"
    className="dropdown-item text-danger"
    onClick={() => handleDeleteContract(i.id)} // Pass the contract ID to the delete function
>
    <Icon icon="Delete" className="me-2" /> Delete
</Button>

																	<Button
																		color='link'
																		className='dropdown-item'
																		onClick={() =>
																			handleDeleteCustomer(
																				i.id,
																			)
																		}>
																		<Icon
																			icon='Download'
																			className='me-2'
																		/>{' '}
																		Download
																	</Button>
																</DropdownMenu>
															</Dropdown>
														</td>
													</tr>
												),
											)
										) : (
											<tr>
												<td colSpan={8} className='text-center'>
													No data available
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='contracts'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>

			{/* Contract Modal */}
			<ContractModal
				id='contract-0'
				isOpen={contractModalStatus}
				setIsOpen={setContractModalStatus}
				handleSave={handleSaveContract}
				
			/>

			{/* Signature Modal */}
			<Signature
				open={openSignatureModal}
				onClose={() => setOpenSignatureModal(false)}
				onSign={handleSignatureSave}
			/>

			{/* Public Link Modal */}
			{selectedCustomer && (
				<Public
					isOpen={isPublicModalOpen}
					toggle={togglePublicModal}
					customer={selectedCustomer}
				/>
			)}

			<CustomerEditModal
				setIsOpen={setIsTemplateModalOpen}
				isOpen={isTemplateModalOpen}
				id='template-modal'
				onSave={() => {
					setIsTemplateModalOpen(false);
				}}
				modalTitle='Add Contract Template'
				selectedCustomer={null}
			/>
		</PageWrapper>
	);
};

export default Contract;
