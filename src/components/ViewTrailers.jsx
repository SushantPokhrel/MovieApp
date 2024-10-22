import React from "react";
import TrailerPlayer from "./TrailerPlayer";

export default function ViewTrailer() {
  const [movies, setMovies] = React.useState([]);
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
        const movies = response.results;

        // Map through the movies and return the array of promises
        const moviePromises = movies.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item.id}/videos?language=en-US`,
            options
          )
            .then((response) => response.json())
            .then((videoResponse) => {
              // console.log(videoResponse.results);
              // Return an object combining movie and its videos
              return {
                ...item,
                result: videoResponse.results,
              };
            })
        );
        // console.log(moviePromises); // not yet resolved
        // Wait for all video fetches to complete
        Promise.all(moviePromises)
          .then((moviesWithVideos) => {
            console.log(moviesWithVideos);
            setMovies(moviesWithVideos);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="trailer-home">
      <h2>Latest Trailers</h2>
      <div className="trailers-swipeable">
        {movies && movies.length > 0
          ? movies.map((item, index) => {
              // console.log(item);
              if (item.result.length === 0) {
                return;
              }
              return (
                <div className="trailer-home-card" key={index}>
                  <h3 style={{textAlign:"center"}}>{item.title}</h3>
                  <iframe
                    width="310"
                    height="270"
                    src={`https://www.youtube.com/embed/${item.result[0].key}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
