import React from "react";
import styles from "./nav.scss";

const Navigation = ({ arr, activeSlide, toDefineSlide }) => {
  const navItems = arr.map((el, i) => {
    let active = activeSlide === i ? "black" : "white";
    return (
      <span
        key={el}
        className={'navItem'}
        style={{ background: `${active}` }}
        onClick={() => toDefineSlide(el, i)}
      />
    );
  });
  return <div className={"navigation"}>{navItems}</div>;
};
export default Navigation;
