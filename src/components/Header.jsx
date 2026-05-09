import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/images/logo.jpg" alt="Larindustries Logo" className="header__logo-img" />
        </div>

        <button className={`header__hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className={`header__nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/services" className={`header__nav-link ${isActive('/services')}`} onClick={() => setIsMenuOpen(false)}>
                SERVICES
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/about" className={`header__nav-link ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/news" className={`header__nav-link ${isActive('/news')}`} onClick={() => setIsMenuOpen(false)}>
                NEWS
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact" className={`header__nav-link ${isActive('/contact')}`} onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
