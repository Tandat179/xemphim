import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addQueryFetch } from '../../redux/pageStore';
import { OutlineButton } from '../button/Button';
import ListMovie from '../movie-list/ListMovie';
import ListMovieCustom from '../movie-list/ListMovieCustom';
import "./home.css";


export default function Category({title,filter,filterCustom,isHot}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className="section__header mb2">
    <h1>{title}</h1>
    <div className="section__header mb2">
     {filter ?  
        <OutlineButton onClick={() => {
          dispatch(addQueryFetch(`&${filter.filter}=${filter.value}`))
          navigate("/products")
        }} className="small">View more</OutlineButton>
       : isHot ?
      <Link to="/productsSpecial">
        <OutlineButton className="small">View more</OutlineButton>
      </Link>
         : null
     }
    </div>
    <br></br>
    {filter && <ListMovie filter={filter}/>}
   {filterCustom && <ListMovieCustom filterCustom={filterCustom}/>}
    <div className="section__header mb2"></div>
    <br></br>
  </div>
  )
}
