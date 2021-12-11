// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import "./style.css";

// const Posts = () => {
//   let [posts, setPosts] = useState([]);

// const state = useSelector((state) => {
//   return {
//     Login: state.Login,
//   };
// });

//   useEffect(()=>{
//       getPosts();
//       console.log(posts);
//   },[])
//   const getPosts = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
//         headers: {
//           Authorization: `Bearer ${state.Login.token}`,
//         },
//       }); setPosts(res.data)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return 

//   <div>
//       {!state.Login.token? (
       
//           <div className="wrapper"> 
//           <h1> You Have to  <Link to="signup"> Sign Up </Link> or <Link to="/"> Login </Link> </h1>
         
// ): (

// )

//           </div>
//       )}
//       <div className="post">
//           {posts.map((post)=>{
              
//  <h1>{post.title}</h1>

//           })}

         
//       </div>
//   </div>
  
// };

// export default Posts;
