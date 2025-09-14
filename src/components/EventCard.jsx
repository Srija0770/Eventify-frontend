import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../context/EventsContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const EventCard = ({ event }) => {
  const { id, title, description, category, dateTime, venue, imageUrl } = event
  const { isFavourite, toggleFavourite } = useEvents()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])
  const navigate = useNavigate()
  
  const handleFavouriteClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    toggleFavourite(id)
  }

  return (
    <div className="eventify-event-card card h-100 shadow-sm border-0 overflow-hidden">
      <div className="eventify-card-image-container position-relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            className="card-img-top eventify-card-image" 
            alt={title} 
            style={{ objectFit: 'cover', height: '200px' }}
          />
        ) : (
          <div className="eventify-card-placeholder d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
            <i className="fas fa-calendar-alt fa-3x text-muted"></i>
          </div>
        )}
        <div className="eventify-card-overlay position-absolute top-0 end-0 p-2">
          <span className="badge bg-primary eventify-category-badge">{category}</span>
        </div>
        <div className="eventify-card-actions-overlay position-absolute top-0 start-0 p-2">
          <button 
            className={`btn btn-sm ${isFavourite(id) ? 'btn-warning' : 'btn-light'} eventify-favourite-btn`} 
            onClick={handleFavouriteClick}
            title={isFavourite(id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <i className={`fas ${isFavourite(id) ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
          </button>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title eventify-card-title fw-bold mb-3">{title}</h5>
        <p className="card-text text-muted eventify-card-description mb-3" style={{ flexGrow: 1 }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        <div className="eventify-card-details mb-4">
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-clock text-primary me-2"></i>
            <small className="text-muted">
              {new Date(dateTime).toLocaleDateString()} at {new Date(dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </small>
          </div>
          <div className="d-flex align-items-center">
            <i className="fas fa-map-marker-alt text-primary me-2"></i>
            <small className="text-muted">{venue}</small>
          </div>
        </div>
        
        <div className="d-flex gap-2 mt-auto">
          <Link to={`/events/${id}`} className="btn btn-outline-primary btn-sm flex-fill">
            <i className="fas fa-eye me-1"></i>View Details
          </Link>
          {new Date(dateTime) >= new Date() && (
            <Link to={`/events/${id}/register`} className="btn btn-primary btn-sm flex-fill">
              <i className="fas fa-user-plus me-1"></i>Register
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventCard
