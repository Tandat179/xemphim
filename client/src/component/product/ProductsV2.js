import React, { useState, useCallback } from "react";
import Pagination from "react-js-pagination";

import LoadingModal from "../Loading/loading";
import ProductCard from "../Home/ProductCard";
import Button from "../button/Button";
import Slider from "rc-slider";

import "./Products.css";
import "rc-slider/assets/index.css";
import "./Search.css";
import ListCategory from "./ListCategory";
import axiosClient from "../../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setfilter } from "../../redux/pageStore";

// const { createSliderWithTooltip } = Slider;

// const Range = createSliderWithTooltip(Slider.Range);


function ProductsV2() {
    const dispatch = useDispatch()
    const limit = 5
    const [keySearch,setKeySearch] = useState("")
  const {keyword,category,price,ratings,currentPage,queryFetch} = useSelector(state => state.PageStore)
  let link = `/product?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}&category=${category}&limit=${limit}${queryFetch}`;
const fetchApi = useCallback(async() => {
    const res = await axiosClient.get(link)
    return res.data
  },[useSelector(state => state.PageStore)])
const {data,isLoading} = useQuery([link],fetchApi)
console.log(data);
const setCurrentPageNo = (e) => {
    dispatch(setfilter({key : "currentPage",value : e}))
  };
  return( <>
  {isLoading && <LoadingModal show={isLoading} />}
  <h2 className="productsHeading">Products</h2>
  <form onSubmit={(e) => {
    e.preventDefault();
    dispatch(setfilter({key : "keyword" , value : keySearch}))
    dispatch(setfilter({key : "currentPage" , value : 1}))
  }} className="searchBox">
    {/* Input Search Items */}
    <input
      type="text"
      name="keyword"
      value={keySearch}
      placeholder="Search a Film name..."
      onChange={(e) => setKeySearch(e.target.value)}
    />

    {/* Submit Search */}
    <Button  type="submit" value="Search">
      Search
    </Button>
  </form>

  {/* Render Product */}
  <div className="products">
    {data &&
      data.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      ok
  </div>

  <div className="filterBox">
    <div>CATEGORIES</div>
        <ListCategory  category={category}  setCategory={(cate) => {
            if (cate.value === "All") {
             dispatch(setfilter({key : "category" , value : ""}))
            } else {
              category === "" ? dispatch(setfilter({key : "category" , value : cate.value})) : dispatch(setfilter({key : "category" , value : `${category}|${cate.value}`}))
            }
          }}/>
  


    {/* Rating Star Filter */}
    <b>RATINGS ABOVE</b>
    <Slider
      defaultValue={ratings}
      onChange={(newRating) => {
          dispatch(setfilter({key : "ratings", value  : newRating}))
      }}
      value={ratings}
      min={0}
      max={5}
      step={1}
      marks={{
        0: `0☆`,
        1: `1☆`,
        2: `2☆`,
        4: `4☆`,
        3: `3☆`,
        5: `5☆`,
      }}
    />
  </div>

  {/* Pagination (Phân trang) */}
  {data && (
    <div className="paginationBox">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={limit}
        totalItemsCount={data.filterCountProducts}
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
  )}
</>)
}

export default ProductsV2;
