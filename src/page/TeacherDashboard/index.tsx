import React, { useState } from "react";
import { BarChart, BookOpen, PlusCircle, Settings, Users } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Analytics from "./Analytics";
import SettingsPage from "./Settings";
import Students from "./Students";
import MyCourses from "./MyCourses";
import { Button } from "../../components/ui/button";
import AddCourse from "./addCourse";

const TeacherDashboard: React.FC = () => {
  // Manage active component and courseId
  const [activePage, setActivePage] = useState("MyCourses");
  const [courseId, setCourseId] = useState<string | null>(null);

  // Sidebar menu items
  const menuItems = [
    {
      name: "My Courses",
      key: "MyCourses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    { name: "Students", key: "Students", icon: <Users className="w-5 h-5" /> },
    {
      name: "Analytics",
      key: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      name: "Settings",
      key: "SettingsPage",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  // Function to change the active page
  const handleMenuClick = (key: string) => {
    setActivePage(key);
    setCourseId(null);
  };

  // Function to handle adding a new course
  const handleAddCourse = () => {
    setActivePage("AddCourse");
    setCourseId(null);
  };

  // Function to handle editing a course
  const handleEditCourse = (courseId: string) => {
    setActivePage("AddCourse");
    setCourseId(courseId);
  };

  // Function to render the active component
  const renderComponent = () => {
    switch (activePage) {
      case "MyCourses":
        return <MyCourses onEditCourse={handleEditCourse} />;
      case "Students":
        return <Students />;
      case "Analytics":
        return <Analytics />;
      case "SettingsPage":
        return <SettingsPage />;
      case "AddCourse":
        return <AddCourse id={courseId} />;
      default:
        return <MyCourses onEditCourse={handleEditCourse} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar with dynamic menu selection */}
      <Sidebar
        title="Teacher Dashboard"
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
      />

      {/* Main content area */}
      <main className="ml-2 mt-14 flex-1 p-8 overflow-y-auto">
        {/* Add Course Button in the Right Section */}
        {activePage !== "AddCourse" && (
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              onClick={handleAddCourse}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> {/* Add Course Icon */}
              Add Course
            </Button>
          </div>
        )}

        {/* Render the active component */}
        {renderComponent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
