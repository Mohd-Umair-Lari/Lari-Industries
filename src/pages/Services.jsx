import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Services.css';

const productsData = [
  {
    id: 1,
    name: 'Work Gloves',
    description: 'Premium green work gloves with grip protection',
    price: 'From ₹150',
    image: 'images/1-cat.jpg'
  },
  {
    id: 2,
    name: 'Leather Work Gloves',
    description: 'Durable leather gloves for heavy-duty work',
    price: 'From ₹180',
    image: 'images/2-cat.jpg'
  },
  {
    id: 3,
    name: 'Yellow Safety Gloves',
    description: 'High-visibility yellow safety gloves with CE certification',
    price: 'From ₹200',
    image: 'images/3-cat.jpg'
  },
  {
    id: 4,
    name: 'White Protection Gloves',
    description: 'Cotton gloves for light-duty protection',
    price: 'From ₹120',
    image: 'images/4-cat.jpg'
  },
  {
    id: 5,
    name: 'Welding Gloves',
    description: 'Heat-resistant gloves for welding operations',
    price: 'From ₹250',
    image: 'images/5-cat_orig.jpg'
  },
  {
    id: 6,
    name: 'Safety Gloves with Red Trim',
    description: 'Professional safety gloves with reinforced cuff',
    price: 'From ₹220',
    image: 'images/6-cat_orig.jpg'
  },
  {
    id: 7,
    name: 'Safety Shoes SLS-103',
    description: 'Steel-toe safety shoes with anti-slip sole',
    price: 'From ₹1,299',
    image: 'images/7-cat.jpg'
  },
  {
    id: 8,
    name: 'Black Safety Boots',
    description: 'Protective safety boots with high-ankle support',
    price: 'From ₹1,199',
    image: 'images/8-cat.jpg'
  },
  {
    id: 9,
    name: 'Protective Safety Apron',
    description: 'Durable apron for workplace protection',
    price: 'From ₹350',
    image: 'images/9-cat.jpg'
  },
  {
    id: 10,
    name: 'Premium Yellow Work Gloves',
    description: 'Professional-grade yellow safety gloves',
    price: 'From ₹210',
    image: 'images/getdownload.jpg'
  },
  {
    id: 11,
    name: 'Premium Equestrian Saddle',
    description: 'Professional-grade leather saddle',
    price: 'On Request',
    image: 'images/getdownload-1.jpg'
  },
  {
    id: 12,
    name: 'Complete Safety Kit',
    description: 'Comprehensive safety equipment package',
    price: 'On Request',
    image: 'images/getdownload-2.jpg'
  }
];

const Services = () => {
  return (
    <div className="services">
      <section className="services__section">
        <div className="services__container">
          <h2 className="services__title">SERVICES</h2>
          <p className="services__subtitle">Quality Safety Equipment You Can Trust</p>
          
          <div className="services__grid">
            {productsData.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
