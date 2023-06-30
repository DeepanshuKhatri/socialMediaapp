import React from "react";
import { Menu, Input, Button } from "antd";
import {
  HomeFilled,
  SearchOutlined,
  BellFilled,
  LinkedinFilled,
  MessageFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="container">
      <div>
      <Navbar/>
      </div>
      <div className="home-layout" >
        <div className="recent-homepage">
          <p>recent</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
