import React from "react";
import Slide from "../slide/slide";
import "./content.scss";

const Content = ({ translate, transition, width, arr }) => {
  return (
    <div
      className='content'
      style={{
        width: `${width}px`,
        transform: `translateX(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
      }}
    >
      {arr.map((slide, i) => (
        <Slide key={slide + i} content={slide} />
      ))}
    </div>
  );
};
export default Content;
