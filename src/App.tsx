import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Import your components
import Home from './pages/Home';
import Tours from './pages/Tours';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import BookNow from './pages/BookNow';
import Destinations from './pages/Destinations';
import DashboardLogin from './pages/DashboardLogin';
import Dashboard from './pages/Dashboard';
import TourDetail from './components/tours/TourDetail';
import Layout from './components/Layout';
import ProtectedRoute from './components/dashboard/ProtectedRoute';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
      {/* Dashboard routes (no navbar/footer) */}
      <Route path="/dashboard/login" element={<DashboardLogin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Public routes with navbar and footer */}
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/book-now/:id" element={<BookNow />} />
        <Route path="/destinations" element={<Destinations />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
