import React, { useState } from "react";

interface Employee {
	id: number;
	name: string;
	status: string;
	avatar?: string;
}

interface AssetLandMdProps {
	show: boolean;
	onHide: () => void;
	onLend: (data: {
		employee: Employee;
		dateGiven: string;
		estimatedReturn: string;
		notes: string;
	}) => void;
	asset: {
		assetName: string;
		status: string;
		assetPicture?: string;
	};
}

const EMPLOYEES: Employee[] = [
	{ id: 1, name: "Atharva", status: "Inactive", avatar: "" },
	// aggiungi altri se necessario
];

const AssetLandmd: React.FC<AssetLandMdProps> = ({ show, onHide, onLend }) => {
	const [employee, setEmployee] = useState<Employee | null>(EMPLOYEES[0]);
	const [dateGiven, setDateGiven] = useState("");
	const [estimatedReturn, setEstimatedReturn] = useState("");
	const [notes, setNotes] = useState("");

	if (!show) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!employee || !dateGiven) return;
		onLend({
			employee,
			dateGiven,
			estimatedReturn,
			notes,
		});
	};

	return (
		<div className="modal-backdrop show">
			<div className="modal d-block" tabIndex={-1}>
				<div className="modal-dialog" style={{ maxWidth: 900, width: "100%" }}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Lend Asset</h5>
							<button type="button" className="btn-close" onClick={onHide} />
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
									<div style={{ flex: 1 }}>
										<label style={{ fontWeight: 500 }}>
											Employee <span style={{ color: "red" }}>*</span>
										</label>
										<div style={{ marginTop: 6, marginBottom: 18 }}>
											<select
												className="form-select"
												value={employee?.id}
												onChange={e => {
													const emp = EMPLOYEES.find(emp => emp.id === Number(e.target.value));
													setEmployee(emp || null);
												}}
											>
												{EMPLOYEES.map(emp => (
													<option key={emp.id} value={emp.id}>
														{emp.name}
													</option>
												))}
											</select>
											{employee && (
												<div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
													<img
														src={employee.avatar || `https://ui-avatars.com/api/?name=${employee.name}`}
														alt={employee.name}
														style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8 }}
													/>
													<span>{employee.name}</span>
													<span style={{ marginLeft: 8, fontSize: 12, color: "#fff", background: "#e53935", borderRadius: 12, padding: "2px 10px" }}>
														{employee.status}
													</span>
												</div>
											)}
										</div>
									</div>
									<div style={{ flex: 1 }}>
										<label style={{ fontWeight: 500 }}>
											Date Given <span style={{ color: "red" }}>*</span>
										</label>
										<input
											type="date"
											className="form-control"
											value={dateGiven}
											onChange={e => setDateGiven(e.target.value)}
											required
											style={{ marginTop: 6, marginBottom: 18 }}
										/>
									</div>
									<div style={{ flex: 1 }}>
										<label style={{ fontWeight: 500 }}>
											Estimated Date of Return
										</label>
										<input
											type="date"
											className="form-control"
											value={estimatedReturn}
											onChange={e => setEstimatedReturn(e.target.value)}
											style={{ marginTop: 6, marginBottom: 18 }}
										/>
									</div>
								</div>
								<div>
									<label style={{ fontWeight: 500 }}>Notes</label>
									<textarea
										className="form-control"
										placeholder="Notes"
										value={notes}
										onChange={e => setNotes(e.target.value)}
										style={{ minHeight: 80, marginTop: 6, marginBottom: 18 }}
									/>
								</div>
								<div className="modal-footer" style={{ justifyContent: "flex-end" }}>
									<button type="button" className="btn btn-link" onClick={onHide}>Close</button>
									<button type="submit" className="btn btn-primary">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssetLandmd;