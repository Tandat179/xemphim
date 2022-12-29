import React, { Fragment, useEffect, useContext, useState } from "react";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

import { BannerContext } from "../../context/banner/BannerContext";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import LoadingModel from "../Loading/loading";

import Sidebar from "./SideBar.js";
import "./ProductList.css";

const BannerList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    bannerState: { bannersAdmin },
    getAllBanners,
    deleteBanner,
  } = useContext(BannerContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/banner/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteBannerHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteBannerHandler = (id) => {
    loadingShow();
    deleteBanner(id);
  };

  const formatterName = ({ images, name }) => {
    return (
      <div>
        <img alt={images[0].images} src={images[0].url} />
        <p>{name}</p>
      </div>
    );
  };

  const columns = [
    { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
    {
      key: "name",
      name: "Name",

      formatter: (name, image) => {
        return formatterName(name.row.name);
      },
    },

    {
      key: "category",
      name: "Category",
    },

    {
      key: "stock",
      name: "Stock",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      key: "price",
      name: "Price",
      minWidth: 200,
      flex: 0.5,
    },

    {
      key: "content",
      name: "Content",
    },

    {
      key: "ispremium",
      name: "Ispremium",
    },

    {
      key: "link_embed",
      name: "Source",
    },

    {
      key: "actions",
      name: "Actions",
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.bannerId);
      },
    },
  ];

  const rows = [];
  let STT = 1;
  bannersAdmin &&
    bannersAdmin.forEach((banner, index) => {
      rows.push({
        stt: STT,
        price: banner.price,
        bannerId: banner._id,
        category: banner.category,
        stock: banner.stock,
        name: { name: banner.name, images: banner.images },
        content: banner.content,
        ispremium: String(banner.ispremium),
        link_embed: banner.link_embed,
      });
      STT++;
      // console.log(banner.ispremium);
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllBanners();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllBanners(keyword) : getAllBanners();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="bannerListHeading">ALL FILM  </h1>
          <form className="searchBox">


            {/* Search banner */}
            <input
              type="text"
              name="keyword"
              placeholder="Search a Banner ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          {/* Return Product List */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={160}
            headerRowHeight={50}
            summaryRowHeight={30}
          />
        </div>
      </div>
      
    </Fragment>
  );
};

export default BannerList;
