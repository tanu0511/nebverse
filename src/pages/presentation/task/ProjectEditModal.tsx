/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import TaskCategoryModal from "./TaskCategoryModal"; // Adjust the path as needed
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    });

    React.useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues); // Update form data when defaultValues change
        }
    }, [defaultValues]);
  const [categories, setCategories] = useState<string[]>([
    "Category 1",
    "Category 2",
  ]);
  const [isTaskCategoryModalOpen, setIsTaskCategoryModalOpen] = useState(false);
  const [showOtherDetails, setShowOtherDetails] = useState(false); // State to toggle "Other Details"

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
  return (
    <>
      {/* <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg"> */}
    <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
		<Form>
          <div className="row g-3">
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
            </div>
          </div>
          <div className="col-md-12">
      
            <div className="row g-3">
              <div className="col-md-12">
                <Form.Group>
                  <Form.Label>Task Category</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Select
                      name="taskCategory"
                      value={formData.taskCategory}
                      onChange={handleInputChange}
                      className="me-2 w-100"
                    >
                      <option value="">--</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="primary"
                      onClick={() => setIsTaskCategoryModalOpen(true)}
					  className="ms-2"
                    >
                      Add
                   </Button>
                  </div>
                </Form.Group>
              </div>
            </div>
            
         </div>
            
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Project</Form.Label>
                <Form.Select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                >
                  <option value="">--</option>
                  <option value="Project 1">Project 1</option>
                  <option value="Project 2">Project 2</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
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
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-6">
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
            <div className="col-md-6 d-flex align-items-center">
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
                <Form.Control
                  type="text"
                  name="assignedTo"
                  placeholder="Enter assignee"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                />
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
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Label</Form.Label>
                      <Form.Select>
                        <option>Nothing selected</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Milestones</Form.Label>
                      <Form.Select>
                        <option>--</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Priority</Form.Label>
                      <Form.Select>
                        <option>Medium</option>
                      </Form.Select>
                    </Form.Group>
					</div>
                </div>
                <div className="row g-3 mt-3">
                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label>Add File</Form.Label>
                      <Form.Control type="file" />
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
</>);


};

export default ProjectEditModal;