import { FavoriteContext } from "./FavoriteContext";
import { useReducer } from "react";
import { favoriteInit, favoriteReducer } from "./reducer/favoriteReducer";
import axios from "axios";
import {
  getMyFavoritesSuccess,
  getMyFavoritesFail,
} from "./reducer/favoriteAction";
import setAuthToken from "../../utils/setAuthToken";

function FavoriteProvider({ children }) {
  const [favoriteState, dispatch] = useReducer(favoriteReducer, favoriteInit);

  // Get User favorite`
  const getMyFavorites = async () => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      // Get My favorite User
      const response = await axios.get(
        "http://localhost:4000/favorite/myFavorites"
      );
      if (response.data.success) {
        //Response of Server
        dispatch(getMyFavoritesSuccess(response.data.favorites));
      }
    } catch (error) {
      console.log("Hi Br This have Error");
      dispatch(getMyFavoritesFail(error.response.data.message));
    }
  };

  const favoriteContext = {
    favoriteState,
    getMyFavorites,
  };

  return (
    <FavoriteContext.Provider value={favoriteContext}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;
