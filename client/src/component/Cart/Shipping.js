import React, { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Country } from "country-state-city";

import LoadingModel from "../Loading/loading";
import CheckoutSteps from "./CheckoutStreps";
import { CartContext } from "../../context/cart/CartContext";

import "./Shipping.css";

import HomeIcon from "../../assets/house-door-fill.svg";
import LocationCityIcon from "../../assets/geo-alt-fill.svg";
import PublicIcon from "../../assets/map-fill.svg";
import PhoneIcon from "../../assets/phone-fill.svg";


const Shipping = () => {
  const navigate = useNavigate();

  const {
    cartState: { shippingInfor },
    //ShippingInfor container varialble address, city,country,phoneNo
    saveShippingInfo,
  } = useContext(CartContext);

  const [address, setAddress] = useState(shippingInfor.address);
  const [city, setCity] = useState(shippingInfor.city);
  const [country, setCountry] = useState(shippingInfor.country);
  const [phoneNo, setPhoneNo] = useState(shippingInfor.phoneNo);

  const [isLoading, setLoading] = useState(false);
  
  const shippingSubmit = (e) => {
    e.preventDefault();
    // Regex Phone Number
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits Long");
      return;
    }

    saveShippingInfo({ address, city, country, phoneNo });
    loadingShow();
    navigate("/confirmOrder", { replace: true });
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
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          {/* Shipping Detail */}
          <h2 className="shippingHeading">Shipping Details</h2>

          {/* Form Shipping */}
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <img src={HomeIcon} alt="s" className="svgImg" />

              {/* Input Address */}
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <img src={LocationCityIcon} alt="s" className="svgImg" />

              {/* Input City */}
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <img src={PhoneIcon} alt="s" className="svgImg" />

              {/* Input Phone Number */}
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <img src={PublicIcon} alt="s" className="svgImg" />

              {/* Input Country */}
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
              
              {/* Submit */}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={country ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
