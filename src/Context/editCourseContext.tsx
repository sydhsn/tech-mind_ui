import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface EditCourseContextType {
  editCourse: (courseId: string) => void;
}

const EditCourseContext = createContext<EditCourseContextType | undefined>(
  undefined
);

export const EditCourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const editCourse = (courseId: string) => {
    navigate(`/home/teacher-dashboard/add-course/${courseId}`);
  };

  return (
    <EditCourseContext.Provider value={{ editCourse }}>
      {children}
    </EditCourseContext.Provider>
  );
};

export const useEditCourse = () => {
  const context = useContext(EditCourseContext);
  if (!context) {
    throw new Error("useEditCourse must be used within an EditCourseProvider");
  }
  return context;
};
