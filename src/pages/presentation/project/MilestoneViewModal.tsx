import React from "react";
import Modal from "../../../components/bootstrap/Modal";
import Icon from "../../../components/icon/Icon";

interface Milestone {
  id: number;
  title: string;
  cost: number;
  status: "Incomplete" | "Complete";
  summary: string;
  startDate: string;
  endDate: string;
  addToBudget: boolean;
  taskCount: number;
}

interface MilestoneViewModalProps {
  show: boolean;
  onClose: () => void;
  milestone: Milestone | null;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MilestoneViewModal: React.FC<MilestoneViewModalProps> = ({ show, onClose, milestone }) => {
  if (!milestone) return null;

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="xl">
      <div className="modal-header">
        <h5 className="modal-title">MileStones Details</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </div>
      <div className="modal-body" style={{ background: "#f8fafc", borderRadius: 8 }}>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Milestone Title</div>
            <div><b>{milestone.title}</b></div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Milestone Cost</div>
            <div>
              <b>
                {milestone.cost.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Status</div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: milestone.status === "Complete" ? "green" : "red",
                  marginRight: 8,
                  verticalAlign: "middle"
                }}
              />
              <b>{milestone.status}</b>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Milestone Summary</div>
            <div><b>{milestone.summary}</b></div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Total Hours</div>
            <div><b>0s</b></div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Milestone Start Date</div>
            <div><b>{formatDate(milestone.startDate)}</b></div>
          </div>
          <div className="col-md-6">
            <div className="mb-1 text-muted" style={{ fontWeight: 500 }}>Milestone End Date</div>
            <div><b>{formatDate(milestone.endDate)}</b></div>
          </div>
        </div>
        <div className="mb-4" style={{ background: "#fff", borderRadius: 8, padding: 16, border: "1px solid #e5e7eb" }}>
          <div className="fw-bold mb-2" style={{ fontSize: "1.1rem" }}>Tasks</div>
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Assigned By</th>
                <th>Due Date</th>
                <th>Total Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center" style={{ height: 80 }}>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <Icon icon="List" style={{ fontSize: 32, opacity: 0.2 }} />
                    <div className="mt-2 text-muted" style={{ fontSize: 16 }}>
                      - No record found. -
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-light" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default MilestoneViewModal;