import { BannerContext } from "./BannerContext";
import { useReducer } from "react";
import axios from "axios";

import { bannerInit, bannerReducer } from "./reducer/bannerReducer.js";
import setAuthToken from "../../utils/setAuthToken";
import {
  getBannerSuccess,
  getOneBannerSuccess,
  getAllBannersSuccess,
  getAllBannersFail,
  createBannerSuccess,
  createBannerFail,
  deleteBannerSuccess,
  deleteBannerFail,
  updateBannerSuccess,
  updateBannerFail,
  // addReviewsSuccess,
  // getAllReviewsSuccess,
  // getAllReviewsFail,
  // deleteReviewFail,
  // deleteReviewSuccess,
} from "./reducer/bannerAction";

function BannerProvider({ children }) {
  const [bannerState, dispatch] = useReducer(bannerReducer, bannerInit);

  const getBanners = async (
    page = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    keyword = ""
  ) => {
    try {
      let link = `http://localhost:4000/banner?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}`;

      if (category) {
        link = `http://localhost:4000/banner?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&name=${keyword}&category=${category}`;
      }

      const response = await axios.get(link);

      if (response.data.success) {
        dispatch(getBannerSuccess(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Get Something banner
  const getOneBanner = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/banner/details/${id}`
      );

      if (response.data.success) {
        dispatch(getOneBannerSuccess(response.data.banner));
      }
    } catch (e) {
      console.log(e);
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
  //       `http://localhost:4000/banner/review`,
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

  //Create banner
  const createBanner = async (formCraete) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/banner/create",
        formCraete
      );

      if (response.data.success)
        dispatch(createBannerSuccess(response.data.banner));
    } catch (error) {
      dispatch(createBannerFail(error.response.data.message));
    }
  };

  //Deletebanner
  const deleteBanner = async (id) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/banner/delete/${id}`
      );

      if (response.data.success) dispatch(deleteBannerSuccess(id));
    } catch (error) {
      dispatch(deleteBannerFail(error.response.data.message));
    }
  };

  //Update Banner
  const updateBanner = async (formUpdate, idBanner) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/banner/update/${idBanner}`,
        formUpdate
      );

      if (response.data.success)
        dispatch(updateBannerSuccess(response.data.banner));
    } catch (error) {
      dispatch(updateBannerFail(error.response.data.message));
    }
  };

  //Get All banner
  const getAllBanners = async (keyword = "") => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }

    let link = `http://localhost:4000/banner/admin/banners`;

    if (keyword) {
      link = `http://localhost:4000/banner?name=${keyword}`;
    }
    try {
      const response = await axios.get(link);

      if (response.data.success)
        dispatch(getAllBannersSuccess(response.data.banners));
    } catch (error) {
      dispatch(getAllBannersFail(error.response.data.message));
    }
  };

  // //Get All Reviews
  // const getAllReviews = async (keyword = "") => {
  //   if (localStorage["auth-token"]) {
  //     setAuthToken(localStorage["auth-token"]);
  //   }
  //   let link;
  //   if (!keyword) {
  //     link = "http://localhost:4000/banner/admin/reviews";
  //   } else {
  //     link = `http://localhost:4000/banner/admin/review/${keyword}`;
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
  //       `http://localhost:4000/banner/delete/review`,
  //       {
  //         data: formDelete,
  //       }
  //     );

  //     if (response.data.success) dispatch(deleteReviewSuccess(formDelete));
  //   } catch (error) {
  //     dispatch(deleteReviewFail(error.response.data.message));
  //   }
  // };

  const bannerContext = {
    bannerState,
    getBanners,
    getOneBanner,
    // createNewReviews,
    getAllBanners,
    createBanner,
    deleteBanner,
    updateBanner,
    // getAllReviews,
    // deleteReview,
  };

  return (
    <BannerContext.Provider value={bannerContext}>
      {children}
    </BannerContext.Provider>
  );
}

export default BannerProvider;
