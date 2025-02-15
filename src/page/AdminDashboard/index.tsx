import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BookOpen, BarChart, Bell, Settings } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const courses = [
    { id: 1, title: "React for Beginners", progress: 60 },
    { id: 2, title: "Node.js & Express", progress: 30 },
    { id: 3, title: "Advanced JavaScript", progress: 80 },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Python for Data Science",
      description: "Learn Python for data analysis and visualization.",
    },
    {
      id: 2,
      title: "Full-Stack Development",
      description: "Master full-stack development with MERN stack.",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Design beautiful and user-friendly interfaces.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700"
          >
            <BookOpen className="w-5 h-5 mr-3" />
            My Courses
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700"
          >
            <BarChart className="w-5 h-5 mr-3" />
            Progress
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700"
          >
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
              <DropdownMenuItem className="hover:bg-gray-700">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Enrolled Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-400 mt-2">Progress: {course.progress}%</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Courses */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recommended Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p className="text-gray-400 mt-2">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
