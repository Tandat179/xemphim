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

const { createSliderWithTooltip } = Slider;

// Same filter (Lọc Sản Phẩm)
const Range = createSliderWithTooltip(Slider.Range);

// Category

function Products() {
  const [isLoading, setLoading] = useState(true);
  // Default current page
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");
  let body;
  const {
    productState: {
      products,
      productsCount,
      resultPerPage,
      filterCountProducts,
    },
    getProducts,
  } = useContext(ProductContext);

  let count = filterCountProducts;
  const fetch = useCallback(async () => {
    // Get product about CurrentPage, Price, Category, Rating, Keyword
    await getProducts(currentPage, price, category, ratings, keyword);
    setLoading(false);
  },[currentPage, price, category, ratings, keyword])
  useEffect(() => {
    fetch()
  }, [fetch]);
  // Dependencies

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    body = (
      <>
        <h2 className="productsHeading">Products</h2>
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
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <br></br>
          <div>CATEGORIES</div>

             
              <ListCategory  category={category} categories={newCategorys} setCategory={(cate) => {
                  if (cate.value === "All") {
                    setCategory("");
                  } else {
                    category === "" ? setCategory(cate.value) : setCategory(`${category}|${cate.value}`)
                  }
                  setLoading(true);
                }}/>
        


          {/* Rating Star Filter */}
          <b>RATINGS ABOVE</b>
          <Slider
            defaultValue={ratings}
            onChange={(newRating) => {
              setRatings(newRating);
              setLoading(true);
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
        {resultPerPage < count && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
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
      </>
    );
  }
  return <>{body}</>;
}

export default Products;
