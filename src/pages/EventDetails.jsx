import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../styles/EventDetails.css';
import { useEvents } from '../context/EventsContext';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const EventDetails = () => {
  const { id } = useParams()
  const { getEventById, isFavourite, toggleFavourite } = useEvents()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [event, setEvent] = useState(() => getEventById(id))
  const [loading, setLoading] = useState(!getEventById(id))
  const [error, setError] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])

  useEffect(() => {
    const existing = getEventById(id)
    if (existing) {
      setEvent(existing)
      setLoading(false)
      return
    }
    const controller = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const base = import.meta.env.VITE_API_BASE_URL || 'https://eventify-backend-hlyh.onrender.com'
        const res = await fetch(`${base}/api/eventDetails/${id}`, { signal: controller.signal })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || 'Failed to load event')
        const e = data.eventDetails
        setEvent({
          id: e.id,
          title: e.title,
          description: e.description,
          category: e.category,
          dateTime: e.dateTime,
          venue: e.venue,
          registrationDeadline: e.deadline,
          imageUrl: e.imageUrl,
        })
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [id, getEventById])

  const handleFavouriteClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    toggleFavourite(id)
  }

  if (loading) return <div className='container py-5'>Loading...</div>
  if (error) return <div className='container py-5 text-danger'>{error}</div>
  if (!event) return <div className='container py-5'>Event not found.</div>

  const { title, description, category, dateTime, venue, registrationDeadline, imageUrl } = event

  return (
    <div className='eventify-event-details-page'>
      {/* Hero Section */}
      <section className='eventify-event-hero bg-light py-3'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-8'>
              <div className='d-flex align-items-center mb-3'>
                <span className='badge bg-primary fs-6 me-3'>{category}</span>
                <span className='text-muted'>
                  <i className='fas fa-calendar me-1'></i>
                  {new Date(dateTime).toLocaleDateString()}
                </span>
              </div>
              <h1 className='display-4 fw-bold mb-4'>{title}</h1>
              <p className='lead text-muted mb-4'>{description}</p>
            </div>
            <div className='col-lg-4 text-lg-end'>
              <div className='eventify-event-actions '>
                <button 
                  className={`btn btn-lg ${isFavourite(id) ? 'btn-warning' : 'btn-outline-warning'} m-3`} 
                  onClick={handleFavouriteClick}
                >
                  <i className={`fas ${isFavourite(id) ? 'fa-bookmark' : 'fa-bookmark'} me-2`}></i>
                  {isFavourite(id) ? 'Bookmarked' : 'Bookmark'}
                </button>
                <Link to={`/events/${id}/register`} className='btn btn-primary btn-lg'>
                  <i className='fas fa-user-plus me-2'></i>Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Image */}
      {imageUrl && (
        <section className='eventify-event-image-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <img src={imageUrl} alt={title} className='img-fluid rounded shadow-sm w-100' style={{ maxHeight: '400px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event Details */}
      <section className='eventify-event-info py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='eventify-event-details-card card border-0 shadow-sm'>
                <div className='card-body p-4'>
                  <h3 className='card-title fw-bold mb-4'>Event Information</h3>
                  
                  <div className='row g-4'>
                    <div className='col-md-6'>
                      <div className='eventify-detail-item'>
                        <div className='d-flex align-items-center mb-2'>
                          <i className='fas fa-clock text-primary me-3'></i>
                          <h6 className='mb-0 fw-semibold'>Date & Time</h6>
                        </div>
                        <p className='text-muted ms-5'>{new Date(dateTime).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className='col-md-6'>
                      <div className='eventify-detail-item'>
                        <div className='d-flex align-items-center mb-2'>
                          <i className='fas fa-map-marker-alt text-primary me-3'></i>
                          <h6 className='mb-0 fw-semibold'>Venue</h6>
                        </div>
                        <p className='text-muted ms-5'>{venue}</p>
                      </div>
                    </div>
                    
                    <div className='col-md-6'>
                      <div className='eventify-detail-item'>
                        <div className='d-flex align-items-center mb-2'>
                          <i className='fas fa-tags text-primary me-3'></i>
                          <h6 className='mb-0 fw-semibold'>Category</h6>
                        </div>
                        <p className='text-muted ms-5'>{category}</p>
                      </div>
                    </div>
                    
                    <div className='col-md-6'>
                      <div className='eventify-detail-item'>
                        <div className='d-flex align-items-center mb-2'>
                          <i className='fas fa-calendar-times text-primary me-3'></i>
                          <h6 className='mb-0 fw-semibold'>Registration Deadline</h6>
                        </div>
                        <p className='text-muted ms-5'>{new Date(registrationDeadline).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='col-lg-4'>
              <div className='eventify-event-sidebar'>
                <div className='card border-0 shadow-sm mb-4'>
                  <div className='card-body p-4 text-center'>
                    <h5 className='card-title fw-bold mb-3'>Ready to Join?</h5>
                    <p className='text-muted mb-4'>Register now to secure your spot at this amazing event!</p>
                    <Link to={`/events/${id}/register`} className='btn btn-primary btn-lg w-100 mb-3'>
                      <i className='fas fa-user-plus me-2'></i>Register Now
                    </Link>
                    <button 
                      className={`btn ${isFavourite(id) ? 'btn-warning' : 'btn-outline-warning'} w-100`} 
                      onClick={handleFavouriteClick}
                    >
                      <i className={`fas ${isFavourite(id) ? 'fa-bookmark' : 'fa-bookmark'} me-2`}></i>
                      {isFavourite(id) ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
                    </button>
                  </div>
                </div>
                
                <div className='card border-0 shadow-sm'>
                  <div className='card-body p-4'>
                    <h6 className='card-title fw-bold mb-3'>Event Status</h6>
                    <div className='d-flex align-items-center'>
                      <span className='badge bg-success me-2'>Active</span>
                      <small className='text-muted'>Registration Open</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetails
