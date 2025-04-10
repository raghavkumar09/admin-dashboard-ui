import React from 'react';

function LoadingSpinner({ size = 'md', color = 'text-indigo-600' }) {
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-transparent ${sizeClasses[size]} ${color}`} style={{ borderTopColor: 'currentColor', borderBottomColor: 'currentColor' }}>
        </div>
    );
}

export default LoadingSpinner;