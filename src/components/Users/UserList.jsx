import React from 'react';
import { Link } from 'react-router-dom';
import UserItem from './UserItem';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/solid'; // Use solid icon for button

function UserList({ users, onDelete, isLoading, error }) {

    if (isLoading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
             <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="text-lg leading-6 font-medium text-gray-900">
                     Registered Users ({users.length})
                 </h3>
                 <Link
                    to="/users/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                     <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                     Add User
                 </Link>
             </div>
            {users.length === 0 ? (
                 <div className="text-center py-10 text-gray-500">
                    No users found.
                 </div>
            ) : (
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profile
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <UserItem key={user._id} user={user} onDelete={onDelete} />
                            ))}
                        </tbody>
                    </table>
                 </div>
             )}
        </div>
    );
}

export default UserList;