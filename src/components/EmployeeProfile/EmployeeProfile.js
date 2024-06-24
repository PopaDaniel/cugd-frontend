import { useLocation } from "react-router-dom";
import React from "react";
import "./EmployeeProfile.css";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFileImage,
} from "react-icons/fa";

const EmployeeProfile = () => {
  const { state: userData } = useLocation();

  const getFileIcon = (contentType) => {
    switch (contentType) {
      case "application/pdf":
        return <FaFilePdf className="file-icon" />;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <FaFileWord className="file-icon" />;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return <FaFileExcel className="file-icon" />;
      case "image/png":
      case "image/jpeg":
      case "image/jpg":
        return <FaFileImage className="file-icon" />;
      default:
        return <FaFileAlt className="file-icon" />;
    }
  };

  return (
    <div className="tc profile">
      <div className="title">
        <h2 className="ma3">Profile</h2>
      </div>

      <div className="profile-container">
        <div className="profile-details">
          <p>Full Name:</p>
          <h3>{userData.employeeName}</h3>

          <p>Phone Number:</p>
          <h3>{userData.phoneNumber}</h3>

          <p>Cnp:</p>
          <h3>{userData.cnp}</h3>
        </div>

        <div className="attachments-container">
          <p>Attachments:</p>
          <div className="attachments">
            {userData.files?.map((obj, i) => {
              const base64String = btoa(
                new Uint8Array(obj.data.data).reduce((data, byte) => {
                  return data + String.fromCharCode(byte);
                }, "")
              );
              const fileSrc = `data:${obj.contentType};base64,${base64String}`;
              const isImage =
                obj.contentType.startsWith("image/png") ||
                obj.contentType.startsWith("image/jpeg") ||
                obj.contentType.startsWith("image/jpg");
              return (
                <a
                  href={fileSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    const newWindow = window.open();
                    newWindow.document.write(
                      `<iframe src="${fileSrc}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
                    );
                  }}
                >
                  {isImage ? (
                    <img
                      className="attachment-image"
                      src={fileSrc}
                      alt={`Attachment ${i}`}
                    />
                  ) : (
                    getFileIcon(obj.contentType)
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
