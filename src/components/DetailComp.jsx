import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrailerPlayer from "./TrailerPlayer";
import Card1 from "./Card1";

const DetailComp = () => {
  const { title, id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const [toggleSimilar, setToggleSimilar] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [watchlist, setWatchlist] = useState(
    localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : []
  );
  const notify = () => toast("Added to watchlist!");
  console.log(movie);
  // Add to watchlist functionality
  function handleWatchList(id) {
    setWatchlist((prev) => {
      const isPresent = prev.some((item) => item.id === id);
      if (isPresent) {
        return [...prev];
      } else {
        return [...prev, movie];
      }
    });
    notify();
    setTimeout(() => {
      navigate("/Watchlist");
    }, 1000);
  }

  // Store watchlist in local storage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch movie or TV show details
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${title}/${id}?api_key=ee80a7c86039e558402a3e4b3c80fa67&append_to_response=videos,images`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setTrailer(data.videos.results.length ? data.videos.results : []);
      })
      .catch((err) => console.error(err));
  }, [id, title]);

  // Fetch similar movies/shows and trailers
  function handleSimilar() {
    setToggleSimilar((prev) => !prev);
  }

  useEffect(() => {
    if (toggleSimilar === true && similar.length === 0) {
      fetch(
        `https://api.themoviedb.org/3/${title}/${id}/similar?api_key=ee80a7c86039e558402a3e4b3c80fa67&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.results) {
            setSimilar(data.results);
          } else {
            setSimilar([]);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [toggleSimilar, title, id]);

  // Fetch trailer
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/${title}/${id}/videos?api_key=ee80a7c86039e558402a3e4b3c80fa67&language=en-US`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setTrailer(data.results))
  //     .catch((err) => console.error(err));
  // }, [id, title]);

  // Handle trailer button
  function handleTrailer(e) {
    e.preventDefault();
    setIsTrue((prev) => !prev);
  }

  return (
    <>
      <div className="back-arrow-div">
        {" "}
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}>
          {" "}
        </i>
      </div>
      <div
        className="detail-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
        }}
      >
        <div className="flex-details">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt=""
              className="img-trailer"
            />
          </div>
          <div className="info-section">
            <div>
              {" "}
              <h1>{movie?.title || movie?.name}</h1>
              <p className="tagline">
                {movie?.tagline || (
                  <span style={{ color: "red", display: "inline-block" }}>
                    404 error
                  </span>
                )}
              </p>
              {title === "movie" ? (
                <>
                  <p>
                    <strong>Release Date:</strong> {movie?.release_date}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {movie?.runtime} mins
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>First Air Date:</strong> {movie?.first_air_date}
                  </p>
                  <p>
                    <strong>Episode Runtime:</strong>{" "}
                    {movie?.episode_run_time?.[0]} mins
                  </p>
                </>
              )}
              <p>
                <strong>Genres:</strong>{" "}
                {movie?.genres?.map((genre) => genre.name).join(", ") || (
                  <span style={{ color: "red", display: "inline-block" }}>
                    Server error
                  </span>
                )}
              </p>
              <p>
                <strong>Overview:</strong>{" "}
                {movie?.overview || (
                  <span style={{ color: "red", display: "inline-block" }}>
                    Server error
                  </span>
                )}
              </p>
              <p>
                <strong>Rating:</strong> {movie?.vote_average} / 10 (
                {movie?.vote_count} votes)
              </p>
              {movie?.budget && title === "movie" && (
                <p>
                  <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </p>
              )}
              {movie?.revenue && title === "movie" && (
                <p>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </p>
              )}
            </div>{" "}
            <div className="details-btn-wrapper">
              {" "}
              <a
                className="btn-watchlist"
                onClick={() => handleWatchList(movie.id)}
              >
                <i className="fa-solid fa-plus"></i> Add to watchlist
              </a>
              <a className="watch-trailer" onClick={handleTrailer}>
                <i className="fa-solid fa-play"></i>
                {isTrue ? "Close Trailer" : "Play Trailer"}
              </a>
            </div>
          </div>
        </div>
      </div>
      {isTrue ? (
        <TrailerPlayer trailer={trailer} setIsTrue={setIsTrue} />
      ) : null}
      <div style={{ textAlign: "center", margin: "2em 0" }}>
        <a onClick={handleSimilar} className="see-more-btn">
          {" "}
          {toggleSimilar ? "Close " : "View similar results"}
        </a>
      </div>
      {toggleSimilar ? (
        similar.length ? (
          <Card1 movie={similar} identifier={"Similar"} title={title} />
        ) : (
          <div className="loader"></div>
        )
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
};

export default DetailComp;
