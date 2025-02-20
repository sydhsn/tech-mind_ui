import React, { useState } from "react";
import { BarChart, BookOpen, PlusCircle, Settings, Users } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Analytics from "./Analytics";
import SettingsPage from "./Settings";
import Students from "./Students";
import MyCourses from "./MyCourses";
import AddCourse from "./addCourse";

const TeacherDashboard: React.FC = () => {
  // Manage active component
  const [activePage, setActivePage] = useState("MyCourses");

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
    {
      name: "Add Course",
      key: "AddCourse",
      icon: <PlusCircle className="w-5 h-5" />,
    },
  ];

  // Function to change the active page
  const handleMenuClick = (key: string) => {
    setActivePage(key);
  };

  // Function to render the active component
  const renderComponent = () => {
    switch (activePage) {
      case "MyCourses":
        return <MyCourses />;
      case "Students":
        return <Students />;
      case "Analytics":
        return <Analytics />;
      case "SettingsPage":
        return <SettingsPage />;
      case "AddCourse":
        return <AddCourse />;
      default:
        return <MyCourses />;
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
        {renderComponent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
