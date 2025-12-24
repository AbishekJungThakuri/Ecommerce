import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import Snowfall from 'react-snowfall'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
       <Snowfall style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        pointerEvents: 'none'
        }} />
    </BrowserRouter>
  );
}

export default App;
