import React from 'react' 
import './switcher.scss'

const Switcher = ({ active, onArrayHandle }) => {

  const btns = [1, 2].map((el, i) => {
    let isActive = el === active && "active";
    return (
      <button
        key={el}
        className={`btn draw-border ${isActive}`}
        onClick={() => onArrayHandle(el)}
      >
        {el}
      </button>
    );
  });
  return <div className="switcher">{btns}</div>;
};
export default Switcher