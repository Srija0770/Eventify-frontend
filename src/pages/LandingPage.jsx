import React from 'react'
import '../styles/LandingPage.css';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useEvents } from '../context/EventsContext';

const LandingPage = () => {
  const { events, loading } = useEvents()
  const upcoming = events.slice(0, 3)

  return (
    <div className='eventify-landing-page '>
      {/* Hero Section */}
      <section className='eventify-hero-section bg-primary text-white pt-4 pb-3'>
        <div className='container'>
          <div className='row align-items-center min-vh-50'>
            <div className='col-lg-6 mb-2'>
              <div className='eventify-hero-content'>
                <h1 className='display-4 fw-bold mb-4'>
                  Discover Amazing Events
                  <span className='text-warning'> Near You</span>
                </h1>
                <p className='lead mb-4'>
                  Join thousands of people in technology, sports, music, workshops and more. 
                  Bookmark your favourites and never miss an event again.
                </p>
                <div className='d-flex flex-column flex-sm-row gap-3'>
                  <Link to='/events' className='btn btn-warning btn-lg px-4 py-3'>
                    <i className='fas fa-search me-2'></i>Explore Events
                  </Link>
                  <Link to='/signup' className='btn btn-outline-light btn-lg px-4 py-3'>
                    <i className='fas fa-user-plus me-2'></i>Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-lg-6 text-center'>
              <div className='eventify-hero-image'>
                <img 
                  src='/src/assets/Hero-image.jpg' 
                  alt='Eventify - Discover Amazing Events' 
                  className='img-fluid rounded shadow-lg mb-3'
                  style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                />
                <h3 className='text-white'>Join Events</h3>
                <p className='text-light'>Discover and register for events that interest you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='eventify-stats-section py-3 bg-light'>
        <div className='container'>
          <div className='row text-center'>
            <div className='col-md-3 col-6 mb-2'>
              <div className='eventify-stat-card p-4'>
                <i className='fas fa-calendar-alt text-primary display-4 mb-3'></i>
                <h3 className='fw-bold text-primary'>{events.length}</h3>
                <p className='text-muted mb-0'>Total Events</p>
              </div>
            </div>
            <div className='col-md-3 col-6 mb-2'>
              <div className='eventify-stat-card p-4'>
                <i className='fas fa-clock text-success display-4 mb-3'></i>
                <h3 className='fw-bold text-success'>{upcoming.length}</h3>
                <p className='text-muted mb-0'>Upcoming</p>
              </div>
            </div>
            <div className='col-md-3 col-6 mb-2'>
              <div className='eventify-stat-card p-4'>
                <i className='fas fa-tags text-warning display-4 mb-3'></i>
                <h3 className='fw-bold text-warning'>{[...new Set(events.map(e => e.category))].length}</h3>
                <p className='text-muted mb-0'>Categories</p>
              </div>
            </div>
            <div className='col-md-3 col-6 mb-2'>
              <div className='eventify-stat-card p-4'>
                <i className='fas fa-users text-info display-4 mb-3'></i>
                <h3 className='fw-bold text-info'>1000+</h3>
                <p className='text-muted mb-0'>Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className='eventify-featured-section py-4'>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-12 text-center'>
              <h2 className='display-5 fw-bold mb-3'>Featured Events</h2>
              <p className='lead text-muted'>Discover the most popular upcoming events</p>
            </div>
          </div>
          
          {loading ? (
            <div className='text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <div className='row g-4'>
              {upcoming.map(ev => (
                <div className='col-12 col-md-6 col-lg-4' key={ev.id}>
                  <EventCard event={ev} />
                </div>
              ))}
            </div>
          )}
          
          <div className='text-center mt-5'>
            <Link to='/events' className='btn btn-primary btn-lg px-5'>
              <i className='fas fa-arrow-right me-2'></i>View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='eventify-cta-section py-5 bg-primary text-white'>
        <div className='container'>
          <div className='row justify-content-center text-center'>
            <div className='col-lg-8'>
              <h2 className='display-5 fw-bold mb-4'>Ready to Join Amazing Events?</h2>
              <p className='lead mb-4'>
                Sign up now and start discovering events that match your interests. 
                Bookmark favourites and never miss out again!
              </p>
              <div className='d-flex flex-column flex-sm-row gap-3 justify-content-center'>
                <Link to='/signup' className='btn btn-warning btn-lg px-5'>
                  <i className='fas fa-rocket me-2'></i>Get Started Free
                </Link>
                <Link to='/login' className='btn btn-outline-light btn-lg px-5'>
                  <i className='fas fa-sign-in-alt me-2'></i>Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
