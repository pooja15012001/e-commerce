import React from "react";
import Home from "../Components/Home";
// import PostList from './Post'
import "../../src/css/Main.css";
import Example from "../Components/Example";
// import Trydata from '../Trydata'
import Imagestoring from "../Imagestoring";

export default function Main() {
  return (
    <div className="div-flex">
      <div>
        {/* <PostList/> */}
        {/* <Trydata/> */}
      </div>
      <div>
        {/* <Home/> */}
        <Imagestoring />
      </div>
    </div>
  );
}
