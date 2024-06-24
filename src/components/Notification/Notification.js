import React, { useEffect } from "react";

const Notification = ({ message, type, onClose, failedNumbers }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: type === "success" ? "green" : "red",
    padding: "0.2rem",
    textAlign: "center",
    color: "white",
  };

  return (
    <div style={notificationStyle}>
      <div className="mw6 pa3 br3">
        <p className="f4">{message}</p>
        {failedNumbers && failedNumbers.length > 0 && (
          <div>
            <p className="f5">Failed to send to:</p>
            <ul className="list pl0">
              {failedNumbers.map((fail, index) => (
                <li key={index} className="f6">
                  {fail.number}: {fail.error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt3 b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Notification;
