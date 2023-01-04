import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import axiosClient from '../../api/axiosClient'
import DataGrid from "react-data-grid";
import Pagination from "react-js-pagination";
import "./Product.css";

export default function TableFavorite() {
    const limit = 5;
    const [page,setPage] = useState(1)
    const fetchAll = async() => {
        const res = await axiosClient.get(`/favorite/fetchTopFavoritePagination?limit=${limit}&page=${page}`)
        return res.data
    }
    const {data,isLoading} = useQuery([`/favorite/fetchTopFavoritePagination?limit=${limit}&page=${page}`],fetchAll)
    console.log(data);
    const columns = [
        // { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
        {
          key: "name",
          name: "Name",
        },
        {
          key: "image",
          name: "Image",
          formatter: (image) =>  <img src={image.row.image} alt="sd" />,
          
          flex: 1,
        },
        {
          key: "count",
          name: "Count",
        },
        
      ];
        const rows = data && data.listSlice.map((item, index) => ({
            // stt: index + 1,
            name: item.product.name,
            image: item.product.images[0].url,
            count : item.count
          }));
          const setCurrentPageNo = (e) => {
            setPage(e);
          };
  return (
    <>
    {rows &&  <DataGrid
        rows={rows}
        columns={columns}
        pageSize={limit}
        disableSelectionOnClick
        className="myOrdersTable"
        autoHeight
        headerRowHeight={35}
        rowHeight={80}
      />}
       <div style={{background : 'black'}}>
       <Pagination
              activePage={page}
              itemsCountPerPage={limit}
              totalItemsCount={data && data.count}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
       </div>
      </>
  )
}
