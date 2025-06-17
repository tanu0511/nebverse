/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { FormikHelpers, useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Modal from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import USERS from '../../../common/data/userDummyData';
import useDarkMode from '../../../hooks/useDarkMode';
import PaginationButtons from '../../../components/PaginationButtons';
import BillFormPage from './BillFormPage'; // adjust path as needed
import BillViewPage from './BillViewPage'; // adjust path as needed

const BillsPage = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [date, setDate] = useState<Date>(new Date());

	// BEGIN :: Upcoming Events
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState<boolean>(false);


	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState<boolean>(false);

	const formik = useFormik({
		onSubmit<Values>(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			values: Values,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			formikHelpers: FormikHelpers<Values>,
		): void | Promise<any> {
			return undefined;
		},
		initialValues: {
			customerName: 'Alison Berry',
			service: 'Exercise Bike',
			employee: `${USERS.GRACE.name} ${USERS.GRACE.surname}`,
			location: 'Maryland',
			date: dayjs().add(1, 'days').format('YYYY-MM-DD'),
			time: '10:30',
			note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisi odio. Nam sit amet pharetra enim. Nulla facilisi. Nunc dictum felis id massa mattis pretium. Mauris at blandit orci. Nunc vulputate vulputate turpis vitae cursus. In sit amet turpis tincidunt, interdum ex vitae, sollicitudin massa. Maecenas eget dui molestie, ullamcorper ante vel, tincidunt nisi. Donec vitae pulvinar risus. In ultricies nisl ac massa malesuada, vel tempus neque placerat.',
			notify: true,
		},
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState('');
	const [showBillModal, setShowBillModal] = useState(false);
	const [bills, setBills] = useState<any[]>([]);
	// Add this state to track the bill being edited
	const [editingBill, setEditingBill] = useState<any | null>(null);

	// Add this state to track the bill being viewed
	const [viewingBill, setViewingBill] = useState<any | null>(null);

	// Track which dropdown is open (by row index)
	const [openActionIdx, setOpenActionIdx] = useState<number | null>(null);

	// Filter and paginate
	const filteredBills = bills.filter(
		(item) =>
			item.purchaseBillNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.billDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.status?.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const paginatedData = filteredBills.slice((currentPage - 1) * perPage, currentPage * perPage);

	// Handler to add or update a bill
	const handleAddOrUpdateBill = (bill: any) => {
		if (editingBill) {
			// Update existing bill
			setBills(prev =>
				prev.map(b => (b.id === editingBill.id ? { ...bill, id: editingBill.id } : b))
			);
		} else {
			// Add new bill
			setBills(prev => [...prev, { ...bill, id: Date.now() }]);
		}
		setShowBillModal(false);
		setEditingBill(null);
	};

	// --- Add these handlers ---
	const handleSend = (bill: any) => {
		alert(`Bill ${bill.purchaseBillNumber} sent successfully!`);
	};

	const handleDownload = (bill: any) => {
		const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(bill, null, 2))}`;
		const dlAnchorElem = document.createElement('a');
		dlAnchorElem.setAttribute("href", dataStr);
		dlAnchorElem.setAttribute("download", `bill_${bill.purchaseBillNumber || 'download'}.json`);
		dlAnchorElem.click();
	};

	const handleViewPDF = (bill: any) => {
		// Use the same HTML as BillViewPage for PDF/print
		const items = bill.items || [];
		const subTotal = items.reduce((sum: number, item: any) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);
		const discountAmount = (subTotal * (bill.discount || 0)) / 100;
		const totalTax = items.reduce((sum: number, item: any) => sum + Number(item.tax || 0), 0);
		const total = subTotal - discountAmount + totalTax;

		const html = `
			<div style="font-family:sans-serif;">
				<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
					<div>
						<img src="/logo192.png" alt="Logo" style="width:60px;border-radius:50%;" />
						<div style="margin-top:8px;margin-bottom:12px;">
							<div><b>${bill.companyName || ''}</b></div>
							<div>${bill.companyPhone || ''}</div>
						</div>
						<div style="font-weight:bold;color:#888;margin-bottom:4px;">Billed To</div>
						<div>${bill.billedToName || ''}</div>
						<div>${bill.billedToEmail || ''}</div>
						<div>${bill.billedToPhone || ''}</div>
						<div>${bill.billedToAddress || ''}</div>
					</div>
					<div>
						<div style="font-weight:bold;font-size:1.5rem;text-align:right;margin-bottom:8px;">BILL</div>
						<table style="width:auto;border-collapse:collapse;">
							<tbody>
								<tr>
									<td style="font-weight:bold;border:1px solid #ccc;padding:4px;">Bill Number</td>
									<td style="border:1px solid #ccc;padding:4px;">${bill.purchaseBillNumber}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;border:1px solid #ccc;padding:4px;">Bill Date</td>
									<td style="border:1px solid #ccc;padding:4px;">${bill.billDate}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<table style="width:100%;border-collapse:collapse;">
					<thead>
						<tr>
							<th style="border:1px solid #ccc;padding:8px;">Description</th>
							<th style="border:1px solid #ccc;padding:8px;">Hsn/Sac</th>
							<th style="border:1px solid #ccc;padding:8px;">Quantity</th>
							<th style="border:1px solid #ccc;padding:8px;">Unit Price</th>
							<th style="border:1px solid #ccc;padding:8px;">Tax</th>
							<th style="border:1px solid #ccc;padding:8px;">Amount</th>
						</tr>
					</thead>
					<tbody>
						${items.map((item: any) => `
							<tr>
								<td style="border:1px solid #ccc;padding:8px;">${item.description}</td>
								<td style="border:1px solid #ccc;padding:8px;">${item.hsn || ''}</td>
								<td style="border:1px solid #ccc;padding:8px;">${item.quantity}</td>
								<td style="border:1px solid #ccc;padding:8px;">${item.unitPrice}</td>
								<td style="border:1px solid #ccc;padding:8px;">${item.tax}</td>
								<td style="border:1px solid #ccc;padding:8px;">${(Number(item.quantity) * Number(item.unitPrice) + Number(item.tax || 0)).toFixed(2)}</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				<div style="margin-top:16px;max-width:400px;">
					<table style="width:100%;border-collapse:collapse;">
						<tbody>
							<tr>
								<td style="text-align:right;border:0;">Sub Total</td>
								<td style="text-align:right;border:0;">${subTotal.toFixed(2)}</td>
							</tr>
							<tr>
								<td style="text-align:right;border:0;">Discount</td>
								<td style="text-align:right;border:0;">${bill.discount ? `${bill.discount} %` : '0 %'} <span style="margin-left:8px;">${discountAmount.toFixed(2)}</span></td>
							</tr>
							<tr>
								<td style="text-align:right;border:0;">Tax</td>
								<td style="text-align:right;border:0;">${totalTax.toFixed(2)}</td>
							</tr>
							<tr>
								<td style="font-weight:bold;text-align:right;background:#f5f7fa;">Total</td>
								<td style="font-weight:bold;text-align:right;background:#f5f7fa;">${total.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="margin-top:24px;">
					<div><b>Note</b></div>
					<div>${bill.note ? bill.note : '--'}</div>
					<div style="color:#888;margin-top:8px;">Note : Tax is calculating after discount.</div>
				</div>
			</div>
		`;
		const win = window.open('', '', 'height=700,width=900');
		if (win) {
			win.document.write('<html><head><title>Bill PDF</title></head><body>');
			win.document.write(html);
			win.document.write('</body></html>');
			win.document.close();
			win.print();
		}
	};
	// --- End handlers ---

	return (
		<PageWrapper title="Bills">
			<SubHeader>
				<SubHeaderLeft>
					<label className='border-0 bg-transparent cursor-pointer me-0' htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						value={searchTerm}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Add' color='primary' isLight onClick={() => setShowBillModal(true)}>
						Create Bill
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row mb-3'>

				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='card'>
							<div className='table-responsive' style={{ overflow: 'visible' }}>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>#</th>
											<th>Purchase Bill Number</th>
											<th>Vendor</th>
											<th>Bill Date</th>
											<th>Total</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{paginatedData.length === 0 ? (
											<tr>
												<td colSpan={7} className='text-center'>
													No data available in table
												</td>
											</tr>
										) : (
											paginatedData.map((item, idx) => (
												<tr key={item.id || idx}>
													<td>{(currentPage - 1) * perPage + idx + 1}</td>
													<td>{item.purchaseBillNumber}</td>
													<td>{item.vendor}</td>
													<td>{item.billDate}</td>
													<td>{item.total}</td>
													<td>{item.status}</td>
													<td style={{ position: 'relative' }}>
														<button
															className="btn btn-link p-0"
															type="button"
															onClick={() => setOpenActionIdx(openActionIdx === idx ? null : idx)}
														>
															<Icon icon='MoreVert' size='lg' color='primary' />
														</button>
														{openActionIdx === idx && (
															<ul
																className="dropdown-menu show"
																style={{
																	position: 'absolute',
																	zIndex: 1050,
																	top: '110%',
																	right: 0,
																	minWidth: 180,
																	background: '#fff',
																	border: '1px solid #e0e0e0',
																	borderRadius: 10,
																	boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
																	padding: 8,
																}}
															>
																<li>
																	<button
																		className="dropdown-item"
																		type="button"
																		onClick={() => {
																			setViewingBill(item);
																			setOpenActionIdx(null);
																		}}
																	>
																		<Icon icon='Visibility' /> View
																	</button>
																</li>
																<li>
																	<button
																		className="dropdown-item"
																		type="button"
																		onClick={() => {
																			setEditingBill(item);
																			setShowBillModal(true);
																			setOpenActionIdx(null);
																		}}
																	>
																		<Icon icon='Edit' /> Edit
																	</button>
																</li>
																{item.status?.toLowerCase() === 'open' && (
																	<li>
																		<button
																			className="dropdown-item"
																			type="button"
																			onClick={() => {
																				alert('Add Payment clicked!');
																				setOpenActionIdx(null);
																			}}
																		>
																			<Icon icon='CreditCard' /> Add Payment
																		</button>
																	</li>
																)}
																<li>
																	<button
																		className="dropdown-item"
																		type="button"
																		onClick={() => {
																			handleSend(item);
																			setOpenActionIdx(null);
																		}}
																	>
																		<Icon icon='Send' /> Send
																	</button>
																</li>
																<li>
																	<button
																		className="dropdown-item"
																		type="button"
																		onClick={() => {
																			handleDownload(item);
																			setOpenActionIdx(null);
																		}}
																	>
																		<Icon icon='Download' /> Download
																	</button>
																</li>
																<li>
																	<button
																		className="dropdown-item"
																		type="button"
																		onClick={() => {
																			handleViewPDF(item);
																			setOpenActionIdx(null);
																		}}
																	>
																		<Icon icon='visibility' /> View PDF
																	</button>
																</li>

															</ul>
														)}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</div>
							<PaginationButtons
								data={filteredBills}
								label="items"
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</div>
					</div>
				</div>
				<Modal isOpen={showBillModal} setIsOpen={(open) => {
					setShowBillModal(Boolean(open));
					if (!open) setEditingBill(null);
				}} title="Bill" size="xl">
					{[
						<BillFormPage
							key="bill-form"
							onClose={() => {
								setShowBillModal(false);
								setEditingBill(null);
							}}
							onSave={handleAddOrUpdateBill}
							initialValues={editingBill} // <-- Pass editingBill here
						/>
					]}
				</Modal>
				<Modal
					isOpen={!!viewingBill}
					setIsOpen={(open) => setViewingBill(open ? viewingBill : null)}
					title="Bill Details"
					size="xl"
				>
					{viewingBill && (
						<BillViewPage bill={viewingBill} onClose={() => setViewingBill(null)} />
					)}
				</Modal>

			</Page>
		</PageWrapper >
	);
};

export default BillsPage;