import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about__section">
        <div className="about__container">
          <h2 className="about__title">ABOUT</h2>
          
          <div className="about__content">
            <p className="about__text">
              Larindustries is a leading supplier of premium industrial safety equipment and personal protective equipment (PPE). With over a decade of experience, we provide high-quality products that meet international safety standards.
            </p>
            <p className="about__text">
              Our commitment is to ensure workplace safety through reliable, durable, and affordable safety solutions. We serve industries ranging from construction, manufacturing, to equestrian services.
            </p>
          </div>

          <div className="about__features">
            <div className="about__feature">
              <h4 className="about__feature-title">✓ Premium Quality</h4>
              <p className="about__feature-text">All products meet international safety standards</p>
            </div>
            <div className="about__feature">
              <h4 className="about__feature-title">✓ Certified Products</h4>
              <p className="about__feature-text">CE certified and tested for safety compliance</p>
            </div>
            <div className="about__feature">
              <h4 className="about__feature-title">✓ Competitive Prices</h4>
              <p className="about__feature-text">Affordable pricing without compromising quality</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
