import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const EventsContext = createContext(null);

const API_BASE_URL = 'https://eventify-backend-hlyh.onrender.com/api';

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favouriteEventIds, setFavouriteEventIds] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [uid, setUid] = useState(null);

  // Watch Firebase auth state for user UID
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  // Fetch events from backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/eventDetails`);
        const data = await response.json();
        
        if (data.success) {
          // Map backend fields to frontend expected fields
          const mappedEvents = data.eventDetails.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            category: event.category,
            dateTime: event.dateTime,
            venue: event.venue,
            registrationDeadline: event.deadline, // backend uses 'deadline'
            imageUrl: event.imageUrl,
            venueType: event.venueType
          }));
          setEvents(mappedEvents);
        } else {
          setError(data.error || 'Failed to fetch events');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch per-user favourites and registrations when uid changes
  useEffect(() => {
    if (!uid) {
      setFavouriteEventIds([]);
      setRegistrations([]);
      return;
    }
    const controller = new AbortController();
    const load = async () => {
      try {
        const [favsRes, regsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users/${uid}/favourites`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/users/${uid}/registrations`, { signal: controller.signal }),
        ]);
        const favs = await favsRes.json();
        const regs = await regsRes.json();
        if (favs.success) {
          const eventIds = favs.favourites.map(f => f.eventId);
          setFavouriteEventIds(eventIds);
        }
        if (regs.success) setRegistrations(regs.registrations);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    load();
    return () => controller.abort();
  }, [uid]);

  const toggleFavourite = async (eventId) => {
    if (!uid) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/${uid}/favourites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });
      const data = await response.json();
      
      if (data.success) {
        // Update local state based on backend response
        if (data.removed) {
          setFavouriteEventIds((prev) => prev.filter((id) => id !== eventId));
        } else {
          setFavouriteEventIds((prev) => 
            prev.includes(eventId) ? prev : [...prev, eventId]
          );
        }
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  const isFavourite = (eventId) => favouriteEventIds.includes(eventId);

  const registerForEvent = async ({ eventId, name, email, phone }) => {
    if (!uid) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/users/${uid}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, name, email, phone }),
      });
      const data = await res.json();
      if (data.success && data.registration) {
        setRegistrations((prev) => [data.registration, ...prev]);
        return data.registration;
      }
      return null;
    } catch {
      return null;
    }
  };

  const cancelRegistration = async (registrationId) => {
    if (!uid) return;
    try {
      await fetch(`${API_BASE_URL}/users/${uid}/registrations/${registrationId}`, { method: 'DELETE' });
      setRegistrations((prev) => prev.filter((r) => r._id !== registrationId));
    } catch {}
  };

  const getEventById = (eventId) => events.find((e) => String(e.id) === String(eventId)) || null;

  const favouriteEvents = useMemo(
    () => events.filter((e) => favouriteEventIds.includes(e.id)),
    [events, favouriteEventIds]
  );

  const registrationsWithEvent = useMemo(
    () =>
      registrations.map((r) => ({
        ...r,
        event: getEventById(r.eventId),
      })),
    [registrations]
  );

  const value = {
    events,
    loading,
    error,
    getEventById,
    favouriteEventIds,
    favouriteEvents,
    isFavourite,
    toggleFavourite,
    registrations,
    registrationsWithEvent,
    registerForEvent,
    cancelRegistration,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used within EventsProvider');
  return ctx;
};
