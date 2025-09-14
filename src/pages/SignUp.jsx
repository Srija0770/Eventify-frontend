import React, { useState } from 'react'
import '../styles/SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.?\)/, ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container py-4'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <h2 className='mb-3'>Sign Up</h2>
          {error && <div className='alert alert-danger'>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Name</label>
              <input className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='you@example.com' required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Minimum 6 characters' required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Confirm Password</label>
              <input className='form-control' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm your password' required />
            </div>
            <button className='btn btn-primary' type='submit' disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
            <span className='ms-2'>Have an account? <Link to='/login'>Log in</Link></span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
