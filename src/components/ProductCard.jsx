import React, { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} className="product-card__image" />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">{product.price}</p>
        <button 
          className={`product-card__button ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? 'ADDED ✓' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
