import React, { Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { FavoriteContext } from "../../context/favorite/FavoriteContext";
import "./MyFavorite.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import DataGrid from "react-data-grid";
import LaunchIcon from "../../assets/grid-3x3-gap.svg";

const MyFavorites = () => {
  const {
    authState: { user },
    loadUser,
  } = useContext(AuthContext);
  // console.log("Hello");

  const {
    favoriteState: { favorites },
    getMyFavorites,
  } = useContext(FavoriteContext);
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
  ];
    const rows = favorites[0] && favorites[0].favoriteItems.map((item, index) => ({
        stt: index + 1,
        name: item.name,
        image: item.image,
      }));
    console.log(rows);
  useEffect(() => {
    getMyFavorites();
  }, [loadUser]);

  return (
    <Fragment>
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
