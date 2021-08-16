import React from "react";
import "./spinner.scss";

const Spinner = ({
  width,
  height,
  color = "#333",
}: {
  width: string;
  height: string;
  color?: string;
}) => {
  return (
    <div
      className="spinner"
      style={{
        width: width + "px",
        height: height + "px",
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Spinner;
