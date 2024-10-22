import React from "react";
// import Card from "./Card";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
const Card = React.lazy(() => import("./Card"));
const Trending = () => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const [trending, setTrending] = React.useState([]);
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
        setTrending(response.results);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="trending-container">
      <h2>Trending Movies</h2>
      <div className="trending-flex">
        {trending && trending.length > 0
          ? trending.map((item) => {
              return (
                <Link to={`Detail/movie/${item.id}`} key={item.id}>
                  <React.Suspense
                    fallback={
                      <div>
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={200}
                        />
                        <Skeleton variant="text" sx={{fontSize:"1.5rem"}}/>
                        <Skeleton variant="text" />
                      </div>
                    }
                  >
                    <Card item={item} baseImageUrl={baseImageUrl}/>
                  </React.Suspense>
                </Link>
              );
            })
          : "no results"}
      </div>
    </div>
  );
};

export default Trending;
