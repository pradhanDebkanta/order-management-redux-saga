import React from "react";
import "../../assets/css/loader.css"

const MyLoader = () => {
  return (
    <div className="loader_con">
      <div className="loader">
        <div className="loader-inner line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyLoader;
