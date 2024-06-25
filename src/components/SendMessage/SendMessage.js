import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import Select from "react-select";
import Notification from "../Notification/Notification";
import "./SendMessage.css";

const SendMessage = ({ contacts }) => {
  const [qrcode, setQRCode] = useState(null);
  const [message, setMessage] = useState("");
  const [contactsOptions, setContactsOptions] = useState([]);
  const [sendTo, setSendTo] = useState([]);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Checking connection...");
  const [qrTimeout, setQrTimeout] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
    failedNumbers: [],
  });

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/status");
        setConnected(response.data.connected);
        setStatus(
          response.data.connected ? "Connected to WhatsApp" : "Not connected"
        );
        if (response.data.connected && qrTimeout) {
          clearTimeout(qrTimeout);
          setQrTimeout(null);
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
        setStatus("Error checking connection status");
      }
    };

    checkConnectionStatus();
    const interval = setInterval(checkConnectionStatus, 5000);
    return () => clearInterval(interval);
  }, [qrTimeout]);

  const fetchQRCode = async () => {
    try {
      const response = await axios.get("http://localhost:3001/connect");
      if (response.data.qr) {
        setQRCode(response.data.qr);
        setStatus("Scan the QR code");

        const timeout = setTimeout(fetchQRCode, 30000);
        setQrTimeout(timeout);
      } else {
        setStatus(response.data.message);
      }
    } catch (error) {
      console.error("Error connecting:", error);
      setStatus("Error connecting");
    }
  };

  const handleConnect = async () => {
    clearTimeout(qrTimeout);
    setQrTimeout(null);
    fetchQRCode();
  };

  const handleDisconnect = async () => {
    try {
      const response = await axios.get("http://localhost:3001/disconnect");
      setStatus(response.data.message);
      setConnected(false);
      setQRCode(null);
      setSendTo([]);
      setMessage("");
    } catch (error) {
      console.error("Error disconnecting:", error);
      setStatus("Error disconnecting");
    }
  };

  useEffect(() => {
    if (connected) {
      const contactsList = contacts.map((contact) => ({
        value: contact.phoneNumber,
        label: contact.employeeName,
      }));
      setContactsOptions(contactsList);
    }
  }, [contacts, connected]);

  const sendMessage = async () => {
    let phones = sendTo.map((contact) => `4${contact.value}@c.us`);

    try {
      const res = await axios.post("http://localhost:3001/send", {
        phones,
        message,
      });
      if (res.data.failed && res.data.failed.length > 0) {
        setNotification({
          show: true,
          message: "Some messages failed to send",
          type: "error",
          failedNumbers: res.data.failed,
        });
      } else {
        setNotification({
          show: true,
          message: "Messages sent successfully",
          type: "success",
          failedNumbers: [],
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNotification({
        show: true,
        message: "Error sending messages",
        type: "error",
        failedNumbers: error.response?.data.failed || [],
      });
    }
  };

  const getMessage = (e) => {
    setMessage(e.target.value);
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, width: "500px" }),
  };

  return (
    <div className="send-message mt5">
      <div className="status-container">
        <div className={`status-dot ${connected ? "green" : "red"}`}></div>
        <p className="status-text">{status}</p>
      </div>
      {!connected && (
        <div className="connection-section tc ma5">
          <div>
            {qrcode ? (
              <>
                <QRCodeSVG value={qrcode} className="qr-code" />
                <p className="status mt3">{status}</p>
              </>
            ) : (
              <button onClick={handleConnect} className="connect-button">
                Connect
              </button>
            )}
          </div>
        </div>
      )}
      {connected && (
        <>
          <div className="disconnect-section tr pr4">
            <button onClick={handleDisconnect} className="disconnect-button">
              Disconnect
            </button>
          </div>
          <div className="contacts-select center">
            <Select
              isMulti
              placeholder="Search Contact :"
              name="contacts"
              options={contactsOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={colourStyles}
              onChange={(choice) => setSendTo(choice)}
            />
          </div>
          <div className="message-section pa4 black-80 center">
            <div className="message-container">
              <label htmlFor="message" className="message-label tc f6 b db mb2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="message-textarea"
                aria-describedby="message-desc"
                rows="13"
                style={{ width: "500px" }}
                onChange={getMessage}
              ></textarea>
              <div className="send-button-container tc">
                <input
                  onClick={sendMessage}
                  className="send-button"
                  type="submit"
                  value="Send"
                />
              </div>
            </div>
          </div>
        </>
      )}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({
              show: false,
              message: "",
              type: "",
              failedNumbers: [],
            })
          }
          failedNumbers={notification.failedNumbers}
        />
      )}
    </div>
  );
};

export default SendMessage;
