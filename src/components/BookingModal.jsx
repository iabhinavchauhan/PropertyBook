import React, { useState } from 'react';

function BookingModal({ property, isOpen, onClose, onConfirm }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 0;
  const total = nights * property.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirm({ checkIn, checkOut, guests, total });
      setSubmitted(false);
      setCheckIn('');
      setCheckOut('');
      setGuests(1);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book this property">
      <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">&times;</button>
        <h2>Book {property.title}</h2>
        <p className="modal-price">₹{property.price.toLocaleString()} <span>/ night</span></p>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Your reservation has been created successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="checkin">Check-in</label>
              <input
                id="checkin"
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkout">Check-out</label>
              <input
                id="checkout"
                type="date"
                required
                min={checkIn || undefined}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {Array.from({ length: property.guests || 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            {nights > 0 && (
              <div className="booking-summary">
                <div className="summary-row">
                  <span>{nights} night{nights > 1 ? 's' : ''}</span>
                  <span>₹{property.price.toLocaleString()} × {nights}</span>
                </div>
                <div className="summary-row">
                  <span>Total</span>
                  <span className="summary-total">₹{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button type="submit" className="btn-book btn-full" disabled={!checkIn || !checkOut}>
              Book Now
            </button>
            <p className="form-cancellation">Free cancellation for 48 hours</p>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingModal;