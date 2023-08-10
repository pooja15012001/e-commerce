import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TagIcon from "@mui/icons-material/Tag";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router";
import Home from "./menu/Homepage";
import { Box } from "@mui/material";
import Aboutus from "./menu/Aboutus";

export default function Menu() {
  const [clickable, setclickable] = useState(false);

  function handleClick() {
    setclickable(true);
  }
  return (
    <div className="main-div-aside">
      <div className="div" onClick={handleClick}>
        <div className="h1-menu">
          <h1 style={{ borderBottom: "2px solid #464242" }}>Menu</h1>
        </div>
        <div className="home-icon">
          <div>
            <HomeIcon />
          </div>

          <div>
            <span className="span">home</span>
          </div>
        </div>
        <div className="search-icon">
          <div>
            <SearchIcon />
          </div>

          <div>
            <span className="span">Search</span>
          </div>
        </div>
        <div className="chat-icon">
          <div>
            <ChatIcon />
          </div>

          <div>
            <span className="span">Chat</span>
          </div>
        </div>
        <div className="notification-icon">
          <div>
            <NotificationsIcon />
          </div>

          <div>
            <span className="span">Chat</span>
          </div>
        </div>
        <div className="tag-icon">
          <div>
            <TagIcon />
          </div>

          <div>
            <span className="span">Tag</span>
          </div>
        </div>
        <div className="communties-icon">
          <div>
            <Diversity3Icon />
          </div>

          <div>
            <span className="span">communties</span>
          </div>
        </div>
        <div className="theme-icon">
          <div>
            <ToggleOnIcon />
          </div>

          <div>
            <span className="span">Turn off light</span>
          </div>
        </div>
        <div className="profile-icon">
          <div>
            <AccountBoxIcon />
          </div>

          <div>
            <span className="span">Profile</span>
          </div>
        </div>
      </div>
      <div >
        {clickable ? (
          <div>
            <Home />
          </div>
        ) : (
          <Home/>
        )}
      </div>
      <div className="about-us">
        <Aboutus/>
       
        
      </div>
    </div>
  );
}
