import React from "react";
import "./home.css";

const Banner = ({ banner }) => {
//   const options = {
//     value: Number(product.ratings),
//     precision: 0.5,
//     isHalf: true,
//     edit: false,
//     size: 18,
//   };
  return (
        <>
                <img src={banner.images[0].url} alt={banner.name} />
                <p>{banner.name}</p>
                <p>{banner.descriptioncard}</p>
        </>
  );
};

export default Banner;
