import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, deleteUser, getProfilePictureUrl } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { formatDate } from '../utils/formatDate'; // Import utility
import { UserCircleIcon, CalendarIcon, EnvelopeIcon, CakeIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function UserDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await getUser(id);
                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setError('User not found or failed to fetch details.');
                }
            } catch (err) {
                 console.error("Fetch user detail error:", err);
                 if (err.response?.status === 404) {
                     setError('User not found.');
                 } else {
                     setError(err.response?.data?.message || err.message || 'An error occurred fetching user details.');
                 }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete user ${user?.name}?`)) {
            try {
                await deleteUser(id);
                navigate('/users'); // Redirect to user list after deletion
            } catch (err) {
                console.error("Delete user error:", err);
                setError(err.response?.data?.message || 'Failed to delete user.'); // Show error on the detail page
            }
        }
    };


    if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
    if (error) return <div className="p-6"><ErrorMessage message={error} /> <Link to="/users" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Users</Link> </div>;
    if (!user) return <div className="p-6">User data could not be loaded.</div>; // Fallback

    const profilePicUrl = getProfilePictureUrl(user.profilePicturePath);

    return (
        <div className="p-6">
             <div className="mb-4">
                 <Link to="/users" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                     <ArrowLeftIcon className="h-4 w-4 mr-1" />
                     Back to User List
                 </Link>
             </div>

             {error && <ErrorMessage message={error} />} {/* Show delete error here too */}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            User Profile - {user.name}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Detailed information about the user.
                        </p>
                    </div>
                    <div className="flex space-x-2">
                         <Link
                            to={`/users/${user._id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5 text-gray-500" /> Edit
                        </Link>
                         <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                         >
                             <TrashIcon className="-ml-1 mr-1 h-5 w-5" /> Delete
                        </button>
                    </div>

                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <UserCircleIcon className="h-5 w-5 mr-2 text-gray-400" /> Profile Picture
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profilePicUrl ? (
                                    <img className="h-20 w-20 rounded-full object-cover" src={profilePicUrl} alt="Profile" />
                                ) : (
                                    <span className="text-gray-500 italic">No picture uploaded</span>
                                )}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                 Full Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.name}
                            </dd>
                        </div>
                         <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" /> Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.email}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                 <CakeIcon className="h-5 w-5 mr-2 text-gray-400" /> Date of Birth
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.dateOfBirth ? formatDate(user.dateOfBirth, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not Provided'}
                            </dd>
                        </div>
                         <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" /> Registration Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDate(user.registrationDate)} {/* Use default format */}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                Profile Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.isProfileComplete ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircleIcon className="h-4 w-4 mr-1 text-green-600" /> Complete
                                    </span>
                                ) : (
                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                         <XCircleIcon className="h-4 w-4 mr-1 text-yellow-600" /> Incomplete (Missing Profile Picture)
                                    </span>
                                )}
                            </dd>
                        </div>
                        {/* Add other fields as necessary */}
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default UserDetailPage;