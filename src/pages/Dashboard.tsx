import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TourManagement from '../components/dashboard/TourManagement';
import BookingsManagement from '../components/dashboard/BookingsManagement';
import UserManagement from '../components/dashboard/UserManagement';
import ContactSubmissions from '../components/ContactSubmissions';
import DashboardStats from '../components/dashboard/DashboardStats';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tours' | 'bookings' | 'users' | 'contacts'>('tours');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name}
                {user?.is_admin && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                    Admin
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('tours')}
              className={`${
                activeTab === 'tours'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
            >
              Tours Management
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`${
                activeTab === 'bookings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'contacts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Form
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
          <DashboardStats />
        </div>
        
        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'tours' && <TourManagement />}
          {activeTab === 'bookings' && <BookingsManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'contacts' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Form Submissions</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">View and manage all contact form submissions</p>
              </div>
              <div className="border-t border-gray-200">
                <ContactSubmissions />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

