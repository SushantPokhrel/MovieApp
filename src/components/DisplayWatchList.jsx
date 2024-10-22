import React from "react";
import { Link } from "react-router-dom";
const DisplayWatchList = () => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const [list, setList] = React.useState(
    localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : []
  );
  function handleRemove(id) {
    setList((prev) => {
      return prev.filter((item) => {
        return item.id != id;
      });
    });
  }
  React.useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(list));
  }, [list]);
  return (
    <div className="watchlist">
      <h2>{!list?.length ? "" : "Your Watch List"}</h2>
      <div className="watchlist-card-container">
        {list?.length ? (
          list.map((item) => {
            
            return (
              <div key={item.id} className="watchlist-card">
                <div className="img-container-watchlist">
                  <img
                    src={`${baseImageUrl}${item.poster_path}`}
                    alt="not available"
                  />
                </div>
                <div className="col-watchlist">
                  <h3>{item.title}</h3>
                  <p>{item.overview}</p>
                  <p>
                    <strong>Release:</strong> {item.release_date}
                  </p>
                  <p>
                    <strong>Tagline:</strong> {item.tagline}
                  </p>
                  <p>
                    <strong>Voting average:</strong> {item.vote_average}
                  </p>
                  <p>
                    <strong>Count:</strong>
                    {item.vote_count}
                  </p>
                  <p>
                    <strong>Runtime:</strong>
                    {item.runtime} mins.
                  </p>
                </div>
                <div>
                  <span
                    className="rmv-watchlist"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", padding: "8em 0" }}>
            <h3>No items in your watchlist</h3>
            <Link to="/Movies" style={{ textDecoration: "underline" }}>
              Explore 
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWatchList;
