import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import PropertyCard from '../card/PropertyCard';
import { Star } from '../components/Icons';

const categories = [
  { name: 'All stays', icon: '✳' }, { name: 'Cabin', icon: '⌂' }, { name: 'Homestay', icon: '♡' },
  { name: 'Apartment', icon: '▤' }, { name: 'House', icon: '⌂' }, { name: 'Penthouse', icon: '⌑' }, { name: 'Room', icon: '◫' },
];

function Home() {
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('All stays');
  const navigate = useNavigate();
  const featured = useMemo(() => (activeCategory === 'All stays' ? propertiesData : propertiesData.filter((p) => p.category === activeCategory)).slice(0, 6), [activeCategory]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/listings${location.trim() ? `?location=${encodeURIComponent(location.trim())}` : ''}`);
  };

  return (
    <div className="home-page redesign-home">
      <section className="editorial-hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner container">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> STAYS THAT FEEL LIKE YOURS</div>
            <h1>Find your<br /><em>somewhere.</em></h1>
            <p>Slow mornings, mountain air, and places with a little more soul. Your next Uttarakhand story starts here.</p>
            <a className="hero-explore" href="#stays">Explore the collection <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note"><span className="note-dot" /> A better kind of getaway <span className="note-rule" /> Uttarakhand, India</div>
          <form className="stay-search" onSubmit={handleSearch}>
            <label className="search-destination" htmlFor="search-location">
              <span className="search-icon" aria-hidden="true">⌖</span>
              <span className="search-label-wrap"><span className="search-label">WHERE TO?</span><input id="search-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Try Rishikesh or Dehradun" /></span>
            </label>
            <div className="search-divider" />
            <div className="search-prompt"><span className="search-label">A LITTLE INSPIRATION</span><span>Find your kind of place</span></div>
            <button className="search-submit" type="submit" aria-label="Search stays"><span>Find a stay</span><span className="search-arrow" aria-hidden="true">↗</span></button>
          </form>
        </div>
        <div className="hero-index">30°05′N&nbsp; 78°16′E <span>—&nbsp; THE HIMALAYAN FOOTHILLS</span></div>
      </section>

      <section className="intro-strip container">
        <span className="eyebrow">A PLACE TO LAND</span>
        <p>Not just a place to stay.<br /><em>A feeling you take home.</em></p>
        <span className="intro-description">Thoughtful homes, local hosts, and little corners of the mountains worth getting lost in.</span>
      </section>

      <section className="stays-section container" id="stays">
        <div className="stays-heading">
          <div><span className="eyebrow">THE GOOD PLACES</span><h2>Stay a little<br /><em>closer to nature.</em></h2></div>
          <button className="all-stays-link" onClick={() => navigate('/listings')}>See all stays <span aria-hidden="true">↗</span></button>
        </div>
        <div className="category-rail" role="group" aria-label="Filter stays by type">
          {categories.map((category) => <button key={category.name} className={`category-tab ${activeCategory === category.name ? 'is-active' : ''}`} onClick={() => setActiveCategory(category.name)}><span aria-hidden="true">{category.icon}</span>{category.name}</button>)}
        </div>
        {featured.length ? <div className="property-grid editorial-grid">{featured.map((property, index) => <div className="property-reveal" style={{ '--reveal-index': index }} key={property.id}><PropertyCard property={property} /></div>)}</div> : <p className="empty-stays">More lovely places are on their way. <button onClick={() => setActiveCategory('All stays')}>See all stays</button></p>}
      </section>

      <section className="manifesto-section">
        <div className="manifesto-photo" role="img" aria-label="A quiet Himalayan mountain valley" />
        <div className="manifesto-content"><span className="eyebrow">TAKE THE SCENIC ROUTE</span><h2>Out here,<br />time <em>opens up.</em></h2><p>Trade the usual for a little more wonder. Wake to cedar-scented air, follow the river wherever it goes, and let the mountains set the pace.</p><button className="manifesto-link" onClick={() => navigate('/listings')}>Find your way out <span aria-hidden="true">↗</span></button><div className="manifesto-caption">THE GARHWAL HIMALAYAS&nbsp; · &nbsp;30° N</div></div>
      </section>

      <section className="small-details container">
        <div className="details-lead"><span className="eyebrow">THE LITTLE THINGS MATTER</span><h2>Made for the<br /><em>way you travel.</em></h2></div>
        <article className="detail-item"><span className="detail-number">01</span><span className="detail-icon" aria-hidden="true">✳</span><h3>Places with a point of view</h3><p>Handpicked stays with a sense of place, from riverside hideaways to high-up cabins.</p></article>
        <article className="detail-item"><span className="detail-number">02</span><span className="detail-icon" aria-hidden="true">⌁</span><h3>Local, all the way through</h3><p>Meet the people who know these hills best. The best recommendations never make a guidebook.</p></article>
        <article className="detail-item"><span className="detail-number">03</span><span className="detail-icon" aria-hidden="true">♡</span><h3>Easy from hello to home</h3><p>Browse at your pace, book with confidence, and make room for the unexpected.</p></article>
      </section>

      <section className="quote-section"><div className="quote-mark">“</div><blockquote>We came for the mountains.<br />We stayed for <em>the feeling.</em></blockquote><div className="quote-byline"><span className="quote-stars"><Star size={13} /> <Star size={13} /> <Star size={13} /> <Star size={13} /> <Star size={13} /></span><span>GUEST NOTES, COLLECTED WITH LOVE</span></div></section>

      <section className="host-banner"><div className="host-banner-inner"><div><span className="eyebrow">HAVE A PLACE TO SHARE?</span><h2>Some stories<br />start at <em>your door.</em></h2><p>Welcome travellers to your corner of the mountains.</p></div><button className="host-cta" onClick={() => navigate('/dashboard?tab=add')}>Become a host <span aria-hidden="true">↗</span></button><span className="host-stamp" aria-hidden="true">LOCAL<br />IS THE<br /><em>LOVELY</em><br />PART</span></div></section>
    </div>
  );
}

export default Home;
