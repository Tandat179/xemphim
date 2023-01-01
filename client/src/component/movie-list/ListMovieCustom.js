import React, { Fragment, useContext, useEffect, useState } from "react";
import {v4} from 'uuid'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Pagination } from "swiper";
import "@splidejs/react-splide/css";
import "../Home/movie-card.scss";
import Button from "../button/Button";
import axiosClient from '../../api/axiosClient'
import { useQuery } from "@tanstack/react-query";
function ListMovieCustom({filterCustome}) {
  const fetchListMoviceFilter = async() => {
    const res = await axiosClient.get(`/view/filterCustome`)
    return res.data
  }
  const {data,isLoading} = useQuery([filterCustome],fetchListMoviceFilter)
  return (
    <Splide
      options={{
        rewind: false,
        gap: "1rem",
        perPage: 6,
        perMove: 1,
      }}
      aria-label="My Favorite Images"
    >
     {isLoading ? <div>...Loading</div> : data?.products.map((values, index) => 
       <SplideSlide key={v4()} >
            <Link to={`/product/${values.product._id}`}>
              <div
                className="movie-card"
                style={{ backgroundImage: `url(${values.product.thumb_url})` }}
                // style={{ backgroundImage: `url(${values.product.images[0].url})` }}

              >
               { values.product.ispremium &&   <img style={{position : 'absolute' , width  :'150px' , top : -20}} src="https://d28wu8o6itv89t.cloudfront.net/images/achatpremiumnomdedomainepointp-1539465350573.png" alt="p"/>}
                <Button></Button>
              </div>
              <div className="card-title">
                <h3>{values.product.name}</h3>
              </div>
            </Link>
          </SplideSlide>
    )}
    </Splide>
  );
}
export default ListMovieCustom;
