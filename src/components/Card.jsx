import React from "react";

function Card({item,baseImageUrl}) {
  return (
    <div  className="card" title="click to view">
      <img
        src={`${baseImageUrl}${item.poster_path}`}
        alt="images"
        className="img-trending"
      />
      <div>
        <h4>{item.title}</h4>
        <span className="rel-date">{item.release_date}</span> <br />
        <span className="vote">{item.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default Card;
