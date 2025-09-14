import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect if already authenticated
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) navigate('/dashboard', { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.?\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.?\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='eventify-auth-page'>
      <section className='eventify-auth-hero bg-primary text-white py-5'>
        <div className='container'>
          <div className='row justify-content-center text-center'>
            <div className='col-lg-6'>
              <h1 className='display-5 fw-bold mb-3'>Welcome Back!</h1>
              <p className='lead'>Sign in to your account to continue discovering amazing events</p>
            </div>
          </div>
        </div>
      </section>

      <section className='eventify-auth-form py-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
              <div className='eventify-auth-card card border-0 shadow-lg'>
                <div className='card-body p-5'>
                  <div className='text-center mb-4'>
                    <i className='fas fa-sign-in-alt text-primary display-4 mb-3'></i>
                    <h2 className='fw-bold'>Sign In</h2>
                    <p className='text-muted'>Enter your credentials to access your account</p>
                  </div>

                  {error && (
                    <div className='alert alert-danger' role='alert'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                      <label className='form-label fw-semibold'>Email Address</label>
                      <div className='input-group'>
                        <span className='input-group-text bg-light border-end-0'>
                          <i className='fas fa-envelope text-muted'></i>
                        </span>
                        <input
                          className='form-control border-start-0'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='you@example.com'
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className='mb-4'>
                      <label className='form-label fw-semibold'>Password</label>
                      <div className='input-group'>
                        <span className='input-group-text bg-light border-end-0'>
                          <i className='fas fa-lock text-muted'></i>
                        </span>
                        <input
                          className='form-control border-start-0'
                          name='password'
                          type='password'
                          value={formData.password}
                          onChange={handleChange}
                          placeholder='Your password'
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <button
                      className='btn btn-primary btn-lg w-100 mb-3'
                      type='submit'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className='spinner-border spinner-border-sm me-2' role='status'></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className='fas fa-sign-in-alt me-2'></i>
                          Sign In
                        </>
                      )}
                    </button>

                    <div className='text-center mb-4'>
                      <span className='text-muted'>Don't have an account? </span>
                      <Link to='/signup' className='text-decoration-none fw-semibold'>
                        Create one here
                      </Link>
                    </div>

                    <div className='text-center'>
                      <div className='position-relative'>
                        <hr />
                        <span className='position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted'>
                          or
                        </span>
                      </div>
                    </div>

                    <button 
                      className='btn btn-outline-dark btn-lg w-100 mt-3' 
                      type="button" 
                      onClick={handleGoogleLogin} 
                      disabled={isLoading}
                    >
                      <i className='fab fa-google me-2'></i>
                      Continue with Google
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;