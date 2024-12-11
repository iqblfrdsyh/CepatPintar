import React from "react";
import BoltIcon from "./boltIcon";


const LoadingBolt = () => {
  return (
    <figure className="flex justify-center my-10 animate-pulse">
      <BoltIcon />
    </figure>
  );
};

export default LoadingBolt;
