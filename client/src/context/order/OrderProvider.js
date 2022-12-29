import { OrderContext } from "./OrderContext";
import { useReducer } from "react";
import { orderInit, orderReducer } from "./reducer/orderReducer";
import axios from "axios";
import {
  addNewOrder,
  addNewOrderFail,
  getMyOrdersSuccess,
  getMyOrdersFail,
  getOneOrderSuccess,
  getAllOrdersSuccess,
  getAllOrdersFail,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderSuccess,
  updateOrderFail,
} from "./reducer/orderAction";
import setAuthToken from "../../utils/setAuthToken";

function OrderProvider({ children }) {
  const [orderState, dispatch] = useReducer(orderReducer, orderInit);


  // Create New Order await Authencation
  const createOrder = async (formOrder) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // USER
      // if Good Post Server new Order
      const response = await axios.post(
        "http://localhost:4000/order/new",
        formOrder,
        config
      );
        //Success
      if (response.data.success) {
        dispatch(addNewOrder(response.data.order));
      }
    } catch (error) {
      dispatch(addNewOrderFail(error.response.data.message));
    }
  };


       // Get User Order
  const getMyOrders = async () => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      // Get My Order User
      const response = await axios.get("http://localhost:4000/order/myOrders");
      if (response.data.success) {
        //Response of Server
        dispatch(getMyOrdersSuccess(response.data.orders));
      }
    } catch (error) {
      dispatch(getMyOrdersFail(error.response.data.message));
    }
  };

  // Get One Item Order Process
  const getOneOrder = async (orderId) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/order/me/${orderId}`
      );

      if (response.data.success) {
        dispatch(getOneOrderSuccess(response.data.order));
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  //ADMIN

    // Get all Order
  const getAllOrders = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    let link;
    link = "http://localhost:4000/order/admin";

    // Get order of Someone User
    if (keyword) {
      link = `http://localhost:4000/order/admin?username=${keyword}`;
    }
    try {
      //Await
      const response = await axios.get(link);

      if (response.data.success)
        dispatch(getAllOrdersSuccess(response.data.orders));
    } catch (error) {
      dispatch(getAllOrdersFail(error.response.data.message));
    }
  };

  //Delete Order
  const deleteOrder = async (id) => {
    //Check Token
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      //Delete Order with id of Administrator Powers
      const response = await axios.delete(
        `http://localhost:4000/order/admin/delete/${id}`
      );

      if (response.data.success) dispatch(deleteOrderSuccess(id));
    } catch (error) {
      dispatch(deleteOrderFail(error.response.data.message));
    }
  };
  
  //Update Order
  const updateOrder = async (idOrder, formStatus) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //Update  Process Order with axios PUT of Admin
      const response = await axios.put(
        `http://localhost:4000/order/admin/updateStatus/${idOrder}`,
        formStatus,
        config
      );
      if (response.data.success) {
        //After success of fail Server respone payload data
        dispatch(updateOrderSuccess({ idOrder, formStatus }));
      }
    } catch (error) {
      dispatch(updateOrderFail(error.response.data.message));
    }
  };

  const orderContext = {
    createOrder,
    orderState,
    getMyOrders,
    getOneOrder,
    getAllOrders,
    deleteOrder,
    updateOrder,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
