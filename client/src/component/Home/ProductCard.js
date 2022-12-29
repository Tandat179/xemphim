import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./movie-card.scss";
import Button from "../../component/button/Button";
import "../Home/movie-card.scss";
const ProductCard = ({ product }) => {
  const options = {
    value: Number(product.ratings),
    precision: 0.5,
    isHalf: true,
    edit: false,
    size: 18,
  };
  // console.log(product.ispremium);
  return (
    <>
      <Link className="productCard" to={`/product/${product._id}`}>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${product.images[0].url})` }}
        >
          <Button>
            <i className="bx bx-play"></i>
          </Button>
          <p>{product.descriptioncard}</p>
          <p>{product.ispremium}</p>
        </div>
        {/* <img src={product.images[0].url} alt={product.name} /> */ }
        {/* <p>{product.name}</p>
  
      <span>{`${product.price} VNĐ`}</span> */}

        <div className="card-title">
          <h3>{product.name}</h3>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;

//   <Link className="productCard" to={`/product/${product._id}`}>
//   <img src={product.images[0].url} alt={product.name} />
//   <p>{product.name}</p>
//   <div>
//     <ReactStars {...options} />{" "}
//     <span className="productCardSpan">
//       {" "}
//       ({product.numOfReviews} Reviews)
//     </span>
//   </div>
//   <span>{`${product.price} VNĐ`}</span>
// </Link>
