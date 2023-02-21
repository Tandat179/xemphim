import "./App.css";
import Header from "./component/layout/Header/header";
import WebFont from "webfontloader";
import { useEffect, useContext } from "react";
import Footer from "./component/layout/Footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import Auth from "./component/Auth/Auth";
import { AuthContext } from "./context/auth/AuthContext";
import Profile from "./component/Auth/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/Auth/UpdateProfile";
import UpdatePassword from "./component/Auth/UpdatePassword";
import ForgotPassword from "./component/Auth/ForgotPassword";
import ResetPassword from "./component/Auth/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import DashBoard from "./component/Admin/DashBoard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import OrderProcess from "./component/Admin/OrderProcess";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ReviewList from "./component/Admin/ReviewList";
import ListMovie from "./component/movie-list/ListMovie";
import NewBanner from "./component/Admin/NewBanner";
import BannerList from "./component/Admin/BannerList";
import UpdateBanner from "./component/Admin/UpdateBanner";
import NewProductUser from "./component/productuser/NewProductUser";
import UpdateProdUser from "./component/productuser/UpdateProductUser";
import UpdateProduserad from "./component/Admin/UpdateProductUserad";
import MyFavorites from "./component/favorite/MyFavorite";
import ProductUserList from "./component/productuser/ProductUserList";
import ProductUserListad from "./component/Admin/ProductUserListad";
// import ProduserUserListad from "./component/Admin/ProductUserListad";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ProductsSpecial from "./component/product/ProductsSpecial";
import ProductsV2 from "./component/product/ProductsV2";
import PaymentPage from "./component/Payment/PaymentPage";
import ProductsRecommendation from "./component/product/ProductsRecommendation";
const queryClient = new QueryClient();

function App() {
  const {
    authState: { user, isAuthenticated },
    loadUser,
  } = useContext(AuthContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    loadUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header></Header>
        <Routes>
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<ProductsV2 />} />
          <Route
            extact
            path="/product/recommendation/:id"
            element={<ProductsRecommendation />}
          />
          <Route extact path="/payment" element={<PaymentPage />} />
          <Route extact path="/productsSpecial" element={<ProductsSpecial />} />
          <Route extact path="/login" element={<Auth />} />
          <Route extact path="/cart" element={<Cart />} />
          <Route extact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            extact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateProfile"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            extact
            path="/shipping"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            extact
            path="/confirmOrder"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            extact
            path="/orderSuccess"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            extact
            path="/orders"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/favorites"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <MyFavorites />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/order/:orderId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            extact
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/products"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ProductList />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/banners"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <BannerList />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/products/new"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <NewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/product/:productId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/banner/:bannerId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateBanner />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/banners/new"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <NewBanner />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/produser/create"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <NewProductUser />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/produser/:produserId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateProdUser />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/produsersad/:produserId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateProduserad />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/produsers"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ProductUserList />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="admin/produsersad"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ProductUserListad />
              </ProtectedRoute>
            }
          />

          {/* <Route
            extact
            path="/admin/produser/list"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ProduserUserListad />
              </ProtectedRoute>
            }
          /> */}

          <Route
            extact
            path="/admin/orders"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <OrderList />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/order/:orderId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <OrderProcess />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/users"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UserList />
              </ProtectedRoute>
            }
          />

          {/* <Route
            extact
            path="/admin/productuser"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ProduserUserListad />
              </ProtectedRoute>
            }
          /> */}

          <Route
            extact
            path="/admin/user/:userId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <UpdateUser />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/reviews"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ReviewList />
              </ProtectedRoute>
            }
          />

          <Route
            extact
            path="/admin/review/:reviewId"
            element={
              <ProtectedRoute
                user={isAuthenticated}
                role={user ? user.role : ""}
              >
                <ReviewList />
              </ProtectedRoute>
            }
          />
          <Route extact path="/" element={<Home />} />
          {/* <Route extact path="/listt" element={<ListMovie/>} /> */}
        </Routes>
        <Footer></Footer>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
