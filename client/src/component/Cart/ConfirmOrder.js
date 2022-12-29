import React, { Fragment, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CheckoutSteps from "./CheckoutStreps";
import LoadingModel from "../Loading/loading";

import { CartContext } from "../../context/cart/CartContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { OrderContext } from "../../context/order/OrderContext";

import "./ConfirmOrder.css";

const ConfirmOrder = () => {

  const navigate = useNavigate();

  // UseContext get menthod
  const {
    cartState: { cartItems, shippingInfor },
    removeAllItems,
  } = useContext(CartContext);

  
  // UseContext get menthod
  const {
    authState: { user },
  } = useContext(AuthContext);

  
  // UseContext fet menthod
  const { createOrder } = useContext(OrderContext);

  const [isLoading, setLoading] = useState(false);


  // Total Price Of Item in Cart User
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  
  //Fee Shipping
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  //Tax
  const tax = subtotal * 0.18;

  //Total Receipt(Hóa Đơn)
  const totalPrice = subtotal + tax + shippingCharges;

  //Address City Country
  const address = `${shippingInfor.address}, ${shippingInfor.city}, ${shippingInfor.country}`;

  // Process to Payment
  const proceedToPayment = () => {
    
    //Variable of Order
    const dataOrder = {
      shippingInfo: shippingInfor,
      orderItems: cartItems,
      taxPrice: tax,
      totalPrice,
      user: user._id,
      shippingPrice: shippingCharges,
      itemsPrice: subtotal,
    };
    // * ItemPrice = Subtitle
    loadingShow();

    createOrder(dataOrder);
    removeAllItems();
    navigate("/orderSuccess", { replace: true });
  };
  const loadingShow = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Fragment>

      <LoadingModel show={isLoading} />

      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>

          {/* Render Confirm AreaBox */}
          <div className="confirmshippingArea">
            <h2>Shipping Info</h2>

            <div className="confirmshippingAreaBox">

              <div>
                {/* Name */}
                <p>Name:</p>
                <span>{user.name}</span>
              </div>

              <div>
                {/* Phone Number */}
                <p>Phone:</p>
                <span>{shippingInfor.phoneNo}</span>
              </div>

              <div>
                {/* Address */}
                <p>Address:</p>
                <span>{address}</span>
              </div>

            </div>
          </div>

          {/* Render Cart Item */}

          <div className="confirmCartItems">
            <h2>Your Cart Items:</h2>

            <div className="confirmCartItemsContainer">

              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    {/* Image of Item */}
                    <img src={item.image} alt="Product" />

                    {/* Name of Item */}
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}

                    {/* Quantity and Price */}
                    <span>
                      {item.quantity} X {item.price} VND ={" "}
                    {/* Total of One Item */}
                      <b>{item.price * item.quantity} VND</b>
                    </span>

                  </div>
                ))}
            </div>

          </div>

        </div>
        {/*  */}


        <div>

          <div className="orderSummary">

            {/* Summery */}
            <h2>Order Summery</h2>

            <div>
              <div>
                <p>Subtotal:</p>
                {/* Total Price */}
                <span>{subtotal} VND</span>
              </div>

              <div>
                {/* Fee Shipping */}
                <p>Shipping Charges:</p>
                <span>{shippingCharges} VND</span>
              </div>

              <div>
                {/* Tax */}
                <p>GST:</p>
                <span>{tax} VND</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              {/* Total All */}
              <span>{totalPrice} VND</span>
            </div>

            <button onClick={proceedToPayment}>Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
