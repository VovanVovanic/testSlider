import React from "react";
import "./slide.scss";

const Slide = ({ content }) => <div className='slide' style = {{backgroundImage: `url(${content})`}}></div>;

export default Slide;
