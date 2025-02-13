import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Shop } from "./pages/Shop"
import { Cart } from "./pages/Cart"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ItemDetails } from "./components/ItemDetails"

function App() {

  return (
    <BrowserRouter>
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
