import React, { useState } from "react";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";

interface TaskViewModalProps {
  show: boolean;
  onClose: () => void;
  task: any;
  id: number; 
}

const TaskViewModal: React.FC<TaskViewModalProps> = ({ show, onClose, task }) => {
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [subTasks, setSubTasks] = useState<{ name: string }[]>([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");

  if (!show || !task) return null;

  const handleSubTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTaskTitle.trim()) return;
    setSubTasks([...subTasks, { name: subTaskTitle.trim() }]);
    setSubTaskTitle("");
    setShowSubTaskModal(false);
  };

  const handleDeleteSubTask = (idx: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.15)" }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ border: "none" }}>
            <h4 className="modal-title fw-bold">
              Task # {task.id}
            </h4>
            <Button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <div>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 24 }}>
                {task.name}
              </div>
              <table>
                <tbody>
                  <tr>
                    <td style={{ color: "#888", width: 180, padding: "8px 0" }}>Project</td>
                    <td style={{ fontWeight: 500 }}>{task.project || "--"}</td>
                  </tr>
                  <tr>
                    <td style={{ color: "#888", padding: "8px 0" }}>Priority</td>
                    <td>
                      <span style={{ color: "#fbc02d", fontSize: 18, verticalAlign: "middle" }}>●</span>
                      <span style={{ marginLeft: 8, textTransform: "lowercase" }}>{task.priority || "medium"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#888", padding: "8px 0" }}>Assigned To</td>
                    <td>
                      <Icon icon="Person" style={{ color: "#bbb", fontSize: 20, verticalAlign: "middle" }} />
                      <span style={{ marginLeft: 8 }}>{task.assignedTo || "--"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#888", padding: "8px 0" }}>Task category</td>
                    <td>{task.category || "--"}</td>
                  </tr>
                  <tr>
                    <td style={{ color: "#888", padding: "8px 0" }}>Description</td>
                    <td>
                      {(task.summary && task.summary.replace(/<[^>]+>/g, "").trim()) || "--"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#888", padding: "8px 0" }}>Label</td>
                    <td>{task.selectedLabel || "--"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ borderTop: "1px solid #eee", margin: "32px 0 0 0" }} />
            {/* Sub Task Section */}
            <div style={{ padding: 32, paddingTop: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, display: "flex", alignItems: "center" }}>
                <span style={{ borderBottom: "2px solid #6c63ff", paddingBottom: 4, marginRight: 24 }}>Sub Task</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button
                  color="link"
                  style={{ color: "#1976d2", fontWeight: 500, padding: 0 }}
                  onClick={() => setShowSubTaskModal(true)}
                >
                  <Icon icon="Add" className="me-1" /> Add Sub Task
                </Button>
              </div>
              {/* Sub Task Modal */}
              {showSubTaskModal && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.10)",
                    zIndex: 1050,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: 32,
                      minWidth: 600,
                      boxShadow: "0 2px 16px #0002",
                      position: "relative"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 24, textAlign: "left" }}>
                      Sub Task
                      <div style={{
                        borderBottom: "2px solid #6c63ff",
                        width: 120,
                        marginTop: 4,
                        marginBottom: 24
                      }} />
                    </div>
                    <form onSubmit={handleSubTaskSubmit}>
                      <div style={{ marginBottom: 32 }}>
                        <label htmlFor="subtask-title" style={{ display: "block", fontWeight: 500, marginBottom: 8 }}>
                          Title <span style={{ color: "#d32f2f" }}>*</span>
                        </label>
                        <input
                          id="subtask-title"
                          type="text"
                          placeholder="Enter a task title"
                          required
                          value={subTaskTitle}
                          onChange={e => setSubTaskTitle(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "1px solid #e0e0e0",
                            borderRadius: 6,
                            fontSize: 16
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
                        <Button
                          type="button"
                          color="light"
                          isOutline
                          onClick={() => setShowSubTaskModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          style={{ minWidth: 90 }}
                        >
                          <Icon icon="Send" className="me-1" /> Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className="table-responsive">
                <table className="table align-middle" style={{ background: "#fafbfc" }}>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Name</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subTasks.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center" style={{ color: "#888", background: "#f5f6fa" }}>
                          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 80 }}>
                            <Icon icon="List" style={{ fontSize: 32, color: "#cfd8dc" }} />
                            <div className="mt-2 text-muted">
                              - Seems like no sub task exists in the database. Please create the sub task first -
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      subTasks.map((sub, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{sub.name}</td>
                          <td style={{ textAlign: "right" }}>
                            <Button
                              color="light"
                              isOutline
                              size="sm"
                              onClick={() => handleDeleteSubTask(idx)}
                            >
                              <Icon icon="Delete" className="me-1" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;