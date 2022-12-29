import { CartContext } from "./CartContext";
import { useReducer } from "react";
import { cartInit, cartReducer } from "./reducer/cartReducer";
import axios from "axios";
import {
  addToCart,
  removeItemCart,
  saveShippingInfomation,
  removeAllItemsCart,
} from "./reducer/cartAction";

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, cartInit);




  
  //Add product (item) to Cart
  const addItemsToCart = async (id, quantity) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/details/${id}`
      );
      if (response.data.success) {
        dispatch(
          //Dispatch get: id / name / price / image / stock
          addToCart({
            product: response.data.product._id,
            name: response.data.product.name,
            price: response.data.product.price,
            image: response.data.product.images[0].url,
            stock: response.data.product.stock,
            quantity,
          })
        );
      }
    } catch (e) {}
  };

    //Remove Product in Cart
  const removeItem = (id) => {
    dispatch(removeItemCart(id));
  };

  //Save Information Shipping
  const saveShippingInfo = (formShipping) => {
    dispatch(saveShippingInfomation(formShipping));
    // TypeError, Payload:
  };

  //Remove all product in Cart 
  const removeAllItems = () => {
    dispatch(removeAllItemsCart());
  };

  //Export (Provider) to File
  const cartContext = {
    cartState,
    addItemsToCart,
    removeItem,
    saveShippingInfo,
    removeAllItems,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
