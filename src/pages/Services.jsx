import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Services.css';

const productsData = [
  {
    id: 1,
    name: 'Yellow Rubber Work Gloves',
    description: 'Durable yellow rubber gloves with white cotton lining for general safety',
    price: 'From ₹120',
    image: 'images/1-cat.jpg'
  },
  {
    id: 2,
    name: 'Professional Safety Glove Set',
    description: 'Multi-purpose safety gloves with assorted colors and designs',
    price: 'From ₹180',
    image: 'images/2-cat.jpg'
  },
  {
    id: 3,
    name: 'Welding Protection Gloves',
    description: 'Heat-resistant welding gloves with reinforced leather cuff',
    price: 'From ₹250',
    image: 'images/3-cat.jpg'
  },
  {
    id: 4,
    name: 'Industrial Yellow Safety Gloves',
    description: 'CE certified yellow work gloves with blue cuff and grip protection',
    price: 'From ₹200',
    image: 'images/4-cat.jpg'
  },
  {
    id: 5,
    name: 'Safety Shoes SLS-103',
    description: 'Premium steel-toe safety shoes with anti-slip sole and leather upper',
    price: 'From ₹1,299',
    image: 'images/5-cat_orig.jpg'
  },
  {
    id: 6,
    name: 'Black Safety Boots',
    description: 'Professional black safety boots with reinforced toe and ankle support',
    price: 'From ₹1,199',
    image: 'images/6-cat_orig.jpg'
  },
  {
    id: 7,
    name: 'White Cotton Protection Apron',
    description: 'Durable white apron with red trim for workplace safety and protection',
    price: 'From ₹350',
    image: 'images/7-cat.jpg'
  },
  {
    id: 8,
    name: 'Premium Black Safety Boots',
    description: 'Heavy-duty black safety boots with shock-absorbing sole',
    price: 'From ₹1,249',
    image: 'images/8-cat.jpg'
  },
  {
    id: 9,
    name: 'Welding Safety Gloves',
    description: 'Professional welding gloves with heat and flame resistance',
    price: 'From ₹280',
    image: 'images/9-cat.jpg'
  },
  {
    id: 10,
    name: 'High-Visibility Yellow Work Gloves',
    description: 'Bright yellow safety gloves with white cuff and CE mark certification',
    price: 'From ₹210',
    image: 'images/getdownload.jpg'
  },
  {
    id: 11,
    name: 'Industrial Safety Boots',
    description: 'Professional industrial safety boots with steel toe protection',
    price: 'From ₹1,150',
    image: 'images/getdownload-1.jpg'
  },
  {
    id: 12,
    name: 'Premium Safety Boot',
    description: 'High-quality safety boot with enhanced durability and comfort',
    price: 'From ₹1,200',
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
