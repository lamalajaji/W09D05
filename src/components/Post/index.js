import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../NavBar";
import { useParams } from "react-router";
import "./style.css";
const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState([]);



    const state = useSelector((state) => {
      return {
        token: state.Login.token,
        user: state.Login.user,
      };
    });

useEffect(() => {
    getThePost();
  getComments();
  
}, [])

////
const getThePost = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    setPost(res.data);
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
 const favMeme =  async() => {
     await axios.post(
       `${process.env.REACT_APP_BASE_URL}/like/${id}`,
       {
         like
       },
       {
         headers: {
           Authorization: `Bearer ${state.token}`,
         },
       }
     );
     getThePost();
 }

 const addComment = async ()=> {
     await axios.post(
       `${process.env.REACT_APP_BASE_URL}/comment`,
       {
         comment,
         postID: id,
       },
       {
         headers: {
           Authorization: `Bearer ${state.token}`,
         },
       }
     );
     getThePost();

 }

 ///// edit comment : 

 const editTheComment = async ()=> {
     const { value: text } = await Swal.fire({
       title: "Enter your Comment",
       input: "textarea",
       inputPlaceholder: "Type your comment here...",
       inputAttributes: {
         "aria-label": "Type your new comment here",
       },
       showCancelButton: true,
       confirmButtonText: "Edit",
       confirmButtonColor: "#E07A5F",
       cancelButtonText: "Cancel",
       reverseButtons: true,
     });

     if (text) {
       await axios.put(
         `${process.env.REACT_APP_BASE_URL}/comment/:id`,
         {
            id,
            comment
         },
         {
           headers: {
             Authorization: `Bearer ${state.token}`,
           },
         }
       );
       getThePost();
     }

 }


 ///// remove comment

 const deleteTheComment = async (commentId)=> {
     Swal.fire({
       title: " Are You Sure?",
       text: "you couldn't revert your comment again!",
       icon: "warning",
       iconColor: "#D11A2A",
       showCancelButton: true,
       confirmButtonText: "Delete!",
       confirmButtonColor: "#D11A2A",
       cancelButtonText: "No, cancel",
       reverseButtons: true,
     }).then(async (result) => {
       if (result.isConfirmed) {
         await axios.put(
           `${process.env.REACT_APP_BASE_URL}/delcomment/${commentId}`,
           {
             postID: id,
           },
           {
             headers: {
               Authorization: `Bearer ${state.token}`,
             },
           }
         );
         getThePost();
         Swal.fire({
           title: "Comment Has Been Deleted!",
           icon: "success",
           confirmButtonText: "OK",
           confirmButtonColor: "#E07A5F",
         });
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire({
           title: "Cancelled",
           icon: "error",
           confirmButtonText: "OK",
           confirmButtonColor: "#E07A5F",
         });
       }
     });
 }







 return (
   <>
   {!state.token? (
       <h3> you have to signeUp or Login </h3>
   ): (
       <>
       <Nav/>
       {post.map((ele)=> {
           return (
             <>
               <div className="meme-img">
                 <img key={ele._id} src={ele.img} />
                 <div>
                   <button onClick={favMeme}>Fav</button>
                   <div className="comment-section">
                     <textarea
                       id="shareCommentText"
                       placeholder="Write a comment.."
                       onChange={(e) => setComment(e.target.value)}
                     ></textarea>
                     <button onClick={addComment}>Add</button>
                   </div>
                 </div>
               </div>
             </>
           );
       })}
       </>
   )}

   </>
 )
  
};

export default Post;
