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
console.log(state.token);
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
      `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
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
           getComments();


 }

 ///// edit comment : 

 const editTheComment = async (comId)=> {
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
         `${process.env.REACT_APP_BASE_URL}/comment/${comId}`,
         {
           id: comId,
           comment: text,
         },
         {
           headers: {
             Authorization: `Bearer ${state.token}`,
           },
         }
       );
        getComments();
     }

 }


 ///// remove comment

 const deleteTheComment = async (comId)=> {
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
           `${process.env.REACT_APP_BASE_URL}/delcomment/${comId}`,
           {
             postID: id,
           },
           {
             headers: {
               Authorization: `Bearer ${state.token}`,
             },
           }
         );
         getComments();
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
     {!state.token ? (
       <h3 className="login"> you have to signe up or Login </h3>
     ) : (
       <>
         <Nav />
         {post.map((ele)=> {
           console.log(ele);
           return (
             <>
               <div className="postDiv">
                 <div>
                   <img id="avatar" src={ele.createdBy.avatar} />
                   <span>{ele.createdBy.userName}</span>
                 </div>

                 <img key={ele._id} src={ele.img} />
                 <textarea
                   id="shareCommentText"
                   placeholder="Write a comment.."
                 onChange={(e)=> setComment(e.target.value)}></textarea>
                 <button onClick={addComment}>Post</button>
               </div>
               {comments.map((com) => {
                 console.log(com);
                 return (
                   <div key={com._id}>
                     <img id="ava" src={com.user.avatar} />

                     <h3>{com.user.userName} </h3>

                     <p key={com._id}>{com.comment} </p>

                     {state.user._id === com.user._id && (
                       <div>
                         <button
                           className="edit"
                           onClick={() => editTheComment(com._id)}
                         >
                           Edit
                         </button>
                         <button
                           className="remove"
                           onClick={() => deleteTheComment(com._id)}
                         >
                           remove{" "}
                         </button>
                       </div>
                     )}
                   </div>
                 );
               })}

              
             </>
           );
         })}
       </>
       
     )}
   </>
 );
  
};

export default Post;

