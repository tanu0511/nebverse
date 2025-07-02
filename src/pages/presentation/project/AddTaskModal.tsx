import React, { useEffect, useState } from "react";
import Button from "../../../components/bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddEmployee from "../hr/AddEmployee";
import TaskCategoryModal from "../task/TaskCategoryModal"; // Adjust the path if needed
import LabelModal from "../task/LabelModal"; // Adjust the path if needed

interface Employee {
  id: number;
  name: string;
  // Add other fields as needed
}

interface AddTaskModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  editTask?: any; // Add this line
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  show,
  onClose,
  onSave,
  editTask,
}) => {
  const [summary, setSummary] = useState<string>("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assignedTo, setAssignedTo] = useState<number | "">("");
  const [title, setTitle] = useState<string>("");
  // --- Add these states for categories ---
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // --- Add these states for labels ---
  const [labels, setLabels] = useState<
    { labelName: string; colorCode: string }[]
  >([]);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Handler for adding a new employee
  const handleAddEmployee = (employee: any) => {
    // Support both employeeName and name
    const newEmployee = {
      id: employee.id || employee.employeeId || Date.now(),
      name: employee.name || employee.employeeName || "",
    };
    setEmployees((prev) =>
      prev.some((e) => e.id === newEmployee.id) ? prev : [...prev, newEmployee]
    );
    setAssignedTo(newEmployee.id);
    setShowAddEmployee(false);
  };

  // Handler for saving a new category
  const handleSaveCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev : [...prev, category]
    );
  };

  // Handler for saving a new label
  const handleSaveLabel = (label: { labelName: string; colorCode: string }) => {
    setLabels((prev) =>
      prev.some((l) => l.labelName === label.labelName)
        ? prev
        : [...prev, label]
    );
  };

  const resetForm = () => {
    setTitle("");
    setAssignedTo("");
    setSummary("");
    setSelectedLabel("");
    setSelectedCategory("");
  };

  const projects: any[] = [];

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.name || "");
      setAssignedTo(editTask.assignedTo || "");
      setSummary(editTask.summary || "");
      setSelectedLabel(editTask.selectedLabel || "");
      setSelectedCategory(editTask.category || ""); // <-- Add this line
      // Set other fields as needed
    } else {
      setTitle("");
      setAssignedTo("");
      setSummary("");
      setSelectedLabel("");
      setSelectedCategory(""); // <-- Add this line
      // Reset other fields as needed
    }
  }, [editTask, show]);

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.15)" }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Project Template</h5>
            <Button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <div className="fw-bold mb-3" style={{ fontSize: 20 }}>
              Task Info
            </div>
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="task-title-input">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    id="task-title-input"
                    className="form-control"
                    placeholder="Enter a task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="task-category-select">
                    Task category
                  </label>
                  <div className="input-group">
                    <select
                      id="task-category-select"
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">--</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Button
                      color="light"
                      type="button"
                      className="input-group-text"
                      onClick={() => setShowCategoryModal(true)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="assigned-to-select">
                    Assigned To
                  </label>
                  <div className="input-group">
                    <select
                      id="assigned-to-select"
                      className="form-select"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(Number(e.target.value))}
                    >
                      <option value="">Nothing selected</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      color="light"
                      className="input-group-text"
                      type="button"
                      onClick={() => setShowAddEmployee(true)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="priority-select">
                    Priority
                  </label>
                  <select id="priority-select" className="form-select">
                    <option>Medium</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label" htmlFor="description-editor">
                  Description
                </label>
                <ReactQuill
                  id="description-editor"
                  theme="snow"
                  value={summary}
                  onChange={(val) => setSummary(val)}
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="label-select">
                    Label
                  </label>
                  <div className="input-group">
                    <select
                      id="label-select"
                      className="form-select"
                      value={selectedLabel}
                      onChange={(e) => setSelectedLabel(e.target.value)}
                    >
                      <option value="">Nothing selected</option>
                      {labels.map((label, idx) => (
                        <option key={idx} value={label.labelName}>
                          {label.labelName}
                        </option>
                      ))}
                    </select>
                    <Button
                      color="light"
                      type="button"
                      className="input-group-text"
                      onClick={() => setShowLabelModal(true)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <Button
                  type="button"
                  color="primary"
                  className="me-2"
                  onClick={() => {
                    onSave({
                      title,
                      assignedTo,
                      summary,
                      category: selectedCategory, // <-- Use the state value
                      selectedLabel,
                      // add other fields as needed
                    });
                    resetForm();
                  }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  color="light"
                  isOutline
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* AddEmployee Modal */}
      <AddEmployee
        isOpen={showAddEmployee}
        setIsOpen={setShowAddEmployee}
        onAddEmployee={handleAddEmployee}
      />
      {/* TaskCategoryModal */}
      <TaskCategoryModal
        isOpen={showCategoryModal}
        setIsOpen={setShowCategoryModal}
        onSaveCategory={handleSaveCategory}
      />
      {/* LabelModal */}
      <LabelModal
        show={showLabelModal}
        onHide={() => setShowLabelModal(false)}
        onSave={handleSaveLabel}
        projects={projects}
      />
    </div>
  );
};

export default AddTaskModal;
