import { useState } from "react";
import { Menu, X, User, Settings, LogOut, Heart, Folder } from "lucide-react";
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

  const dashboardPath =
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "teacher"
      ? "/teacher-dashboard"
      : "/student-dashboard";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    ...(isAuthenticated && user?.role
      ? [{ href: dashboardPath, label: "Dashboard" }]
      : []),
  ];

  return (
    <header className="bg-gradient-to-r from-black to-gray-900 text-white shadow-md w-full h-16 px-4 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="Logo" className="h-10" />
      </div>

      {/* Navigation & Profile */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Profile Dropdown or Login Button */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex-shrink-0">
                <Avatar className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-105">
                  <AvatarImage
                    src={user?.profilePhoto || "https://via.placeholder.com/50"}
                    alt="User"
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                  <AvatarFallback className="bg-gray-700 flex items-center justify-center rounded-full">
                    <User className="text-white h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-[220px] bg-gray-800 text-white py-2 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 ease-in-out transform opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100"
              align="end"
              sideOffset={8}
            >
              {/* User Info */}
              <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-700">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.profilePhoto || "https://via.placeholder.com/50"}
                    alt="User"
                    className="rounded-full object-cover h-full w-full"
                  />
                  <AvatarFallback className="bg-gray-700 flex items-center justify-center rounded-full">
                    <User className="text-white h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-400">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>

              {/* Dropdown Items */}
              <DropdownMenuItem
                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 transition-all duration-300"
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4 text-gray-300" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 transition-all duration-300"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4 text-gray-300" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 transition-all duration-300">
                <Heart className="h-4 w-4 text-red-500" />
                <span>My Likes</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 transition-all duration-300">
                <Folder className="h-4 w-4 text-blue-500" />
                <span>Collections</span>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 transition-all duration-300 border-t border-gray-700"
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
              >
                <LogOut className="h-4 w-4 text-red-400" />
                <span>Sign Out</span>
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
          className="md:hidden text-white hover:bg-gray-800 transition-all"
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-16 right-0 w-full bg-gray-800 shadow-md md:hidden transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
