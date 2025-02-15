import React, { JSX } from "react";

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
  return (
    <div className="w-64 bg-gray-800 p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
            onClick={() => onMenuClick(item.key)}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
