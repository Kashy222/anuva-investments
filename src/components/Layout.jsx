import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Layout.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Anuva <span className="logo-accent">Investments</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Services</NavLink>

          <NavLink to="/tools" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Tools</NavLink>
          <Link to="/schedule-call" className="btn btn-primary sm">Book Free Call</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} color="#00588f" /> : <Menu size={24} color="#00588f" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <NavLink to="/" onClick={toggleMenu} className="mobile-nav-link">Home</NavLink>
            <NavLink to="/services" onClick={toggleMenu} className="mobile-nav-link">Services</NavLink>

            <NavLink to="/tools" onClick={toggleMenu} className="mobile-nav-link">Tools</NavLink>
            <Link to="/schedule-call" onClick={toggleMenu} className="btn btn-primary mobile-cta">Book Free Call</Link>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3 className="footer-logo">Anuva <span>Investments</span></h3>
          <p className="footer-desc">
            Helping you achieve financial fitness through personalized planning and smart investing.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>

            <li><Link to="/tools">Tools</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Financial Planning</Link></li>
            <li><Link to="/services">Wealth Management</Link></li>
            <li><Link to="/services">Retirement Planning</Link></li>
            <li><Link to="/services">Tax Planning</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><Phone size={16} /> <a href="tel:+919892804546">+91 9892804546</a></li>
            <li><Mail size={16} /> <a href="mailto:aabasalunkhe@gmail.com">aabasalunkhe@gmail.com</a></li>
            <li><MapPin size={16} /> Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Anuva Investments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
