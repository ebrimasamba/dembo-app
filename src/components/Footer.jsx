import React from 'react';
import blog from '../img/blog.png';


const Footer = () => {
  return (
   <footer>
    <img src={blog} alt=""/>
    <span>Made with <span className='emoji'>❤</span> and <b>React</b></span>
   </footer>
  )
}

export default Footer