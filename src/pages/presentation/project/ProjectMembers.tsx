import React from "react";
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import AddProjectMembersModal from './AddProjectMembersModal';

interface Member {
  id: number;
  name: string;
  subName?: string;
  hourlyRate: number;
  role: string;
}

interface ProjectMembersProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  showAddMemberModal: boolean;
  setShowAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddMember: (member: { name: string; department?: string }) => void;
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({
  members,
  setMembers,
  showAddMemberModal,
  setShowAddMemberModal,
  handleAddMember,
}) => (
  <div>
    <Button
      icon="Add"
      className="mb-3"
      color="primary"
      isLight
      onClick={() => setShowAddMemberModal(true)}
    >
      Add Project Members
    </Button>
    <AddProjectMembersModal
      show={showAddMemberModal}
      onClose={() => setShowAddMemberModal(false)}
      onSave={handleAddMember}
    />
    <Card stretch>
      <CardBody>
        <div className="fw-bold mb-3" style={{ fontSize: '1.25rem' }}>Members</div>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <div className="mt-2 text-muted">
                        - No member added to this project. -
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                members.map((member, idx) => (
                  <tr key={member.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <span
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon icon="Person" size="lg" style={{ color: "#a0aec0" }} />
                        </span>
                        <div>
                          <div style={{ fontWeight: 500, color: "#222" }}>{member.name}</div>
                          <div className="text-muted" style={{ fontSize: 13 }}>{member.subName}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-outline-light"
                        onClick={() =>
                          setMembers(members.filter((_, i) => i !== idx))
                        }
                      >
                        <Icon icon="Delete" />
                        Delete
                      </button>
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

export default ProjectMembers;