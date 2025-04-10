// frontend/src/App.jsx (CORRECT - NO Router here)
import React from 'react';
// REMOVE 'BrowserRouter as Router' from this import if it's still there
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardLayout from './components/Layout/DashboardLayout';
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="users" element={<UserListPage />} />
                    <Route path="users/new" element={<CreateUserPage />} />
                    <Route path="users/:id" element={<UserDetailPage />} />
                    <Route path="users/:id/edit" element={<EditUserPage />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;