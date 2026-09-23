import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPropertyDetails } from '../data/PropertyService';
import propertiesData from '../data/properties.json';
import BookingModal from '../components/BookingModal';
import PropertyCard from '../card/PropertyCard';
import { Star, Heart, MapPin, Check } from '../components/Icons';

function DetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const data = fetchPropertyDetails(id);
    setProperty(data);
    setLoading(false);
    setActiveImage(0);
    setLiked(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="details-loading container">Loading property details...</div>;
  if (!property) return <div className="details-not-found container"><h2>Property not found</h2><Link to="/listings" className="btn btn-primary">Browse Properties</Link></div>;

  const { title, description, location, price, rating, reviews, amenities, images, category, host, guests, bedrooms, beds, bathrooms, availability } = property;
  const galleryImages = images && images.length > 0 ? images : [];

  const similarProperties = propertiesData.filter(p => p.id !== property.id && (p.location === location || p.category === category)).slice(0, 3);

  return (
    <div className="details-page">
      <div className="gallery container">
        <div className="gallery-main">
          <img src={galleryImages[activeImage]} alt={title} className="gallery-image" />
        </div>
        <div className="gallery-thumbnails">
          {galleryImages.map((img, i) => (
            <button key={i} className={`gallery-thumb ${activeImage === i ? 'active' : ''}`} onClick={() => setActiveImage(i)}>
              <img src={img} alt={`${title} ${i + 1}`} />
            </button>
          ))}
        </div>
        <button className="gallery-favorite" onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}>
          <Heart filled={liked} size={22} />
        </button>
      </div>

      <div className="details-content container">
        <div className="details-main">
          <div className="details-header">
            <div>
              <span className="details-category badge badge-primary">{category}</span>
              <h1>{title}</h1>
              <div className="details-rating">
                <Star filled size={16} />
                <span className="rating-score">{rating}</span>
                <span className="rating-reviews">({reviews} reviews)</span>
              </div>
            </div>
            <div className="details-price">
              <span className="price-value">₹{price.toLocaleString()}</span>
              <span className="price-per">/ night</span>
            </div>
          </div>

          <div className="details-info-bar">
            <span><strong>{guests}</strong> Guests</span>
            <span><strong>{bedrooms}</strong> Bedrooms</span>
            <span><strong>{beds}</strong> Beds</span>
            <span><strong>{bathrooms}</strong> Bathrooms</span>
          </div>

          <div className="details-tabs">
            <button className={`details-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`details-tab ${activeTab === 'amenities' ? 'active' : ''}`} onClick={() => setActiveTab('amenities')}>Amenities</button>
            <button className={`details-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
          </div>

          <div className="details-tab-content">
            {activeTab === 'overview' && (
              <div>
                <h3>About this place</h3>
                <p className="details-description">{description}</p>
                <div className="details-location">
                  <MapPin size={18} />
                  <span>{location}</span>
                </div>
              </div>
            )}
            {activeTab === 'amenities' && (
              <div>
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {amenities.map((a, i) => (
                    <div key={i} className="amenity-item">
                      <Check size={18} />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h3>Guest Reviews</h3>
                <div className="reviews-summary">
                  <div className="reviews-average">
                    <span className="reviews-big">{rating}</span>
                    <div><Star filled size={16} /><div>Based on {reviews} reviews</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="booking-widget">
          <div className="booking-widget-card">
            <div className="booking-widget-price">
              <span className="widget-price">₹{price.toLocaleString()}</span>
              <span className="widget-per">/ night</span>
            </div>
            {!availability ? (
              <div className="booking-unavailable">
                <span className="badge badge-error">Currently Unavailable</span>
              </div>
            ) : (
              <button className="btn btn-primary btn-lg btn-book widget-book-btn" onClick={() => setBookingOpen(true)}>Book Now</button>
            )}
            <p className="widget-cancellation">Free cancellation for 48 hours</p>
            <hr className="widget-divider" />
            <p className="widget-host">Hosted by <strong>{host}</strong></p>
          </div>
        </aside>
      </div>

      {similarProperties.length > 0 && (
        <div className="similar-section container">
          <h2>Similar Properties</h2>
          <div className="property-grid">
            {similarProperties.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      )}

      <BookingModal property={property} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} onConfirm={() => navigate('/dashboard')} />
    </div>
  );
}

export default DetailsPage;