import React from 'react';
import useAuth from '../../hooks/useAuth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Header({ title = "Admin Dashboard" }) { // Optional title prop
    const { logout } = useAuth();

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left side */}
            <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>

            {/* Right side */}
            <div>
                <button
                    onClick={logout}
                    className="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    title="Logout"
                >
                     <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1 text-gray-500"/>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;