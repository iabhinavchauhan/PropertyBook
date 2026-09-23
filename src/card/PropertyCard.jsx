import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from '../components/Icons';

export function PropertyCard({ property }) {
  const { id, title, location, price, rating, reviews, availability, category, amenities, images, image } = property;
  const mainImage = images && images.length > 0 ? images[0] : image;
  const badgeClass = availability ? 'badge-success' : 'badge-error';
  const badgeText = availability ? 'Available' : 'Unavailable';

  return (
    <div className="property-card">
      <div className="card-image-wrapper">
        <img src={mainImage} alt={title} className="card-image" loading="lazy" />
        <span className={`card-badge ${badgeClass}`}>{badgeText}</span>
        <span className="card-category">{category}</span>
      </div>
      <div className="card-body">
        <div className="card-rating">
          <Star filled size={14} />
          <span className="card-rating-score">{rating}</span>
          <span className="card-reviews">({reviews} reviews)</span>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-location">{location}</p>
        <div className="card-amenities">
          {amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="card-amenity">{amenity}</span>
          ))}
          {amenities.length > 3 && <span className="card-amenity">+{amenities.length - 3}</span>}
        </div>
        <div className="card-footer">
          <p className="card-price">
            {'₹'}{price.toLocaleString()} <span className="per-night">/ night</span>
          </p>
          <Link to={`/property/${id}`} className="btn-details">View details <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
