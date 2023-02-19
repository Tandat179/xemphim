import React, { Fragment, useEffect, useContext, useState } from "react";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

import { ProduserContext } from "../../context/produser/ProduserContext";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import LoadingModel from "../Loading/loading";
import Sidebar from "../../component/Admin/SideBar";
import deleteProduser from "../../context/produser/ProduserProvider";

// import Sidebar from "./SideBar.js";
import "./ProductList.css";

const ProduserUserListad = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    produserState: { produsers },
    getAllProdusersad,
    deleteProduser,
  } = useContext(ProduserContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 100);
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/produsersad/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteProduserHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteProduserHandler = (id) => {
    loadingShow();
    console.log("============================", id);
    deleteProduser(id);
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
      key: "produserId",
      name: "produserId",
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
      key: "approve",
      name: "Approve",
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
        return formatterActions(value.row.produserId);
      },
    },
  ];

  const rows = [];
  let STT = 1;
  produsers &&
    produsers.forEach((produser, index) => {
      rows.push({
        stt: STT,
        produserId: produser._id,
        category: produser.category,
        stock: produser.stock,
        name: { name: produser.name, images: produser.images },
        content: produser.content,
        ispremium: String(produser.ispremium),
        approve: String(produser.approve),

        link_embed: produser.link_embed,
      });
      STT++;
      // console.log(produser.ispremium);
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllProdusersad();
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllProdusersad(keyword) : getAllProdusersad();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Product User78776 List (Admin) </h1>
          <form className="searchBox">
            <input
              type="text"
              name="keyword"
              placeholder="Search a produser ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>

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

export default ProduserUserListad;
