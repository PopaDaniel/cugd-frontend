import React, { useState } from "react";
import { useNavigate } from "react-router";

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

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.clear();
    navigate("/");

    setTimeout(() => window.location.reload(), 1200);
    //window.location.reload();
  };

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
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
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
              style={{ display: isOpen ? "block" : "none" }}
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
          onClick={signOut}
          style={{ marginTop: "auto" }}
        >
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Sign Out
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
