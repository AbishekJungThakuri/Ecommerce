import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Shop } from "./pages/Shop"
import { Cart } from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ItemDetails } from "./components/ItemDetails"
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';


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
    <Navbar/>
       <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/itemDetail/:id" element={<ItemDetails/>} />
       </Routes>
       <Footer/>
    </BrowserRouter>
  )
}

export default App
