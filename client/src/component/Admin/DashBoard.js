import React, { useEffect, useContext, useState, useMemo } from "react";
import Sidebar from "./SideBar.js";
import "./dashboard.css";

import { Link } from "react-router-dom";
import { Doughnut, Line,Bar, Radar, Bubble } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { UserContext } from "../../context/user/UserContext";
import { OrderContext } from "../../context/order/OrderContext";
import { ProductContext } from "../../context/product/ProductContext";
import { BannerContext} from '../../context/banner/BannerContext'

import LoadingModel from "../Loading/loading";
import ChartDashbond from "./ChartDashbond.js";
import ChartDashbondFavorite from "./ChartDashbondFavorite.js";

ChartJS.register(...registerables);
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  //Take method from ProductsAdmin by useContext.
  const {
    productState: { productsAdmin },
    getAllProducts,
  } = useContext(ProductContext);


  const {
    bannerState :{bannersAdmin},
    getAllBanners,
  } = useContext(BannerContext)

  //Take method from OrdersAdmin by useContext
  const {
    orderState: { ordersAdmin },
    getAllOrders,

    //Take method from OrderContext with useContext
  } = useContext(OrderContext);

  const {
    userState: { usersAdmin },
    getAllUsers,
  } = useContext(UserContext);

  // this will have the productAdmin.forEach run every re-render, if the list is large, it will impact quite seriously to the performance,
  // const outOfStock = useMemo(() => productsAdmin ? productsAdmin
  //   .reduce((prev, item) => item.stock === 0 ? prev + 1 : prev ) : 0 , 0);

  //Run fisrt method with await 
  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllUsers();
      await getAllOrders();
      await getAllProducts();
      await getAllBanners();  
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  //Create totalAmount get item value price and plus total price -> res {totalAmount}
  let totalAmount = 0;
  ordersAdmin &&
    ordersAdmin.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  //Create lineState   
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };


  //Create doughnutState (button if you want add line)
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4", "#6800G4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [89976, 87655,12123],
        // data: [outOfStock, productsAdmin.length - outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard">

      {/* Location Sidebar left stay */}
      <Sidebar/>
      {/* <LoadingModel show={isLoading} /> */}

      <div className="dashboardContainer">
        <h2>Dashboard</h2>
        <div className="dashboardSummary">

          <div>
            <p>
              Total Amount <br /> {totalAmount} VND
            </p>
          </div>

          <div className="dashboardSummaryBox2">

            {/* Cicle Icon button Product */}
            <Link to="/admin/products">
              <p>Film</p>
              <p>{productsAdmin && productsAdmin.length}</p>
            </Link>

            {/* Cicle Icon button Orders */}
            <Link to="/admin/banners">
              <p>Banner</p>
              <p>{bannersAdmin && bannersAdmin.length}</p>
            </Link>

            {/* Cicle Icon button User */}
            <Link to="/admin/users">
              <p>Users</p>
              <p>{usersAdmin && usersAdmin.length}</p>
            </Link>

          </div>

        </div>
       {/* new */}
      <ChartDashbond title="Thống kê lượt xem" field="CountView" titleRight="Phim có lượt xem cao nhất"/>
      <ChartDashbond title="Thống kê lượt Thích" field="CountLike" titleRight="Phim có lượt Thích cao nhất"/>
      <ChartDashbondFavorite />
          {/* Line of Dashboard */}
          {/* <div className="lineChart">
            <Line data={lineState} />
          </div>
        
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div> */}
   
      </div>
    </div>
  );
};

export default Dashboard;
