import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {  useSelector } from "react-redux";
import Nav from "./../NavBar";
import axios from "axios";
import "./style.css";

const Posts = () => {
  let [posts, setPosts] = useState([]);
  let [comments, setComments] = useState([]);

const state = useSelector((state) => {
  return {
    token: state.Login.token,
    user : state.Login.user
  };
});

  useEffect(() => {
    getPosts();
    getComments();
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

  const getComments = async ()=>{
    try{
      const comments = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
        
      );setComments(comments.data);

    }catch(error){
      console.log(error);

    }
  }

  return (
    <>
      <div>
        {!state.token ? (
          <div className="wrapper">
            <h1>
              {" "}
              You Have to <Link to="/signup"> Sign Up </Link> or{" "}
              <Link to="/"> Login </Link>{" "}
            </h1>
          </div>
        ) : (
          <div className="explore" >
           <Nav/>
            {posts.map((post) => {
              console.log(post);
              return (
                <div className="card" key={post._id}>
                  <div className="post-header">
                    <Link to={`/post/${post._id}`}>
                      <img src={post.img} />
                      <h3>{post.title}</h3>
                    </Link>
                    
                  </div>
                  {comments.map((comment)=>{
                    console.log(comments);
                    return (
                      <ul>
                        <li key={comment._id}>{} </li>
                      </ul>
                    );
                  })}
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
