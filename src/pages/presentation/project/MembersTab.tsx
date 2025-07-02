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

interface MembersTabProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  showAddMemberModal: boolean;
  setShowAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddMember: (member: { name: string; department?: string }) => void;
}

const MembersTab: React.FC<MembersTabProps> = ({
  members, setMembers, showAddMemberModal, setShowAddMemberModal, handleAddMember
}) => (
  <div>
    <Button
      icon='Add'
      className="mb-3"
      color='primary'
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
                <th>Hourly Rate</th>
                <th>
                  User Role
                  <Icon icon="HelpOutline" size="sm" className="ms-1" />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
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
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          <Icon icon="Person" size="lg" />
                        </span>
                        <div>
                          <div style={{ fontWeight: 500}}> {member.name}</div>
                          <div className="text-muted" style={{ fontSize: 13 }}>Ram</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={member.hourlyRate}
                        style={{
                          width: 120,
                          background: '#f8fafc',
                          border: 'none',
                          borderRadius: 16,
                          fontWeight: 700,
                          textAlign: 'center',
                        }}
                        onChange={e =>
                          setMembers(members.map((m, i) =>
                            i === idx ? { ...m, hourlyRate: Number(e.target.value) } : m
                          ))
                        }
                      />
                    </td>
                    <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid #6C38FF',
                            background: member.role === 'Project Admin' ? '#6C38FF' : '#fff',
                            marginRight: 8,
                            position: 'relative',
                            transition: 'background 0.2s',
                          }}
                          onClick={() => {
                            setMembers(members.map((m, i) =>
                              i === idx
                                ? { ...m, role: 'Project Admin' }
                                : { ...m, role: '' }
                            ));
                          }}
                        >
                          {member.role === 'Project Admin' && (
                            <span
                              style={{
                                display: 'block',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: '#fff',
                                position: 'absolute',
                                top: 4,
                                left: 4,
                              }}
                            />
                          )}
                        </span>
                        <span style={{ color: '#222', fontWeight: 500 }}>Project Admin</span>
                      </label>
                      {member.role === 'Project Admin' && (
                        <button
                          style={{
                            marginLeft: 16,
                            border: '1px solid #6C38FF',
                            color: '#6C38FF',
                            background: '#fff',
                            borderRadius: 8,
                            padding: '6px 16px',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setMembers(members.map((m, i) =>
                              i === idx
                                ? { ...m, role: '' }
                                : m
                            ));
                          }}
                        >
                          <span style={{ fontSize: 16, lineHeight: 1 }}>✖</span>
                          Remove Project Admin
                        </button>
                      )}
                    </td>
                    <td>
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

export default MembersTab;