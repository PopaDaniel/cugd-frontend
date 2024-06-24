import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [userName, setUserName] = useState("John Doe");
  const [userPhone, setUserPhone] = useState("077777777");
  const [userEmail, setUserEmail] = useState("test@gmail.com");
  const [userCnp, setUserCnp] = useState("1234567890");
  const [img, setImg] = useState([]);

  return (
    <div className="profile">
      <div className="title">
        <h2>Profile</h2>
      </div>

      <div className="profile-container">
        {img?.map((obj, i) => {
          const base64String = btoa(
            new Uint8Array(obj.img.data.data).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, "")
          );
          return (
            <img
              className="profile-image"
              src={`data:image/png;base64,${base64String}`}
              alt="Profile"
              key={i}
            />
          );
        })}

        <div className="profile-details">
          <p>Full Name:</p>
          <h3>{userName}</h3>

          <p>Phone Number:</p>
          <h3>{userPhone}</h3>

          <p>Email:</p>
          <h3>{userEmail}</h3>

          <p>CNP:</p>
          <h3>{userCnp}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
