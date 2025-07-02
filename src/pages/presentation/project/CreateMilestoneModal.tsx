import React, { useState, useEffect } from "react";
import Modal from "../../../components/bootstrap/Modal";
import Button from "../../../components/bootstrap/Button";

interface CreateMilestoneModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editMilestone?: any; // Add this prop for editing
}

const initialFormState = {
  title: "",
  cost: "",
  status: "Incomplete",
  summary: "",
  startDate: "",
  endDate: "",
  addToBudget: false,
};

const CreateMilestoneModal: React.FC<CreateMilestoneModalProps> = ({
  show,
  onClose,
  onSave,
  editMilestone,
}) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (show) {
      if (editMilestone) {
        setForm({
          ...initialFormState,
          ...editMilestone,
          cost: editMilestone.cost?.toString() ?? "",
        });
      } else {
        setForm(initialFormState); // Reset form for create
      }
    }
  }, [show, editMilestone]);

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">
          {editMilestone ? "Edit Milestone" : "Create Milestone"}
        </h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </div>
      <div className="modal-body">
        <form>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="milestone-title">
                Milestone Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="milestone-title"
                className="form-control"
                placeholder="Enter milestone title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="milestone-cost">
                Milestone Cost
              </label>
              <input
                id="milestone-cost"
                className="form-control"
                placeholder="e.g. 10000"
                type="number"
                value={form.cost}
                onChange={e => setForm({ ...form, cost: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="milestone-status">
                Status
              </label>
              <select
                id="milestone-status"
                className="form-select"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="add-cost-to-budget">
                Add Cost To Project Budget
              </label>
              <select
                id="add-cost-to-budget"
                className="form-select"
                value={form.addToBudget ? "Yes" : "No"}
                onChange={e => setForm({ ...form, addToBudget: e.target.value === "Yes" })}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="milestone-summary">
                Milestone Summary <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="milestone-summary"
                className="form-control"
                placeholder="Enter milestone summary"
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="milestone-start-date">
                Start Date
              </label>
              <input
                id="milestone-start-date"
                type="date"
                className="form-control"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="milestone-end-date">
                End Date
              </label>
              <input
                id="milestone-end-date"
                type="date"
                className="form-control"
                value={form.endDate}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <Button color="light" onClick={onClose}>Close</Button>
        <Button color="primary" onClick={() => onSave(form)}>
          {editMilestone ? "Update" : "Save"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateMilestoneModal;