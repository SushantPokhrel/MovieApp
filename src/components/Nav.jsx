import React from "react";
import { Context } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { Bars2Icon } from "@heroicons/react/24/outline";
export default function Nav() {
  const [overlay, setOverlay] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { setSearchResult } = React.useContext(Context);
  const [toggleNav, setToggleNav] = React.useState(false);
  const [toggleInput, setToggleInput] = React.useState(false);
  const navigate = useNavigate();
  function showInput() {
    console.log("clicked");
    setToggleInput((prev) => !prev);
  }
  function handleSubmit(e) {
    setOverlay(false);
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyODY1NjE2Mi4wOTI4ODksInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sft9RGIHdHwWP_d7v-m7O2Dsv0bfqf0XdfwAUplhG00",
      },
    };
    if (value.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results);
          setSearchResult(response.results);
          navigate("All");
        })
        .catch((err) => console.error(err));
    } else {
      return;
    }
  }
  function handleFocus() {
    setOverlay(true);
  }
  function handleBlur() {
    setOverlay(false);
  }
  function handleChange(e) {
    const value = e.target.value;
    setValue(value.trimStart());
  }
  function handleToggle() {
    setToggleNav((prev) => !prev);
  }
  React.useEffect(() => {
    overlay
      ? document.querySelector(".wrap-overlay").classList.add("overlay")
      : document.querySelector(".wrap-overlay").classList.remove("overlay");
  }, [overlay]);
  return (
    <div>
      <nav>
        <div className="div-logo">
          <Link to="/">
            <h2>MyApp</h2>
          </Link>
        </div>
        <div className="div-form">
          <form onSubmit={handleSubmit} className="form-nav">
            <input
              type="search"
              placeholder="search here..."
              className={`input-search ${toggleInput ? "show-input" : "hide-input"}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              required
            />
            <button type="submit" className="btn-search" onClick={showInput}>
              <i className="fa-solid fa-magnifying-glass i-search"></i>
            </button>
          </form>
        </div>
        <div className="ul-container">
          <ul className={`ul-nav ${toggleNav ? "show-nav" : ""}`}>
            <Link to="/" onClick={handleToggle}>
              <li className="li-nav-links">Home</li>
            </Link>
            <Link to="Movies" onClick={handleToggle}>
              <li className="li-nav-links">Movies</li>
            </Link>
            <Link to="TV" v>
              <li className="li-nav-links" onClick={handleToggle}>
                Tv Shows
              </li>
            </Link>
            <Link to="Login" onClick={handleToggle}>
              <li className="li-nav-links">Login</li>
            </Link>
            <Link to="Watchlist" onClick={handleToggle}>
              <li className="li-nav-links">Watchlist</li>
            </Link>
            <i
              className="fa-regular fa-circle-xmark"
              onClick={handleToggle}
            ></i>
          </ul>
        </div>
        <div className="ham-bg-container" onClick={handleToggle}>
          <Bars2Icon className="size-6 bars" />
        </div>
      </nav>
    </div>
  );
}
