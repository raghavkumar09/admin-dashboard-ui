import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/Users/UserForm';
import { createUser } from '../services/api';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


function CreateUserPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleCreateUser = async (formData) => {
        setIsSubmitting(true);
        setError('');
        try {
            const response = await createUser(formData);
             if (response.data.success) {
                 navigate('/users');
            } else {
                 setError(response.data.message || 'Failed to create user.');
            }
        } catch (err) {
            console.error("Create user error:", err);
            if (err.response?.data?.message?.includes('duplicate key error')) {
                setError('Email already exists. Please use a different email.');
            } else if (err.response?.data?.message) {
                setError(`Error: ${err.response.data.message}`);
            }
             else {
                setError('An unexpected error occurred while creating the user.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
             <div className="mb-4">
                 <Link to="/users" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                     <ArrowLeftIcon className="h-4 w-4 mr-1" />
                     Back to User List
                 </Link>
             </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Create New User</h1>
            
            <UserForm
                onSubmit={handleCreateUser}
                isSubmitting={isSubmitting}
                error={error}
            />
        </div>
    );
}

export default CreateUserPage;