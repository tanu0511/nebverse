import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import PaginationButtons from '../../../components/PaginationButtons';
import AddOfferLetterPage from './AddOfferLetterPage';
import Modal from '../../../components/bootstrap/Modal';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import ViewOfferLetterModal from './ViewOfferLetterModal';
import AddEmployeeModal from './AddEmployeeModal';


const OfferLetter = () => {
	const [projects] = useState([]); // or your data array
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [showAddOffer, setShowAddOffer] = useState(false);
	const [offerLetters, setOfferLetters] = useState<any[]>([]);
	const [, setShowNotification] = useState(false);
	const [showAddEmployee, setShowAddEmployee] = useState(false);
	type EmployeeInitialValues = {
		employeeId: string;
		employeeName: string;
		employeeEmail: string;
		password: string;
		designation: string;
		department: string;
		country: string;
		mobile: string;
		joiningDate: string;
		reportingTo: string;
	} | undefined;

	const [employeeInitialValues, setEmployeeInitialValues] = useState<EmployeeInitialValues>(undefined);

	// Handler to add a new offer letter
	const handleAddOfferLetter = (offer: any) => {
		setOfferLetters(prev => [
			...prev,
			{
				...offer,
				status: offer.status || 'Pending', // Default to Pending if not set
			}
		]);
		setShowAddOffer(false);
	};

	const handleStatusChange = (idx: number, newStatus: string) => {
		setOfferLetters(prev =>
			prev.map((offer, i) =>
				i === idx ? { ...offer, status: newStatus } : offer
			)
		);
	};

	const [openStatusIdx, setOpenStatusIdx] = useState<number | null>(null);
	const [viewOfferIdx, setViewOfferIdx] = useState<number | null>(null);
	const [editOfferIdx, setEditOfferIdx] = useState<number | null>(null);

	const statusOptions = [
		{ value: 'Pending', label: 'Pending', color: '#ffc107' },
		{ value: 'Expired', label: 'Expired', color: '#fd2d09' },
		{ value: 'Draft', label: 'Draft', color: '#545c63' },
		{ value: 'Withdraw', label: 'Withdraw', color: '#007bff' },
		{ value: 'Accept', label: 'Accept', color: '#28a745' },
	];



	// Handler
	const handleViewOffer = (idx: number) => setViewOfferIdx(idx);

	// Handler to delete an offer letter
	const handleDeleteOffer = (idx: number) => {
		setOfferLetters(prev => prev.filter((_, i) => i !== idx));
	};

	// Handler to withdraw an offer letter
	const handleWithdrawOffer = (idx: number) => {
		setOfferLetters(prev =>
			prev.map((offer, i) =>
				i === idx ? { ...offer, status: 'Withdraw' } : offer
			)
		);
	};

	const handleEditOffer = (idx: number) => {
		setEditOfferIdx(idx);
		setShowAddOffer(true);
	};

	// Handler to send an offer letter (placeholder implementation)
	const handleSendOffer = (idx: number) => {
		setOfferLetters(prev =>
			prev.map((offer, i) =>
				i === idx ? { ...offer, status: 'Sent' } : offer
			)
		);
		setShowNotification(true);
		setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
	};

	// Handler to create an employee
	const handleCreateEmployee = (idx: number) => {
		// Prefill with offer data if needed
		const offer = offerLetters[idx];
		setEmployeeInitialValues({
			employeeId: '', // Generate or leave blank
			employeeName: offer?.applicant || '',
			employeeEmail: offer?.candidateEmail || '',
			password: '',
			designation: '',
			department: offer?.department || '',
			country: '',
			mobile: offer?.candidatePhone || '',
			joiningDate: offer?.joiningDate || '',
			reportingTo: '',
		});
		setShowAddEmployee(true);
	};

	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<></>
				</SubHeaderLeft>
				<SubHeaderRight>
					<><Button color="primary" className="mb-3" style={{ minWidth: 160 }} onClick={() => setShowAddOffer(true)}>
						<Icon icon="Add" className="me-2" />
						Add Offer Letter
					</Button></>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row' />

				<div className="card">
					<div className="table-responsive" style={{ overflow: 'visible' }}>
						<table className="table table-modern table-hover mb-0">
							<thead className="table-light">
								<tr>
									<th>
										<input type="checkbox" />
									</th>
									<th>Offer</th>
									<th>Job</th>
									<th>Job Applicant</th>
									<th>Added By</th>
									<th>Offer Expire On</th>
									<th>Expected Joining Date</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{offerLetters.map((offer, idx) => (
									<tr key={idx}>
										<td>
											<input type="checkbox" />
										</td>
										<td>{offer.offerName}</td>
										<td>{offer.job}</td>
										<td>{offer.applicant}</td>
										<td>{offer.addedBy}</td>
										<td>{offer.expiry}</td>
										<td>{offer.joiningDate}</td>
										<td style={{ position: 'relative', minWidth: 160 }}>
											<div
												style={{
													borderRadius: 8,
													background: '#e9ecef',
													padding: '4px 12px',
													display: 'flex',
													alignItems: 'center',
													cursor: 'pointer',
													fontWeight: 500,
													minWidth: 140,
													position: 'relative',
													userSelect: 'none',
												}}
												onClick={() => setOpenStatusIdx(openStatusIdx === idx ? null : idx)}
											>
												<span
													style={{
														color: statusOptions.find(opt => opt.value === offer.status)?.color || '#888',
														fontSize: 18,
														marginRight: 8,
														display: 'inline-block',
													}}
												>
													●
												</span>
												{offer.status}
												<span style={{ marginLeft: 'auto', fontSize: 18, color: '#888' }}>▼</span>
											</div>
											{openStatusIdx === idx && (
												<ul
													className="dropdown-menu show"
													style={{
														position: 'absolute',
														zIndex: 1050,
														top: '110%',
														left: 0,
														width: '100%',
														background: '#fff',
														border: '1px solid #e0e0e0',
														borderRadius: 10,
														boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
														padding: 4,
														minWidth: 180,
														margin: 0,
													}}
												>
													{statusOptions.map(option => (
														<li key={option.value}>
															<button
																type="button"
																className="dropdown-item d-flex align-items-center"
																style={{
																	fontWeight: offer.status === option.value ? 600 : 400,
																	color: offer.status === option.value ? option.color : '#222',
																	background: offer.status === option.value ? '#f5f5f5' : 'transparent',
																}}
																onClick={() => {
																	handleStatusChange(idx, option.value);
																	setOpenStatusIdx(null);
																}}
															>
																<span
																	style={{
																		color: option.color,
																		fontSize: 18,
																		marginRight: 8,
																		display: 'inline-block',
																	}}
																>
																	●
																</span>
																{option.label}
															</button>
														</li>
													))}
												</ul>
											)}
										</td>
										<td>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button icon="MoreVert" color="primary" isLight className="btn-icon" />
												</DropdownToggle>
												<DropdownMenu isAlignmentEnd>
													<Button
														color="link"
														className="dropdown-item d-flex align-items-center"
														onClick={() => handleViewOffer(idx)}
													>
														<Icon icon="Visibility" className="me-2" /> View
													</Button>
													{offer.status === 'Expired' || offer.status === 'Withdraw' ? (
														<Button
															color="link"
															className="dropdown-item d-flex align-items-center text-danger"
															onClick={() => handleDeleteOffer(idx)}
														>
															<Icon icon="Delete" className="me-2" /> Delete
														</Button>
													) : offer.status === 'Draft' ? (
														<>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center text-danger"
																onClick={() => handleDeleteOffer(idx)}
															>
																<Icon icon="Delete" className="me-2" /> Delete
															</Button>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center"
																onClick={() => handleSendOffer(idx)}
															>
																<Icon icon="Send" className="me-2" /> Send
															</Button>
														</>
													) : offer.status === 'Accept' ? (
														<>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center text-danger"
																onClick={() => handleDeleteOffer(idx)}
															>
																<Icon icon="Delete" className="me-2" /> Delete
															</Button>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center"
																onClick={() => handleCreateEmployee(idx)}
															>
																<Icon icon="PersonAdd" className="me-2" /> Create Employee
															</Button>
														</>
													) : (
														<>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center"
																onClick={() => handleEditOffer(idx)}
															>
																<Icon icon="Edit" className="me-2" /> Edit
															</Button>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center text-danger"
																onClick={() => handleDeleteOffer(idx)}
															>
																<Icon icon="Delete" className="me-2" /> Delete
															</Button>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center"
																onClick={() => handleSendOffer(idx)}
															>
																<Icon icon="Send" className="me-2" /> Send
															</Button>
															<Button
																color="link"
																className="dropdown-item d-flex align-items-center"
																onClick={() => handleWithdrawOffer(idx)}
															>
																<Icon icon="FastRewind" className="me-2" /> Withdraw
															</Button>
														</>
													)}
												</DropdownMenu>
											</Dropdown>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* Pagination */}
						<PaginationButtons
							data={projects}
							label="items"
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
							perPage={perPage}
							setPerPage={setPerPage}
						/>
					</div>
				</div>
			</Page>
			{/* Conditionally render the modal here */}
			<Modal isOpen={showAddOffer} setIsOpen={setShowAddOffer} size="lg" isStaticBackdrop={true}>
				{showAddOffer ? [
					<AddOfferLetterPage
						key="add-offer-letter"
						onClose={() => {
							setShowAddOffer(false);
							setEditOfferIdx(null);
						}}
						onSave={(offer) => {
							if (editOfferIdx !== null) {
								setOfferLetters(prev =>
									prev.map((item, i) => i === editOfferIdx ? { ...item, ...offer } : item)
								);
							} else {
								handleAddOfferLetter(offer);
							}
							setShowAddOffer(false);
							setEditOfferIdx(null);
						}}
						initialValues={editOfferIdx !== null ? offerLetters[editOfferIdx] : undefined}
					/>
				] : []}
			</Modal>
			<ViewOfferLetterModal
				show={viewOfferIdx !== null}
				onClose={() => setViewOfferIdx(null)}
				offer={viewOfferIdx !== null ? offerLetters[viewOfferIdx] : null}
			/>
			<AddEmployeeModal
				show={showAddEmployee}
				onClose={() => setShowAddEmployee(false)}
				initialValues={employeeInitialValues}
			/>
		</PageWrapper>
	);
};

export default OfferLetter;