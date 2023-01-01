import React from 'react'
import './cssRanking.css'
import ItemRanking from './ItemRanking'
export default function Ranking({data,title,field}) {
  return (
    <div className="containers">
    <div className="sidebar">
      <nav className="ranking">
        <h2 className="ranking-title">{title}</h2>
        <ul className="ranking-list">
        {data && data.map((e,i) =>   <ItemRanking field={field} key={i} item={e} index={i+1}/>)}
        </ul>
      </nav>
    </div>
  </div>
  )
}
