import React from "react";
import Heading from "../../../shared/Heading";
import "./recent.css";
import RecentCard from "../recentCard/RecentCard";

const Recent = () => {
  return (
    <>
      <section className="recent padding">
        <div className="container">
          <Heading
            title="Recent Property Listed"
            subtitle="Recent properties you searched."
          />
          <RecentCard />
        </div>
      </section>
    </>
  );
};

export default Recent;
