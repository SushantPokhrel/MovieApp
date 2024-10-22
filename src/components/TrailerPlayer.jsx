import React from "react";

const TrailerPlayer = ({ trailer, setIsTrue }) => {
  function handleClose() {
    setTimeout(() => {
      setIsTrue((prev) => !prev);
    }, 500);
  }
  if (!trailer || trailer.length === 0)
    return (
      <p
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        No trailers found for this.
      </p>
    );
  const onlyTrailers = trailer.find((item) => {
    return item.type === "Trailer" || "Featurette||Teaser||Clip";
  });
  console.log(onlyTrailers);

  return (
    <div className="trailer-container">
      <div className="iframe-trailer">
        <span className="close-player" onClick={handleClose}>
          X <small>Close</small>
        </span>
        <iframe
          src={`https://www.youtube.com/embed/${onlyTrailers.key}`}
          title={onlyTrailers.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerPlayer;
