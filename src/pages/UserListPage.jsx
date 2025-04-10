import React, { useState, useEffect, useCallback } from 'react';
import UserList from '../components/Users/UserList';
import { getUsers, deleteUser } from '../services/api';
// Assuming LoadingSpinner and ErrorMessage components exist and work
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

function UserListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
     const [deleteError, setDeleteError] = useState(''); // Separate error state for delete actions

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        setDeleteError(''); // Clear delete error on refresh
        try {
            const response = await getUsers();
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                setError('Failed to fetch users.');
            }
        } catch (err) {
            console.error("Fetch users error:", err);
            setError(err.response?.data?.message || err.message || 'An error occurred fetching users.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId) => {
         setDeleteError(''); // Clear previous delete error
        try {
            const response = await deleteUser(userId);
             if (response.data.success) {
                 // Remove user from state or refetch list
                 //setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                 // Or simply refetch for consistency
                 fetchUsers();
             } else {
                 setDeleteError(response.data.message || 'Failed to delete user.');
             }
        } catch (err) {
            console.error("Delete user error:", err);
            setDeleteError(err.response?.data?.message || err.message || 'An error occurred deleting the user.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">User Management</h1>
             {/* Display delete error prominently if it occurs */}
             {deleteError && <ErrorMessage message={deleteError} />}

            {/* Pass loading, error, users, and handleDelete to the UserList component */}
            <UserList
                users={users}
                onDelete={handleDelete}
                isLoading={loading}
                error={error && !deleteError ? error : ''} // Only show fetch error if no delete error
            />
        </div>
    );
}

export default UserListPage;