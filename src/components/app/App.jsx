
import React from "react";
import "./App.scss";
import Slider from '../slider/slider'

const imgArr = [
  "https://images.pexels.com/photos/262325/pexels-photo-262325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/3016350/pexels-photo-3016350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1070970/pexels-photo-1070970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733205/pexels-photo-733205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6623924/pexels-photo-6623924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/5507235/pexels-photo-5507235.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/6732764/pexels-photo-6732764.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2331019/pexels-photo-2331019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

function App() {
/////this script below allows you to export all images from the folder into an array
  function importAllImages(r) {
    return r.keys().map(r);
  }
  let res = importAllImages(require.context(`../images`, false, /\.(png|jpe?g|svg)$/))
/////and pass this array into Slider props
  return (
    <div className='container'>
      <Slider imgsArr={imgArr} />
    </div>
  );
}

export default App;
