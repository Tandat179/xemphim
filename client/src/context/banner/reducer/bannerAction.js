export const GET_BANNERS_SUCCESS = "get_banners_success";
export const GET_BANNERS_FAIL = "get_banners_fail";

export const GET_BANNER_FAIL = "get_banner_fail";
export const GET_BANNER_SUCCESS = "get_banner_success";

export const ADD_REVIEWS_SUCCESS = "add_reviews_success";
export const ADD_REVIEWS_FAIL = "add_reivews_fail";

export const GET_ALL_BANNER_SUCCESS = "get_all_banner_success";
export const GET_ALL_BANNER_FAIL = "get_all_banner_fail";

export const CREATE_BANNER_SUCCESS = "create_banner_success";
export const CREATE_BANNER_FAIL = "create_banner_fail";

export const DELETE_BANNER_SUCCESS = "delete_banner_success";
export const DELETE_BANNER_FAIL = "delete_banner_fail";

export const UPDATE_BANNER_SUCCESS = "update_banner_success";
export const UPDATE_BANNER_FAIL = "update_banner_fail";

export const GET_ALL_REVIEW_SUCCESS = "get_all_review_success";
export const GET_ALL_REVIEW_FAIL = "get_all_review_fail";

export const DELETE_REVIEW_SUCCESS = "delete_review_success";
export const DELETE_REVIEW_FAIL = "delete_review_fail";

export const deleteReviewSuccess = (payload) => {
  return {
    type: DELETE_REVIEW_SUCCESS,
    payload,
  };
};

export const deleteReviewFail = (payload) => {
  return {
    type: DELETE_REVIEW_FAIL,
    payload,
  };
};

export const getAllReviewsSuccess = (payload) => {
  return {
    type: GET_ALL_REVIEW_SUCCESS,
    payload,
  };
};

export const getAllReviewsFail = (payload) => {
  return {
    type: GET_ALL_REVIEW_FAIL,
    payload,
  };
};

export const updateBannerSuccess = (payload) => {
  return {
    type: UPDATE_BANNER_SUCCESS,
    payload,
  };
};

export const updateBannerFail = (payload) => {
  return {
    type: UPDATE_BANNER_FAIL,
    payload,
  };
};

export const deleteBannerSuccess = (payload) => {
  return {
    type: DELETE_BANNER_SUCCESS,
    payload,
  };
};

export const deleteBannerFail = (payload) => {
  return {
    type: DELETE_BANNER_FAIL,
    payload,
  };
};

export const createBannerSuccess = (payload) => {
  return {
    type: CREATE_BANNER_SUCCESS,
    payload,
  };
};

export const createBannerFail = (payload) => {
  return {
    type: CREATE_BANNER_FAIL,
    payload,
  };
};

export const getAllBannersSuccess = (payload) => {
  return {
    type: GET_ALL_BANNER_SUCCESS,
    payload,
  };
};

export const getAllBannersFail = (payload) => {
  return {
    type: GET_ALL_BANNER_FAIL,
    payload,
  };
};

export const addReviewsFail = (payload) => {
  return {
    type: ADD_REVIEWS_FAIL,
    payload,
  };
};

export const addReviewsSuccess = (payload) => {
  return {
    type: ADD_REVIEWS_SUCCESS,
    payload,
  };
};

export const getBannerSuccess = (payload) => {
  return {
    type: GET_BANNERS_SUCCESS,
    payload,
  };
};

export const getBannerFail = (payload) => {
  return {
    type: GET_BANNERS_FAIL,
    payload,
  };
};

export const getOneBannerSuccess = (payload) => {
  return {
    type: GET_BANNER_SUCCESS,
    payload,
  };
};
