import React, { Fragment, useContext, useEffect, useState } from "react";
import mouse from "../../assets/mouse.svg";
import "./home.css";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../context/product/ProductContext";
import LoadingModal from "../Loading/loading";
import ListMovie from "../movie-list/ListMovie";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../component/button/Button";
import { Banner } from "../banner/Banner.js";
import "../../component/banner/banner.scss";
import Category from "./Category";
import { useDispatch } from "react-redux";
import { removeQueryFetch } from "../../redux/pageStore";
import CategoryCate from "./CategoryCate";
import { AuthContext } from "../../context/auth/AuthContext";
import CateRecommend from "./CateRecommend";

import CategoryMultiFilter from "./CategoryMultiFilter";

// import HeroSlide from "../hero-slide/HeroSlide";
function Home() {
  const dispatch = useDispatch();
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  const {
    authState: { isAuthenticated, user },
    loadUser,
  } = useContext(AuthContext);

  useEffect(() => {
    getProducts().then((res) => setLoading(false));
    dispatch(removeQueryFetch());
  }, []);

  return (
    <Fragment>
      {isLoading && <LoadingModal show={isLoading} />}

      <div className="hero-slide">
        <Banner />
        {/* <p>Welcome to Tyllow</p>
        <h1>FIND AMAZING Film BELOW</h1>

        <a href="#container">
          <button>
            Scroll <img src={mouse} alt="mouse"></img>
          </button>
        </a> */}
      </div>

      <br></br>

      <div className="container" id="container">
        {/* <p>{user._id}</p> */}
        <CateRecommend />
        <Category
          title="Phim Hot"
          isHot={true}
          filterCustom={{ filterCustom: "CountView", value: -1 }}
        />
        <Category title="Phim 2022" filter={{ filter: "year", value: 2022 }} />
        <Category
          title="Phim Premium"
          filter={{ filter: "ispremium", value: true }}
        ></Category>
        <Category
          title="Phim Miễn Phí"
          filter={{ filter: "ispremium", value: false }}
        />
        Test
        <CategoryMultiFilter
          title="Phim Hmulti"
          filter={[
            { filter: "approve", value: true },
            { filter: "userFilm", value: true },
          ]}
        />
      </div>
    </Fragment>
  );
}

export default Home;
