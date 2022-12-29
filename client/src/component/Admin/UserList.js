import React, { Fragment, useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar.js";

import DataGrid from "react-data-grid";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import Badge from "react-bootstrap/Badge";
import LoadingModel from "../Loading/loading";

const UserList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  
  const {
    userState: { usersAdmin },
    getAllUsers,
    deleteUser,
  } = useContext(UserContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/user/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteProductHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const formatterRole = (value) => {
    return <Badge bg={value === "user" ? "success" : "danger"}>{value}</Badge>;
  };

  const formatterRank = (value) => {
    return (
      <Badge bg={value === "nomarl" ? "success" : "warning"}>{value}</Badge>
    );
  };
  const deleteProductHandler = (id) => {
    console.log(id);
    loadingShow();
    deleteUser(id);
  };

  const columns = [
    { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
    { key: "id", name: "User ID", minWidth: 300, flex: 1 },

    {
      key: "email",
      name: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      key: "name",
      name: "Name",
      minWidth: 150,
      flex: 0.3,
    },

    {
      key: "role",
      name: "Role",
      minWidth: 270,
      flex: 0.5,
      formatter: (value) => {
        return formatterRole(value.row.role);
      },
    },

    {
      key: "rank",
      name: "Rank",
      minWidth: 270,
      flex: 0.5,
      formatter: (value) => {
        return formatterRank(value.row.rank);
      },
    },

    {
      key: "actions",
      flex: 0.3,
      name: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.id);
      },
    },
  ];
  const rows = [];
  let STT = 1;
  usersAdmin &&
    usersAdmin.forEach((values) => {
      rows.push({
        stt: STT,
        id: values._id,
        role: values.role,
        email: values.email,
        name: values.name,
        rank: values.rank,
      });
      STT++;
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllUsers();
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
      
    </Fragment>
  );
};

export default UserList;
