import React, { useState } from "react";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import Card, { CardBody } from "../../../components/bootstrap/Card";
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
} from "../../../components/bootstrap/Dropdown";
import PaginationButtons from "../../../components/PaginationButtons";
import AddTaskModal from "./AddTaskModal";
import TaskViewModal from "./TaskViewModal";
import { useDebounce } from "use-debounce";

interface Task {
  id: number;
  name: string;
  summary?: string;
  assignedTo?: string;
  // Add other fields as needed (category, label, etc.)
}

const ProjectTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  // Handler to add a new task
  const handleSaveTask = (taskData: any) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editTask.id
            ? {
                ...t,
                name: taskData.title,
                assignedTo: taskData.assignedTo,
                summary: taskData.summary,
                selectedLabel: taskData.selectedLabel,
              }
            : t
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: taskData.title || "Untitled Task",
          assignedTo: taskData.assignedTo,
          summary: taskData.summary,
          selectedLabel: taskData.selectedLabel,
          // Add other fields here if needed
        },
      ]);
    }
    setShowAddTaskModal(false);
    setEditTask(null);
  };

  // Handler to delete a task
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks by search
  const filteredTasks = tasks.filter((task) => {
    const searchText = debouncedSearch.toLowerCase();
    return (
      task.name.toLowerCase().includes(searchText) ||
      (task.summary && task.summary.toLowerCase().includes(searchText)) ||
      (task.assignedTo && task.assignedTo.toLowerCase().includes(searchText))
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <Button
        icon="Add"
        className="mb-3"
        color="primary"
        isLight
        onClick={() => {
          setEditTask(null);
          setShowAddTaskModal(true);
        }}
      >
        Add Task
      </Button>
      <div className="mb-3" style={{ maxWidth: 440 }}>
        <div className="input-group">
          <span className="input-group-text" style={{ background: "#fff" }}>
            <Icon icon="Search" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Start typing to search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <Card stretch>
        <CardBody>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Task</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="mt-2 text-muted">
                          - No task added to this project. -
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentTasks.map((task, idx) => (
                    <tr key={task.id}>
                      <td>{indexOfFirst + idx + 1}</td>
                      <td>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 12 }}
                        >
                          <div>
                            <div style={{ fontWeight: 500, color: "#222" }}>
                              {task.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Dropdown>
                          <DropdownToggle hasIcon={false}>
                            <Button
                              icon="MoreVert"
                              color="primary"
                              isLight
                              className="btn-icon"
                            />
                          </DropdownToggle>
                          <DropdownMenu isAlignmentEnd>
                            <Button
                              color="link"
                              className="dropdown-item"
                              onClick={() => {
                                setViewTask(task);
                                setShowViewModal(true);
                              }}
                            >
                              <Icon icon="Visibility" className="me-2" /> View
                            </Button>
                            <Button
                              color="link"
                              className="dropdown-item"
                              onClick={() => {
                                setEditTask(task);
                                setShowAddTaskModal(true);
                              }}
                            >
                              <Icon icon="Edit" className="me-2" /> Edit
                            </Button>
                            <Button
                              color="link"
                              className="dropdown-item text-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <Icon icon="Delete" className="me-2" /> Delete
                            </Button>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <PaginationButtons
            data={filteredTasks}
            label="entries"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </CardBody>
      </Card>
      <AddTaskModal
        show={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onSave={handleSaveTask}
        editTask={editTask}
      />
      {viewTask && (
        <TaskViewModal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          task={viewTask}
          id={viewTask.id}
        />
      )}
    </div>
  );
};

export default ProjectTasks;
