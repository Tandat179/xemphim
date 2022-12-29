import React, { useEffect, useState } from 'react'
import ItemListCategory from './ItemListCategory';
import "./Products.css";
import {v4} from 'uuid'
import { newCategorys } from '../../consts/category';
import { useSelector } from 'react-redux';
 function ListCategory({setCategory}) {
const [listActive,setListActive] = useState([])
const category = useSelector(state => state.PageStore.category)
    return (
    <ul className="categoryBox">
            {newCategorys.map((cate,i) => (
              <ItemListCategory key={v4()} isActive={listActive.some(e => e===i) || category === cate.value} disableActive={() => setListActive(listActive.filter(e => e !== i))}  setListActive = {() => setListActive([...listActive,i])} setCategory={() => setCategory(cate)} cate={cate}/>
            ))}
          </ul>
  )
}
export default ListCategory