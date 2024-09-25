import React from "react";
import Loader from "../public/infinite-spinner.svg";

const GameLoader = () => {
  return (
    <>
      <div className="loader_position">
        <img src={Loader} className="loader" />
        <h3 className="losemsg">Game Loading...</h3>
      </div>
    </>
  );
};

export default GameLoader;
