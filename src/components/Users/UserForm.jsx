import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

// Pass initialData for editing, onSubmit for handling submission logic
function UserForm({ initialData = null, onSubmit, isSubmitting, error }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setEmail(initialData.email || '');
            setDateOfBirth(initialData.dateOfBirth ? initialData.dateOfBirth.substring(0, 10) : ''); // Convert to YYYY-MM-DD
            if (initialData.profilePictureUrl) {
                 setPicturePreview(initialData.profilePictureUrl);
            }
        }
    }, [initialData]);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPicturePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePicture(null);
             setPicturePreview(initialData?.profilePictureUrl || null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (dateOfBirth) {
            formData.append('dateOfBirth', dateOfBirth);
        }
        // Only append password if user entered a new one (for create or update)
        if (password) {
            formData.append('password', password);
        }
        // Only append picture if a *new* one was selected
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow rounded">
            {error && <ErrorMessage message={error} />}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password {initialData ? '(Leave blank to keep current)' : ''}
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!initialData} 
                    minLength={!initialData ? 6 : undefined}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                 {!initialData && <p className="text-xs text-gray-500">Minimum 6 characters.</p>}
            </div>

            <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                    type="file"
                    id="profilePicture"
                    accept="image/*" // Accept only image files
                    onChange={handlePictureChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {picturePreview && (
                    <img src={picturePreview} alt="Profile Preview" className="mt-2 h-24 w-24 object-cover rounded-full" />
                )}
                 {!picturePreview && !initialData?.profilePictureUrl && <p className="text-xs text-gray-500 mt-1">No picture selected. Profile will be marked incomplete.</p>}
            </div>


            <div className="flex justify-end space-x-3">
                 <button
                    type="button"
                    onClick={() => navigate(-1)} // Go back to previous page
                    disabled={isSubmitting}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? <LoadingSpinner size="sm" /> : (initialData ? 'Update User' : 'Create User')}
                </button>
            </div>
        </form>
    );
}

export default UserForm;