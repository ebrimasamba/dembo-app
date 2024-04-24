import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Menu = ({cat, id}) => {

  const [posts, setPosts] = useState([]);
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}&id=${id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[cat,id]);

  if(!posts.length) return ;
  
  

 
  return (
    <div className="menu">
        <h1>Others posts you  may like</h1>
        {posts.map(post =>(
          <div key={post?.id} className="post">
            <Link to={`/post/${post.id}`}>
                <img src={post?.img} alt="" />
                <h2>{post?.title}</h2>
            </Link>
            <button>Read more...</button>
          </div>
        ))}
    </div>
  )
}

export default Menu;