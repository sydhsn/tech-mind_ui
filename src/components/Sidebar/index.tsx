import React, { JSX, useState } from "react";

interface MenuItem {
  name: string;
  key: string;
  icon: JSX.Element;
}

interface SidebarProps {
  title: string;
  menuItems: MenuItem[];
  onMenuClick: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ title, menuItems, onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <ul className="mt-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-700 text-white"
              onClick={() => {
                onMenuClick(item.key);
                setIsOpen(false); // Close on select (mobile)
              }}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
