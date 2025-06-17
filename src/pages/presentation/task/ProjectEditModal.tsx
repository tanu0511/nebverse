/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import TaskCategoryModal from "./TaskCategoryModal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LabelModal from "./LabelModal";

const projects = [
  { id: "1", name: "Project Alpha", client: "Client A" },
  { id: "2", name: "Project Beta", client: "" },
  { id: "3", name: "Project Gamma", client: "Client B" },
  { id: "4", name: "Project Delta", client: null },
];

interface ProjectEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any, index?: number) => void;
  defaultStatus: string;
  columns: string[];
  defaultValues?: any; // Add defaultValues prop
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  defaultStatus,
  columns,
  defaultValues,
}) => {

  const [formData, setFormData] = useState({
    title: defaultValues?.title || "",
    taskCategory: defaultValues?.taskCategory || "",
    project: defaultValues?.project || "",
    startDate: defaultValues?.startDate || "",
    dueDate: defaultValues?.dueDate || "",
    withoutDueDate: defaultValues?.withoutDueDate || false,
    status: defaultValues?.status || defaultStatus,
    assignedTo: defaultValues?.assignedTo || "",
    description: defaultValues?.description || "",
    makePrivate: defaultValues?.makePrivate || false,
    billable: defaultValues?.billable || false,
    timeEstimate: defaultValues?.timeEstimate || false,
    timeEstimateHours: defaultValues?.timeEstimateHours || 0,
    timeEstimateMins: defaultValues?.timeEstimateMins || 0,
    repeat: defaultValues?.repeat || false,
    dependent: defaultValues?.dependent || false,
    label: defaultValues?.label || "",
    priority: defaultValues?.priority || "Low",
    repeatEvery: defaultValues?.repeatEvery || 1,
    repeatType: defaultValues?.repeatType || "week",
    repeatCycles: defaultValues?.repeatCycles || 1,
    dependentTask: defaultValues?.dependentTask || "",
  });
  React.useEffect(() => {
    if (defaultValues) {
      setFormData((prev) => ({
        ...prev,
        ...defaultValues,
        label: defaultValues.label || "",
      })); // Update form data when defaultValues change
    }
  }, [defaultValues]);
  const [categories, setCategories] = useState<string[]>([
    "Category 1",
    "Category 2",
  ]);
  const [isTaskCategoryModalOpen, setIsTaskCategoryModalOpen] = useState(false);
  const [showOtherDetails, setShowOtherDetails] = useState(false); // State to toggle "Other Details"
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  interface Label {
    labelName: string;
    colorCode: string;
    project: string;
  }

  const [labels, setLabels] = useState<Label[]>([]);

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, status: defaultStatus }));
  }, [defaultStatus]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" && (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]); // Add the new category
    }
    setFormData((prev) => ({
      ...prev,
      taskCategory: category, // Automatically select the new category
    }));
  };
  const handleSubmit = () => {
    onSubmit(formData);
    setIsOpen(false);
  };

  const priorityOptions = [
    { value: "High", label: "High", color: "#E53935" },
    { value: "Medium", label: "Medium", color: "#FFD600" },
    { value: "Low", label: "Low", color: "#43A047" },
  ];

  return (
    <>
      {/* <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg"> */}
      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Task Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter a task title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Task Category</Form.Label>
                  <div className="input-group" style={{ borderRadius: 20, overflow: "hidden", background: "#F6F6FB" }}>
                    <Form.Select
                      name="taskCategory"
                      value={formData.taskCategory}
                      onChange={handleInputChange}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontWeight: 500,
                        color: "#444",
                      }}
                    >
                      <option value="">Nothing selected</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      type="button"
                      variant="light"
                      className="input-group-text"
                      onClick={() => setIsTaskCategoryModalOpen(true)}
                    >
                      Add
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>
                    Project{" "}
                    <span title="Project info">
                      <i className="bi bi-question-circle" />
                    </span>
                  </Form.Label>
                  <Form.Select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                  >
                    <option value="">--</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                {(() => {
                  const selected = projects.find(p => p.id === formData.project);
                  if (selected) {
                    return selected.client
                      ? <span style={{ color: "#222" }}>{selected.client}</span>
                      : <span style={{ color: "#1976d2" }}>This project does not contain any client</span>;
                  }
                  return null;
                })()}
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              {/* Only show Due Date if withoutDueDate is false */}
              {!formData.withoutDueDate && (
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>Due Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              )}
              <div className="col-md-4 d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  name="withoutDueDate"
                  label="Without Due Date"
                  checked={formData.withoutDueDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {columns.map((column) => (
                      <option key={column} value={column}>
                        {column}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Assigned To</Form.Label>
                  <div
                    className="input-group"
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      background: "#F6F6FB",
                    }}
                  >
                    <Form.Control
                      type="text"
                      name="assignedTo"
                      placeholder="Nothing Selected"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontWeight: 500,
                        color: "#444",
                        boxShadow: "none",
                      }}
                    />
                    <Button
                      type="button"
                      variant="light"
                      className="input-group-text"
                      onClick={() => setIsLabelModalOpen(true)}
                    >
                      Add
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-12">
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="mt-4">
              <Button
                variant="link"
                className="d-flex align-items-center"
                onClick={() => setShowOtherDetails((prev) => !prev)}
              >
                <span className="me-2">{showOtherDetails}</span>
                <i
                  className={`${showOtherDetails ? "bi-arrow-down" : "bi-chevron-down"}`}
                  style={{ fontSize: "1rem" }}
                ></i>
                Other Details
              </Button>
            </div>
            {showOtherDetails && (
              <div className="mt-3">
                <div className="row g-3">
                  {/* Label with Add button */}
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Label</Form.Label>
                      <div className="input-group">
                        <Form.Select
                          value={formData.label || ""}
                          name="label"
                          onChange={e => {
                            const selectedLabel = labels.find(
                              l => l.labelName === e.target.value && l.project === formData.project
                            );
                            setFormData(prev => ({
                              ...prev,
                              label: selectedLabel ? selectedLabel.labelName : "", // <-- Save label name, not index!
                              labelColor: selectedLabel ? selectedLabel.colorCode : "", // <-- Save color
                            }));
                          }}
                        >
                          <option value="">Nothing selected</option>
                          {labels
                            .filter(l => l.project === formData.project)
                            .map((label, idx) => (
                              <option
                                key={idx}
                                value={label.labelName}
                                style={{
                                  backgroundColor: label.colorCode,
                                  color: "#fff",
                                  fontWeight: 500,
                                }}
                              >
                                {label.labelName}
                              </option>
                            ))}
                        </Form.Select>
                        <Button
                          type="button"
                          variant="light"
                          className="input-group-text"
                          onClick={() => setIsLabelModalOpen(true)}
                        >
                          Add
                        </Button>
                      </div>
                      {/* Show selected label as a colored badge */}
                      {formData.label && (
                        <div className="mt-2">
                          {labels
                            .filter(l => l.project === formData.project && l.labelName === formData.label)
                            .map((label, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: label.colorCode,
                                  color: "#fff",
                                  borderRadius: 6,
                                  padding: "2px 10px",
                                  fontSize: "0.95rem",
                                  fontWeight: 500,
                                  display: "inline-block",
                                }}
                              >
                                {label.labelName}
                              </span>
                            ))}
                        </div>
                      )}
                    </Form.Group>
                  </div>
                  {/* Milestones */}
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Milestones</Form.Label>
                      <Form.Select>
                        <option>--</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  {/* Priority with colored dot */}
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Priority</Form.Label>
                      <div className="dropdown">
                        <button
                          className="form-control d-flex align-items-center"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ textAlign: "left" }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: priorityOptions.find(opt => opt.value === formData.priority)?.color || "#ccc",
                              marginRight: 8,
                              border: "1px solid #eee",
                            }}
                          ></span>
                          {formData.priority || "Select Priority"}
                        </button>
                        <ul className="dropdown-menu w-100" style={{ minWidth: "100%" }}>
                          {priorityOptions.map(opt => (
                            <li key={opt.value}>
                              <button
                                className={`dropdown-item d-flex align-items-center${formData.priority === opt.value ? " active" : ""}`}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, priority: opt.value }))}
                                style={{ fontWeight: formData.priority === opt.value ? 600 : 400 }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    background: opt.color,
                                    marginRight: 8,
                                    border: "1px solid #eee",
                                  }}
                                ></span>
                                {opt.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                {/* Checkboxes */}
                <div className="row g-3 mt-3">
                  <div className="col-md-12">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                      <Form.Check
                        type="checkbox"
                        label={
                          <span style={{ display: "inline-flex", alignItems: "center" }}>
                            Make Private{" "}
                            <span
                              style={{ position: "relative", display: "inline-block" }}
                            >
                              <i
                                className="bi bi-question-circle"
                                style={{ marginLeft: 4, cursor: "pointer" }}
                                onMouseEnter={e => {
                                  const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                  if (tooltip) tooltip.style.display = "block";
                                }}
                                onMouseLeave={e => {
                                  const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                  if (tooltip) tooltip.style.display = "none";
                                }}
                              />
                              <span
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  top: "120%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  background: "#fff",
                                  color: "#222",
                                  border: "1px solid #ddd",
                                  borderRadius: 6,
                                  padding: "8px 12px",
                                  fontSize: "0.95rem",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                  zIndex: 10,
                                  minWidth: 220,
                                  whiteSpace: "normal",
                                }}
                              >
                                Private tasks are only visible to admin, assignor, and assignee.
                              </span>
                            </span>
                          </span>
                        }
                        className="me-4"
                        checked={formData.makePrivate}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, makePrivate: e.target.checked }))
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label={
                          <span style={{ display: "inline-flex", alignItems: "center" }}>
                            Billable{" "}
                            <span style={{ position: "relative", display: "inline-block" }}>
                              <i
                                className="bi bi-question-circle"
                                style={{ marginLeft: 4, cursor: "pointer" }}
                                onMouseEnter={e => {
                                  const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                  if (tooltip) tooltip.style.display = "block";
                                }}
                                onMouseLeave={e => {
                                  const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                  if (tooltip) tooltip.style.display = "none";
                                }}
                              />
                              <span
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  top: "120%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  background: "#fff",
                                  color: "#222",
                                  border: "1px solid #ddd",
                                  borderRadius: 6,
                                  padding: "8px 12px",
                                  fontSize: "0.95rem",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                  zIndex: 10,
                                  minWidth: 220,
                                  whiteSpace: "normal",
                                }}
                              >
                                Invoice can be generated for this task's time log.
                              </span>
                            </span>
                          </span>
                        }
                        className="me-4"
                        checked={formData.billable}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, billable: e.target.checked }))
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label="Time estimate"
                        className="me-4"
                        checked={formData.timeEstimate}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, timeEstimate: e.target.checked }))
                        }
                      />
                      {formData.timeEstimate && (
                        <div className="d-inline-flex align-items-center ms-3" style={{ gap: 8 }}>
                          <Form.Control
                            type="number"
                            min={0}
                            value={formData.timeEstimateHours || 0}
                            onChange={e =>
                              setFormData(prev => ({
                                ...prev,
                                timeEstimateHours: Math.max(0, Number(e.target.value)),
                              }))
                            }
                            style={{ width: 80, textAlign: "center" }}
                          />
                          <span>hrs</span>
                          <Form.Control
                            type="number"
                            min={0}
                            max={59}
                            value={formData.timeEstimateMins || 0}
                            onChange={e =>
                              setFormData(prev => ({
                                ...prev,
                                timeEstimateMins: Math.max(0, Math.min(59, Number(e.target.value))),
                              }))
                            }
                            style={{ width: 60, textAlign: "center" }}
                          />
                          <span>mins</span>
                        </div>
                      )}
                      <Form.Check
                        type="checkbox"
                        label="Repeat"
                        className="me-4"
                        checked={formData.repeat}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, repeat: e.target.checked }))
                        }
                      />
                      {formData.repeat && (
                        <div className="d-flex align-items-center flex-wrap gap-3 mt-3">
                          <div>
                            <Form.Label className="mb-1" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              Repeat every <span style={{ color: "red" }}>*</span>
                              <span style={{ position: "relative", display: "inline-block" }}>
                                <i
                                  className="bi bi-question-circle"
                                  style={{ cursor: "pointer" }}
                                  onMouseEnter={e => {
                                    const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                    if (tooltip) tooltip.style.display = "block";
                                  }}
                                  onMouseLeave={e => {
                                    const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                    if (tooltip) tooltip.style.display = "none";
                                  }}
                                />
                                <span
                                  style={{
                                    display: "none",
                                    position: "absolute",
                                    top: "120%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "#fff",
                                    color: "#222",
                                    border: "1px solid #ddd",
                                    borderRadius: 6,
                                    padding: "8px 12px",
                                    fontSize: "0.95rem",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    zIndex: 10,
                                    minWidth: 220,
                                    whiteSpace: "normal",
                                  }}
                                >
                                  Task will auto-create after every X days.
                                </span>
                              </span>
                            </Form.Label>
                            <div className="d-flex align-items-center gap-2">
                              <Form.Control
                                type="number"
                                min={1}
                                value={formData.repeatEvery || 1}
                                onChange={e =>
                                  setFormData(prev => ({
                                    ...prev,
                                    repeatEvery: Math.max(1, Number(e.target.value)),
                                  }))
                                }
                                style={{ width: 70, textAlign: "center" }}
                              />
                              <Form.Select
                                value={formData.repeatType || "week"}
                                onChange={e =>
                                  setFormData(prev => ({
                                    ...prev,
                                    repeatType: e.target.value,
                                  }))
                                }
                                style={{ width: 120 }}
                              >
                                <option value="day">Day(s)</option>
                                <option value="week">Week(s)</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div>
                            <Form.Label className="mb-1" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              Cycles <span style={{ color: "red" }}>*</span>
                              <span style={{ position: "relative", display: "inline-block" }}>
                                <i
                                  className="bi bi-question-circle"
                                  style={{ cursor: "pointer" }}
                                  onMouseEnter={e => {
                                    const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                    if (tooltip) tooltip.style.display = "block";
                                  }}
                                  onMouseLeave={e => {
                                    const tooltip = e.currentTarget.nextSibling as HTMLElement;
                                    if (tooltip) tooltip.style.display = "none";
                                  }}
                                />
                                <span
                                  style={{
                                    display: "none",
                                    position: "absolute",
                                    top: "120%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "#fff",
                                    color: "#222",
                                    border: "1px solid #ddd",
                                    borderRadius: 6,
                                    padding: "8px 12px",
                                    fontSize: "0.95rem",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    zIndex: 10,
                                    minWidth: 220,
                                    whiteSpace: "normal",
                                  }}
                                >
                                  Number of times to repeat
                                </span>
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              min={1}
                              value={formData.repeatCycles || 1}
                              onChange={e =>
                                setFormData(prev => ({
                                  ...prev,
                                  repeatCycles: Math.max(1, Number(e.target.value)),
                                }))
                              }
                              style={{ width: 70, textAlign: "center" }}
                            />
                          </div>
                        </div>
                      )}
                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            Task is dependent on another task{" "}
                            <span title="This task can't start until another finishes">
                              <i className="bi bi-question-circle" />
                            </span>
                          </>
                        }
                        checked={formData.dependent}
                        onChange={e =>
                          setFormData(prev => ({ ...prev, dependent: e.target.checked }))
                        }
                      />
                      {formData.dependent && (
                        <div className="mt-3" style={{ width: "30%" }}>
                          <Form.Label>Dependent Task</Form.Label>
                          <Form.Select
                            name="dependentTask"
                            value={formData.dependentTask || ""}
                            onChange={e =>
                              setFormData(prev => ({
                                ...prev,
                                dependentTask: e.target.value,
                              }))
                            }
                          >
                            <option value="">--</option>
                            {/* Replace with your actual tasks list */}
                            {projects.map(project => (
                              <option key={project.id} value={project.id}>
                                {project.name}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Add File */}
                <div className="row g-3 mt-3">
                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label>Add File</Form.Label>
                      <div
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: 6,
                          minHeight: 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#fff",
                        }}
                      >
                        <Form.Control
                          type="file"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            width: "100%",
                            height: "100%",
                            background: "transparent",
                            textAlign: "center",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            margin: "auto",
                            color: "#888",
                            pointerEvents: "none",
                          }}
                        >

                        </span>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>

      </Modal>
      <TaskCategoryModal
        isOpen={isTaskCategoryModalOpen}
        setIsOpen={setIsTaskCategoryModalOpen}
        onSaveCategory={handleSaveCategory}
      />
      <LabelModal
        show={isLabelModalOpen}
        onHide={() => setIsLabelModalOpen(false)}
        onSave={(label) => {
          setLabels((prev) => [...prev, label]);
        }}
        projects={projects}
      />
    </>);


};

export default ProjectEditModal;