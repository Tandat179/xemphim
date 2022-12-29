import apiConfig from "api/apiConfig";
import { category } from "api/tmdbApi";
import Button from "components/button/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./movie-card.scss";
function MovieCard(props) {

  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Imgage(item.poster_path || item.backdrop_path);


  return (

    <Link  to={`/product/${product._id}`}>
        
      <div className="movie-card" style={{ backgroundImage: `url(${product.images[0].url})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      {/* <h3>{item.title || item.name}</h3> */}
    </Link>
  );
}

export default MovieCard;





















//
// import React from "react";
// import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
// import "./home.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "./movie-card.scss";

// const ProductCard = ({ product }) => {
//   const options = {
//     value: Number(product.ratings),
//     precision: 0.5,
//     isHalf: true,
//     edit: false,
    // size: 18,
  // };
  // return (
    // Link to Product by Id
    // <>    
    {/* <Link to={`/product/${product._id}`}> */}
 {/*  */}
 
      {/* <div className="movie-card" style={{ backgroundImage: `url(${product.images[0].url})` }}> */}
        {/* <Button>
          <i className="bx bx-play"></i>
        </Button> */}
      {/* </div> */}



      {/* <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.descriptioncard}</p> */}
      {/* <span>{`${product.price} VNĐ`}</span> */}
    {/* </Link> */}
    
    
    
    
    {/* </> */}

  // );
// };

// export default ProductCard;





