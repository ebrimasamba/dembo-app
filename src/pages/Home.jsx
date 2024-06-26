import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const cat = useLocation().search;
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/posts${cat}`);
      console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleClick = (id) => {
    const p = document.getElementById(`desc_${id}`);
    p.style.height = "auto";
  };

  if (isLoading) {
    return (
      <ClipLoader
        color="green"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="home">
      <div className="posts">
        {!isLoading &&
          posts.map((post) => (
            <div className="post" key={post?.id}>
              <div className="img">
                <img src={post?.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post?.id}`}>
                  <h1>{post?.title}</h1>
                </Link>
                <p id={`desc_${post?.id}`}>{getText(post?.desc)}</p>
                <button onClick={() => handleClick(post?.id)}>
                  Read more...
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
