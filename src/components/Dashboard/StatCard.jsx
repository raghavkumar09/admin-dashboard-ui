import React from 'react';

const StatCard = ({ title, value, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
    };

    return (
        <div className={`p-4 rounded-lg shadow-md text-white ${colors[color] || colors.blue}`}>
            <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
            <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
    );
};

export default StatCard;