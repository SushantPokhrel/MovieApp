import React from "react";
import TVCard from "./TVCARD.JSX";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

export default function TVComponent() {
  const [tv, setTv] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  const [tvSort, setTvSort] = React.useState([]);
  const [isClicked, setIsClicked] = React.useState(false);
  const [removeBtn, setRemoveBtn] = React.useState(false);
  const skeletonArray = new Array(20).fill(null);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  function handleSort(item) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyOTAwMzk1NC4zNDI2NTgsInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw7c1vQYo5sb4lAfMEMO3pwhwVsulMSlH_rTYoXiX0M",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/tv?&with_genres=${item.id}&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTvSort(response.results);
      })
      .catch((err) => console.error(err));
  }

  // Fetch tv shows
  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyODY1NjE2Mi4wOTI4ODksInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sft9RGIHdHwWP_d7v-m7O2Dsv0bfqf0XdfwAUplhG00",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTv(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch genres
  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyOTAwMzk1NC4zNDI2NTgsInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw7c1vQYo5sb4lAfMEMO3pwhwVsulMSlH_rTYoXiX0M",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => setGenre(response.genres))
      .catch((err) => console.error(err));
  }, []);

  function handleMoreTVShows(e) {
    setIsClicked(true);
    e.preventDefault();
    setTimeout(() => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyODY1NjE2Mi4wOTI4ODksInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sft9RGIHdHwWP_d7v-m7O2Dsv0bfqf0XdfwAUplhG00",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=en-US&page=2&sort_by=popularity.desc",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setTv((prev) => [...prev, ...response.results]);
          setRemoveBtn(true);
        })
        .catch((err) => console.error(err));
    }, 1500);
  }

  return (
    <>
      <div className="tv">
        <div>
          <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
        </div>

        <div className="genre-list">
          <ul className="genre-ul">
            {genre.length
              ? genre.map((item) => {
                  return (
                    <li
                      onClick={() => handleSort(item)}
                      key={item.id}
                      className="genre-item"
                    >
                      {item.name}
                    </li>
                  );
                })
              : skeletonArray.map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    animation="wave"
                    width={80}
                    height={40}
                  />
                ))}
          </ul>
        </div>

        <TVCard baseImageUrl={baseImageUrl} tv={tvSort.length > 0 ? tvSort : tv} />
      </div>

      {removeBtn ? null : (
        <div className="load-more-container">
          <a href="" className="btn-load-more" onClick={handleMoreTVShows}>
            {isClicked ? "Loading..." : " Load More"}
          </a>
        </div>
      )}
    </>
  );
}
