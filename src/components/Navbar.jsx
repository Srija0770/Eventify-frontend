import React, { useRef, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import './Navbar.css'
import '../styles/DarkMode.css'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('eventify-dark-mode')
    return saved ? JSON.parse(saved) : false
  })
  const collapseRef = useRef(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
    });
    return () => unsub();
  }, [])

  // Apply dark mode theme
  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.setAttribute('data-bs-theme', 'dark')
    } else {
      html.setAttribute('data-bs-theme', 'light')
    }
    localStorage.setItem('eventify-dark-mode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const logout = async () => {
    await signOut(auth)
    window.location.href = '/'
  }

  const closeNavbar = () => {
    if (collapseRef.current) {
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseRef.current)
      if (bsCollapse) {
        bsCollapse.hide()
      }
    }
  }

  const handleNavLinkClick = () => {
    closeNavbar()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5 py-3">
      <div className="container">
        <Link className="navbar-brand fw-bolder fst-italic" to="/" onClick={handleNavLinkClick}>Eventify</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/events" onClick={handleNavLinkClick}>Events</NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/favourites" onClick={handleNavLinkClick}>Favourites</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" onClick={handleNavLinkClick}>Dashboard</NavLink>
                </li>
              </>
            )}
          </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item d-flex align-items-center me-2 ">
                <button 
                  className="dark-mode-toggle rounded-circle p-1 border-0" 
                  onClick={toggleDarkMode}
                  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </li>
              {user ? (
                <>
                  <li className="nav-item d-flex align-items-center me-2">
                    <span className="navbar-text text-light">Hi, {user.name || user.email}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" onClick={handleNavLinkClick}>Sign Up</NavLink>
                  </li>
                </>
              )}
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar