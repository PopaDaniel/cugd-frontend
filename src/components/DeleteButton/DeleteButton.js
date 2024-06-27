import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./DeleteButton.css";

Modal.setAppElement("#root"); // Set the app root element for accessibility

const DeleteButton = ({ userId, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://cugd-api.vercel.app/delete/${userId}`
      );
      if (response.status === 200) {
        onDelete();
        closeModal();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <button onClick={openModal} className="delete-button">
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Are you sure you want to delete this user?</h2>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="modal-delete-button">
            Yes, Delete
          </button>
          <button onClick={closeModal} className="modal-cancel-button">
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
