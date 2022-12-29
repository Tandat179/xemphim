import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductProvider from "./context/product/ProductProvider";
import AuthProvider from "./context/auth/AuthProvider";
import CartProvider from "./context/cart/CartPorvider";
import OrderProvider from "./context/order/OrderProvider";
import UserProvider from "./context/user/UserProvider";
import FavoriteProvider from "./context/favorite/FavoriteProvider";
import BannerProvider from "./context/banner/BannerProvider";
// import ProductUserProvider from "./context/productuser/ProductUserProvider";
import ProduserProvider from "./context/produser/ProduserProvider";
import { Provider } from 'react-redux'
import { store } from "./redux/pageStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <Provider store={store}>
    <ProductProvider>
      <BannerProvider>
        <ProduserProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <FavoriteProvider>
                  <UserProvider>
                    <App />
                  </UserProvider>
                </FavoriteProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </ProduserProvider>
      </BannerProvider>
    </ProductProvider>

    </Provider>,


  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
