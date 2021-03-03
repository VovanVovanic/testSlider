import React, { useState, useRef, useEffect } from "react";
import Content from "./content/content";
import Arrow from '../arrows/arrows'
import Navigation from '../navigation/navigation'
import "./slider.scss";
import Switcher from "../multiSlideSwitches/switcher";

const Slider = ({ imgsArr }) => {

  const [start, setStart] = useState(0);
  const [arr, setArr] = useState(imgsArr)
  const [state, setState] = useState({
    currentIndex: 0,
    offset: 0,
    transitionDuration: 0.5,
  })


  const switcher = (array, size) => {
    let i = array.length % size;
    if (i) {
      let e = Math.random() * (arr.length - size);
      let r = e.toFixed();
      let copy = arr[r];
      arr.push(copy);
    }
    return Array(Math.ceil(array.length / size))
      .fill()
      .map((_, index) => index * size)
      .map((begin) => array.slice(begin, begin + size));
  };

  const [activeBtn, setActiveBtn] = useState(1);
  const onArrayHandle = (id) => {
    setState({ currentIndex:0, offset: 0, transitionDuration:0,  });
    setActiveBtn(id)
    let res = id === 2 ? switcher(imgsArr, id) : switcher(imgsArr, id).flat()
    setArr(res)

  }

  const divRef = useRef();
  const resizeRef = useRef();

  let [getWidth, setWidth] = useState(1200);
  useEffect(() => {
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
  }, [])
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
    const maxLength = arr.length - 1;
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
      setState({ ...state, transitionDuration: 0 });
    }, duration * 100);
    clearTimeout(moveTimeout);
  };
  const handleBack = () => {
    moveTo(currentIndex + 1, 0.5);
  };
  const handleForward = () => {
    console.log('forward');
    moveTo(currentIndex - 1, 0.5);
  };
  const handleResize = () => {
    setState({ ...state, offset: getWidth * currentIndex, transitionDuration: 0 });
  };
  const toDefineSlide = (index) => {
    moveTo(index, 1.5)
  }
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
        width={getWidth * arr.length}
        arr={arr}
        amount={activeBtn}
      ></Content>

      {currentIndex !== arr.length - 1 && (
        <Arrow variant={"left"} handleMove={handleBack}>
          back
        </Arrow>
      )}

      {currentIndex !== 0 && (
        <Arrow variant={"right"} handleMove={handleForward} />
      )}
      <Navigation
        arr={arr}
        toDefineSlide={toDefineSlide}
        activeSlide={currentIndex}
      />
      <Switcher active={activeBtn} onArrayHandle={onArrayHandle} />
    </div>
  );
};

export default Slider;


