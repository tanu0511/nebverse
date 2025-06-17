/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import ViewVendorCreditModal from './ViewVendorCreditModal';
import EditVendorCreditModal from './EditVendorCreditModal';
import PayBillUsingVendorCredit from './PayBillUsingVendorCredit';

const mockData = [
	{
		id: 1,
		creditNo: 'VC#001',
		vendorName: 'ftgfhghfg',
		creditDate: '2025-05-14',
		total: 100000,
		used: 0,
		remaining: 100000,
		status: 'Open',
	},
];

const VendorCredit = () => {
	const [data, setData] = useState(mockData);
	
	const [viewModalData, setViewModalData] = useState<any | null>(null);
	const [editModalData, setEditModalData] = useState<any | null>(null);
	const [payBillModalData, setPayBillModalData] = useState<any | null>(null);


	const handleView = (row: any) => {
		setViewModalData(row);
	};

	const handleCloseModal = () => {
		setViewModalData(null);
	};

	const handleEdit = (row: any) => {
		setEditModalData(row);
	};

	const handleCloseEditModal = () => {
		setEditModalData(null);
	};

	const handleSaveEdit = (updated: any) => {
		setData((prev) =>
			prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
		);
		setEditModalData(null);
		// Se la modale di visualizzazione è aperta e riguarda lo stesso elemento, aggiorna anche quella
		if (viewModalData && viewModalData.id === updated.id) {
			setViewModalData({ ...viewModalData, ...updated });
		}
	};

	const handlePayBill = (row: any) => {
		setPayBillModalData(row);
	};

	const handleClosePayBillModal = () => {
		setPayBillModalData(null);
	};

	return (
		<PageWrapper>
			<div className="container-fluid">
				{/* Breadcrumb */}
				<div className="mb-3">
					<h4 className="fw-bold d-inline">Vendor Credits</h4>
					<span className="ms-3 text-muted">
						Home &bull; Vendor Credits
					</span>
				</div>

				{/* Export Button */}
				<div className="mb-3">
					<Button color="light" className="d-inline-flex align-items-center">
						<i className="fa fa-file-export me-2" /> Export
					</Button>
				</div>

				{/* Table */}
				<div className="card">
					<div className="card-body p-0">
						<table className="table align-middle mb-0">
							<thead>
								<tr>
									<th style={{ width: 40 }}>
										<input type="checkbox" />
									</th>
									<th>Credit No</th>
									<th>Vendor Name</th>
									<th>Credit Date</th>
									<th>Total</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{data.map((row) => (
									<tr key={row.id}>
										<td>
											<input type="checkbox" />
										</td>
										<td>{row.creditNo}</td>
										<td>{row.vendorName}</td>
										<td>{row.creditDate}</td>
										<td>
											<div>
												<div>
													Total: ₹{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
												</div>
												<div className="text-warning">
													Used: ₹{row.used.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
												</div>
												<div className="text-danger">
													Remaining: ₹{row.remaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
												</div>
											</div>
										</td>
										<td>
											<span className="d-flex align-items-center">
												<span className="me-2" style={{ fontSize: 12 }}>
													<span className="badge bg-success rounded-circle" style={{ width: 10, height: 10, display: 'inline-block', marginRight: 6 }} />
												</span>
												<span>Open</span>
											</span>
										</td>
										<td style={{ position: 'relative' }}>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button icon="MoreVert" color="primary" isLight className="btn-icon" />
												</DropdownToggle>
												<DropdownMenu className="dropdown-menu-end p-0" style={{ minWidth: 220 }}>
													<DropdownItem onClick={() => handleView(row)}>
														<span><Icon icon="RemoveRedEye" className="me-2"/> View</span>
													</DropdownItem>
													<DropdownItem onClick={() => handleEdit(row)}>
														<span><Icon icon="Edit" className="me-2" /> Edit</span>
													</DropdownItem>
													<DropdownItem onClick={() => handlePayBill(row)}>
														<span><Icon icon="Edit" className="me-2" /> Pay Bill using Vendor Credit</span>
													</DropdownItem>
													<DropdownItem className="text-danger" onClick={() => {/* handle delete logic */}}>
														<span><Icon icon="Delete" className="me-2" />Delete</span>
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Pagination */}
				<div className="d-flex justify-content-between align-items-center mt-3">
					<div>
						Show{' '}
						<select className="form-select d-inline-block w-auto" style={{ minWidth: 60 }}>
							<option>10</option>
							<option>25</option>
							<option>50</option>
						</select>{' '}
						entries
					</div>
					<div>
						Showing 1 to 1 of 1 entries
					</div>
					<nav>
						<ul className="pagination mb-0">
							<li className="page-item disabled">
								<span className="page-link">Previous</span>
							</li>
							<li className="page-item active">
								<span className="page-link">1</span>
							</li>
							<li className="page-item disabled">
								<span className="page-link">Next</span>
							</li>
						</ul>
					</nav>
				</div>

				{/* View Vendor Credit Modal */}
				{viewModalData && (
					<ViewVendorCreditModal data={viewModalData} onClose={handleCloseModal} />
				)}
				{editModalData && (
					<EditVendorCreditModal
						data={editModalData}
						onClose={handleCloseEditModal}
						onSave={handleSaveEdit}
					/>
				)}
				{payBillModalData && (
					<div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
						<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Pay Bill using Vendor Credit</h5>
									<button type="button" className="btn-close" onClick={handleClosePayBillModal} />
								</div>
								<div className="modal-body">
									<PayBillUsingVendorCredit data={payBillModalData} />
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" onClick={handleClosePayBillModal}>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</PageWrapper>
	);
};

export default VendorCredit;