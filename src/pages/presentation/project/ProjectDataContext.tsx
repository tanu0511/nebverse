import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  projectName: string;
  members?: string;
  projectCategory: string;
  summary?: string;
  notes?: string;
}

type ProjectDataContextType = {
  projectData: Project[];
  setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
};

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export const useProjectData = () => {
  const context = useContext(ProjectDataContext);
  if (!context) throw new Error('useProjectData must be used within a ProjectDataProvider');
  return context;
};

interface ProjectDataProviderProps {
  children: ReactNode;
}

export const ProjectDataProvider: React.FC<ProjectDataProviderProps> = ({ children }) => {
  const [projectData, setProjectData] = useState<Project[]>([]);
  return (
    <ProjectDataContext.Provider value={{ projectData, setProjectData }}>
      {children}
    </ProjectDataContext.Provider>
  );
};