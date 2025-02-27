import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardContextType {
  editCourse: (courseId: string) => void;
}

const EditCourseContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const EditCourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const editCourse = (courseId: string) => {
    navigate(`/teacher-dashboard/add-course/${courseId}`);
  };

  return (
    <EditCourseContext.Provider value={{ editCourse }}>
      {children}
    </EditCourseContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(EditCourseContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};
