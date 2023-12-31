import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {

  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      
    </Routes>
    <Footer/>
    <Toaster />
  </BrowserRouter>
}

export default App;
