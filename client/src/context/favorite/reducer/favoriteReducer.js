import {
  GET_MY_FAVORITES_SUCCESS,
  DELETE_MY_FAVORITES_SUCCESS,
} from "./favoriteAction";

export const favoriteInit = {
  favorites: [],
  message: "",
  favorite: {},
  favoritesAdmin: [],
};

export const favoriteReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: payload,
      };

    case DELETE_MY_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite._id !== payload
        ),
      };

    default:
      return {
        ...state,
      };
  }
};
