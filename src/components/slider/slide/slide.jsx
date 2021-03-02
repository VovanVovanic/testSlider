import React from "react";
import "./slide.scss";

const Slide = ({ content }) => <div className='slide' style = {{background: `url(${content})`}}></div>;

export default Slide;
