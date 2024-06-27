// EmployeeProfile.js
import React, { useState, useCallback, useEffect } from "react";
import "./EmployeeProfile.css";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFileImage,
  FaTrashAlt,
} from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton";
const EmployeeProfile = () => {
  const { state: userData } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    employeeName: userData.employeeName,
    phoneNumber: userData.phoneNumber,
    cnp: userData.cnp,
    files: userData.files,
  });

  useEffect(() => {
    // Fetch the updated data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://cugd-api.vercel.app/${userData._id}`
        );
        setEditableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userData._id]);

  const handleEditClick = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const newFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newAttachment = {
        contentType: newFile.type,
        data: Array.from(new Uint8Array(reader.result)), // Convert to Array before sending
      };
      setEditableData((prevData) => ({
        ...prevData,
        files: [...prevData.files, newAttachment],
      }));
    };
    reader.readAsArrayBuffer(newFile);
  }, []);

  const handleDeleteAttachment = useCallback((index) => {
    setEditableData((prevData) => ({
      ...prevData,
      files: prevData.files.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://cugd-api.vercel.app/update-employee",
        {
          ...editableData,
          id: userData._id,
        }
      );
      const result = response.data;
      if (result.success) {
        console.log("Data updated successfully:", result);
        setIsEditing(false);
        // Fetch the updated data after saving
        const updatedResponse = await axios.get(
          `https://cugd-api.vercel.app/employees/${userData._id}`
        );
        setEditableData(updatedResponse.data);
      } else {
        console.error("Error updating data:", result.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }, [editableData, userData._id]);

  const getFileIcon = useCallback((contentType) => {
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
  }, []);

  const memoizedAttachments = useCallback(
    () => (
      <div className="attachments">
        {editableData.files?.map((obj, i) => {
          // Handle nested data structure from MongoDB
          const fileDataArray = obj.data.data || obj.data;
          const base64String = btoa(
            new Uint8Array(fileDataArray).reduce((data, byte) => {
              return data + String.fromCharCode(byte);
            }, "")
          );
          const fileSrc = `data:${obj.contentType};base64,${base64String}`;
          const isImage =
            obj.contentType.startsWith("image/png") ||
            obj.contentType.startsWith("image/jpeg") ||
            obj.contentType.startsWith("image/jpg");
          return (
            <div className="attachment-item" key={i}>
              <a href={fileSrc} download={`Attachment_${i}`}>
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
              {isEditing && (
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDeleteAttachment(i)}
                />
              )}
            </div>
          );
        })}
      </div>
    ),
    [editableData.files, getFileIcon, handleDeleteAttachment, isEditing]
  );

  return (
    <div className="tc profile">
      <div className="title">
        <h2 className="ma3">Profile</h2>
        <button className="edit-button" onClick={handleEditClick}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <DeleteButton
          userId={userData._id}
          onDelete={() => console.log("Delete")}
        />
      </div>

      <div className="profile-container">
        <div className="profile-details">
          <p>Full Name:</p>
          {isEditing ? (
            <input
              type="text"
              name="employeeName"
              value={editableData.employeeName}
              onChange={handleChange}
            />
          ) : (
            <h3>{editableData.employeeName}</h3>
          )}

          <p>Phone Number:</p>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={editableData.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <h3>{editableData.phoneNumber}</h3>
          )}

          <p>Cnp:</p>
          {isEditing ? (
            <input
              type="text"
              name="cnp"
              value={editableData.cnp}
              onChange={handleChange}
            />
          ) : (
            <h3>{editableData.cnp}</h3>
          )}

          {isEditing && (
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="attachments-container">
          <p>Attachments:</p>
          {memoizedAttachments()}
          {isEditing && (
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
