import React from 'react';
import {ProductProps} from "./constant";

export const Product: React.FC<ProductProps> = ({ image, name, description }) => {
  return (
    <div className="product-details">
      <img className="product-image" src={image} />
      <h4 style={{margin: "10px auto"}}>{name}</h4>
      <p style={{margin: "10px auto", maxWidth: "400px"}} className="product-description">"{description}"</p>
    </div>
  );
};
