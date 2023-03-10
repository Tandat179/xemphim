import React, { Fragment } from "react";
import { Stepper, Step } from "react-form-stepper";

import LocalShippingIcon from "../../assets/truck.svg";
import LibraryAddCheckIcon from "../../assets/card-heading.svg";
import AccountBalanceIcon from "../../assets/bank.svg";

import "./CheckoutSteps.css";
const CheckoutSteps = ({ activeStep }) => {

  //Steps have Object...
  const steps = [
    // Shipping
    {
      label: <h2>Shipping Details</h2>,
      icon: <img src={LocalShippingIcon} alt="s" className="svgImg" />,
    },

    // Confirm 
    {
      label: <h2>Confirm Order</h2>,
      icon: <img src={LibraryAddCheckIcon} alt="s" className="svgImg" />,
    },

    // Success
    {
      label: <h2>Success</h2>,
      icon: <img src={AccountBalanceIcon} alt="s" className="svgImg" />,
    },
  ];

  const stepStyles = {
    paddingTop: "5rem",
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            // completed={activeStep >= index ? true : false}
            label={item.label}
          >
            {item.icon}
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
