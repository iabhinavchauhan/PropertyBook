import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Sun, Moon } from './Icons';

const readStored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};

function Navbar({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(() => readStored('propertybook-user', null));
  const [authError, setAuthError] = useState('');
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    if (location.state?.requireSignIn) setAuthOpen(true);
  }, [location]);
  useEffect(() => {
    const dismiss = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setUserMenuOpen(false);
      if (event.key === 'Escape') { setAuthOpen(false); setAuthError(''); }
    };
    document.addEventListener('mousedown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => { document.removeEventListener('mousedown', dismiss); document.removeEventListener('keydown', dismiss); };
  }, []);

  const toggleTheme = () => setTheme((current) => {
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    return next;
  });

  const signIn = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    if (!email || !email.includes('@') || !name) { setAuthError('Enter your name and a valid email address.'); return; }
    const profile = { name, email };
    localStorage.setItem('propertybook-user', JSON.stringify(profile));
    setUser(profile);
    setAuthOpen(false);
    setAuthError('');
    if (location.state?.requireSignIn && location.state.from) navigate(location.state.from, { replace: true, state: null });
  };

  const signOut = () => {
    localStorage.removeItem('propertybook-user');
    setUser(null);
    setUserMenuOpen(false);
    if (location.pathname.startsWith('/dashboard')) navigate('/', { replace: true });
  };
  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`;
  const openLogin = () => { setAuthOpen(true); setAuthError(''); setUserMenuOpen(false); setMobileMenuOpen(false); };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__container container">
          <Link to="/" className="navbar__brand" aria-label="PropertyBook Home">
            <img className="navbar__logo" src="/propertybook-mark.svg" alt="" />
            <span className="navbar__brand-text">PropertyBook</span>
          </Link>
          <nav className="navbar__nav" aria-label="Main navigation"><ul className="navbar__list"><li><NavLink to="/" className={navLinkClass} end>Home</NavLink></li><li><NavLink to="/listings" className={navLinkClass}>Browse</NavLink></li></ul></nav>
          <div className="navbar__actions">
            <button className="btn btn-ghost btn-sm navbar__theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
            <Link to="/dashboard" className="btn btn-ghost btn-sm navbar__cta">Dashboard</Link>
            <Link to="/dashboard?tab=add" className="btn btn-primary btn-sm navbar__cta">List Property</Link>
            <div className="navbar__user-menu" ref={userMenuRef}>
              <button className="btn btn-ghost btn-sm navbar__user-btn" onClick={() => user ? setUserMenuOpen(!userMenuOpen) : openLogin()} aria-expanded={userMenuOpen} aria-haspopup="true" aria-label={user ? 'Open profile menu' : 'Sign in'}>
                <span className="profile-avatar">{user ? user.name.charAt(0).toUpperCase() : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}</span>
                <span className="navbar__user-name">{user ? user.name.split(' ')[0] : 'Sign in'}</span>
                {user && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>}
              </button>
              {user && userMenuOpen && <div className="navbar__dropdown animate-slide-down" role="menu">
                <div className="navbar__dropdown-header"><div className="navbar__user-avatar">{user.name.charAt(0).toUpperCase()}</div><div className="profile-heading"><p className="navbar__user-display-name">{user.name}</p><p className="navbar__user-email">{user.email}</p></div></div>
                <Link to="/dashboard" className="navbar__dropdown-item" role="menuitem">Dashboard</Link><Link to="/listings" className="navbar__dropdown-item" role="menuitem">Browse stays</Link>
                <button className="navbar__dropdown-item navbar__dropdown-item--danger" role="menuitem" onClick={signOut}>Sign out</button>
              </div>}
            </div>
            <button className="navbar__mobile-toggle btn btn-ghost btn-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>{mobileMenuOpen ? '×' : '☰'}</button>
          </div>
        </div>
        {mobileMenuOpen && <div id="mobile-menu" className="navbar__mobile-menu animate-slide-down">
          <nav className="navbar__mobile-nav"><NavLink to="/" className="navbar__mobile-link" end>Home</NavLink><NavLink to="/listings" className="navbar__mobile-link">Browse stays</NavLink><Link to="/dashboard" className="navbar__mobile-link">Dashboard</Link><Link to="/dashboard?tab=add" className="navbar__mobile-link">List your property</Link></nav>
          <div className="mobile-account-actions"><button className="mobile-theme-button" onClick={toggleTheme}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}{theme === 'light' ? 'Dark mode' : 'Light mode'}</button>{user ? <button className="mobile-signout" onClick={signOut}>Sign out · {user.name}</button> : <button className="btn btn-primary btn-full" onClick={openLogin}>Sign in</button>}</div>
        </div>}
      </header>
      <main>{children}</main>
      <Footer />
      {authOpen && <div className="auth-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false); }}><section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button className="auth-close" onClick={() => setAuthOpen(false)} aria-label="Close sign in">×</button><span className="eyebrow">WELCOME TO PROPERTYBOOK</span><h2 id="auth-title">Your next stay<br /><em>starts here.</em></h2><p className="auth-intro">Sign in to keep your travel plans in one place.</p><form onSubmit={signIn} className="auth-form"><label htmlFor="auth-name">Your name</label><input id="auth-name" name="name" autoComplete="name" placeholder="Alex Morgan" required /><label htmlFor="auth-email">Email address</label><input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />{authError && <p className="auth-error" role="alert">{authError}</p>}<button className="btn btn-primary btn-full" type="submit">Continue with email <span>↗</span></button></form><p className="auth-note">This demo saves your profile on this device.</p></section></div>}
    </>
  );
}

export default Navbar;
