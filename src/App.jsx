import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Shop } from "./pages/Shop"
import { Cart } from "./pages/Cart"
import { ItemDetails } from "./components/ItemDetails"
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Order from "./pages/Order"
import Login from "./pages/Login"
import Layout from "./layout/Layout"
import SignUp from "./pages/SignUp"


const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};


function App() {

  return (
    <BrowserRouter>
    <ScrollToTop/>
       <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>} />

          <Route element={<Layout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/itemDetail/:id" element={<ItemDetails/>} />
              <Route path="/order" element={<Order/>} />
          </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
