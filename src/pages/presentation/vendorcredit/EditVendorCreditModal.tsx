import React, { useState } from 'react';

type EditVendorCreditModalProps = {
	data?: any;
	onClose: () => void;
	onSave: (updated: any) => void;
};

const EditVendorCreditModal: React.FC<EditVendorCreditModalProps> = ({ data, onClose, onSave }) => {
	const vendorCredit = data || {};

	const [form, setForm] = useState({
		...vendorCredit,
		creditDate: vendorCredit.creditDate || '',
		// ...aggiungi altri campi se necessario
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev: typeof form) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(form);
	};

	return (
		<div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Vendor Credit</h5>
						<button type="button" className="btn-close" onClick={onClose} />
					</div>
					<div className="modal-body">
						<form onSubmit={handleSave}>
							<div className="row mb-3">
								<div className="col-md-6">
									<label className="form-label">Vendor Name</label>
									<input className="form-control" name="vendorName" value={form.vendorName || ''} onChange={handleChange} />
								</div>
								<div className="col-md-3">
									<label className="form-label">Credit No</label>
									<input className="form-control" name="creditNo" value={form.creditNo || ''} onChange={handleChange} />
								</div>
								<div className="col-md-3">
									<label className="form-label">Credit Date</label>
									<input
										type="date"
										className="form-control"
										name="creditDate"
										value={form.creditDate || ''}
										onChange={handleChange}
									/>
								</div>
							</div>


<div className="row mb-3">
								<div className="col-md-3">
									<label className="form-label">Currency</label>
									<select className="form-select" name="currency" value={form.currency || 'INR'} onChange={handleChange}>
										<option value="INR">INR (₹)</option>
										<option value="USD">USD ($)</option>
										<option value="EUR">EUR (€)</option>
									</select>
								</div>
								<div className="col-md-3">
									<label className="form-label">Bill</label>
									<select className="form-select" name="bill" value={form.bill || ''} onChange={handleChange}>
										<option value="">Select Bill</option>
										<option value="bill1">Bill #1</option>
										<option value="bill2">Bill #2</option>
									</select>
								</div>
							</div>






							<div className="mb-3">
								<label className="form-label">Items</label>
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Description</th>
											<th>Quantity</th>
											<th>Unit</th>
											<th>Unit Price (INR)</th>
											<th>Amount (INR)</th>
										</tr>
									</thead>
									<tbody>
										{(form.items && form.items.length > 0) ? form.items.map((item: any, idx: number) => (
											<tr key={idx}>
												<td><input className="form-control" value={item.description} readOnly /></td>
												<td><input className="form-control" type="number" value={item.quantity} readOnly /></td>
												<td><input className="form-control" value={item.unit} readOnly /></td>
												<td><input className="form-control" type="number" value={item.unitPrice} readOnly /></td>
												<td>
													<input className="form-control" type="number" value={item.amount} readOnly />
												</td>
											</tr>
										)) : (
											<tr>
												<td colSpan={5} className="text-center text-muted">No items</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							<div className="row mb-3">
								<div className="col-md-4">
									<label className="form-label">Sub Total</label>
									<input className="form-control" value={form.subTotal || 0} readOnly />
								</div>
								<div className="col-md-4">
									<label className="form-label">Total</label>
									<input className="form-control" value={form.total || 0} readOnly />
								</div>
								<div className="col-md-4">
									<label className="form-label">Credit Used</label>
									<input className="form-control" name="creditUsed" value={form.creditUsed || 0} onChange={handleChange} />
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-md-6">
									<label className="form-label">Note</label>
									<textarea className="form-control" name="note" rows={2} value={form.note || ''} onChange={handleChange} />
								</div>


								<div className="col-md-6">
									<label className="form-label">Terms and Conditions</label>
                                    <label className="form-label">Thank you for your business.</label>
								</div>


							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-primary">
									Save
								</button>
								<button type="button" className="btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditVendorCreditModal;