import React, { useState, useEffect } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const ClientCategoryModal: React.FC<Props> = ({
  show,
  onClose,
  categories,
  setCategories,
}) => {
  const [categoryName, setCategoryName] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // Clean up on unmount
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  const handleAdd = () => {
    if (
      categoryName.trim() &&
      !categories.includes(categoryName.trim())
    ) {
      setCategories([...categories, categoryName.trim()]);
      setCategoryName("");
    }
  };

  const handleDelete = (name: string) => {
    setCategories(categories.filter((cat) => cat !== name));
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.3)" }} // 0.3 for semi-transparent
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Client Category</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Category Name</th>
                  <th style={{ width: 80 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No categories
                    </td>
                  </tr>
                )}
                {categories.map((cat, idx) => (
                  <tr key={cat}>
                    <td>{idx + 1}</td>
                    <td>{cat}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(cat)}
                      >
                        <i className="fa fa-trash" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mb-3">
              <label className="form-label" htmlFor="categoryNameInput">
                Category Name <span className="text-danger">*</span>
              </label>
              <input
                id="categoryNameInput"
                className="form-control"
                placeholder="e.g. Potential Client"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCategoryModal;