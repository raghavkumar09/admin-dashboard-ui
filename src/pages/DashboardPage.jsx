import React, { useState, useEffect } from 'react';
import StatCard from '../components/Dashboard/StatCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { getDashboardStats } from '../services/api';

function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await getDashboardStats();
                if (response.data.success) {
                    setStats(response.data.data);
                } else {
                    setError('Failed to fetch stats.');
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
                setError(err.response?.data?.message || err.message || 'An error occurred fetching stats.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!stats) return <p>No stats available.</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Registrations" value={stats.totalRegistrations} />
                <StatCard title="Today's Registrations" value={stats.todayRegistrations} />
                <StatCard title="Completed Profiles" value={stats.completedProfiles} />
                <StatCard title="Incomplete Profiles" value={stats.incompleteProfiles} color="red" />
            </div>
            {/* You can add charts or other visualizations here */}
        </div>
    );
}

export default DashboardPage;