import React from "react";
import ExploreBox from "../../components/explore/ExploreBox";
import TopSearch from "../../components/layouts/TopSearch";

const Explore = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopSearch />
      <ExploreBox />
    </div>
  );
};

export default Explore;
