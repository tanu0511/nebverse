import React, { useState, useEffect } from "react";
import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";

const tabs = [
  "Overview", "Members", "Tasks"
];

interface Project {
  projectName: string;
  members?: string;
  projectCategory: string;
  summary?: string;
  notes?: string;
}

interface Member {
  id: number;
  name: string;
  subName?: string;
  hourlyRate: number;
  role: string;
}

interface ViewPageProps {
  project: Project | null;
  onBack?: () => void;
}

const ViewPage: React.FC<ViewPageProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = (member: { name: string; department?: string }) => {
    setMembers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: member.name,
        subName: member.department || "",
        hourlyRate: 0,
        role: "Project Admin",
      },
    ]);
    setShowAddMemberModal(false);
  };

  useEffect(() => {
    if (project?.members) {
      setMembers(
        project.members.split(",").map((name, idx) => ({
          id: idx + 1,
          name: name.trim(),
          subName: "",
          hourlyRate: 0,
          role: "",
        }))
      );
    }
  }, [project]);

  return (
    <div className="container-fluid py-3" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <ul className="nav nav-tabs mb-3" style={{ borderBottom: "2px solid #e5e7eb" }}>
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link${activeTab === tab ? " active" : ""}`}
              style={{
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #6366f1" : "none",
                background: "none",
                color: activeTab === tab ? "#6366f1" : "#222",
                fontWeight: 500,
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      {project ? (
        <>
          {activeTab === "Overview" && (
            <div>
              <h6>
                <b>Project Description</b>
              </h6>
              <div
                style={{
                  minHeight: 120,
                  background: "#fff",
                  padding: 24,
                  border: "1px solid #e9ecef",
                  borderRadius: 6,
                }}
              >
                {project.summary ? (
                  <span dangerouslySetInnerHTML={{ __html: project.summary }} />
                ) : (
                  <span className="text-muted">No description</span>
                )}
              </div>
              <div className="mt-4">
                <h6>
                  <b>Project Note</b>
                </h6>
                <div
                  style={{
                    minHeight: 120,
                    background: "#fff",
                    padding: 24,
                    border: "1px solid #e9ecef",
                    borderRadius: 6,
                  }}
                >
                  {project.notes ? (
                    <span dangerouslySetInnerHTML={{ __html: project.notes }} />
                  ) : (
                    <span className="text-muted">No notes</span>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "Members" && (
            <ProjectMembers
              members={members}
              setMembers={setMembers}
              showAddMemberModal={showAddMemberModal}
              setShowAddMemberModal={setShowAddMemberModal}
              handleAddMember={handleAddMember}
            />
          )}
          {activeTab === "Tasks" && <ProjectTasks />}
        </>
      ) : (
        <div>No project selected.</div>
      )}
    </div>
  );
};

export default ViewPage;