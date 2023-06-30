import React from 'react'
import {
    HomeFilled,
    SearchOutlined,
    BellFilled,
    LinkedinFilled,
    MessageFilled,
    LogoutOutlined,
  } from "@ant-design/icons";
import { Menu, Input, Button } from "antd";
import { Link } from 'react-router-dom';
import {auth} from '../config/firebase'


const Navbar = () => {
  function logout(){
    auth.signOut();
  }
  return (
        <div className="nav-header">
        <div className="homee">
          <nav className="home-header">
            <LinkedinFilled className="filled-logo" />
            <Input prefix={<SearchOutlined />} className="searchbar-home" />
              <Link to='/home' className="navlink">
            <div className="home-icon-header">
              <HomeFilled className="home-icons" />
              <p >Home</p>
            </div>
            </Link>
              <Link to='/notifications' className='navlink'>
            <div className="home-icon-header">
              <BellFilled className="home-icons" />
              <p>Notifications</p>
            </div>
              </Link>
              <Link to='/messages' className="navlink">
            <div className="home-icon-header">
              <MessageFilled className="home-icons" />
              <p>Messages</p>
            </div>
              </Link>
            <div className="home-icon-header" onClick={logout}>
              <LogoutOutlined className="home-icons" />
              Log out
            </div>
          </nav>
        </div>
      </div>
  )
}

export default Navbar