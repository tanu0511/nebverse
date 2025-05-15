/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

interface ProjectCategoryModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    categories: string[]; // List of categories
    setCategories: (categories: string[]) => void; // Function to update categories
}

const ProjectCategoryModal: FC<ProjectCategoryModalProps> = ({ isOpen, setIsOpen, categories, setCategories }) => {
    const [newCategory, setNewCategory] = useState(''); // State for the new category input

    // Function to handle adding a new category
    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, newCategory]); // Add the new category to the list
            setNewCategory(''); // Clear the input field
            setIsOpen(false); // Close the modal after saving
        }
    };

    // Function to handle deleting a category
    const handleDeleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories); // Update the categories list
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop>
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="project-category-title">Project Category</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteCategory(index)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <FormGroup label="Category Name *">
                    <Input
                        name="categoryName"
                        value={newCategory}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                        placeholder="Enter a category name"
                        required
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
                <Button color="primary" onClick={handleAddCategory}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProjectCategoryModal;