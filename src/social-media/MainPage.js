import React from "react";
import { Button, colors } from "@mui/material";
import main from "../images/main.png";
import logo from "../images/logo.jpg";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import "../../src/css/Main.css";
import Home from "../Components/Home";
import Menu from "./Menu";
import "../../src/css/Menu.css";
import { useNavigate } from "react-router";

export default function MainPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="main" style={{ height: "760px" }}>
        <nav>
          <div className="main-page-nav">
            <div className="logo">
              <span className="img-span">
                <img src={logo}></img>
              </span>
            </div>
            <div>
              <Button className="login-button">LOG IN</Button>
              <Button
                className="logout-button"
                style={{
                  backgroundColor: "rgba(46, 125, 50, 1)",
                  color: "white",
                }}
                onClick={() => handleLogout()}
              >
                SIGN UP
              </Button>
            </div>
          </div>
        </nav>
        <div>
          <div>
            <div className="section-div">
              <div className="section-left-div">
                <img src={main} />
              </div>
              <div className="section-right-div">
                <h1 className="growth">Growth</h1>
                <h5>Swap tips for finding users and customers</h5>
              </div>
            </div>
            <div className="section-post">
              <div className="div-post">
                <Button
                  className="new-postbutton"
                  style={{
                    background: "rgba(46, 125, 50, 1)",
                    color: "white",
                  }}
                >
                  New POST
                </Button>
                <Button
                  className="join-group-button"
                  style={{
                    background: "rgba(46, 125, 50, 1)",
                    color: "white",
                  }}
                >
                  Join Group
                  <div>
                    <ControlPointIcon />
                  </div>
                </Button>
              </div>
              <div
                className="div-menu"
                style={{ position: "relative", top: "50px" }}
              >
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
