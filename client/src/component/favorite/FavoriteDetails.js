import React, { Fragment, useEffect, useContext, useState } from "react";
import "./favoriteDetails.css";
import { FavoriteContext } from "../../context/favorite/FavoriteContext";
import LoadingModal from "../Loading/loading";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import Badge from "react-bootstrap/Badge";

const FavoriteDetails = () => {
  
  const {
    favoriteState: { favorite },
    getOneFavorite,
  } = useContext(FavoriteContext);
  
  let { favoriteId } = useParams();

  const [isLoading, setLoading] = useState(true);

  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneFavorite(favoriteId);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [favoriteId]);

  return (
    <Fragment>
      <LoadingModal show={isLoading} />
      <div className="favoriteDetailsPage">
        <div className="favoriteDetailsContainer">

          <h1>Favorite #{favorite && favorite._id}</h1>
          {/* Information Shipping */}
          <h2>Shipping Info</h2>

          <div className="favoriteDetailsContainerBox">
            
            {/* Name */}
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>

              {/* Phone Number */}
            <div>
              <p>Phone:</p>
              <span>{favorite.shippingInfo && favorite.shippingInfo.phoneNo}</span>
            </div>
              
              {/* Address */}
            <div>
              <p>Address:</p>
              <span>
                {favorite.shippingInfo &&
                  `${favorite.shippingInfo.address}, 
                   ${favorite.shippingInfo.city}, 
                   ${favorite.shippingInfo.country}`}
              </span>
            </div>

          </div>
          

          {/* Status Of Order */}
          <h2>Favorite Status</h2>
          <div className="favoriteDetailsContainerBox">
            <div>
              <Badge
                bg={
                  favorite.favoriteStatus === "Done"
                    ? "success"
                    : favorite.favoriteStatus === "Shipping"
                    ? "warning"
                    : favorite.favoriteStatus === "Processing"
                    ? "primary"
                    : "danger"
                }
              >
                {favorite.favoriteStatus && favorite.favoriteStatus}
              </Badge>
            </div>
          </div>

        </div>

        <div className="favoriteDetailsCartItems">

          {/* Order Items */}
          <h2> favorite Items:</h2>
          <div className="orderDetailsCartItemsContainer">

            {/* Render Item By Map From array */}
            {favorite.favoriteItems &&
              favorite.favoriteItems.map((item) => (

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

export default FavoriteDetails;
