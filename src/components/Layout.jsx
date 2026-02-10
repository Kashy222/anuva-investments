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
          <img src="/anuva-logo-new.png" alt="Anuva Investments" className="logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          {/* <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>About</NavLink> */}
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
            {/* <NavLink to="/about" onClick={toggleMenu} className="mobile-nav-link">About</NavLink> */}
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
          <Link to="/" className="footer-logo-link">
            <img src="/anuva-logo-new.png" alt="Anuva Investments" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            Helping you achieve financial fitness through personalized planning and smart investing.
          </p>

        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/about">About Us</Link></li> */}
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
      <div className="footer-disclaimer">
        <div className="container disclaimer-content">
          <div className="disclaimer-section">
            <p>
              Anuva Investments is a trusted investment platform. Operated under the brand name of Anuva Investments, we are committed to helping individuals and families make informed investment decisions with ease and transparency.
            </p>
            <p>
              Our mission is to simplify investing by offering a user-friendly, reliable, and secure platform tailored to meet the diverse financial goals of our clients.
            </p>
            <p><strong>Registered Office:</strong> Mumbai, India</p>
            <p>
              If you have any questions or concerns regarding your investments, please feel free to reach out to us at <a href="mailto:aabasalunkhe@gmail.com">aabasalunkhe@gmail.com</a>. We're here to help.
            </p>
          </div>

          <div className="disclaimer-section">
            <p><strong>Disclaimer:</strong></p>
            <p><strong>Issued in the Interest of Investors</strong></p>
            <p>
              We strongly recommend that you read all relevant scheme documents and the Risk Disclosure Document prescribed by SEBI before making any investment decisions.
            </p>
            <p>
              Anuva Investments makes no warranties or representations, express or implied, regarding any products or services offered through this platform. We accept no liability for any loss or damage arising from the use of, or reliance on, this platform or any information provided herein, regardless of the cause. Unless otherwise stated, all data—including returns, Net Asset Values (NAVs), and expense ratios—are historical in nature and provided for illustrative purposes only. Future performance may differ significantly due to individual circumstances and market conditions.
            </p>
            <p>
              The content available on our platform and through our communication channels is intended solely for informational purposes and should not be construed as investment, legal, or tax advice.
            </p>
            <p>
              Investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future results.
            </p>
            <p>
              Terms and conditions on this website/app are applicable. The privacy policy of the website is also applicable.
            </p>
          </div>

          <div className="footer-bottom">
            <div className="container disclaimer-contact">
              <div className="disclaimer-contact-item">
                <p>&copy; {new Date().getFullYear()} Anuva Investments. All rights reserved.</p>
              </div>
              <div className="disclaimer-contact-item">
                <Mail size={16} /> <a href="mailto:aabasalunkhe@gmail.com">support@anuva.com</a>
              </div>
              <div className="disclaimer-contact-item">
                <Phone size={16} /> <a href="tel:+919892804546">+91 9892804546</a>
              </div>
            </div>
          </div>
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
