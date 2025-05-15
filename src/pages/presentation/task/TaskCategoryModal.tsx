
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

interface TaskCategoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveCategory: (category: string) => void;
}

const TaskCategoryModal: React.FC<TaskCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  onSaveCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      alert("Category name cannot be empty.");
      return;
    }
    setCategories((prev) => [...prev, newCategory]);
    onSaveCategory(newCategory);
    setNewCategory("");
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setCategories((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  - No record found. -
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Form.Group className="mt-3">
          <Form.Label>Category Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCategory}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskCategoryModal;