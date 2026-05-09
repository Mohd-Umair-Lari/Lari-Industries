import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">LARI INDUSTRIES</h1>
          <p className="hero__subtitle">Estd: 2005</p>
          
          <h2 className="hero__tagline">THINK SAFETY BEFORE YOU START</h2>
          
          <p className="hero__description">
            <span className="hero__highlight">LARI INDUSTRIES</span> has been successfully producing leather safety articles for personnel protection since 2005. Due to our Company's focus on innovation and several-year experience, we can offer our industrial need for hand protection a wide range of very competitive and highly technical products like leather industrial safety gloves and shoes/boots, aprons, leather jackets for industrial workers, leg guard etc.
          </p>

          <div className="hero__products">
            <div className="hero__product-item">
              <img src="images/8-cat.jpg" alt="Safety Shoes" />
            </div>
            <div className="hero__product-item">
              <img src="images/7-cat.jpg" alt="Safety Shoes SLS-103" />
              <p className="hero__product-label">SLS - 103</p>
            </div>
            <div className="hero__product-item">
              <img src="images/3-cat.jpg" alt="Safety Gloves" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
