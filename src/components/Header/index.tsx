import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  // Ensure user is defined before accessing user?.role
  const dashboardPath =
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "teacher"
      ? "/teacher-dashboard"
      : "/student-dashboard";

  return (
    <header className="bg-black text-white shadow-md w-full px-4 py-1 flex justify-between items-center fixed top-0 left-0 z-10">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
      </div>

      {/* Navigation and Profile */}
      <div className="flex items-center space-x-6 ml-auto">
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-300 hover:text-white cursor-pointer">
            Home
          </a>
          <a
            href="/courses"
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Courses
          </a>
          <a
            href="/about"
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            About
          </a>
          {isAuthenticated && user?.role && (
            <a
              href={dashboardPath}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              {user?.role === "admin"
                ? "Admin Dashboard"
                : user?.role === "teacher"
                ? "Teacher Dashboard"
                : "Student Dashboard"}
            </a>
          )}
        </nav>

        {/* Conditionally render Profile, Settings, Logout if authenticated */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={"https://via.placeholder.com/40"}
                  alt="User"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 mt-2 shadow-lg bg-black text-white py-2"
              style={{ zIndex: 20 }} // Increased z-index
            >
              <DropdownMenuItem
                className="p-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2 hover:bg-gray-800 cursor-pointer"
                onClick={async () => {
                  await logout(); // Ensure to call the logout function
                  navigate("/login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            Login
          </Button>
        )}

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden text-white"
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-12 right-0 w-full bg-black shadow-md md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <a
              href="/"
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Home
            </a>
            <a
              href="/courses"
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Courses
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              About
            </a>
            {isAuthenticated && user?.role && (
              <a
                href={dashboardPath}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Dashboard
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
