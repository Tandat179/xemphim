import React, { Fragment, useEffect, useContext, useState } from "react";
import "./orderDetails.css";
import { OrderContext } from "../../context/order/OrderContext";
import LoadingModal from "../Loading/loading";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import Badge from "react-bootstrap/Badge";

const OrderDetails = () => {
  
  const {
    orderState: { order },
    getOneOrder,
  } = useContext(OrderContext);
  
  let { orderId } = useParams();

  const [isLoading, setLoading] = useState(true);

  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneOrder(orderId);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <Fragment>
      <LoadingModal show={isLoading} />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">

          <h1>Order #{order && order._id}</h1>
          {/* Information Shipping */}
          <h2>Shipping Info</h2>

          <div className="orderDetailsContainerBox">
            
            {/* Name */}
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>

              {/* Phone Number */}
            <div>
              <p>Phone:</p>
              <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
            </div>
              
              {/* Address */}
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, 
                   ${order.shippingInfo.city}, 
                   ${order.shippingInfo.country}`}
              </span>
            </div>

          </div>
          

          {/* Status Of Order */}
          <h2>Order Status</h2>
          <div className="orderDetailsContainerBox">
            <div>
              <Badge
                bg={
                  order.orderStatus === "Done"
                    ? "success"
                    : order.orderStatus === "Shipping"
                    ? "warning"
                    : order.orderStatus === "Processing"
                    ? "primary"
                    : "danger"
                }
              >
                {order.orderStatus && order.orderStatus}
              </Badge>
            </div>
          </div>

        </div>

        <div className="orderDetailsCartItems">

          {/* Order Items */}
          <h2>Order Items:</h2>
          <div className="orderDetailsCartItemsContainer">

            {/* Render Item By Map From array */}
            {order.orderItems &&
              order.orderItems.map((item) => (

                // Item Product
                <div key={item.product}>
                  
                  {/* Image Product */}
                  <img src={item.image} alt="Product" />

                  <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                  {/* Quantity and Price */}
                  <span>
                    {item.quantity} X {item.price} VND ={" "}
                    <b>{item.price * item.quantity} VND</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
