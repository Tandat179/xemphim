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

// import HeroSlide from "../hero-slide/HeroSlide";
function Home() {
  const dispatch = useDispatch()
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
       getProducts().then(res =>  setLoading(false));
       dispatch(removeQueryFetch())
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

      <Category title="Phim Hot" isHot={true} filterCustom={{filterCustom : 'CountView' , value : -1}}/>
      <Category title="Phim 2022" filter={{filter : 'year' , value : 2022}}/>
      <Category title="Phim Premium" filter={{filter : 'ispremium' , value : true}}/>
      <CategoryCate title="Hành động" filter={{filter : 'category' , value : "Hanh Dong"}}/>


      </div>
    </Fragment>
  );
}

export default Home;
