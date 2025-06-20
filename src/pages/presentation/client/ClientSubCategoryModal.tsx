import React, { useState, useEffect, useRef } from "react";

interface SubCategory {
  name: string;
  category: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  categories: string[];
  subCategories: SubCategory[];
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategory[]>>;
}

const ClientSubCategoryModal: React.FC<Props> = ({
  show,
  onClose,
  categories,
  subCategories,
  setSubCategories,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && categories.length > 0) {
      setSelectedCategory(categories[0]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [show, categories]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  const handleAdd = () => {
    if (
      subCategoryName.trim() &&
      selectedCategory &&
      !subCategories.some(
        (sc) =>
          sc.name.toLowerCase() === subCategoryName.trim().toLowerCase() &&
          sc.category === selectedCategory
      )
    ) {
      setSubCategories([
        ...subCategories,
        { name: subCategoryName.trim(), category: selectedCategory },
      ]);
      setSubCategoryName("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleDelete = (name: string, category: string) => {
    setSubCategories(
      subCategories.filter(
        (sc) => !(sc.name === name && sc.category === category)
      )
    );
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Client Sub Category</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Sub Category</th>
                  <th>Category</th>
                  <th style={{ width: 80 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No sub categories
                    </td>
                  </tr>
                )}
                {subCategories.map((sc, idx) => (
                  <tr key={sc.name + sc.category}>
                    <td>{idx + 1}</td>
                    <td>{sc.name}</td>
                    <td>{sc.category}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(sc.name, sc.category)}
                      >
                        <i className="fa fa-trash" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label" htmlFor="clientCategorySelect">
                  Client Category <span className="text-danger">*</span>
                </label>
                <select
                  id="clientCategorySelect"
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="subCategoryNameInput">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  id="subCategoryNameInput"
                  className="form-control"
                  placeholder="e.g. Potential Client"
                  value={subCategoryName}
                  ref={inputRef}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              <i className="fa fa-check me-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSubCategoryModal;