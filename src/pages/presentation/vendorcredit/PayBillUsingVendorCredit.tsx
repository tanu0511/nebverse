import React, { useState } from 'react';

const PayBillUsingVendorCredit: React.FC<{ data?: any; onClose?: () => void }> = ({ data, onClose }) => {
	const vendorCredit = data || {
		creditNo: 'VC#001',
		total: 0,
		creditRemaining: 0,
		vendorName: '',
		logo: '',
	};

	const total = typeof vendorCredit.total === 'number' ? vendorCredit.total : 0;
	const creditRemaining = typeof vendorCredit.creditRemaining === 'number'
		? vendorCredit.creditRemaining
		: (typeof vendorCredit.remaining === 'number' ? vendorCredit.remaining : 0);

	const bill = {
		billNo: 'BL#001',
		billDate: '2025-05-14',
		billAmount: 10,
		billDue: 10,
	};

	const [amountToCredit, setAmountToCredit] = useState<number>(0);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		setAmountToCredit(isNaN(val) ? 0 : val);
	};

	return (
		<div style={{ background: "#f6f8fa", minHeight: "100vh", padding: "32px" }}>
			<div className="container" style={{ maxWidth: 900 }}>

        <hr className="my-2" />
				{/* <h4 className="fw-bold mb-3 mt-4" style={{ fontSize: 28 }}>Pay Bill using Vendor Credit</h4> */}
				<div className="mb-2" style={{ fontSize: 20, fontWeight: 500 }}>{vendorCredit.creditNo}</div>
				<div className="mb-3">
					<div className="card mb-3" style={{ borderRadius: 8, border: "none" }}>
						<div className="card-body d-flex justify-content-between align-items-center" style={{ padding: "20px 24px" }}>
							<div>
								<div className="fw-bold" style={{ fontSize: 16 }}>Total</div>
								<div className="text-primary" style={{ fontSize: 22 }}>
									{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
								</div>
							</div>
							<div>
								<i className="fa fa-file-invoice-dollar fa-2x text-secondary" />
							</div>
						</div>
					</div>
					<div className="card mb-3" style={{ borderRadius: 8, border: "none" }}>
						<div className="card-body d-flex justify-content-between align-items-center" style={{ padding: "20px 24px" }}>
							<div>
								<div className="fw-bold" style={{ fontSize: 16 }}>Credits Remaining</div>
								<div className="text-primary" style={{ fontSize: 22 }}>
									{creditRemaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
								</div>
							</div>
							<div>
								<i className="fa fa-file-invoice-dollar fa-2x text-secondary" />
							</div>
						</div>
					</div>
					<div className="card" style={{ borderRadius: 8, border: "none" }}>
						<div className="card-body d-flex align-items-center" style={{ padding: "20px 24px" }}>
							<img
								src={vendorCredit.logo || 'https://via.placeholder.com/60x60?text=No+Logo'}
								alt="Logo"
								style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8, marginRight: 16, background: "#f6f8fa" }}
							/>
							<span className="fw-bold" style={{ fontSize: 20 }}>{vendorCredit.vendorName}</span>
						</div>
					</div>
				</div>




				<h4 className="fw-bold mb-4" style={{ fontSize: 28 }}>Vendor Unpaid Bill</h4>
				<div className="mb-4" style={{ borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
					<table className="table mb-0" style={{ border: "none" }}>
						<thead>
							<tr style={{ background: "#f6f8fa" }}>
								<th style={{ border: "none" }}>Bill Number #</th>
								<th style={{ border: "none" }}>Bill Date</th>
								<th style={{ border: "none" }}>Bill Amount</th>
								<th style={{ border: "none" }}>Bill Due</th>
								<th style={{ border: "none" }}>Amount To Credit</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{ border: "none", verticalAlign: "middle" }}>{bill.billNo}</td>
								<td style={{ border: "none", verticalAlign: "middle" }}>
									{new Date(bill.billDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
								</td>
								<td style={{ border: "none", verticalAlign: "middle" }}>
									₹{bill.billAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
								</td>
								<td style={{ border: "none", verticalAlign: "middle" }}>
									₹{bill.billDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
								</td>
								<td style={{ border: "none", verticalAlign: "middle" }}>
									<input
										type="number"
										className="form-control"
										style={{ minWidth: 80, fontSize: 18, padding: "6px 12px" }}
										value={amountToCredit}
										min={0}
										max={bill.billDue}
										onChange={handleAmountChange}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="fs-4 mb-2" style={{ fontWeight: 500 }}>
					<span>Amount To Credit:</span>
					<span className="ms-2">{amountToCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
				</div>
				<div className="fs-4 mb-4" style={{ fontWeight: 500 }}>
					<span>Remaining Amount:</span>
					<span className="ms-2">{creditRemaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
				</div>
				<div className="d-flex align-items-center gap-2 mb-4">
					<button className="btn btn-primary" type="button" style={{ fontSize: 18, padding: "8px 32px", borderRadius: 6 }}>
						<i className="fa fa-check me-2" />Apply
					</button>
					<button className="btn btn-light" type="button" style={{ fontSize: 18, padding: "8px 24px", borderRadius: 6 }} onClick={onClose}>
						Cancel
					</button>
				</div>
				
				{onClose && (
					<div className="mt-3">
						<button className="btn btn-secondary" style={{ fontSize: 18, padding: "8px 32px", borderRadius: 6 }} onClick={onClose}>Close</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PayBillUsingVendorCredit;