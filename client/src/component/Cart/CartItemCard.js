import React from "react";
import { Link } from "react-router-dom";

import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">

      {/* Image of Item */}
      <img src={item.image} alt="ssa" />
      <div>
        
        {/* Link to Product */}
        <Link to={`/product/${item.product}`}>{item.name}</Link>

        {/* Price of Item */}
        <span>{`Price: ${item.price}`} VND</span>

        {/* Button Remove Item */}
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
