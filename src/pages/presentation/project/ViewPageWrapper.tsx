import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ViewPage from './ViewPage';
import { useProjectData } from './ProjectDataContext';

const ViewPageWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  const { projectData } = useProjectData();

  let project = location.state?.project || null;
  if (!project && projectName && projectData) {
    project = projectData.find(
      (p) => p.projectName === decodeURIComponent(projectName)
    ) || null;
  }

  return (
    <ViewPage
      project={project}
      onBack={() => navigate(-1)}
    />
  );
};

export default ViewPageWrapper;