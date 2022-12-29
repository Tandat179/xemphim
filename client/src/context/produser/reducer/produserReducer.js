import {
  GET_PRODUSERS_SUCCESS,
  GET_PRODUSERS_FAIL,
  GET_PRODUSER_SUCCESS,
  ADD_REVIEWS_SUCCESS,
  GET_ALL_PRODUSER_FAIL,
  GET_ALL_PRODUSER_SUCCESS,
  CREATE_PRODUSER_FAIL,
  CREATE_PRODUSER_SUCCESS,
  DELETE_PRODUSER_FAIL,
  DELETE_PRODUSER_SUCCESS,
  UPDATE_PRODUSER_FAIL,
  UPDATE_PRODUSER_SUCCESS,
  GET_ALL_REVIEW_FAIL,
  GET_ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
} from "./produserAction";

export const produserInit = {
  produsers: [],
  produser: {},
  produsersCount: 0,
  resultPerPage: 8,
  filterCountprodusers: 0,
  produsersAdmin: [],
  reviews: [],
  reviewsproduser: [],
};

export const produserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_REVIEW_SUCCESS:
      const { id } = payload;
      // const newprodusers = state.produsers.map((produser) =>
      //   produser._id === produserId
      //     ? produser.reviews.filter((rv) => rv._id !== id)
      //     : produser
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
    case UPDATE_PRODUSER_SUCCESS:
      return {
        ...state,
        produsersAdmin: state.produsersAdmin.map((produser) =>
          produser._id === payload._id ? payload : produser
        ),
        produsers: state.produsers.map((produser) =>
          produser._id === payload._id ? payload : produser
        ),
      };
    case DELETE_PRODUSER_SUCCESS:
      return {
        ...state,
        produsersAdmin: state.produsersAdmin.filter(
          (produser) => produser._id !== payload
        ),
      };
    case CREATE_PRODUSER_SUCCESS:
      return {
        ...state,
        produsersAdmin: [...state.produsersAdmin, payload],
      };
    case GET_ALL_PRODUSER_SUCCESS:
      return {
        ...state,
        produsersAdmin: payload,
      };
    case ADD_REVIEWS_SUCCESS:
      const isReviewsExist = state.produser.reviews.find(
        (rv) => rv.user === payload.user
      );

      if (isReviewsExist) {
        return {
          ...state,
          produser: {
            ...state.produser,
            reviews: state.produser.reviews.map((rv) =>
              rv.user === isReviewsExist.user ? payload : rv
            ),
          },
        };
      }

      return {
        ...state,
        produser: {
          ...state.produser,
          reviews: [...state.produser.reviews, payload],
        },
      };

    case GET_PRODUSERS_SUCCESS:
      return {
        ...state,
        produsers: payload.produsers,
        produsersCount: payload.produserCount,
        filterCountProdusers: payload.filterCountProdusers,
      };
    case GET_PRODUSERS_FAIL:
      return {
        ...state,
        produsers: [],
      };
    case GET_PRODUSER_SUCCESS:
      return {
        ...state,
        produser: payload,
      };
    default:
      return state;
  }
};
