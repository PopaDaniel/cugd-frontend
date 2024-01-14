import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import Select from "react-select";

const SendMessage = ({ contacts }) => {
  //const [loading, setLoading] = useState(false);
  const [qrcode, setQRCode] = useState(false);
  const [message, setMessage] = useState("");
  const [contactsOptions, setContactsOptions] = useState([]);
  const [sendTo, setSendTo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/qrcode");
        if (data) {
          //setLoading(true);
          setQRCode(data);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        //setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sendMessage = async () => {
    let phones = [];
    sendTo.forEach((contact) => {
      phones.push(`4${contact.value}@c.us`);
    });

    //setLoading(true);
    console.log(phones);
    try {
      await axios.post("https://casutaursitoarelor-api.onrender.com/send", {
        phones,
        message,
      });
      //setQRCode(res.data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      //setLoading(false);
    }
  };

  const getMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const contactsList = contacts.map((contact) => ({
      value: contact.phoneNumber,
      label: contact.employeeName,
    }));
    setContactsOptions(contactsList);
  }, [contacts]);

  const colourStyles = {
    control: (styles) => ({ ...styles, width: "500px" }),
  };

  return (
    <div className="mt5">
      {qrcode && (
        <div className="tc ma5">
          <div>
            <QRCodeSVG value={qrcode} />
          </div>
        </div>
      )}
      <div className="center">
        <Select
          isMulti
          placeholder="Search Contact :"
          name="colors"
          options={contactsOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          styles={colourStyles}
          onChange={(choice) => setSendTo(choice)}
        />
      </div>
      <div className="pa4 black-80 center">
        <div>
          <label htmlFor="message" className="tc f6 b db mb2">
            Message
          </label>

          <textarea
            id="message"
            name="message"
            className="db border-box hover-black  measure ba b--black-20 pa2 br2 mb2"
            aria-describedby="message-desc"
            rows="13"
            style={{ width: "500px" }}
            onChange={getMessage}
          ></textarea>
          <div className="tc">
            <input
              onClick={sendMessage}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
