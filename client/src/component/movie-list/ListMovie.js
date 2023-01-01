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

import { FaPlay } from 'react-icons/fa';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function ListMovie({filter}) {
  const [perPage,setPerPage] = useState(6)

  useEffect(() => {
    function handleResize() {
      const {width} = getWindowDimensions()
      console.log(width);
      if(width <= 1024){
        setPerPage(3)
      }
      else{
        setPerPage(6)
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
        perPage: perPage,
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
           { values.ispremium &&   <img style={{position : 'absolute' , width  :'150px' , top : -20}} src="https://d28wu8o6itv89t.cloudfront.net/images/achatpremiumnomdedomainepointp-1539465350573.png" alt="p"/>}
                <Button><FaPlay/></Button>
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
