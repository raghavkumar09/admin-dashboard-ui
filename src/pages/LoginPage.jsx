import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Replace with your logo if you have one */}
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admin Sign In
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;