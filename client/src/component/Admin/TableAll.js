import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import axiosClient from '../../api/axiosClient'
import DataGrid from "react-data-grid";
import Pagination from "react-js-pagination";
import "./Product.css";

export default function TableAll({field}) {
    const limit = 5;
    const [page,setPage] = useState(1)
    const fetchAll = async() => {
        const res = await axiosClient.get(`/view/getTopProductPagination?limit=${limit}&page=${page}&field=${field}`)
        return res.data
    }
    const {data,isLoading} = useQuery([page],fetchAll)
    const columns = [
        // { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
        {
          key: "name",
          name: "Name",
        },
        {
          key: "image",
          name: "Image",
          formatter: (image) =>  <img style={{objectFit : 'cover' ,height : '100%',width : '20%'}} src={image.row.image} alt="sd" />,
          minHeight: 550,
          minWidth: 120, flex: 0.1
        },
        {
          key: "count",
          name: "Count",
        },
        
      ];
        const rows = data && data.products.map((item, index) => ({
            // stt: index + 1,
            name: item.product.name,
            image: item.product.images[0].url,
            count : item[field]
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
        rowHeight={110}
      />}
       <div style={{background : 'black'}}>
       {data && <Pagination
              activePage={page}
              itemsCountPerPage={limit}
              totalItemsCount={data.count}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />}
       </div>
      </>
  )
}
