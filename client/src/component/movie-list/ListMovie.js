import React, { Fragment, useContext, useEffect, useState } from "react";
import {v4} from 'uuid'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Pagination } from "swiper";
import "@splidejs/react-splide/css";
import "../Home/movie-card.scss";
import Button from "../button/Button";
import { ProductContext } from "../../context/product/ProductContext";
import Play from "../../assets/play.png";
import axiosClient from '../../api/axiosClient'
import { useQuery } from "@tanstack/react-query";
function ListMovie({filter}) {
  const fetchListMoviceFilter = async() => {
    const res = await axiosClient.get(`/product/filter?${filter.filter}=${filter.value}`)
    return res.data
  }
  const {data,isLoading} = useQuery([filter],fetchListMoviceFilter)

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
            <Link to={`/product/${values._id}`}>
              <div
                className="movie-card"
                style={{ backgroundImage: `url(${values.thumb_url})` }}
                // style={{ backgroundImage: `url(${values.images[0].url})` }}

              >
                <Button></Button>
              </div>
              <div className="card-title">
                <h3>{values.name}</h3>
              </div>
            </Link>
          </SplideSlide>
    )}
    </Splide>
  );
}
export default ListMovie;
