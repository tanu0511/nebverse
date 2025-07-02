import React, { useState } from "react";
import Modal from "../../../components/bootstrap/Modal";
import Button from "../../../components/bootstrap/Button";

interface AddNewDiscussionProps {
  show: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const AddNewDiscussion: React.FC<AddNewDiscussionProps> = ({ show, onClose, onSave }) => {
  // Example state for form fields
  const [category, setCategory] = useState("General");
  const [title, setTitle] = useState("");
  const [reply, setReply] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (show) {
      setCategory("General");
      setTitle("");
      setReply("");
      setFile(null);
    }
  }, [show]);

  return (
    <Modal isOpen={show} setIsOpen={onClose} size="xl">
      <div className="modal-header">
        <h5 className="modal-title">New Discussion</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="category-select">
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="category-select"
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="General">General</option>
              {/* Add more <option> elements for other categories as needed */}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="discussion-title">Title <span style={{ color: "red" }}>*</span></label>
            <input
              id="discussion-title"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter discussion title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="discussion-reply">Reply <span style={{ color: "red" }}>*</span></label>
            {/* Replace with your rich text editor if needed */}
            <textarea
              id="discussion-reply"
              className="form-control"
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Enter your reply"
              rows={5}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="discussion-file">Add File</label>
            <input
              id="discussion-file"
              type="file"
              className="form-control"
              onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
            />
            {file && <div className="mt-2">{file.name}</div>}
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <Button color="light" onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={() => onSave?.({ category, title, reply, file })}>Save</Button>
      </div>
    </Modal>
  );
};

export default AddNewDiscussion;