import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../NavBar";
import {  useNavigate, useParams } from "react-router";
import "./style.css";



const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [comment, setComment] = useState([]);
    const [desc , setDesc] = useState("")
 const [url, setUrl] = useState("");
    const navigate = useNavigate();



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

 useEffect(() => {
   if (desc.trim().length > 0) {
     editThePost();
     setUrl("");
     setDesc("");
   }
 }, [desc]);




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
 const favMeme = async (likeState) => {
   await axios.post(
     `${process.env.REACT_APP_BASE_URL}/like/${id}`,
     {
       like: likeState,
     },
     {
       headers: {
         Authorization: `Bearer ${state.token}`,
       },
     }
   );
   if (likeState) setIsLike(true);
   else setIsLike(false);

   getThePost();
 };

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
       text: "you'll couldn't reveise your comment again!",
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

 //// delete a post

const deleteThePost = async()=> {
  try {
    Swal.fire({
    title: " Are You Sure?",
    text: "you'll couldn't reveise your post again!!",
    icon: "warning",
    iconColor: "#D11A2A",
    showCancelButton: true,
    confirmButtonText: "Delete!",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/postDel/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      navigate("/explore");
      Swal.fire({
        title: "Post Has Been Deleted!",
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

  } catch(error) {
    console.log(error);
  }
  
}

///////// update a post

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


////////// 
 const handleUpdatedInputs = async () => {
   await Swal.fire({
     title: "Enter your new meme",
     input: "file",
     inputLabel: "Upload your image from your machine",
     showCancelButton: true,
     confirmButtonText: "Next",
     confirmButtonColor: "#E07A5F",
     cancelButtonText: "Cancel",
     reverseButtons: true,
     inputAttributes: {
       accept: "image/*",
       "aria-label": "Upload your image",
     },
   }).then(async (status) => {
     if (status.isConfirmed && status.value) handleUpload(status.value);
     if (status.isConfirmed) {
       await Swal.fire({
         title: "Update Your Post",
         input: "textarea",
         inputPlaceholder: "Type your description here...",
         inputAttributes: {
           "aria-label": "Type your description here",
         },
         showCancelButton: true,
         confirmButtonText: "Post",
         confirmButtonColor: "#E07A5F",
         cancelButtonText: "Cancel",
         reverseButtons: true,
       }).then((status) => {
         if (status.isConfirmed && status.value) setDesc(status.value);
       });
     }
   });
 };



/////
const editThePost = async() => {
await axios.put(
  `${process.env.REACT_APP_BASE_URL}/post/${id}`,
  {
    desc,
    img: url ? url : post.img,
  },
  {
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  }
);
getThePost();
}
//////










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
                   onChange={(e) => setComment(e.target.value)}
                 ></textarea>
                 <button onClick={() => addComment()}>Post</button>
                 {ele.createdBy._id === state.user._id && (
                   <div>
                     <button onClick={() => handleUpdatedInputs()}>
                       edit post
                     </button>
                     <button onClick={deleteThePost}>remove post</button>
                     {/* {isLike ? (
                       <button onClick={favMeme(false)}> Like </button>
                     ) : (
                       <button onClick={favMeme(true)}> Like </button>
                     )} */}
                   </div>
                 )}
               </div>
               {comments.map((com) => {
                 //  console.log(com);
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

