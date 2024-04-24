import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {

  const [posts, setPosts] = useState([]);


  const cat = useLocation().search;

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        setPosts([])
        const res = await axios.get(`/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const handleClick = (id)=>{
    const p = document.getElementById(`desc_${id}`)
    p.style.height="auto"
  }


  if(!posts?.length){
    return <ClipLoader
    color="green"
    loading={true}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  }
  
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post)=>(
          <div className="post" key={post?.id}>
            <div className="img">
              <img src={post?.img}alt=""/>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post?.id}`} >
                <h1>{post?.title}</h1>
              </Link>
              <p id={`desc_${post?.id}`}>{getText(post?.desc)}</p>
              <button onClick={()=>handleClick(post?.id)} >Read more...</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home


