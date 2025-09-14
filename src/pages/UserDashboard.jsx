import React, { useMemo } from 'react'
import '../styles/UserDashboard.css';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UserDashboard = () => {
  const { registrationsWithEvent, cancelRegistration } = useEvents()

  const stats = useMemo(() => {
    const byCategory = registrationsWithEvent.reduce((acc, r) => {
      const cat = r.event?.category || 'Other'
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {})
    const total = registrationsWithEvent.length
    
    // Prepare data for pie chart
    const pieData = Object.entries(byCategory).map(([category, count]) => ({
      name: category,
      value: count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    
    // Prepare data for bar chart
    const barData = Object.entries(byCategory).map(([category, count]) => ({
      category,
      registrations: count
    }))
    
    return { total, byCategory, pieData, barData }
  }, [registrationsWithEvent])

  // Colors for pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  return (
    <div className='eventify-dashboard-page'>
      {/* Header Section */}
      <section className='eventify-dashboard-header bg-primary bg-gradient text-white py-4'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-8'>
              <h1 className='display-5 fw-bold mb-3'>Your Dashboard</h1>
              <p className='lead mb-0'>Manage your event registrations and track your activity</p>
            </div>
            <div className='col-lg-4 text-lg-end'>
              <div className='eventify-dashboard-stats'>
                <div className='d-inline-block text-center me-4'>
                  <div className='display-6 fw-bold text-warning'>{stats.total}</div>
                  <small className='text-light'>Total Registrations</small>
                </div>
                <div className='d-inline-block text-center'>
                  <div className='display-6 fw-bold text-warning'>{Object.keys(stats.byCategory).length}</div>
                  <small className='text-light'>Categories</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registrations Section */}
      <section className='eventify-registrations-section pb-5 pt-3'>
        <div className='container'>
          <div className='row mb-4'>
            <div className='col-12'>
              <h2 className='fw-bold mb-3'>Your Registrations</h2>
              <p className='text-muted'>Here are all the events you've registered for</p>
            </div>
          </div>

          {registrationsWithEvent.length === 0 ? (
            <div className='text-center py-5'>
              <i className='fas fa-calendar-check text-muted display-1 mb-3'></i>
              <h3 className='text-muted'>No registrations yet</h3>
              <p className='text-muted mb-4'>Start exploring events and register for ones that interest you!</p>
              <Link to='/events' className='btn btn-primary btn-lg'>
                <i className='fas fa-search me-2'></i>Browse Events
              </Link>
            </div>
          ) : (
            <div className='row g-4'>
              {registrationsWithEvent.map((r) => (
                <div className='col-12 col-md-6 col-lg-4' key={r._id || r.id}>
                  <div className='eventify-registration-card card h-100 border-0 shadow-sm'>
                    <div className='card-body p-4'>
                      <div className='d-flex justify-content-between align-items-start mb-3'>
                        <h5 className='card-title fw-bold mb-0'>{r.event?.title || r.eventId}</h5>
                        <span className='badge bg-success'>Registered</span>
                      </div>
                      
                      {r.event && (
                        <div className='eventify-registration-details mb-4'>
                          <div className='d-flex align-items-center mb-2'>
                            <i className='fas fa-calendar text-primary me-2'></i>
                            <small className='text-muted'>
                              {new Date(r.event.dateTime).toLocaleDateString()}
                            </small>
                          </div>
                          <div className='d-flex align-items-center mb-2'>
                            <i className='fas fa-map-marker-alt text-primary me-2'></i>
                            <small className='text-muted'>{r.event.venue}</small>
                          </div>
                          <div className='d-flex align-items-center'>
                            <i className='fas fa-tags text-primary me-2'></i>
                            <small className='text-muted'>{r.event.category}</small>
                          </div>
                        </div>
                      )}
                      
                      <div className='eventify-registration-meta mb-4'>
                        <small className='text-muted'>
                          <i className='fas fa-clock me-1'></i>
                          Registered on {new Date(r.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      
                      <div className='d-flex gap-2'>
                        <Link to={`/events/${r.eventId}`} className='btn btn-outline-primary btn-sm flex-fill'>
                          <i className='fas fa-eye me-1'></i>View Event
                        </Link>
                        <button 
                          className='btn btn-outline-danger btn-sm flex-fill' 
                          onClick={() => cancelRegistration(r._id || r.id)}
                        >
                          <i className='fas fa-times me-1'></i>Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      {Object.keys(stats.byCategory).length > 0 && (
        <section className='eventify-stats-section py-5 bg-light'>
          <div className='container'>
            <div className='row mb-4'>
              <div className='col-12'>
                <h3 className='fw-bold mb-2'>Your Event Statistics</h3>
                <p className='text-muted'>Visual breakdown of your event registrations by category</p>
              </div>
            </div>
            
            <div className='row g-4'>
              {/* Quick Stats Cards */}
              <div className='col-lg-3 col-md-6'>
                <div className='eventify-stat-card card border-0 shadow-sm h-100'>
                  <div className='card-body text-center p-4'>
                    <div className='eventify-stat-icon mb-3'>
                      <i className='fas fa-calendar-check text-primary display-4'></i>
                    </div>
                    <h4 className='fw-bold text-primary mb-1'>{stats.total}</h4>
                    <p className='text-muted mb-0'>Total Events</p>
                  </div>
                </div>
              </div>
              
              <div className='col-lg-3 col-md-6'>
                <div className='eventify-stat-card card border-0 shadow-sm h-100'>
                  <div className='card-body text-center p-4'>
                    <div className='eventify-stat-icon mb-3'>
                      <i className='fas fa-tags text-success display-4'></i>
                    </div>
                    <h4 className='fw-bold text-success mb-1'>{Object.keys(stats.byCategory).length}</h4>
                    <p className='text-muted mb-0'>Categories</p>
                  </div>
                </div>
              </div>
              
              <div className='col-lg-3 col-md-6'>
                <div className='eventify-stat-card card border-0 shadow-sm h-100'>
                  <div className='card-body text-center p-4'>
                    <div className='eventify-stat-icon mb-3'>
                      <i className='fas fa-chart-pie text-warning display-4'></i>
                    </div>
                    <h4 className='fw-bold text-warning mb-1'>
                      {stats.pieData.length > 0 ? Math.max(...stats.pieData.map(d => d.value)) : 0}
                    </h4>
                    <p className='text-muted mb-0'>Most Popular</p>
                  </div>
                </div>
              </div>
              
              <div className='col-lg-3 col-md-6'>
                <div className='eventify-stat-card card border-0 shadow-sm h-100'>
                  <div className='card-body text-center p-4'>
                    <div className='eventify-stat-icon mb-3'>
                      <i className='fas fa-percentage text-info display-4'></i>
                    </div>
                    <h4 className='fw-bold text-info mb-1'>
                      {stats.pieData.length > 0 ? Math.round(stats.pieData.reduce((acc, d) => acc + d.percentage, 0) / stats.pieData.length) : 0}%
                    </h4>
                    <p className='text-muted mb-0'>Avg. Distribution</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className='row g-4 mt-2'>
              {/* Pie Chart */}
              <div className='col-lg-6'>
                <div className='eventify-chart-card card border-0 shadow-sm h-100'>
                  <div className='card-header bg-white border-0 pb-0'>
                    <h5 className='fw-bold mb-0'>Events by Category</h5>
                    <small className='text-muted'>Pie chart distribution</small>
                  </div>
                  <div className='card-body'>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={stats.pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stats.pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [value, 'Registrations']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className='col-lg-6'>
                <div className='eventify-chart-card card border-0 shadow-sm h-100'>
                  <div className='card-header bg-white border-0 pb-0'>
                    <h5 className='fw-bold mb-0'>Category Comparison</h5>
                    <small className='text-muted'>Bar chart view</small>
                  </div>
                  <div className='card-body'>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer>
                        <BarChart data={stats.barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="registrations" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category Breakdown Cards */}
            <div className='row g-3 mt-4'>
              <div className='col-12'>
                <h5 className='fw-bold mb-3'>Category Breakdown</h5>
              </div>
              {stats.pieData.map((item, index) => (
                <div className='col-md-4 col-sm-6' key={item.name}>
                  <div className='eventify-category-breakdown-card card border-0 shadow-sm'>
                    <div className='card-body p-3'>
                      <div className='d-flex align-items-center'>
                        <div 
                          className='eventify-category-color me-3' 
                          style={{ 
                            width: '20px', 
                            height: '20px', 
                            backgroundColor: COLORS[index % COLORS.length],
                            borderRadius: '50%'
                          }}
                        ></div>
                        <div className='flex-grow-1'>
                          <h6 className='fw-bold mb-1'>{item.name}</h6>
                          <div className='d-flex justify-content-between align-items-center'>
                            <span className='text-muted small'>{item.value} events</span>
                            <span className='badge bg-light text-dark'>{item.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default UserDashboard
