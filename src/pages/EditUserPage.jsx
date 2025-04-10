import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserForm from '../components/Users/UserForm';
import { getUser, updateUser, getProfilePictureUrl } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading initial data
    const [isSubmitting, setIsSubmitting] = useState(false); // Submitting update
    const [error, setError] = useState('');

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getUser(id);
            if (response.data.success) {
                 // Add the full image URL to the data for the form preview
                 const userData = {
                     ...response.data.data,
                     profilePictureUrl: getProfilePictureUrl(response.data.data.profilePicturePath)
                 };
                setUser(userData);
            } else {
                setError('User not found or failed to fetch details.');
            }
        } catch (err) {
             console.error("Fetch user for edit error:", err);
            if (err.response?.status === 404) {
                setError('User not found.');
            } else {
                setError(err.response?.data?.message || 'An error occurred fetching user details.');
            }
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleUpdateUser = async (formData) => { // Expecting FormData from UserForm
        setIsSubmitting(true);
        setError('');
        try {
            const response = await updateUser(id, formData);
             if (response.data.success) {
                 // Redirect to user detail page or user list after update
                 navigate(`/users/${id}`);
                 // Optionally show a success message before redirecting
             } else {
                 setError(response.data.message || 'Failed to update user.');
             }
        } catch (err) {
            console.error("Update user error:", err);
            // Handle potential duplicate email error during update
            if (err.response?.data?.message?.includes('duplicate key error')) {
                 setError('Email already exists. Please use a different email.');
            } else if (err.response?.data?.message) {
                 setError(`Error: ${err.response.data.message}`);
             } else {
                setError('An unexpected error occurred while updating the user.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-6 flex justify-center items-center h-64"><LoadingSpinner /></div>;
    // Keep showing the form even if there was an initial fetch error, but display the error message
    // if (!user && !loading) return <div className="p-6"><ErrorMessage message={error || 'User data could not be loaded.'} /> <Link to="/users" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Users</Link> </div>;

    return (
        <div className="p-6">
            <div className="mb-4">
                <Link to={user ? `/users/${id}` : '/users'} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                     <ArrowLeftIcon className="h-4 w-4 mr-1" />
                     {user ? 'Back to User Detail' : 'Back to User List'}
                 </Link>
             </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Edit User {user ? `- ${user.name}` : ''}
            </h1>

            {/* Show fetch error if it occurred */}
             {error && !isSubmitting && <ErrorMessage message={error} />}

             {/* Only render form if user data is available */}
            {user ? (
                <UserForm
                    initialData={user} // Pass fetched user data
                    onSubmit={handleUpdateUser}
                    isSubmitting={isSubmitting}
                    error={error && isSubmitting ? error : ''} // Show submit error within the form
                />
            ) : (
                 // If user data couldn't be loaded, maybe show a simplified error message instead of the form
                 !loading && <p>Could not load user data to edit.</p>
             )}
        </div>
    );
}

export default EditUserPage;