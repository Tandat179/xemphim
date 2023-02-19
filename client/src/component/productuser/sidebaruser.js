import React from "react";
import { Link } from "react-router-dom";

import "../../component/Admin/SideBar.css";



import PostAddIcon from "../../assets/basket.svg";
import AddIcon from "../../assets/plus.svg";
import ListAltIcon from "../../assets/list-ul.svg";
import DashboardIcon from "../../assets/kanban.svg";
import PeopleIcon from "../../assets/person-circle.svg";
import RateReviewIcon from "../../assets/chat-square-text.svg";
import AccountTreeIcon from "../../assets/bezier2.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <img src={DashboardIcon} alt="Ecommerce" className="svgIMG" />
         Tạo Phim/Video
        </p>
      </Link>

      <p className="treeHeading">Product</p>
      <ul>
      

        <li>
          <Link to="/admin/banners">
            <p>
              <img src={PostAddIcon} alt="Ecommerce" className="svgIMG" />
             Phim của tôi
            </p>
          </Link>
        </li>

     
        <li>
          <Link to="/admin/products/new">
            <p>
              <img src={AddIcon} alt="Ecommerce" className="svgIMG" />
              Danh sách yêu thích
            </p>
          </Link>
        </li>

        <li>
          <Link to="/admin/banners/new">
            <p>
              <img src={AddIcon} alt="Ecommerce" className="svgIMG" />
              Chỉnh sửa cá nhân
            </p>
          </Link>
        </li>
      </ul>

      <Link to="/admin/orders">
        <p>
          <img src={ListAltIcon} alt="Ecommerce" className="svgIMG" />
          OrdersUser
        </p>
      </Link>

        {/* <Link to="/admin/users">
          <p>
            <img src={PeopleIcon} alt="Ecommerce" className="svgIMG" />
            UsersUser
          </p>
        </Link> */}

      <Link to="/admin/produsersad">
        <p>
          <img src={RateReviewIcon} alt="Ecommerce" className="svgIMG" />
          Film of UserUser
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <img src={RateReviewIcon} alt="Ecommerce" className="svgIMG" />
          ReviewsUser
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
