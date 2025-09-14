import React from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(undefined)

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null))
    return () => unsub()
  }, [])

  if (user === undefined) {
    return (
      <div className='container py-5 text-center'>
        <div className='spinner-border' role='status'><span className='visually-hidden'>Loading...</span></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute


