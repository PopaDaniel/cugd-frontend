import { Component } from "react";

class SearchContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.props.contacts,
      employeeName: "",
    };
  }

  getContact = (e) => {
    let contact = document.getElementById("send-to");
    let number = document.getElementById("mobil-number");
    number.value += e.target.value;
    contact.value = "";
    // const contact = e.target.value;
    // for (let i = 0; i < contacts.length; i++) {
    //   if (contacts[i].name === e.target.value) {
    //     number.value += contacts[i].email;
    //   }
    // }
    this.props.sendMsg(e.target.value);
    // this.setState({
    //   employeeName: e.target.value,
    // });
  };
  render() {
    const { contacts } = this.state;

    return (
      <div>
        <div className="tc mt4 mb5">
          <label className="fw5 ma2" htmlFor="contact">
            Search Contact:
          </label>
          <input
            onSelect={this.getContact}
            placeholder="Type here..."
            id="send-to"
            list="contacts"
          />
          <datalist id="contacts">
            {contacts.map((contact, i) => {
              return <option key={i} value={contact.employeeName} />;
            })}
          </datalist>
        </div>
        <div className="tc">
          <label htmlFor="fname">Send to: </label>
          <input id="mobil-number" type="text" size="50" />
        </div>
      </div>
    );
  }
}

export default SearchContact;
