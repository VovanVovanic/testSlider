import React from "react";
import "./slide.scss";

const Slide = ({ content, amount }) => {
  if (amount === 2) {
  return (
    <div className = 'double'>
      {content.map((el) => {
        return (
          <div key={el} style={{ backgroundImage: `url(${el})` }}></div>
        );
      })}
    </div>
  );
}
  return (
    <div className="slide" style={{ backgroundImage: `url(${content})` }}></div>
  )
}

export default Slide;
