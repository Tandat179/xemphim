import React, { useState, useContext, useEffect, useCallback } from "react";
import Pagination from "react-js-pagination";

import { ProductContext } from "../../context/product/ProductContext";
import LoadingModal from "../Loading/loading";
import ProductCard from "../Home/ProductCard";
import Button from "../button/Button";
import Slider from "rc-slider";

import "./Products.css";
import "rc-slider/assets/index.css";
import "./Search.css";
import ItemListCategory from "./ItemListCategory";
import ListCategory from "./ListCategory";
import { removeVietnameseTones } from "../../consts/convertName";
import { newCategorys } from "../../consts/category";
import { useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const { createSliderWithTooltip } = Slider;


const Range = createSliderWithTooltip(Slider.Range);



function ProductsSpecial() {
  const [keyword, setKeyword] = useState("");
let body

  const fetchListFilter = async() => {
    const res = await axiosClient.get(`/view/filterCustome`)
    return res.data
  }
  const {data,isLoading} = useQuery(["hot"],fetchListFilter)
  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    body = (
      <>
        <h2 className="productsHeading">PHIM HOT</h2>
        <form className="searchBox">
          {/* Input Search Items */}
          <input
            type="text"
            name="keyword"
            placeholder="Search a Film name..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          {/* Submit Search */}
          <Button type="submit" value="Search">
            Search
          </Button>
        </form>

        {/* Render Product */}
        <div className="products">
          {data &&
            data.products.map((product) => (
              <ProductCard key={product._id} product={product.product} />
            ))}
        </div>


      </>
    );
  }
  return <>{body}</>;
}

export default ProductsSpecial;
