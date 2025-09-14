import React from 'react'
import '../styles/FavouriteEvents.css';
import EventCard from '../components/EventCard';
import { useEvents } from '../context/EventsContext';

const FavouriteEvents = () => {
  const { favouriteEvents, loading } = useEvents()

  return (
    <div className='container py-4'>
      <h2 className='mb-3'>Bookmarked Events</h2>
      {loading ? (
        <div className='text-center py-5'>Loading...</div>
      ) : (
        <div className='row g-3'>
          {favouriteEvents.map(ev => (
            <div className='col-12 col-sm-6 col-lg-4' key={ev.id}>
              <EventCard event={ev} />
            </div>
          ))}
          {favouriteEvents.length === 0 && (
            <div className='col-12 text-center empty-state py-5'>No favourites yet</div>
          )}
        </div>
      )}
    </div>
  )
}

export default FavouriteEvents
