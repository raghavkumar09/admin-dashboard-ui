import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-1 text-sm text-red-700">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage;