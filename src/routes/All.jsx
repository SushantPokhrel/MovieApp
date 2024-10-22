import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../context/Context";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
export default function All() {
  const { searchResult } = useContext(Context);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const skeletonArray = new Array(10).fill(null);
  const navigate = useNavigate();
  return (
    <>
    
      <div style={{ padding: "0.5em 0" }}>
        {" "}
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}>
          {" "}
        </i>
      </div>
      <div className="all-header">
        <h2>Your search result:</h2>
      </div>
      <div className="div-all">
        {searchResult && searchResult.length > 0
          ? searchResult.map((item, index) => {
              if (!item.poster_path) {
                return;
              }
              return (
                <Link
                  to={`/All/Detail/${item.media_type}/${item.id}`}
                  key={item.id}
                >
                  <div className="card-1">
                    <img
                      src={`${baseImageUrl}${item.poster_path}`}
                      alt={`img${index}`}
                      className="img-movies"
                      style={{ fontStyle: "italic" }}
                    />
                    <div>
                      <h4>{item.title || item.name}</h4>
                      <span className="rel-date" >
                        {item.release_date || item.first_air_date}
                      </span>
                      <br />
                      <span className="vote">
                        {Math.round(item.vote_average) || 7}
                      </span>
                    </div>
                  </div>
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
    </>
  );
}
