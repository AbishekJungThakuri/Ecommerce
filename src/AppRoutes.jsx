import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ErrorBoundaryWrapper from "./ErrorHandling/ErrorBoundaryWrapper";


const Home = ErrorBoundaryWrapper(lazy(() => import("./pages/Home")));
const Shop = ErrorBoundaryWrapper(lazy(() => import("./pages/Shop")));
const Cart = ErrorBoundaryWrapper(lazy(() => import("./pages/Cart")));
const ItemDetails = ErrorBoundaryWrapper(lazy(() => import("./components/shopComponent/ItemDetails")));
const Order = ErrorBoundaryWrapper(lazy(() => import("./pages/Order")));
const Login = ErrorBoundaryWrapper(lazy(() => import("./pages/Login")));
const SignUp = ErrorBoundaryWrapper(lazy(() => import("./pages/SignUp")));
const PageNotFound = ErrorBoundaryWrapper(lazy(() => import("./PageNotFound/PageNotFound")));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/itemDetail/:id" element={<ItemDetails />} />
        <Route path="/order" element={<Order />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;

