import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [user] = useState(() => {
    try { return JSON.parse(localStorage.getItem('propertybook-user') || 'null'); } catch { return null; }
  });
  const accountKey = `propertybook-dashboard:${(user?.email || 'guest').trim().toLowerCase()}`;
  const [accountData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(accountKey)) || {}; } catch { return {}; }
  });
  const [bookings, setBookings] = useState(() => accountData.bookings || []);
  const [listings, setListings] = useState(() => accountData.listings || []);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem(accountKey, JSON.stringify({ bookings, listings }));
  }, [accountKey, bookings, listings]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'add') setActiveTab('listings');
  }, [searchParams]);

  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const totalIncome = listings.reduce((s, l) => s + (l.income || 0), 0);

  const handleCancelBooking = (id) => {
    if (window.confirm('Cancel this booking?')) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const handleDeleteListing = (id) => {
    if (window.confirm('Remove this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1>Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
          <p>Manage your bookings and properties</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid dashboard-stats">
          <div className="stat-card stat-card--accent">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div><div className="stat-number">{confirmedCount}</div><div className="stat-label">Active Bookings</div></div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <div><div className="stat-number">₹{totalIncome.toLocaleString()}</div><div className="stat-label">Total Income</div></div>
          </div>
          <div className="stat-card stat-card--primary">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </div>
            <div><div className="stat-number">{listings.length}</div><div className="stat-label">Listed Properties</div></div>
          </div>
          <div className="stat-card stat-card--warning">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <div><div className="stat-number">4.8</div><div className="stat-label">Avg Rating</div></div>
          </div>
        </div>

        <nav className="dashboard-nav">
          <button className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => { setActiveTab('bookings'); setSearchParams({}); }}>Bookings</button>
          <button className={`nav-tab ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => { setActiveTab('listings'); setSearchParams({ tab: 'listings' }); }}>My Listings</button>
        </nav>

        {activeTab === 'bookings' && (
          <div className="tab-content animate-fade-in">
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
              <div className="booking-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-item-header">
                      <h3>{booking.propertyTitle}</h3>
                      <span className={`booking-status status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                    </div>
                    <p>Check-in: {booking.checkIn}</p>
                    <p>Check-out: {booking.checkOut}</p>
                    <p className="booking-total">Total: ₹{(booking.total || 0).toLocaleString()}</p>
                    {booking.status === 'Confirmed' && (
                      <button className="btn-cancel" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You have no bookings yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/listings')}>Browse Properties</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="tab-content animate-fade-in">
            <div className="listing-header">
              <h2>Your Properties</h2>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard?tab=add')}>+ Add Property</button>
            </div>
            {listings.length > 0 ? (
              <div className="listing-list">
                {listings.map(listing => (
                  <div key={listing.id} className="listing-item">
                    <div className="listing-item-header">
                      <h3>{listing.title}</h3>
                      <span className={`booking-status ${listing.status === 'Active' ? 'status-confirmed' : 'status-cancelled'}`}>{listing.status}</span>
                    </div>
                    <p>Price: ₹{listing.price} / night</p>
                    <p>Income: ₹{(listing.income || 0).toLocaleString()}</p>
                    <div className="listing-actions">
                      <button className="btn btn-secondary btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm btn-delete" onClick={() => handleDeleteListing(listing.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't listed any properties yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard?tab=add')}>Add Property</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
