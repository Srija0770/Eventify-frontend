import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='eventify-footer bg-dark text-light py-4'>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-lg-4'>
            <div className='eventify-footer-brand mb-4'>
              <h4 className='fw-bold text-warning mb-3'>
                <i className='fas fa-calendar-alt me-2'></i>
                Eventify
              </h4>
              <p className='text-light'>
                Discover and join amazing events happening around you. 
                From technology conferences to music festivals, find events that match your interests.
              </p>
              <div className='eventify-social-links'>
                <a href='#' className='text-light me-3'><i className='fab fa-facebook-f'></i></a>
                <a href='#' className='text-light me-3'><i className='fab fa-twitter'></i></a>
                <a href='#' className='text-light me-3'><i className='fab fa-instagram'></i></a>
                <a href='#' className='text-light'><i className='fab fa-linkedin-in'></i></a>
              </div>
            </div>
          </div>
          
          <div className='col-lg-2 col-md-6'>
            <h6 className='fw-bold text-warning mb-3'>Quick Links</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'><Link to='/events' className='text-light text-decoration-none'>All Events</Link></li>
              <li className='mb-2'><Link to='/favourites' className='text-light text-decoration-none'>Favourites</Link></li>
              <li className='mb-2'><Link to='/dashboard' className='text-light text-decoration-none'>Dashboard</Link></li>
              <li className='mb-2'><Link to='/login' className='text-light text-decoration-none'>Sign In</Link></li>
            </ul>
          </div>
          
          <div className='col-lg-2 col-md-6'>
            <h6 className='fw-bold text-warning mb-3'>Categories</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'><span className='text-light'>Technology</span></li>
              <li className='mb-2'><span className='text-light'>Sports</span></li>
              <li className='mb-2'><span className='text-light'>Music</span></li>
              <li className='mb-2'><span className='text-light'>Workshops</span></li>
            </ul>
          </div>
          
          <div className='col-lg-4'>
            <h6 className='fw-bold text-warning mb-3'>Newsletter</h6>
            <p className='text-light mb-3'>Stay updated with the latest events and announcements.</p>
            <div className='input-group'>
              <input 
                type='email' 
                className='form-control' 
                placeholder='Enter your email'
                aria-label='Email address'
              />
              <button className='btn btn-warning' type='button'>
                <i className='fas fa-paper-plane'></i>
              </button>
            </div>
          </div>
        </div>
        
        <hr className='my-3 border-secondary' />
        
        <div className='row align-items-center  pb-0 mb-0'>
          <div className='col-md-6'>
            <p className='text-light mb-0'>
              &copy; 2024 Eventify. All rights reserved.
            </p>
          </div>
          <div className='col-md-6 text-md-end'>
            <div className='eventify-footer-links'>
              <a href='#' className='text-light text-decoration-none me-3'>Privacy Policy</a>
              <a href='#' className='text-light text-decoration-none me-3'>Terms of Service</a>
              <a href='#' className='text-light text-decoration-none'>Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
