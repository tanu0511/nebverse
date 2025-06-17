import React from "react";

interface AssetViewMdProps {
	show: boolean;
	onHide: () => void;
	asset: {
		assetName: string;
		status: string;
		assetPicture?: string;
		// aggiungi altri campi se necessario
	};
}

const AssetViewMd: React.FC<AssetViewMdProps> = ({ show, onHide, asset }) => {
	if (!show) return null;

	return (
		<div className="modal-backdrop show">
			<div className="modal d-block" tabIndex={-1}>
				<div className="modal-dialog" style={{ maxWidth: 900, width: "100%" }}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Asset Info</h5>
							<button type="button" className="btn-close" onClick={onHide} />
						</div>
						<div className="modal-body">
							<div style={{ display: "flex", gap: 32 }}>
								<div style={{ flex: 2 }}>
									<div style={{ marginBottom: 16 }}>
										<strong>Asset Name:</strong> {asset.assetName}
									</div>
									<div style={{ marginBottom: 16 }}>
										<strong>Status:</strong> {asset.status}
									</div>
									{/* Aggiungi qui altri campi se disponibili */}
								</div>
								<div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
									{asset.assetPicture ? (
										<img src={asset.assetPicture} alt="Asset" style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 8 }} />
									) : (
										<div style={{ color: "#ccc" }}>No Image</div>
									)}
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssetViewMd;