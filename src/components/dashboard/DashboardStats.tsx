import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserIcon, TicketIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    trips: 0,
    users: 0,
    bookings: 0,
    loading: true,
    error: null as string | null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [toursRes, usersRes, bookingsRes] = await Promise.all([
          api.tours.getAll({ per_page: 1 }),  // We only need the count
          api.users.getAll({ per_page: 1 }),  // We only need the count
          api.bookings.getAll({ per_page: 1 }) // We only need the count
        ]);

        setStats({
          trips: toursRes.pagination?.total || 0,
          users: usersRes.pagination?.total || 0,
          bookings: bookingsRes.pagination?.total || 0,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load statistics'
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24" />
        ))}
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{stats.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Total Trips"
        value={stats.trips}
        icon={<MapPinIcon className="h-6 w-6 text-white" />}
        color="bg-indigo-500"
      />
      <StatsCard
        title="Total Users"
        value={stats.users}
        icon={<UserIcon className="h-6 w-6 text-white" />}
        color="bg-green-500"
      />
      <StatsCard
        title="Total Bookings"
        value={stats.bookings}
        icon={<TicketIcon className="h-6 w-6 text-white" />}
        color="bg-yellow-500"
      />
    </div>
  );
};

export default DashboardStats;
