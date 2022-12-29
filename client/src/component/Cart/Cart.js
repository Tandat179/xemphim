import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import CartItemCard from "./CartItemCard";

import { CartContext } from "../../context/cart/CartContext";
import { AuthContext } from "../../context/auth/AuthContext";

import RemoveShoppingCartIcon from "../../assets/cart-x-fill.svg";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartState: { cartItems },
    removeItem,
    addItemsToCart,
  } = useContext(CartContext);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

    //If user add product default quantity = 1
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  //Decrease (Giảm bớt) quantity -1
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    addItemsToCart(id, newQty);
  };

  //Remove Product (Item)
  const deleteCartItems = (id) => {
    console.log(id);
    removeItem(id);
  };

  console.log(isAuthenticated);

  //Handler Checkout
  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <Fragment>
      {/* If Item === 0 */}
      {cartItems.length === 0 ? (
        <div className="emptyCart">

          {/* Icon Remove */}
          <img src={RemoveShoppingCartIcon} alt="icon" className="svgImg" />

          {/* If No product send user View product */}
          <h2>No Product in Your Cart</h2>
          <Link to="/products">View Products</Link>
        </div>
      ) : (

        // Else If Product Item > 0
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {/* Render by Map from aray caryItems for user */}
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>

                  {/* Cart Item  */}
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />

                  <div className="cartInput">
                    {/* Button Decrease Quantity Item */}
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>

                    {/* Rendering Quantity of Item */}
                    <span>{item.quantity}</span>

                    {/* Button Crease Quantity Item */}
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Funtion Handler Total Price if Quantity */}
                  <p className="cartSubtotal">
                    {`${item.price * item.quantity}`} VND
                  </p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                {/* Gross Total All in Cart */}
                <p>
                  {`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
                  VND
                </p>
              </div>

              {/* Check isauthencated  */}
              {isAuthenticated ? (
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              ) : 
                // Else If
              (
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Login to Buy</button>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
