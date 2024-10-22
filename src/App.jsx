import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Movies from "./routes/Movies";
import ContextProvider from "./context/Context";
import MovieDetail from "./routes/MovieDetail";
import Footer from "./components/Footer";
import All from "./routes/All";
import TV from "./routes/TV";
import ScrollBtn from "./components/ScrollBtn";
import Login from "./routes/Login";
import Watchlist from "./routes/Watchlist";
import React from "react";
function App() {
  
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Nav />
          <div className="wrap-overlay">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Movies" element={<Movies />} />
              <Route path="/Detail/:title/:id" element={<MovieDetail />} />
              <Route path="All" element={<All />} />
              <Route path="All/Detail/:title/:id" element={<MovieDetail />} />
              <Route path="TV" element={<TV />} />
              <Route path="/Detail/:title/:id" element={<MovieDetail />} />
              <Route path="Login" element={<Login />} />
              <Route path="/Detail/:id" element={<MovieDetail />} />
              <Route path="Watchlist" element={<Watchlist />} />
            </Routes>
          </div>
          <ScrollBtn />
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
