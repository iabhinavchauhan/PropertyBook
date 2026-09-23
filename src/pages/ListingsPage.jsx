import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../card/PropertyCard';
import propertiesData from '../data/properties.json';

const categories = ['All', 'Apartment', 'House', 'Cabin', 'Penthouse', 'Homestay', 'Room'];
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    let properties = [...propertiesData];

    if (activeCategory !== 'All') {
      properties = properties.filter(p => p.category === activeCategory);
    }

    if (locationFilter) {
      properties = properties.filter(p => p.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) properties = properties.filter(p => p.price >= min);
    if (!isNaN(max)) properties = properties.filter(p => p.price <= max);

    if (sortBy === 'price-asc') properties.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') properties.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') properties.sort((a, b) => b.rating - a.rating);

    setFilteredProperties(properties);
  }, [locationFilter, minPrice, maxPrice, activeCategory, sortBy, searchParams]);

  const clearFilters = () => { setLocationFilter(''); setMinPrice(''); setMaxPrice(''); setActiveCategory('All'); setSortBy('recommended'); };
  const hasFilters = locationFilter || minPrice || maxPrice || activeCategory !== 'All';

  return (
    <div className="listings-page container">
      <h1>Browse Properties</h1>
      <div className="categories-row">
        {categories.map(cat => (
          <button key={cat} className={`category-pill ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>

      <div className="listings-layout">
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            {hasFilters && <button className="filter-clear" onClick={clearFilters}>Clear all</button>}
          </div>
          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <input id="location" type="text" placeholder="City or Area" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-range">
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <span>—</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </div>
        </aside>

        <section className="property-results">
          <div className="results-header">
            <p className="results-count">{filteredProperties.length} properties found</p>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid property-grid--listings">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No properties found matching your criteria.</p>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ListingsPage;