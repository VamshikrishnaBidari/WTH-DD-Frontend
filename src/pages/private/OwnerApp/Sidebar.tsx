import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";
import logo from "../../../assets/logos/only_logo-removebg.png";
import ddtext from "../../../assets/logos/DD_text-removebg.png";

const Sidebar: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const school = useSelector(
    (state: RootState) => state.school.school,
  ) as DrivingSchool;
  const schoolId = school?.id;

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
      path: "/school",
    },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/55caea77016459129650f975da4cd7e9.png"
          className="w-6 h-6"
          alt="Instructors"
        />
      ),
      label: "Instructors",
      path: "/school/instructors",
    },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/29119c63c0937937e6f857918d95c011.png"
          className="w-6 h-6"
          alt="Coordinators"
        />
      ),
      label: "Coordinators",
      path: "/school/coordinators",
    },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/f974336a7f849a99b2a0f41a18f09e3c.png"
          className="w-6 h-6"
          alt="Students"
        />
      ),
      label: "Students",
      path: "/school/students",
    },
    // { icon: <MessageSquare className="w-6 h-6 text-main" />, label: 'Chats', path: '/school/chats' },
    // { icon: <Settings className="w-6 h-6 text-main" />, label: 'Configuration', path: '/school/configuration' },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/2e1c1f6f8c63bc5391dabb9ba8df2959.png"
          className="w-6 h-6"
          alt="Course Manager"
        />
      ),
      label: "Course Manager",
      path: "/school/course-manager",
    },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/09f3ad76a8e273233fb7bec1f254e5cf.png"
          className="w-6 h-6"
          alt="New Recruitment"
        />
      ),
      label: "New Recruitment",
      path: `/school/recruitment/${schoolId}`,
    },
    {
      icon: (
        <img
          src="https://image-resource.creatie.ai/155238777211102/155238777211104/e00dfe38307ed1161ac44f9ddf6c6365.png"
          className="w-6 h-6"
          alt="Declare Holiday"
        />
      ),
      label: "Declare Holiday",
      path: "/school/holiday",
    },
  ];

  return (
    <aside
      className={`fixed z-30 left-0 top-0 w-64 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out ${
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
