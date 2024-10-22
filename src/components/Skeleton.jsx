import React from "react";

const Skeleton = () => {
  
  return (
    <div className="skeleton-card" title="click for more">
      <div className="img-skeleton"></div>
      <div>
        <h4 className="h4-skeleton"></h4>
        <span className="rel-date-skeleton"></span>
        <br />
        <span className="vote-skeleton"></span>
      </div>
    </div>
  );
};  

export default Skeleton;
