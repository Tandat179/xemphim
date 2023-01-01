import React from 'react'
import { Link } from 'react-router-dom'
import './cssRanking.css'

export default function ItemRanking({item,index,field}) {
  const {product} = item


  return (
    <Link to={`/product/${item.product._id}`}>
        <li className="ranking-item">
            <a href="#" className="ranking-card">
              <figure className="ranking-image">
                <img src={product.images[0].url} alt="" className="ranking-thumbnail" />
               
                <span className="ranking-badge">{index}</span>
              </figure>
              <div className="ranking-card-info">
                <div className="ranking-shop-name">Số lượng : {field === "count" ? item.count : item[field]}</div>
                <p className="ranking-description">
                  {product.name}
                </p>
              </div>
            </a>
          </li>
     </Link>
  )
}
