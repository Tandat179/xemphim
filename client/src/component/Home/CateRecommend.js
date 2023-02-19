import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import axiosClient from '../../api/axiosClient';
import { AuthContext } from '../../context/auth/AuthContext';
import Button from '../button/Button';
import "./home.css";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
export default function CateRecommend() {
    const [perPage,setPerPage] = useState(6)

    useEffect(() => {
      function handleResize() {
        const {width} = getWindowDimensions()
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
  const {
    authState: { user },
  } = useContext(AuthContext);
  const fetchListMoviceRecomment= async() => {
    const res = await axiosClient.get(`/product/recommendation/${user._id}`)
    return res.data
  }
  const {data,isLoading} = useQuery(["filterRecomment"],fetchListMoviceRecomment)

  return (
    <div className="section__header mb2">
    <h1>Đề xuất cho bạn</h1>
    {/* <div className="section__header mb2">

        <OutlineButton onClick={() => {
        //   dispatch(addQueryFetch(`&${filter.filter}=${filter.value}`))
        //   navigate("/products")
        console.log("ok")
        }} className="small">View more</OutlineButton>
    
    </div> */}
    <br></br>
    <Splide
      options={{ // code nay đúng k

        rewind: false,
        gap: "1rem",
        perPage: perPage,
        perMove: 1,
      }}
      aria-label="My Favorite Images"
    >
     {isLoading ? <div>...Loading</div> : data?.predicted_product.map((values, index) => 
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

     
    <div className="section__header mb2"></div>
    <br></br>
  </div>
  )
}