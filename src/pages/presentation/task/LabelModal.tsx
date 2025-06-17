import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LABEL_COLORS = [
  "#1976d2", "#1565c0", "#c62828", "#ad1457", "#00897b", "#43a047", "#aeea00", "#388e3c",
  "#263238", "#607d8b", "#7e57c2", "#9575cd", "#f8bbd0", "#f06292", "#d81b60", "#e53935",
  "#ff1744", "#ffd600", "#fbc02d", "#ffb300", "#bcaaa4"
];

interface Project {
  id: string;
  name: string;
}

interface LabelData {
  labelName: string;
  colorCode: string;
  project: string;
  description: string;
}

interface LabelModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (data: LabelData) => void;
  projects: Project[];
}

function LabelModal({ show, onHide, onSave, projects }: LabelModalProps) {
  const [labelName, setLabelName] = useState("");
  const [colorCode, setColorCode] = useState(LABEL_COLORS[0]);
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState<LabelData[]>([]);

  const handleColorSelect = (color: string) => setColorCode(color);

  const handleSave = () => {
    const newLabel = { labelName, colorCode, project, description };
    setLabels([...labels, newLabel]);
    onSave(newLabel);
    setLabelName("");
    setColorCode(LABEL_COLORS[0]);
    setProject("");
    setDescription("");
    onHide(); // <-- Close the modal after saving
  };

  const handleDelete = (idx: number) => {
    setLabels(labels.filter((_, i) => i !== idx));
  };

  const handleProjectChange = (idx: number, value: string) => {
    setLabels(labels.map((label, i) =>
      i === idx ? { ...label, project: value } : label
    ));
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Task Labels</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Table header */}
        <div className="mb-3 " style={{ borderBottom: "1px solid #e5e5e5" }}>
          <div className="d-flex fw-bold px-2 py-2" style={{ background: "#f6f8fa" }}>
            <div style={{ width: 40 }}>#</div>
            <div style={{ flex: 2 }}>Label Name</div>
            <div style={{ flex: 1 }}>Color Code</div>
            <div style={{ flex: 2 }}>Description</div>
            <div style={{ flex: 2 }}>Project</div>
            <div style={{ width: 80 }}>Action</div>
          </div>
          {/* Table rows */}
          {labels.map((label, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center px-2 py-2"
              style={{
                borderTop: "1px solid #eee",
                background: idx % 2 === 0 ? "#fff" : "#f9f9f9"
              }}
            >
              <div style={{ width: 40 }}>{idx + 1}</div>
              <div style={{ flex: 2 }}>{label.labelName}</div>
              <div style={{ flex: 1 }}>
                <span style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  background: label.colorCode,
                  borderRadius: 4,
                  marginRight: 6,
                  border: "1px solid #ccc",
                  verticalAlign: "middle"
                }} />
                <span >{label.colorCode}</span>
              </div>
              <div style={{ flex: 2 }}>{label.description}</div>
             <div style={{ flex: 2 }}>
  <Form.Select
    size="sm"
    value={label.project}
    onChange={e => handleProjectChange(idx, e.target.value)}
    style={{
      minWidth: 80,
      fontSize: "0.92rem",
      padding: "2px 10px",
      height: "32px",
      borderRadius: "8px",
      background: "#f6f6fb",
      fontWeight: 500,
      color: "#222",
      border: "none",
      boxShadow: "none",
      outline: "none",
      maxWidth: 180,
    }}
  >
    <option value="">--</option>
    {projects.map((p) => (
      <option key={p.id} value={p.id}>{p.name}</option>
    ))}
  </Form.Select>
</div>
              <div style={{ width: 80 }}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleDelete(idx)}
                >
                  <span className="me-1" role="img" aria-label="delete">🗑️</span> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Form */}
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>
                Label Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a label title"
                value={labelName}
                onChange={e => setLabelName(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>
                Color Code <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Color code"
                value={colorCode}
                onChange={e => setColorCode(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Select
                value={project}
                onChange={e => setProject(e.target.value)}
              >
                <option value="">--</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
        {/* Color palette */}
        <div className="d-flex flex-wrap mt-5 mb-3">
          {LABEL_COLORS.map((color) => (
            <div
              key={color}
              onClick={() => handleColorSelect(color)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                background: color,
                marginRight: 8,
                marginBottom: 8,
                border: colorCode === color ? "3px solid #222" : "2px solid #fff",
                cursor: "pointer",
                boxShadow: colorCode === color ? "0 0 0 2px #1976d2" : "none",
              }}
              title={color}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!labelName.trim()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LabelModal;