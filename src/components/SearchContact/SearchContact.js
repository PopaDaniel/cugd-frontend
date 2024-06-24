//import React, { useState } from "react";

const SearchContact = ({ contacts, sendMsg }) => {
  //const [employeeName, setEmployeeName] = useState("");

  const getContact = (e) => {
    const contact = document.getElementById("send-to");
    const number = document.getElementById("mobil-number");
    number.value += e.target.value;
    contact.value = "";

    sendMsg(e.target.value);
  };

  return (
    <div>
      <div className="tc mt4 mb5">
        <label className="fw5 ma2" htmlFor="contact">
          Search Contact:
        </label>
        <input
          onSelect={getContact}
          placeholder="Type here..."
          id="send-to"
          list="contacts"
        />
        <datalist id="contacts">
          {contacts.map((contact, i) => (
            <option key={i} value={contact.employeeName} />
          ))}
        </datalist>
      </div>
      <div className="tc">
        <label htmlFor="fname">Send to: </label>
        <input id="mobil-number" type="text" size="50" />
      </div>
    </div>
  );
};

export default SearchContact;
