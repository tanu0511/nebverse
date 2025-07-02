import React, { useState } from "react";
import Button from "../../../components/bootstrap/Button";
import PaginationButtons from "../../../components/PaginationButtons";
import AddNewDiscussion from "./AddNewDiscussion";
import Dropdown, { DropdownToggle, DropdownMenu } from "../../../components/bootstrap/Dropdown";
import Icon from "../../../components/icon/Icon";

const DiscussionTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [discussions, setDiscussions] = useState<any[]>([]); // Store discussions here
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <AddNewDiscussion
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(data) => {
          setDiscussions([
            ...discussions,
            {
              ...data,
              id: Date.now(),
              user: "User", // Replace with actual user if available
              date: new Date().toLocaleString(),
              replies: 1, // Example, update as needed
            },
          ]);
          setShowAddModal(false);
        }}
      />
      <div className="d-flex align-items-center mb-4" style={{ gap: 12 }}>
        <Button
          icon="Add"
          className="mb-3"
          color="primary"
          isLight
          onClick={() => setShowAddModal(true)}
        >
          New Discussion
        </Button>
        <Button
          icon="Settings"
          className="mb-3"
          color="primary"
          isLight
        >
          Discussion Category
        </Button>
      </div>
      <div className="mb-3">
        <label
          className="form-label"
          style={{ fontWeight: 500 }}
          htmlFor="discussion-category-select"
        >
          Category
        </label>
        <select
          id="discussion-category-select"
          className="form-select"
          style={{ maxWidth: 320 }}
        >
          <option>All</option>
        </select>
      </div>
      <div className="card" style={{ borderRadius: 14 }}>
        <div className="card-body p-0">
          <table className="table mb-0">
            <tbody>
              {discussions.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div
                      className="text-center py-4"
                    >
                      No data available in table
                    </div>
                  </td>
                </tr>
              ) : (
                discussions.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{d.title}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>
                        posted on {d.date}
                      </div>
                    </td>
                    <td style={{ width: 60, textAlign: "center" }}>
                      <span>
                        <i className="bi bi-chat" /> {d.replies}
                      </span>
                    </td>
                    <td style={{ width: 100, textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          background: "#4cc2ff",
                          borderRadius: "50%",
                          marginRight: 6,
                          verticalAlign: "middle",
                        }}
                      />
                      <span style={{ verticalAlign: "middle" }}>{d.category}</span>
                      <Dropdown>
                        <DropdownToggle hasIcon={false}>
                          <Icon icon="MoreHoriz"/>
                        </DropdownToggle>
                        <DropdownMenu isAlignmentEnd>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => {
                              setDiscussions(discussions.filter((item) => item.id !== d.id));
                            }}
                          >
                            Delete
                          </button>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="px-4 pb-3">
            <PaginationButtons
              data={discussions}
              label="Discussions"
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionTab;