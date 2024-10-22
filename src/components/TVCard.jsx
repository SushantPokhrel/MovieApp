import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
export default function TVCard({ tv, baseImageUrl }) {
  const skeletonArray = new Array(20).fill(null);
  console.log(tv)
  return (
    <div>
      <div className="movie-container">
        <h2>Popular TV Shows</h2>
        <div className="flex-movie">
          <div className="card-1-movie-container">
            {tv.length
              ? tv.map((item, index) => {
                  return (
                    <Link to={`/Detail/tv/${item.id}`} key={item.id}>
                      <div className="card-1" title="click for more">
                        <img
                          src={`${baseImageUrl}${item.poster_path}`}
                          alt={`img${index}`}
                          className="img-movies"
                        />
                        <div>
                          <h4>{item.name}</h4>
                          <span className="rel-date">
                            {item.first_air_date}
                          </span>
                          <br />
                          <span className="vote">
                            {item.vote_average.toFixed(1)}
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
        </div>
      </div>
    </div>
  );
}
