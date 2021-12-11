import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {  useSelector } from "react-redux";
import axios from "axios";
import "./style.css";

const Posts = () => {
  let [posts, setPosts] = useState([]);

const state = useSelector((state) => {
  return {
    token: state.Login.token,
    user : state.Login.user
  };
});

  useEffect(() => {
    getPosts();
  }, []);


  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }); setPosts(res.data)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
        {!state.token ? (
          <div className="wrapper">
            <h1>
              {" "}
              You Have to <Link to="signup"> Sign Up </Link> or{" "}
              <Link to="/"> Login </Link>{" "}
            </h1>
          </div>
        ) : (
          <div className="explore" >
           
            {posts.map((post) => {
              console.log(post.title);
              return (
                <div className="card" key={post._id}>
                  <div className="post-header">
                      <img src={post.img} />
                    <h3>{post.title}</h3>
                  </div>
                </div>
              );
             
            //   <img {post.img}/>
            })}
          </div>
        )}
      </div>
      
    </>
  );

  
 
  
};

export default Posts;
