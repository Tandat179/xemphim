import { ProduserContext } from "./ProduserContext";
import { useReducer } from "react";
import axios from "axios";

import { produserInit, produserReducer } from "./reducer/produserReducer.js";
import setAuthToken from "../../utils/setAuthToken";
import {
  getProduserSuccess,
  getOneProduserSuccess,
  getAllProdusersSuccess,
  getAllProdusersFail,
  getAllProdusersadSuccess,
  getAllProdusersadFail,
  createProduserSuccess,
  createProduserFail,
  deleteProduserSuccess,
  deleteProduserFail,
  updateProduserSuccess,
  updateProdusersadSuccess,
  updateProduserFail,
  // addReviewsSuccess,
  // getAllReviewsSuccess,
  // getAllReviewsFail,
  // deleteReviewFail,
  // deleteReviewSuccess,
} from "./reducer/produserAction";
import { toast } from "react-hot-toast";

function ProduserProvider({ children }) {
  const [produserState, dispatch] = useReducer(produserReducer, produserInit);

  const getProdusers = async (
    page = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    keyword = ""
  ) => {
    try {
      let link = `http://localhost:4000/produser?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}`;

      if (category) {
        link = `http://localhost:4000/produser?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}&category=${category}`;
      }

      const response = await axios.get(link);

      if (response.data.success) {
        dispatch(getProduserSuccess(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Get Something produser
  const getOneProduser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/produser/details/${id}`
        // `http://localhost:4000/produser/${id}`
      );

      if (response.data.success) {
        dispatch(getOneProduserSuccess(response.data.produser));
      }
    } catch (e) {
      console.log("Ops");
      // console.log(e);
    }
  };

  //Create Review
  // const createNewReviews = async (formReviews) => {
  //   if (localStorage["auth-token"]) {
  //     setAuthToken(localStorage["auth-token"]);
  //   }
  //   try {
  //     const config = {
  //       headers: { "Content-Type": "application/json" },
  //     };

  //     const response = await axios.put(
  //       `http://localhost:4000/produser/review`,
  //       formReviews,
  //       config
  //     );

  //     if (response.data.success) {
  //       dispatch(addReviewsSuccess(response.data.review));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Create produser
  const createProduser = async (formCraete,callback) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/produser/create",
        formCraete
      );

      if (response.data.success){
        toast.success("Đăng thành công")
        dispatch(createProduserSuccess(response.data.produser));
        callback();
      }else{
        toast.error("Phim đã được đăng")
      }
    } catch (error) {
      dispatch(createProduserFail(error.response.data.message));
    }
  };

  const deleteProduser = async (id) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/produser/delete/${id}`
      );

      if (response.data.success) dispatch(deleteProduserSuccess(id));
    } catch (error) {
      dispatch(deleteProduserFail(error.response.data.message));
    }
  };

  //Update Produser

  //Get All produser
  const getAllProdusers = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    // let link = `http://localhost:4000/produser/admin/produsers`;

    let link = `http://localhost:4000/produser/produsers`;

    if (keyword) {
      link = `http://localhost:4000/produser?name=${keyword}`;
    }
    try {
      const response = await axios.get(link);
      console.log("Hi Br This have Right");

      if (response.data.success)
        dispatch(getAllProdusersSuccess(response.data.produsers));
    } catch (error) {
      console.log("Hi Br This have Error");

      dispatch(getAllProdusersFail(error.response.data.message));
    }
  };

  //Get All produser admin
  const getAllProdusersad = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    // let link = `http://localhost:4000/produser/admin/produsers`;

    let link = `http://localhost:4000/produser/produsersad`;

    if (keyword) {
      link = `http://localhost:4000/produser?name=${keyword}`;
    }
    try {
      const response = await axios.get(link);
      console.log("Hi Br This have Right");

      if (response.data.success)
        dispatch(getAllProdusersSuccess(response.data.produsers));
    } catch (error) {
      console.log("Hi Br This have Error");

      dispatch(getAllProdusersFail(error.response.data.message));
    }
  };

  const updateProduserad = async (formUpdate, idProduser) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/produser/updatead/${idProduser}`,
        formUpdate
      );

      if (response.data.success)
        dispatch(updateProduserSuccess(response.data.produser));
    } catch (error) {
      dispatch(updateProduserFail(error.response.data.message));
    }
  };

  const updateProduser = async (formUpdate, idProduser) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/produser/update/${idProduser}`,
        formUpdate
      );
      console.log("Update Thanh Cong");

      if (response.data.success)
        dispatch(updateProduserSuccess(response.data.produser));
    } catch (error) {
      dispatch(updateProduserFail(error.response.data.message));
    }
  };

  // const getAllProdusersad = async (keyword = "") => {
  //   if (localStorage["auth-token"]) {
  //     setAuthToken(localStorage["auth-token"]);
  //   }
  //   // let link = `http://localhost:4000/produser/admin/produsers`;

  //   let link = `http://localhost:4000/produser/admin/produsers`;

  //   if (keyword) {
  //     link = `http://localhost:4000/produser?name=${keyword}`;
  //   }
  //   try {
  //     const response = await axios.get(link);

  //     if (response.data.success)
  //       dispatch(getAllProdusersSuccess(response.data.produsers));
  //   } catch (error) {
  //     dispatch(getAllProdusersFail(error.response.data.message));
  //   }
  // };

  // //Get All Reviews
  // const getAllReviews = async (keyword = "") => {
  //   if (localStorage["auth-token"]) {
  //     setAuthToken(localStorage["auth-token"]);
  //   }
  //   let link;
  //   if (!keyword) {
  //     link = "http://localhost:4000/produser/admin/reviews";
  //   } else {
  //     link = `http://localhost:4000/produser/admin/review/${keyword}`;
  //   }
  //   try {
  //     const response = await axios.get(link);

  //     if (response.data.success)
  //       dispatch(getAllReviewsSuccess(response.data.reviews));
  //   } catch (error) {
  //     dispatch(getAllReviewsFail(error.response.data.message));
  //   }
  // };

  // //Delete Review
  // const deleteReview = async (formDelete) => {
  //   if (localStorage["auth-token"]) {
  //     setAuthToken(localStorage["auth-token"]);
  //   }
  //   console.log(formDelete);
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:4000/produser/delete/review`,
  //       {
  //         data: formDelete,
  //       }
  //     );

  //     if (response.data.success) dispatch(deleteReviewSuccess(formDelete));
  //   } catch (error) {
  //     dispatch(deleteReviewFail(error.response.data.message));
  //   }
  // };

  const produserContext = {
    produserState,
    getProdusers,
    getOneProduser,
    getAllProdusersad,
    // createNewReviews,
    updateProduserad,
    getAllProdusers,
    createProduser,
    deleteProduser,
    getAllProdusersadSuccess,
    updateProduser,
    // getAllReviews,
    // deleteReview,
  };

  return (
    <ProduserContext.Provider value={produserContext}>
      {children}
    </ProduserContext.Provider>
  );
}

export default ProduserProvider;
