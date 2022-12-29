import React from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import {  setfilter } from '../../redux/pageStore';
import { OutlineButton } from '../button/Button';
import ListMovie from '../movie-list/ListMovie';
import "./home.css";

export default function CategoryCate({title,filter}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className="section__header mb2">
    <h1>{title}</h1>
    <div className="section__header mb2">
   
        <OutlineButton onClick={() => {
          dispatch(setfilter({key : 'category',value : filter.value}))
          navigate("/products")
        }} className="small">View more</OutlineButton>
   
    </div>
    <br></br>
   <ListMovie filter={filter}/>
   

    <div className="section__header mb2"></div>
    <br></br>
  </div>
  )
}
