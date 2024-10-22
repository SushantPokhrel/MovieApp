import React from "react";
import Card1 from "./Card1";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const MovieComponent = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [removeBtn,setRemoveBtn] = React.useState(false);
  const [movie, setMovie] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  const [movieSort, setMovieSort] = React.useState([]);
  const skeletonArray = new Array(20).fill(null);
  const navigate = useNavigate();

  function handleSort(item) {
    // Sort by genre logic
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyOTAwMzk1NC4zNDI2NTgsInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw7c1vQYo5sb4lAfMEMO3pwhwVsulMSlH_rTYoXiX0M",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?&with_genres=${item.id}&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setMovieSort(response.results);
      })
      .catch((err) => console.error(err));
  }

  // Fetch call for movie list random
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovie(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch call for movie genres list
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

  function handleMoreMovies(e) {
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
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results);
          setMovie((prev) => [...prev, ...response.results]);
          setRemoveBtn(true)
        })
        .catch((err) => console.error(err));
    }, 1500);
  }
  return (
    <>
      <div className="movie">
        <div>
          <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}>
            {" "}
          </i>
        </div>
        {/* Display all genres */}
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
              : skeletonArray.map((_, index) => {
                  return (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      animation="wave"
                      width={80}
                      height={40}
                    />
                  );
                })}
          </ul>
        </div>
        <Card1
          movie={movieSort.length > 0 ? movieSort : movie}
          title={"movie"}
        />
      </div>
        { removeBtn ? null :<div className="load-more-container">
        <a href="" className="btn-load-more" onClick={handleMoreMovies}>
          {isClicked ? "Loading..." : " Load More"}
        </a>
      </div>}
    </>
  );
};

export default MovieComponent;
