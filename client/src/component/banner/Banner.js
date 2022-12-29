import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import "../Home/movie-card.scss";
import "../../component/banner/banner.scss";
import "@splidejs/react-splide/css";
import { BannerContext } from "../../context/banner/BannerContext";

export function Banner({}) {
  SwiperCore.use([Autoplay]);
  const {
    bannerState: { banners },
    getBanners,
  } = useContext(BannerContext);
  const [isLoading, setLoading] = useState(true);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
       getBanners().then(res => setLoading(false));
  }, []);

  // useEffect(() => {
  //   const getFilm = async () => {
  //     const params = { page: 1 };
  //     try {
  //       const response = await getBanners(banners);
  //       setMovieItems(response.results.slice(1, 9));
  //       console.log("response");
  //       console.log(response);
  //     } catch {
  //       console.log("error");
  //     }
  //   };
  //   getFilm();
  // }, []);

  const renderItem = () => {
    return banners.map((values, index) => {
      return (
        
          <SplideSlide key={index} className="hero-slide">
            {/* <Link to={`/banner/${values._id}`}> */}
            <div
              className={`hero-slide__item active  `}
              style={{ backgroundImage: `url(${values.poster_url}) ` }}
              key={values._id}
            >
              <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                  <h2 className="title">{values.name}</h2>
                  <div className="overview">{values.content}</div>
                </div>

                <div className="hero-slide__item__content__poster">
                  <img src={values.thumb_url} alt="" />
                </div>
              </div>
            </div>
            {/* </Link> */}
          </SplideSlide>
        
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
