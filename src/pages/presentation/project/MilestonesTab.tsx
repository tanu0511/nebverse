import React from "react";
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import CreateMilestoneModal from './CreateMilestoneModal';
import MilestoneViewModal from './MilestoneViewModal';

interface Milestone {
  id: number;
  title: string;
  cost: number;
  status: "Incomplete" | "Complete";
  summary: string;
  startDate: string;
  endDate: string;
  addToBudget: boolean;
  taskCount: number;
}

interface MilestonesTabProps {
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
  showMilestoneModal: boolean;
  setShowMilestoneModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveMilestone: (data: any, isEdit?: boolean) => void;
  menuOpenIdx: number | null;
  setMenuOpenIdx: React.Dispatch<React.SetStateAction<number | null>>;
}

const MilestonesTab: React.FC<MilestonesTabProps> = ({
  milestones, setMilestones, showMilestoneModal, setShowMilestoneModal, handleSaveMilestone, setMenuOpenIdx
}) => {
  const [viewMilestone, setViewMilestone] = React.useState<Milestone | null>(null);
  const [showViewModal, setShowViewModal] = React.useState(false);
  const [editMilestone, setEditMilestone] = React.useState<Milestone | null>(null);

  // Open modal for create
  const handleCreate = () => {
    setEditMilestone(null);
    setShowMilestoneModal(true);
  };

  // Open modal for edit
  const handleEdit = (milestone: Milestone) => {
    setEditMilestone(milestone);
    setShowMilestoneModal(true);
  };

  // On save, pass isEdit flag if editing
  const handleModalSave = (data: any) => {
    if (editMilestone) {
      // Edit mode: update milestone
      setMilestones(ms =>
        ms.map(m => m.id === editMilestone.id ? { ...m, ...data } : m)
      );
    } else {
      // Create mode: add new milestone
      handleSaveMilestone(data);
    }
    setShowMilestoneModal(false);
    setEditMilestone(null);
  };

  // On close, reset edit state
  const handleModalClose = () => {
    setShowMilestoneModal(false);
    setEditMilestone(null);
  };

  return (
    <div>
      <Button
        icon="Add"
        className="mb-3"
        color="primary"
        isLight
        onClick={handleCreate}
      >
        Create Milestone
      </Button>
      <CreateMilestoneModal
        show={showMilestoneModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
        editMilestone={editMilestone} // Pass milestone to edit, or null for create
      />
      <MilestoneViewModal
        milestone={viewMilestone}
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
      />
      <Card stretch>
        <CardBody isScrollable className='table-responsive' style={{ overflow: 'visible' }}>
          <div className="fw-bold mb-3" style={{ fontSize: '1.25rem' }}>Milestones</div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Milestone Title</th>
                  <th>Milestone Cost</th>
                  <th>Task Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {milestones.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="mt-2 text-muted" style={{ fontSize: 14 }}>
                          - No milestone added to this project. -
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  milestones.map((milestone, idx) => (
                    <tr key={milestone.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{milestone.title}</div>
                        <div className="text-muted" style={{ fontSize: 13 }}>{milestone.summary}</div>
                      </td>
                      <td>
                        {milestone.cost.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>{milestone.taskCount}</td>
                      <td>
                        <select
                          className="form-select"
                          style={{ minWidth: 80 }}
                          value={milestone.status || 'Incomplete'}
                          onChange={e => {
                            const newStatus = e.target.value;
                            setMilestones(ms =>
                              ms.map(m =>
                                m.id === milestone.id ? { ...m, status: newStatus as "Incomplete" | "Complete" } : m
                              )
                            );
                          }}
                        >
                          <option value="Complete">Complete</option>
                          <option value="Incomplete">Incomplete</option>
                        </select>
                      </td>
                      <td>
                        <Dropdown>
                          <DropdownToggle hasIcon={false}>
                            <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                          </DropdownToggle>
                          <DropdownMenu isAlignmentEnd>
                            <Button color="link" className="dropdown-item" onClick={() => {
                              setViewMilestone(milestone);
                              setShowViewModal(true);
                            }}>
                              <Icon icon="Visibility" className="me-2" /> View
                            </Button>
                            <Button
                              color="link"
                              className="dropdown-item"
                              onClick={() => {
                                handleEdit(milestone);
                                setMenuOpenIdx(idx);
                              }}
                            >
                              <Icon icon="Edit" className="me-2" /> Edit
                            </Button>
                            <Button
                              color="link"
                              className="dropdown-item text-danger"
                              onClick={() => {
                                setMilestones(ms => ms.filter((m) => m.id !== milestone.id));
                                setMenuOpenIdx(null);
                              }}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default MilestonesTab;