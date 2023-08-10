import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import SignUp from "./social-media/Signup";
import Signin from "./social-media/Signin";
import Home from "./Components/Home";
import SignIn from "./social-media/Signin";
import Error from "./social-media/Error";
// import fetchPosts from './social-media/Post';
import PostList from "./Components/Post";
import Main from "./social-media/Main";
import MainPage from "./social-media/MainPage";
import Extra from "./Components/Extra";
import Crud from "./Components/crud";


export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Error />}></Route>
          <Route path="/posts" element={<PostList />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/extra" element={<Crud/>}></Route>
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}
