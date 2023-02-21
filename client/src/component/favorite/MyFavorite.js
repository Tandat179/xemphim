import React, { Fragment, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { FavoriteContext } from "../../context/favorite/FavoriteContext";
import "./MyFavorite.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import DataGrid from "react-data-grid";
import LaunchIcon from "../../assets/grid-3x3-gap.svg";
import axiosClient from "../../api/axiosClient";
import toast, { Toaster } from 'react-hot-toast';

const MyFavorites = () => {
  const {
    authState: { user },
    loadUser,

  } = useContext(AuthContext);

  const {
    favoriteState: { favorites },
    getMyFavorites,
    deleteMyFavorite,
  } = useContext(FavoriteContext);
  
  console.log(favorites);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const deleteFavoriteHandler = async(id) => {
    // loadingShow();
    const newItem = favorites[0]?.favoriteItems?.filter((item) => item._id!== id);
    const newFavorite = {...favorites[0],favoriteItems : newItem}
   const res = await axiosClient.post(`/favorite/delete`,newFavorite)
   getMyFavorites()
   toast.error("Xoá thành công")
  };
  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/product/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteFavoriteHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };
  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };


 
  ;
  const columns = [
    { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
    {
      key: "name",
      name: "Name",
    },

    {
      key: "image",
      name: "Image",
      formatter: (image) =>  <img src={image.row.image} alt="sd" />,
      minWidth: 120,
      
      flex: 1,
    },
    {
      key: "actions",
      name: "Actions",
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.favoriteId);
      },
    },
  ];
    const rows = favorites[0] && favorites[0].favoriteItems.map((item, index) => ({
        stt: index + 1,
        name: item.name,
        image: item.image,
        favoriteId: item._id,

      }));
  useEffect(() => {
    getMyFavorites();
  }, [loadUser]);

  return (
    <Fragment>
    <Toaster/>
      <div className="myOrdersPage">
        <h2 id="myOrdersHeading">{user.name}'s Favorites</h2>
       {rows &&  <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
          headerRowHeight={35}
          rowHeight={200}
        />}
      </div>
    </Fragment>
  );
};

export default MyFavorites;
