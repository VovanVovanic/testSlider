import React from 'react' 
import './arrow.scss'

const Arrow = ({ variant, handleMove }) => {
  return <span className={`arrow ${variant}`} onClick={()=>handleMove()}></span>;
}

export default Arrow