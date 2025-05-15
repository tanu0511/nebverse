import React, { useState } from "react";
import Button from '../../../components/bootstrap/Button';

interface AddNewAssetModalProps {
  show: boolean;
  onHide: () => void;
  onAddAsset: (asset: { assetName: string; status: string; assetPicture?: string }) => void;
  initialAsset?: { assetName: string; status: string; assetPicture?: string };
}

const Assets: React.FC<AddNewAssetModalProps> = ({ show, onHide, onAddAsset, initialAsset }) => {
  const [assetType, setAssetType] = useState("");
  const [assetTypes] = useState<string[]>(["Laptop", "Phone", "Tablet"]);
  const [status, setStatus] = useState(initialAsset?.status || "Available");
  const [assetName, setAssetName] = useState(initialAsset?.assetName || "");
  const [assetPicture, setAssetPicture] = useState<string | undefined>(initialAsset?.assetPicture || undefined);

  if (!show) return null;

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAssetPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) return;
    onAddAsset({
      assetName,
      status,
      assetPicture,
    });
    // reset campi se vuoi
    setAssetName("");
    setAssetPicture(undefined);
    setStatus("Available");
    setAssetType("");
  };

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block" tabIndex={-1}>
        <div className="modal-dialog" style={{ maxWidth: 900, width: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Asset</h5>
              <Button color="link" className="btn-close" onClick={onHide} />
            </div>
            <div className="modal-body">
              <div className="bg-white rounded p-4" style={{ maxWidth: 1100, margin: "32px auto" }}>
                <h2 className="fw-semibold fs-2 mb-4">Add Asset Info</h2>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex gap-4 mb-4">
                    <div className="flex-grow-1">
                      <label className="fw-medium form-label">
                        Asset Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="e.g. Laptop, iPhone, etc"
                        required
                        value={assetName}
                        onChange={e => setAssetName(e.target.value)}
                      />

                      <label className="fw-medium form-label">
                        Serial Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Serial Number"
                        required
                      />

                      <label className="fw-medium form-label">Location</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Location"
                      />

                      <label className="fw-medium form-label">Description</label>
                      <textarea
                        className="form-control mb-3"
                        placeholder="Enter Description (optional)"
                        style={{ minHeight: 80 }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="fw-medium form-label">
                        Asset Type <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex gap-2 mb-3">
                        <select
                          className="form-select"
                          value={assetType}
                          onChange={e => setAssetType(e.target.value)}
                        >
                          <option value="">--</option>
                          {assetTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <Button type="button" color="light" className="px-3">
                          Add
                        </Button>
                      </div>

                      <label className="fw-medium form-label">
                        Asset Picture <span title="You can upload an image of the asset" style={{ cursor: "pointer", color: "#888" }}>?</span>
                      </label>
                      <div className="border rounded-3 d-flex align-items-center justify-content-center flex-column mb-3 mt-2" style={{ height: 140 }}>
                        <input type="file" style={{ display: "none" }} id="asset-picture" accept="image/*" onChange={handlePictureChange} />
                        <label htmlFor="asset-picture" style={{ cursor: "pointer", color: "#888", display: "flex", flexDirection: "column", alignItems: "center" }}>
                          {assetPicture ? (
                            <img src={assetPicture} alt="Preview" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />
                          ) : (
                            <>
                              <span style={{ fontSize: 36, marginBottom: 8 }}>☁</span>
                              <span>Choose a file</span>
                            </>
                          )}
                        </label>
                      </div>

                      <label className="fw-medium form-label">Value</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Value"
                      />

                      <label className="fw-medium form-label">Status</label>
                      <div className="d-flex gap-3 mt-2 mb-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="status" value="Available" checked={status === "Available"} onChange={() => setStatus("Available")} id="status-available" />
                          <label className="form-check-label" htmlFor="status-available">Available</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="status" value="Non Functional" checked={status === "Non Functional"} onChange={() => setStatus("Non Functional")} id="status-nonfunctional" />
                          <label className="form-check-label" htmlFor="status-nonfunctional">Non Functional</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="status" value="Lost" checked={status === "Lost"} onChange={() => setStatus("Lost")} id="status-lost" />
                          <label className="form-check-label" htmlFor="status-lost">Lost</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="status" value="Damaged" checked={status === "Damaged"} onChange={() => setStatus("Damaged")} id="status-damaged" />
                          <label className="form-check-label" htmlFor="status-damaged">Damaged</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="status" value="Under Maintenance" checked={status === "Under Maintenance"} onChange={() => setStatus("Under Maintenance")} id="status-maintenance" />
                          <label className="form-check-label" htmlFor="status-maintenance">Under Maintenance</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <Button type="submit" color="primary" className="px-4 fw-medium fs-5">
                      Save
                    </Button>
                    <Button type="button" color="light" className="px-4 fw-medium fs-5 text-secondary" onClick={onHide}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;