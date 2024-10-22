import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
export default function Upcoming() {
  const [comingSoon, setComingSoon] = React.useState({});
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgwYTdjODYwMzllNTU4NDAyYTNlNGIzYzgwZmE2NyIsIm5iZiI6MTcyOTAwMzk1NC4zNDI2NTgsInN1YiI6IjY3MDkzMGYzZWU5NjE0ODU4NzI0ZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw7c1vQYo5sb4lAfMEMO3pwhwVsulMSlH_rTYoXiX0M",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setComingSoon(response);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="coming-soon">
      <h2>Upcoming Movies</h2>
      <div className="trending-flex">
        {comingSoon.results
          ? comingSoon.results.map((item) => {
              return (
                <Link to={`Detail/movie/${item.id}`} key={item.id}>
                  <Card item={item} baseImageUrl={baseImageUrl} />
                </Link>
              );
            })
          : "no results"}
      </div>
    </div>
  );
}
