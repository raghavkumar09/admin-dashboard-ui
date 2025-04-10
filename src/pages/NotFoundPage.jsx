import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center py-12 sm:px-6 lg:px-8">
            <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Page Not Found</h2>
            <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
                <Link
                    to="/dashboard" // Link back to the main dashboard
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;