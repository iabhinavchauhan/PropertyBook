import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              <img src="/propertybook-mark-light.svg" width="32" height="32" alt="" />
              <span>Roamstead</span>
            </Link>
            <p className="site-footer__tagline">
              Discover unforgettable stays and make every trip memorable. Your trusted partner in hospitality.
            </p>
            <div className="site-footer__social">
              <a href="https://abhinavchauhansite.netlify.app" target="_blank" rel="noopener noreferrer" aria-label="Portfolio website (opens in a new tab)" title="Portfolio" className="site-footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="https://www.instagram.com/thakurabhinavsinghchauhan.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile (opens in a new tab)" className="site-footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/iabhinavchauhan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="site-footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="mailto:iabhinavchauhan.ac@gmail.com" aria-label="Email iabhinavchauhan.ac@gmail.com" className="site-footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              </a>
            </div>
          </div>
          <div className="site-footer__column">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/listings">Browse Listings</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/dashboard?tab=add">List Property</Link></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Roamstead. All rights reserved.</p>
          <div className="site-footer__legal">
            <Link to="#">Privacy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
