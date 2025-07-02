import React, { useState } from "react";
import { Project } from './ProjectsContext';
import { useLocation } from 'react-router-dom';
import OverviewTab from './OverviewTab';
import MembersTab from './MembersTab';
import FilesTab from './FilesTab';
import MilestonesTab from './MilestonesTab';
import DiscussionTab from './DiscussionTab';
import BurndownChartTab from './BurndownChartTab';
import TimeSheet from "../timesheet/TimeSheet";
import NotePage from "../document/NotePage";
import Expenses from "../expenses/Expenses";
import TicketPage from "../ticket/TicketPage";
import GanttChartTab from './GanttChartTab';

const tabs = [
  'Overview', 'Members', 'Files', 'Milestones', 'Tasks', 'Task Board', 'Gantt Chart',
  'Timesheet', 'Expenses', 'Discussion', 'Notes', 'Activity', 'Burndown Chart', 'Tickets'
];

interface Member {
  id: number;
  name: string;
  subName?: string;
  hourlyRate: number;
  role: string;
}

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

const ProjectViewPage: React.FC = () => {
  const location = useLocation();
  const project: Project | null = location.state?.project || null;
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [menuOpenIdx, setMenuOpenIdx] = useState<number | null>(null);

  const handleAddMember = (member: { name: string; department?: string }) => {
    setMembers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: member.name.startsWith('Mr') ? member.name : `Mr ${member.name}`,
        subName: member.department || 'Ram',
        hourlyRate: 0,
        role: 'Project Admin',
      },
    ]);
    setShowAddMemberModal(false);
  };

  const handleSaveMilestone = (data: any) => {
    setMilestones(prev => {
      if (editingMilestone) {
        // Edit mode: update the milestone
        return prev.map(m =>
          m.id === editingMilestone.id ? { ...m, ...data } : m
        );
      } else {
        // Add mode: add new milestone
        return [
          ...prev,
          {
            id: prev.length + 1,
            ...data,
            cost: Number(data.cost) || 0,
            status: data.status || "Incomplete",
            addToBudget: data.addToBudget === "Yes" || data.addToBudget === true,
            taskCount: 0,
          }
        ];
      }
    });
    setShowMilestoneModal(false);
    setEditingMilestone(null);
  };

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".milestone-action-menu")) {
        setMenuOpenIdx(null);
      }
    };
    if (menuOpenIdx !== null) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpenIdx]);

  return (
    <div className="container-fluid py-3" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div className="mb-2">
        <span className="text-muted">Home &gt; Projects &gt; <b>{project?.projectName || 'Project'}</b></span>
      </div>
      <ul className="nav nav-tabs mb-3" style={{ borderBottom: '2px solid #e5e7eb' }}>
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link${activeTab === tab ? ' active' : ''}`}
              style={{
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #6366f1' : 'none',
                background: 'none',
                color: activeTab === tab ? '#6366f1' : '#222',
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
          {activeTab === 'Overview' && project && <OverviewTab project={project} id={project.id} />}
          {activeTab === 'Members' && (
            <MembersTab
              members={members}
              setMembers={setMembers}
              showAddMemberModal={showAddMemberModal}
              setShowAddMemberModal={setShowAddMemberModal}
              handleAddMember={handleAddMember}
            />
          )}
          {activeTab === 'Files' && <FilesTab />}
          {activeTab === 'Milestones' && (
            <MilestonesTab
              milestones={milestones}
              setMilestones={setMilestones}
              showMilestoneModal={showMilestoneModal}
              setShowMilestoneModal={setShowMilestoneModal}
              handleSaveMilestone={handleSaveMilestone}
              menuOpenIdx={menuOpenIdx}
              setMenuOpenIdx={setMenuOpenIdx}
            />
          )}
          {activeTab === 'Discussion' && <DiscussionTab />}
          {activeTab === 'Burndown Chart' && <BurndownChartTab />}
          {activeTab === 'Timesheet' && <TimeSheet/>}
          {activeTab === 'Notes' && <NotePage/>}
          {activeTab === 'Expenses' && <Expenses/>}
          {activeTab === 'Tickets' && <TicketPage/>}
          {activeTab === 'Gantt Chart' && <GanttChartTab />}
        </>
      ) : (
        <div>No project selected.</div>
      )}
    </div>
  );
};

export default ProjectViewPage;