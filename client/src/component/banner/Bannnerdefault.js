import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import "../Home/movie-card.scss";
import "../../component/banner/banner.scss";
import "@splidejs/react-splide/css";
import { ProductContext } from "../../context/product/ProductContext";

export function Banner({}) {
  SwiperCore.use([Autoplay]);
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getProducts();

      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = () => {
    return products.map((values, index) => {
      return (
        <>
          <SplideSlide  className="hero-slide">
            {/* <Link to={`/product/${values._id}`}> */}
              <div
                 className={`hero-slide__item ${products.className}`}
                style={{ backgroundImage: `url(${values.poster_url}) ` }}
                key={values._id}
              >
                {/* <div className="hero-slide__item__content container">
                <img src={values.thumb_url} alt="" />
                  <div className="hero-slide__item__content__poster">
                    
                  </div>
                </div> */}

              </div>
            {/* </Link> */}
          </SplideSlide>
        </>
      );
    });
  };

  return (
    <Splide
      options={{
        autoplay: true,
        delay: 1500,
        rewind: false,
        gap: "1rem",
        perPage: 1,
        perMove: 1,
      }}
      aria-label="My Favorite Images"
    >
      {renderItem()}
    </Splide>
  );
}
