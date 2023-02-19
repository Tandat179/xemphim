export const GET_MY_FAVORITES_SUCCESS = "get_my_favorites_success";
export const GET_MY_FAVORITES_FAIL = "get_my_favorites_fail";
export const DELETE_MY_FAVORITES_SUCCESS = "delete_my_favorites_success";
export const DELETE_MY_FAVORITES_FAIL = "delete_my_favorites_fail";

export const getMyFavoritesFail = (payload) => {
  return {
    type: GET_MY_FAVORITES_FAIL,
    payload,
  };
};

export const getMyFavoritesSuccess = (payload) => {
  return {
    type: GET_MY_FAVORITES_SUCCESS,
    payload,
  };
};
export const deleteMyFavoriteSuccess = (payload) => {
  return {
    type: DELETE_MY_FAVORITES_SUCCESS,
    payload,
  };
};

export const deleteMyFavoriteFail = (payload) => {
  return {
    type: DELETE_MY_FAVORITES_FAIL,
    payload,
  };
};
