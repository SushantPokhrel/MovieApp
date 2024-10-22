import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Stack } from "@mui/material";
export default function Card1({ movie, identifier, title }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const skeletonArray = new Array(20).fill(null);
  return (
    <div>
      <div className="movie-container">
        <h2>{identifier ? "Similar Results" : "Movies"} </h2>
        <div className="flex-movie">
          <div className="card-1-movie-container">
            {movie.length
              ? movie.map((item, index) => {
                  return (
                    <Link to={`/Detail/${title}/${item.id}`} key={item.id}>
                      {item.poster_path ? (
                        <div className="card-1" title="click for more">
                          <img
                            src={`${baseImageUrl}${item.poster_path}`}
                            alt={`img${index}`}
                            className="img-movies"
                          />
                          <div>
                            <h4>{item.title}</h4>
                            <span className="rel-date">
                              {item.release_date}
                            </span>
                            <br />
                            <span className="vote">
                              {item.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <Stack
                          spacing={1}
                          key={index}
                          className="skeleton-small"
                        >
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="100%"
                            animation="wave"
                            className="img-skeleton"
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1.2rem" }}
                          />
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </Stack>
                      )}
                    </Link>
                  );
                })
              : skeletonArray.map((_, index) => {
                  return (
                    <Stack spacing={2} key={index} className="skeleton-small">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                        className="img-skeleton"
                      />
                      <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </Stack>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
