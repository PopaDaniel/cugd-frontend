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
import "../../App.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    setTimeout(() => window.location.reload(), 1200);
  };

  const menuItem = [
    { path: "/dashboard", name: "Dashboard", icon: <FaTh /> },
    { path: "/employees", name: "Employees", icon: <FaUsers /> },
    { path: "/addemployee", name: "Add New Employee", icon: <FaUserPlus /> },
    { path: "/sendmessage", name: "Send Message", icon: <FaCommentAlt /> },
    { path: "/profile", name: "Profile", icon: <FaUserCircle /> },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="top-section">
          <h1 className={`logo ${isOpen ? "" : "hide"}`}>Logo</h1>
          <div className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
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
            <div className={`link-text ${isOpen ? "" : "hide"}`}>
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className="link sign-out" onClick={signOut}>
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div className={`link-text ${isOpen ? "" : "hide"}`}>Sign Out</div>
        </div>
      </div>
      <main className={`main ${isOpen ? "shifted" : ""}`}>{children}</main>
    </div>
  );
};

export default Sidebar;
