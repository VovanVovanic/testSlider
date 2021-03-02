import React, { useState } from "react";
import Content from "./content/content";
import "./slider.scss";

const Slider = ({ imgsArr }) => {

  const IMG_WIDTH = 1000;
  const [start, setStart] = useState(0);
  const [state, setState] = useState({
    currentIndex: 0,
    offset: 0,
    transitionDuration: 0.5,
  })
  
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
    if (nextOffset > maxLength * IMG_WIDTH) {
      nextOffset = maxLength * IMG_WIDTH;
    }
    setState({
      ...state,
      offset: nextOffset,
      transitionDuration: 0,
    });
  };

  const onOffsetEnd = () => {
    const finalPosition = offset / IMG_WIDTH;
    const finalPart = finalPosition % 1;
    const finalIndex = finalPosition - finalPart;
    const deltaInteger = finalIndex - currentIndex;
    let nextIndex = finalIndex;
    if (deltaInteger >= 0) {
      if (finalPart >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInteger < 0) {
      nextIndex = currentIndex - Math.abs(deltaInteger);
      if (finalPart > 0.9) {
        nextIndex += 1;
      }
    }
    moveTo(nextIndex, Math.min(0.5, 1 - Math.abs(finalPart)));
  };
  const moveTo = (index, duration) => {
    setState({
      currentIndex: index,
      offset: index * IMG_WIDTH,
      transitionDuration: `${duration}`,
    });
    const moveTimeout = setTimeout(() => {
      setState({ transitionDuration: 0 });
    }, duration * 100);
    clearTimeout(moveTimeout);
  };
  const handleBack = () => {
    moveTo(currentIndex + 1, 0.5);
  };
  const handleForward = () => {
    moveTo(currentIndex - 1, 0.5);
  };

  return (
    <div
      className="slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Content
        translate={offset}
        transition={transitionDuration}
        width={IMG_WIDTH * imgsArr.length}
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
