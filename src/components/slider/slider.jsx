import React, { useState, useRef, useEffect } from "react";
import Content from "./content/content";
import "./slider.scss";

const Slider = ({ imgsArr }) => {

  const [start, setStart] = useState(0);
  const [state, setState] = useState({
    currentIndex: 0,
    offset: 0,
    transitionDuration: 0.5,
  })
  
  const divRef = useRef();
  const resizeRef = useRef();

  let [getWidth, setWidth] = useState(1000);
  useEffect(() =>{
    resizeRef.current = handleResize
  })
  useEffect(() => {
     const resize = () => {
       setWidth(divRef.current.clientWidth);
       resizeRef.current()
    }
    const resizeEnd = window.addEventListener("resize", resize)
    return () => {
    window.removeEventListener("resize", resizeEnd);
    }
},[])
  const { currentIndex, offset, transitionDuration } = state;

  const onTouchStart = (e) => {
    setStart(e.nativeEvent.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    const dist = start - e.nativeEvent.touches[0].clientX;
    setStart(e.nativeEvent.touches[0].clientX);
    onOffset(dist);
  };
  const onTouchEnd = () => {
    onOffsetEnd();
    setStart(0);
  };

  const onOffset = (dist) => {
    const maxLength = imgsArr.length - 1;
    let nextOffset = offset + dist;
    if (nextOffset <= 0) {
      nextOffset = 0;
    }
    if (nextOffset > maxLength * getWidth) {
      nextOffset = maxLength * getWidth;
    }
    setState({
      ...state,
      offset: nextOffset,
      transitionDuration: 0,
    });
  };

  const onOffsetEnd = () => {
    const finalPosition = offset / getWidth;
    const finalPart = finalPosition % 1;
    const finalIndex = finalPosition - finalPart;
    const deltaIndex = finalIndex - currentIndex;
    let nextIndex = finalIndex;
    if (deltaIndex >= 0) {
      if (finalPart >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaIndex < 0) {
      nextIndex = currentIndex - Math.abs(deltaIndex);
      if (finalPart > 0.9) {
        nextIndex += 1;
      }
    }
    moveTo(nextIndex, Math.min(0.5, 1 - Math.abs(finalPart)));
  };
  const moveTo = (index, duration) => {
    setState({
      currentIndex: index,
      offset: index * getWidth,
      transitionDuration: `${duration}`,
    });
    const moveTimeout = setTimeout(() => {
      setState({...state, transitionDuration: 0 });
    }, duration * 100);
    clearTimeout(moveTimeout);
  };
  const handleBack = () => {
    moveTo(currentIndex + 1, 0.5);
  };
  const handleForward = () => {
    moveTo(currentIndex - 1, 0.5);
  };
  const handleResize = () => {
    setState({ ...state, offset: getWidth, transitionDuration: 0 });
  };
  return (
    <div
      className="slider"
      ref={divRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Content
        translate={offset}
        transition={transitionDuration}
        width={getWidth * imgsArr.length}
        arr={imgsArr}
      ></Content>

      {currentIndex !== imgsArr.length - 1 && (
        <button className="goLeft" onClick={handleBack}>
          back
        </button>
      )}

      {currentIndex !== 0 && (
        <button className="goRight" onClick={handleForward}>
          forward
        </button>
      )}
    </div>
  );
};

export default Slider;
