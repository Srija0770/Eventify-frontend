import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import './styles/DarkMode.css'
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EventsList from './pages/EventsList'
import EventDetails from './pages/EventDetails'
import EventRegisterForm from './pages/EventRegisterForm'
import UserDashboard from './pages/UserDashboard'
import FavouriteEvents from './pages/FavouriteEvents'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="mt-5 pt-3">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Public Auth Routes - Redirect to dashboard if already logged in */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />
            
            {/* Private Routes - Require authentication */}
            <Route path="/events/:id/register" element={
              <PrivateRoute>
                <EventRegisterForm />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            } />
            <Route path="/favourites" element={
              <PrivateRoute>
                <FavouriteEvents />
              </PrivateRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App