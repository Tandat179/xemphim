import React, { useState } from 'react'
// import PropTypes from "prop-types";
import './movie-list.scss'
import { useEffect } from 'react'
// import tmdbApi, { category } from "api/tmdbApi";
import { Swiper, SwiperSlide } from 'swiper/react'
// import apiConfig from "api/apiConfig";
import MovieCard from 'components/movie-card/MovieCard'
function MovieList(product) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if (product.type !== 'similar') {
        switch (product.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(product.type, { params })
            break

          default:
            response = await tmdbApi.getTvList(product.type, { params })
        }
      } else {
        response = await tmdbApi.similar(product.category, product.id)
      }
      setItems(response.results)
    }
    getList()
  }, [])
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={product.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

// MovieList.propTypes = {
//   category: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
// };

export default MovieList
