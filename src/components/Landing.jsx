import React from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [imgCount, setImgCount] = React.useState(0);
  const [value, setValue] = React.useState("");
  const { setSearchResult } = React.useContext(Context);
  const navigate = useNavigate();

  let banner = [
    {
      url: "https://c4.wallpaperflare.com/wallpaper/1000/490/543/heath-ledger-joker-monochrome-batman-wallpaper-preview.jpg",
    },
    {
      url: "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    },

    {
      url: "https://wallpapercave.com/wp/p2Rx3Nh.jpg",
    },
    {
      url: "https://wallpapers.com/images/hd/red-and-blue-stranger-things-phone-ifavyvru0tqy4j19.jpg",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/557/552/888/breaking-bad-hd-widescreen-wallpaper-preview.jpg",
    },
  ];

  React.useEffect(() => {
    //logging cool stuff on console
    console.log(
      "%cWhy are you peeking ?╰（‵□′）╯",
      "color:red;font-size:1.5rem;background-color:blue;font-family:cursive;border:4px solid cyan;font-weight:bold; "
    );
    const intervalId = setInterval(() => {
      setImgCount((prev) => (prev >= banner.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    document.querySelector(
      ".landing-container"
    ).style.backgroundImage = `url(${banner[imgCount].url})`;
  }, [imgCount]);

  // Search functionality same as in Nav component
  function handleSubmit(e) {
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

  function handleChange(e) {
    const value = e.target.value;
    setValue(value.trimStart());
  }

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div>
          <h1>Stream Unlimited Movies Anytime, Anywhere!</h1>
          <div>
            {" "}
            <p>
              Your next favorite movie is just a search away. Explore, watch,
              and enjoy a seamless entertainment experience with MyApp.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-landing">
          <input
            type="search"
            placeholder="Search for movies, shows..."
            value={value}
            onChange={handleChange}
            required
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHG_mlSe0DG88MUouuUWrtOxuZMP5uxLiZnw&s"
            alt=""
            className="search-landing"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
