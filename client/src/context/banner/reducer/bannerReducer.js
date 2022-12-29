import {
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAIL,
  GET_BANNER_SUCCESS,
  ADD_REVIEWS_SUCCESS,
  GET_ALL_BANNER_FAIL,
  GET_ALL_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,
  CREATE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_SUCCESS,
  GET_ALL_REVIEW_FAIL,
  GET_ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
} from "./bannerAction";

export const bannerInit = {
  banners: [],
  banner: {},
  bannersCount: 0,
  resultPerPage: 8,
  filterCountbanners: 0,
  bannersAdmin: [],
  reviews: [],
  reviewsbanner: [],
};

export const bannerReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_REVIEW_SUCCESS:
      const { id } = payload;
      // const newbanners = state.banners.map((banner) =>
      //   banner._id === bannerId
      //     ? banner.reviews.filter((rv) => rv._id !== id)
      //     : banner
      // );
      return {
        ...state,
        reviews: state.reviews.filter((rv) => rv._id !== id),
      };
    case GET_ALL_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: payload,
      };
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        bannersAdmin: state.bannersAdmin.map((banner) =>
          banner._id === payload._id ? payload : banner
        ),
        banners: state.banners.map((banner) =>
          banner._id === payload._id ? payload : banner
        ),
      };
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        bannersAdmin: state.bannersAdmin.filter(
          (banner) => banner._id !== payload
        ),
      };
    case CREATE_BANNER_SUCCESS:
      return {
        ...state,
        bannersAdmin: [...state.bannersAdmin, payload],
      };
    case GET_ALL_BANNER_SUCCESS:
      return {
        ...state,
        bannersAdmin: payload,
      };
    case ADD_REVIEWS_SUCCESS:
      const isReviewsExist = state.banner.reviews.find(
        (rv) => rv.user === payload.user
      );

      if (isReviewsExist) {
        return {
          ...state,
          banner: {
            ...state.banner,
            reviews: state.banner.reviews.map((rv) =>
              rv.user === isReviewsExist.user ? payload : rv
            ),
          },
        };
      }

      return {
        ...state,
        banner: {
          ...state.banner,
          reviews: [...state.banner.reviews, payload],
        },
      };

    case GET_BANNERS_SUCCESS:
      return {
        ...state,
        banners: payload.banners,
        bannersCount: payload.bannerCount,
        filterCountBanners: payload.filterCountBanners,
      };
    case GET_BANNERS_FAIL:
      return {
        ...state,
        banners: [],
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        banner: payload,
      };
    default:
      return state;
  }
};
