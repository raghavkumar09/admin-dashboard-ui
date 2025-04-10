import React from 'react';
import { Link } from 'react-router-dom';
import { getProfilePictureUrl } from '../../services/api';
import { UserCircleIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

function UserItem({ user, onDelete }) {
    const profilePicUrl = getProfilePictureUrl(user.profilePicturePath);

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
            onDelete(user._id);
        }
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {profilePicUrl ? (
                            <img className="h-10 w-10 rounded-full object-cover" src={profilePicUrl} alt={`${user.name}'s profile`} />
                        ) : (
                            <UserCircleIcon className="h-10 w-10 text-gray-400" />
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">{user.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {user.isProfileComplete ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Complete
                    </span>
                ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Incomplete
                    </span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                 <Link to={`/users/${user._id}`} className="text-indigo-600 hover:text-indigo-900" title="View">
                    <EyeIcon className="h-5 w-5 inline" />
                </Link>
                <Link to={`/users/${user._id}/edit`} className="text-yellow-600 hover:text-yellow-900" title="Edit">
                     <PencilSquareIcon className="h-5 w-5 inline" />
                </Link>
                <button onClick={handleDeleteClick} className="text-red-600 hover:text-red-900" title="Delete">
                    <TrashIcon className="h-5 w-5 inline" />
                </button>
            </td>
        </tr>
    );
}

export default UserItem;