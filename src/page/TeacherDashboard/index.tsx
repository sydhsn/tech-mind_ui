import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, BookOpen, Settings, Users } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "My Courses",
      key: "my-courses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    { name: "Students", key: "students", icon: <Users className="w-5 h-5" /> },
    {
      name: "Analytics",
      key: "analytics",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      name: "Settings",
      key: "settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(`/teacher-dashboard/${key}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar
        title="Teacher Dashboard"
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
      />
      <main className="ml-2 mt-14 flex-1 p-8 overflow-y-auto">
        {/* Renders Child Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboard;
