import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Register";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Verification from "./components/Verification";


export default class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="explore" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    );
  }
}
