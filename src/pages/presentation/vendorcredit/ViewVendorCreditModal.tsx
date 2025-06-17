import React from 'react';

type VendorCreditProps = {
	data?: any;
	onClose: () => void;
};

const defaultCredit = {
	logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg',
	vendorName: '',
	creditNo: '',
	creditDate: '',
	items: [],
	subTotal: 0,
	total: 0,
	creditUsed: 0,
	creditRemaining: 0,
	note: '--',
	terms: 'Thank you for your business.',
};

const formatDate = (dateStr: string) => {
	if (!dateStr) return '';
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return dateStr;
	return d.toLocaleDateString('en-GB');
};

const ViewVendorCreditModal: React.FC<VendorCreditProps> = ({ data, onClose }) => {
	if (!data) return null;

	const vendorCredit = {
		...defaultCredit,
		...data,
		items: data.items || defaultCredit.items,
		subTotal: data.total || defaultCredit.subTotal,
		total: data.total || defaultCredit.total,
		creditUsed: data.used || defaultCredit.creditUsed,
		creditRemaining: data.remaining || defaultCredit.creditRemaining,
	};

	return (
		<div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Vendor Credit</h5>
						<button type="button" className="btn-close" onClick={onClose} />
					</div>
					<div className="modal-body">
						<div className="d-flex justify-content-between align-items-start mb-4">
							<div>
								<img src={vendorCredit.logo} alt="Logo" style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: '50%' }} />
								<div className="mt-2">{vendorCredit.vendorName}</div>
							</div>
							<div className="text-end">
								<h4 className="fw-bold mb-2">VENDOR CREDIT</h4>
								<div>
									<div><b>Credit Number</b>: {vendorCredit.creditNo}</div>
									<div><b>Credit Date</b>: {formatDate(vendorCredit.creditDate)}</div>
								</div>
							</div>
						</div>
						<table className="table table-bordered mb-4">
							<thead>
								<tr>
									<th>Description</th>
									<th>Quantity</th>
									<th>Unit Price (INR)</th>
									<th>Tax</th>
									<th>Amount (INR)</th>
								</tr>
							</thead>
							<tbody>
								{(vendorCredit.items && vendorCredit.items.length > 0) ? vendorCredit.items.map((item: any, idx: number) => (
									<tr key={idx}>
										<td>{item.description}</td>
										<td>{item.quantity} {item.unit}</td>
										<td>{item.unitPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
							
										<td>{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
									</tr>
								)) : (
									<tr>
										<td colSpan={5} className="text-center text-muted">No items</td>
									</tr>
								)}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan={4} className="text-end">Sub Total</td>
									<td>{vendorCredit.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
								</tr>
								<tr>
									<td colSpan={4} className="text-end fw-bold">Total</td>
									<td className="fw-bold">{vendorCredit.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
								</tr>
								<tr>
									<td colSpan={4} className="text-end">Credit Amount Used</td>
									<td>{vendorCredit.creditUsed.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
								</tr>
								<tr>
									<td colSpan={4} className="text-end fw-bold">Credits Remaining</td>
									<td className="fw-bold text-success">{vendorCredit.creditRemaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR</td>
								</tr>
							</tfoot>
						</table>
						<div className="row mb-4">
							<div className="col-md-6">
								<div className="mb-2 fw-bold">Note</div>
								<div className="border rounded p-2" style={{ minHeight: 40 }}>{vendorCredit.note}</div>
							</div>
							<div className="col-md-6 text-end">
								<div className="mb-2 fw-bold">Terms and Conditions</div>
								<div>{vendorCredit.terms}</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewVendorCreditModal;