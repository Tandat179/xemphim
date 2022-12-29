import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setfilter } from '../../redux/pageStore';

import "./Products.css";
function ItemListCategory({cate,setCategory,isActive,setListActive,disableActive}) {
const category = useSelector(state => state.PageStore.category)
const dispatch = useDispatch()
const UndoCategoy = () => {
  if(category.includes("|")){
    const newCategory = category.replace(`|${cate.value}`,'')
    dispatch(setfilter({key : 'category',value : newCategory}))
  }
  else{
    dispatch(setfilter({key : 'category',value : ''}))
  }
}
  return (
    <li style={{color : isActive ? "rgb(255, 38, 0)" : 'rgba(255, 255, 255, 0.61)'}}
                className="category-link"
                
                onClick={() => {
                  if(isActive){
                    disableActive()
                    UndoCategoy()
                  }
                  else{
                  setListActive()
                    setCategory();
                  }
                    
                }}
              >
                {cate.label}
              </li>
  )
}
export default ItemListCategory