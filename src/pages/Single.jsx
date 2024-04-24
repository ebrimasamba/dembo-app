import { Link, useLocation, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import editImg from "../img/edit.png";
import deleteImg from "../img/delete.png";
const Single = () => {

  const navigate = useNavigate();

  const {currentUser}  = useContext(AuthContext)

  const [post, setPost] = useState({});

  const location = useLocation();  
 
  const postId = location.pathname.split("/")[2];

  useEffect(()=>{
      const fetchData = async()=>{
        try {
          const res = await axios.get(`/api/posts/${postId}`);
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    },[postId]);


    const handleDelete = async ()=>{
      try {
        await axios.delete(`/api/posts/${postId}`)
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
    }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt=""/>
        <div className="user">
          {post.userImg && <img src={post.userImg} alt=""/>}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={editImg} alt="edit"/>
            </Link>
              <img onClick={handleDelete} src={deleteImg} alt="delete"/>
          </div>}
        </div>  
          <h1>{post.title}</h1>
          {getText(post.desc)}
      </div>
     <Menu cat={post.cat} id={postId} />
    </div>
  )
}

export default Single;