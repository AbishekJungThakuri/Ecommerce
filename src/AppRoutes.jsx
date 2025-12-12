import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./ErrorHandling/LoadingScreen";


const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const ItemDetails = lazy(() => import("./components/shopComponent/ItemDetails"));
const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Layout = lazy(() => import("./layout/Layout"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/itemDetail/:id" element={<ItemDetails />} />
        <Route path="/order" element={<Order />} />
      </Route>
      
      {/* <Route path="/loading" element={<LoadingScreen/>} /> */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
