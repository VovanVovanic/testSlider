import ReactDOM from "react-dom";

import App from "./components/app/App";
import './index.scss'
ReactDOM.render(<App />, document.getElementById("root"));


let arr = [1, 2, 3, 4, 5, 6, 7]
const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size))

    console.log(array_chunks(arr, 2));