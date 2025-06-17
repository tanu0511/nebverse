import React, { createContext, useContext, useState } from 'react';

export type Template = { id: number; title: string; description: string };

type TemplateContextType = {
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplateContext = () => {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplateContext must be used within TemplateProvider');
  return ctx;
};

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  return (
    <TemplateContext.Provider value={{ templates, setTemplates }}>
      {children}
    </TemplateContext.Provider>
  );
};