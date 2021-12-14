import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import Nav from "./../NavBar";
import axios from "axios";
import Swal from "sweetalert2";
import { RiAddFill } from "react-icons/ri";
import "./style.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  ///// 
   useEffect(() => {
     if (description.trim().length > 0) {
       addPost();
       setUrl("");
       setDescription("");
     }
     // eslint-disable-next-line
   }, [description]);


   //////

  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
//////

  const getComments = async () => {
    try {
      const comments = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setComments(comments.data);
    } catch (error) {
      console.log(error);
    }
  };
//////

  const handleUpload = (image) => {
    // console.log("image :", image);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            // console.log(url);
          });
      }
    );
  };
  /////

  const handleInput = async () => {
    const { value: file } = await Swal.fire({
      title: "Add New Meme",
      input: "file",
      inputLabel: "Choose an image from your machine",
      showCancelButton: true,
      confirmButtonText: "Post",
      confirmButtonColor: "#E07A5F",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your image",
      },
    });

    if (file) handleUpload(file);

    const { value: text } = await Swal.fire({
      title: "Add New Post",
      input: "textarea",
      inputPlaceholder: "Enter your description here...",
      inputAttributes: {
        "aria-label": "Enter your description here",
      },
      showCancelButton: true,
      confirmButtonText: "Post",
      confirmButtonColor: "#E07A5F",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (text) setDescription(text);
  };


  /////

  const addPost = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post`,
        {
          desc: description,
          img: url,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {!state.token ? (
          <div className="wrapper">
            <h1 className="login">
              You Have to <Link to="/signup"> Sign Up </Link> or
              <Link to="/"> Login </Link>
            </h1>
          </div>
        ) : (
          <div className="exWrapper">
            <div className="explore">
              <Nav />
              <div className="memeBtn">
                <button onClick={handleInput}>
                  {" "}
                  <RiAddFill className="grAdd" />
                  Add Meme
                </button>
              </div>
              {posts.map((post) => {
                console.log(post);
                return (
                  <div className="card" key={post._id}>
                    <div className="post-header">
                      <Link to={`/post/${post._id}`}>
                        <div>
                          <img id="avatar" src={post.createdBy.avatar} />
                          <span>{post.createdBy.userName}</span>
                        </div>
                        <img src={post.img} />
                        <div>
                          <span>{post.createdBy.userName}</span>
                         
                            <p>{post.title}</p>
                         
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
