import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../styles/EventRegisterForm.css';
import { useEvents } from '../context/EventsContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const EventRegisterForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const API_BASE = import.meta.env.VITE_API_BASE || 'https://eventify-backend-hlyh.onrender.com'
  const { registerForEvent } = useEvents()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchOne = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/eventDetails/${id}`)
        const data = await res.json()
        if (res.ok && data?.success) {
          setEvent(data.eventDetails)
        }
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOne()
  }, [id])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please login to register for events')
      navigate('/login')
      return
    }

    if (!validateForm()) {
      return
    }
    
    setSubmitting(true)
    
    try {
      const result = await registerForEvent({ 
        eventId: id, 
        name: formData.name.trim(), 
        email: formData.email.trim(), 
        phone: formData.phone.trim() 
      })
      
      if (result) {
        alert('Registered successfully! You will receive a confirmation email shortly.')
        navigate('/dashboard')
      } else {
        alert('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading event details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <div className="alert alert-warning">
              <h4>Event Not Found</h4>
              <p>The event you're looking for doesn't exist or has been removed.</p>
              <Link to="/events" className="btn btn-primary">Browse Events</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isEventCompleted = new Date(event.dateTime) < new Date()
  const isRegistrationClosed = new Date(event.deadline) < new Date()

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Event Info Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="card-title mb-3">{event.title}</h2>
                  <p className="text-muted mb-3">{event.description}</p>
                  <div className="row">
                    <div className="col-sm-6 mb-2">
                      <i className="fas fa-calendar-alt text-primary me-2"></i>
                      <strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}
                    </div>
                    <div className="col-sm-6 mb-2">
                      <i className="fas fa-clock text-primary me-2"></i>
                      <strong>Time:</strong> {new Date(event.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="col-sm-6 mb-2">
                      <i className="fas fa-map-marker-alt text-primary me-2"></i>
                      <strong>Venue:</strong> {event.venue}
                    </div>
                    <div className="col-sm-6 mb-2">
                      <i className="fas fa-tag text-primary me-2"></i>
                      <strong>Category:</strong> {event.category}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  {event.imageUrl && (
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-user-plus me-2"></i>
                Event Registration
              </h4>
            </div>
            <div className="card-body p-4">
              {isEventCompleted ? (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <strong>Event Completed</strong> - This event has already ended and registration is no longer available.
                </div>
              ) : isRegistrationClosed ? (
                <div className="alert alert-warning">
                  <i className="fas fa-clock me-2"></i>
                  <strong>Registration Closed</strong> - The registration deadline has passed.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        <i className="fas fa-user me-1"></i>Full Name *
                      </label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required 
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope me-1"></i>Email Address *
                      </label>
                      <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required 
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label">
                      <i className="fas fa-phone me-1"></i>Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required 
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Registration Confirmation:</strong> You will receive a confirmation email with event details after successful registration.
                  </div>

                  <div className="d-flex gap-3 justify-content-end">
                    <Link to={`/events/${id}`} className="btn btn-outline-secondary">
                      <i className="fas fa-arrow-left me-1"></i>Back to Event
                    </Link>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registering...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check me-2"></i>Complete Registration
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventRegisterForm
