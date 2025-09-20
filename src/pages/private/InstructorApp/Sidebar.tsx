import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Users, User } from "lucide-react";
import logo from "../../../assets/logos/only_logo-removebg.png";
import ddtext from "../../../assets/logos/DD_text-removebg.png";

const Sidebar: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    {
      icon: <Home className="w-5 h-5 text-main" />,
      label: "Home",
      path: "/instructor",
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-main" />,
      label: "Your Calendar",
      path: "/instructor/calendar",
    },
    {
      icon: <Users className="w-5 h-5 text-main" />,
      label: "Students",
      path: "/instructor/students",
    },
    // { icon: <MessageCircle className="w-5 h-5 text-main" />, label: 'Chats', path: '/instructor/chats' },
    {
      icon: <User className="w-5 h-5 text-main" />,
      label: "Personal",
      path: "/instructor/personal",
    },
  ];

  return (
    <aside
      className={`fixed z-40 left-0 top-0 w-64 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <img src={ddtext} alt="DD Text" className="h-5 mt-1.5" />
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={`flex items-center px-4 py-3 text-gray-600 dark:text-gray-200 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-black/10 dark:bg-white/10"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span className="font-medium ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
