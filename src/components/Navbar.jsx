import React, { useContext } from 'react'
import blog from '../img/blog.png';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/authContext'

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
           <img src={blog} alt="blog"/>
          </Link>
        </div>
        <div className="links">
          <Link to="/?cat=art" className="link">
            <h6>ART</h6>
          </Link>
          <Link to="/?cat=science" className="link">
            <h6>SCIENCE</h6>
          </Link>
          <Link to="/?cat=technology" className="link">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to="/?cat=cinema" className="link">
            <h6>CINEMA</h6>
          </Link>
          <Link to="/?cat=design" className="link">
            <h6>DESIGN</h6>
          </Link>
          <Link to="/?cat=food" className="link">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser? (<span onClick={()=>logout(navigate)}>Logout</span>) : (<Link className="link" to="/login">Login</Link>)}
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;