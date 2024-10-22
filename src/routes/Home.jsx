import React from "react";
import Landing from "../components/Landing";
import Trending from "../components/Trending";
import ViewTrailer from "../components/ViewTrailers";
import Upcoming from "../components/Upcoming";

export default function Home() {
 
  return (
    <div>
      <Landing />
      <Trending />
      <ViewTrailer />
      <Upcoming />
    </div>
  );
}
