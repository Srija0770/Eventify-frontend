import React, { useMemo, useState } from 'react'
import '../styles/EventsList.css';
import EventCard from '../components/EventCard';
import { useEvents } from '../context/EventsContext';

const EventsList = () => {
  const { events, loading, error } = useEvents()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('upcoming')

  const categories = useMemo(() => ['All', ...Array.from(new Set(events.map(e => e.category)))], [events])

  const getStatus = (dateTime) => {
    const now = new Date()
    const start = new Date(dateTime)
    const sameDay = start.toDateString() === now.toDateString()
    if (start > now) return 'upcoming'
    if (sameDay) return 'ongoing'
    return 'completed'
  }

  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchQuery = e.title.toLowerCase().includes(query.toLowerCase())
      const matchCat = category === 'All' || e.category === category
      const matchStatus = status ? getStatus(e.dateTime) === status : true
      return matchQuery && matchCat && matchStatus
    })
  }, [events, query, category, status])

  return (
    <div className='eventify-events-list-page'>
      {/* Header Section */}
      <section className='eventify-events-header bg-primary py-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 text-white'>
              <h1 className='display-5 fw-bold mb-3'>All Events</h1>
              <p className='lead text-light mb-0'>Discover and join amazing events happening around you</p>
            </div>
            <div className='col-lg-6 text-lg-end'>
              <div className='eventify-events-count'>
                <span className='badge bg-warning text-dark fs-6 px-3 py-2'>{filtered.length} Events Found</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className='eventify-filters-section py-4 border-bottom'>
        <div className='container'>
          {error && <div className='alert alert-danger'>{error}</div>}
          <div className='row g-3 align-items-center'>
            <div className='col-md-4'>
              <div className='input-group'>
                <span className='input-group-text bg-white border-end-0'>
                  <i className='fas fa-search text-muted'></i>
                </span>
                <input 
                  className='form-control border-start-0' 
                  placeholder='Search events by title...' 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                />
              </div>
            </div>
            <div className='col-md-3'>
              <select 
                className='form-select' 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className='col-md-3'>
              <div className='btn-group w-100' role='group' aria-label='Filter by status'>
                <button type='button' className={`btn btn-outline-primary ${status==='upcoming' ? 'active' : ''}`} onClick={() => setStatus('upcoming')}>Upcoming</button>
                <button type='button' className={`btn btn-outline-primary ${status==='ongoing' ? 'active' : ''}`} onClick={() => setStatus('ongoing')}>Ongoing</button>
                <button type='button' className={`btn btn-outline-primary ${status==='completed' ? 'active' : ''}`} onClick={() => setStatus('completed')}>Completed</button>
              </div>
            </div>
            <div className='col-md-2'>
              <button 
                className='btn btn-outline-secondary w-100'
                onClick={() => { setQuery(''); setCategory('All'); setStatus('upcoming'); }}
              >
                <i className='fas fa-times me-1'></i>Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className='eventify-events-grid py-5'>
        <div className='container'>
          {loading ? (
            <div className='text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading events...</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className='text-center py-5'>
              <i className='fas fa-calendar-times text-muted display-1 mb-3'></i>
              <h3 className='text-muted'>No events found</h3>
              <p className='text-muted'>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className='row g-4'>
              {filtered.map(ev => (
                <div className='col-12 col-sm-6 col-lg-4 col-xl-3' key={ev.id}>
                  <EventCard event={ev} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default EventsList
