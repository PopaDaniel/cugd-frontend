import React, { Component } from "react";
import {
  FaTh,
  FaBars,
  FaUsers,
  FaUserPlus,
  FaCommentAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  constructor({ children }) {
    super();
    this.state = {
      isOpen: false,
      children: children,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.clear();
    //setTimeout(() => window.location.reload(), 1200);
    window.location.reload();
  };

  render() {
    const menuItem = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaTh />,
      },
      {
        path: "/employees",
        name: "Employees",
        icon: <FaUsers />,
      },
      {
        path: "/addemployee",
        name: "Add new employee",
        icon: <FaUserPlus />,
      },
      {
        path: "/sendmessage",
        name: "Send Message",
        icon: <FaCommentAlt />,
      },
      {
        path: "/profile",
        name: "Profile",
        icon: <FaUserCircle />,
      },
      // {
      //   path: "/login",
      //   name: "Sign Out",
      //   icon: <FaUserCircle />,
      // },
    ];

    return (
      <div className="container">
        <div
          style={{ width: this.state.isOpen ? "200px" : "50px" }}
          className="sidebar"
        >
          <div className="top_section">
            <h1
              style={{ display: this.state.isOpen ? "block" : "none" }}
              className="logo"
            >
              Logo
            </h1>
            <div
              style={{ marginLeft: this.state.isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={this.toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{
                  display: this.state.isOpen ? "block" : "none",
                }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <NavLink
            to=""
            className="link"
            activeclassname="active"
            onClick={this.signOut}
            style={{ marginTop: "auto" }}
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div
              style={{ display: this.state.isOpen ? "block" : "none" }}
              className="link_text"
            >
              Sign Out
            </div>
          </NavLink>
        </div>
        <main>{this.state.children}</main>
      </div>
    );
  }
}

export default Sidebar;
