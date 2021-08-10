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
      style={{ width, height, backgroundColor: color }}
    ></div>
  );
};

export default Spinner;
