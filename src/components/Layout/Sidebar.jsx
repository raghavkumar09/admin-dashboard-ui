import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'; // Example icons

function Sidebar() {
    const linkClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150";
    const activeLinkClasses = "bg-gray-700 text-white";
    const inactiveLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">
            {/* Logo or Title */}
            <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
                <span className="text-xl font-semibold">Admin Panel</span>
                {/* Or use an image/logo */}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                 <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <HomeIcon className="h-5 w-5 mr-3" />
                    Dashboard
                </NavLink>
                 <NavLink
                    to="/users"
                     className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                     <UsersIcon className="h-5 w-5 mr-3" />
                    Users
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;