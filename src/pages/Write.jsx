import React,{useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from 'moment';


const Write = () => {

  

  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  
  const uploadToCloudinary = async() =>{
    try {
      const formData = new FormData();
      formData.append("file",file);
      const res = await axios.post("/api/uploadcloudinary", formData);
      return res.data.url
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  
  const handlePublish = async(e)=>{

    e.preventDefault();
    if(!file) return window.alert("please enter a image for your blog")
    const imgUrl = await uploadToCloudinary();

    try {
      state? await axios.put(`/api/posts/${state.id}`,{title,desc:value,cat,img:imgUrl}) 
      :
      await axios.post(`/api/posts/`,{title,desc:value,cat,img:imgUrl,date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")});
      navigate("/");
    } catch (err) {
      console.log(err)
    }

  }
  

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile((e).target.files[0])} />
            <label className="file" htmlFor="file">Upload Image</label>
            <div className="buttons">
              <button>Save as draft</button>
              <button onClick={handlePublish}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio"  checked={cat === "art"} name="" value="art" id="art" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio"  checked={cat === "science"} name="" value="science" id="science" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio"  checked={cat === "technology"} name="" value="technology" id="technology" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio"  checked={cat === "cinema"} name="" value="cinema" id="cinema" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio"  checked={cat === "design"} name="" value="design" id="design" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio"  checked={cat === "food"} name="" value="food" id="food" onChange={(e)=>setCat(e.target.value)}/>
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Write