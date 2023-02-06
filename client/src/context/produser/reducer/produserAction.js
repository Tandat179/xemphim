export const GET_PRODUSERS_SUCCESS = "get_produsers_success";
export const GET_PRODUSERS_FAIL = "get_produsers_fail";

export const GET_PRODUSER_FAIL = "get_produser_fail";
export const GET_PRODUSER_SUCCESS = "get_produser_success";

export const ADD_REVIEWS_SUCCESS = "add_reviews_success";
export const ADD_REVIEWS_FAIL = "add_reivews_fail";

export const GET_ALL_PRODUSER_SUCCESS = "get_all_produser_success";
export const GET_ALL_PRODUSER_FAIL = "get_all_produser_fail";

export const GET_ALL_PRODUSERSAD_SUCCESS = "get_all_produsersad_success";
export const GET_ALL_PRODUSERSAD_FAIL = "get_all_produsersad_fail";

export const CREATE_PRODUSER_SUCCESS = "create_produser_success";
export const CREATE_PRODUSER_FAIL = "create_produser_fail";

export const DELETE_PRODUSER_SUCCESS = "delete_produser_success";
export const DELETE_PRODUSER_FAIL = "delete_produser_fail";

export const UPDATE_PRODUSER_SUCCESS = "update_produser_success";
export const UPDATE_PRODUSER_FAIL = "update_produser_fail";

export const UPDATE_PRODUSERSAD_SUCCESS = "update_produsersad_success";
export const UPDATE_PRODUSERSAD_FAIL = "update_produsersad_fail";

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

// cho t xem mấy cái xóa trc di m oke

export const getAllReviewsFail = (payload) => {
  return {
    type: GET_ALL_REVIEW_FAIL,
    payload,
  };
};

export const updateProduserSuccess = (payload) => {
  return {
    type: UPDATE_PRODUSER_SUCCESS,
    payload,
  };
};

export const updateProduserFail = (payload) => {
  return {
    type: UPDATE_PRODUSER_FAIL,
    payload,
  };
};

export const updateProdusersadSuccess = (payload) => {
  return {
    type: UPDATE_PRODUSERSAD_SUCCESS,
    payload,
  };
};

export const updateProdusersadFail = (payload) => {
  return {
    type: UPDATE_PRODUSERSAD_FAIL,
    payload,
  };
};


export const deleteProduserSuccess = (payload) => {
  return {
    type: DELETE_PRODUSER_SUCCESS,
    payload,
  };
};

export const deleteProduserFail = (payload) => {
  return {
    type: DELETE_PRODUSER_FAIL,
    payload,
  };
};

export const createProduserSuccess = (payload) => {
  return {
    type: CREATE_PRODUSER_SUCCESS,
    payload,
  };
};

export const createProduserFail = (payload) => {
  return {
    type: CREATE_PRODUSER_FAIL,
    payload,
  };
};

export const getAllProdusersSuccess = (payload) => {
  return {
    type: GET_ALL_PRODUSER_SUCCESS,
    payload,
  };
};

export const getAllProdusersFail = (payload) => {
  return {
    type: GET_ALL_PRODUSER_FAIL,
    payload,
  };
};

export const getAllProdusersadSuccess = (payload) => {
  return {
    type: GET_ALL_PRODUSERSAD_SUCCESS,
    payload,
  };
};

export const getAllProdusersadFail = (payload) => {
  return {
    type: GET_ALL_PRODUSERSAD_FAIL,
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

export const getProduserSuccess = (payload) => {
  return {
    type: GET_PRODUSERS_SUCCESS,
    payload,
  };
};

export const getProduserFail = (payload) => {
  return {
    type: GET_PRODUSERS_FAIL,
    payload,
  };
};

export const getOneProduserSuccess = (payload) => {
  return {
    type: GET_PRODUSER_SUCCESS,
    payload,
  };
};
