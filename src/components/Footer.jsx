import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h4 className="footer__section-title">COMPANY</h4>
            <ul className="footer__section-list">
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/services" className="footer__link">Products</Link></li>
              <li><Link to="/news" className="footer__link">News</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__section-title">PRODUCTS</h4>
            <ul className="footer__section-list">
              <li><Link to="/services" className="footer__link">Safety Gloves</Link></li>
              <li><Link to="/services" className="footer__link">Safety Shoes</Link></li>
              <li><Link to="/services" className="footer__link">Protective Equipment</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__section-title">SUPPORT</h4>
            <ul className="footer__section-list">
              <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
              <li><a href="#faq" className="footer__link">FAQ</a></li>
              <li><a href="#returns" className="footer__link">Returns</a></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__section-title">LEGAL</h4>
            <ul className="footer__section-list">
              <li><a href="#privacy" className="footer__link">Privacy Policy</a></li>
              <li><a href="#terms" className="footer__link">Terms & Conditions</a></li>
              <li><a href="#shipping" className="footer__link">Shipping Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 Larindustries. All Rights Reserved. | Industrial Safety Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
