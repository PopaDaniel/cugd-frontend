import { Component } from "react";
// import SearchContact from "../SearchContact/SearchContact";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import Select from "react-select";

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      qrcode: false,
      message: "",
      contactsOptions: [],
      sendTo: [],
    };
  }

  sendMessage = async () => {
    let phones = [];
    const message = this.state.message;
    this.state.sendTo.forEach((contact) => {
      phones.push(`+4${contact.value}`);
    });

    // const res = await axios.post(
    //   "http://localhost:3001/send",

    //   {
    //     phones,
    //     message,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    this.setState({
      loading: true,
    });

    const res = await axios.post("http://localhost:3001/send", {
      phones,
      message,
    });
    this.setState({
      qrcode: res.data,
    });
    this.setState({
      loading: false,
    });
  };

  getMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  componentDidMount = () => {
    const contactsList = [];
    const contacts = this.props.contacts;
    contacts.forEach((contact) => {
      contactsList.push({
        value: contact.phoneNumber,
        label: contact.employeeName,
      });
    });
    this.setState({
      contactsOptions: contactsList,
    });
  };

  // getRecepient = (data) => {
  //   //console.log(data);
  // };

  getUserChoice = (choice) => {
    this.setState({
      sendTo: choice,
    });
  };

  render() {
    const colourStyles = {
      control: (styles) => ({ ...styles, width: "500px" }),
    };
    // const { contacts } = this.state;

    return (
      <div className="mt5">
        {!this.state.loading && this.state.qrcode && (
          <div className="tc ma5">
            <div>
              <QRCodeSVG value={this.state.qrcode} />
            </div>
          </div>
        )}
        {/* <SearchContact contacts={contacts} sendMsg={this.getRecepient} /> */}
        <div className="center">
          <Select
            isMulti
            placeholder="Search Contact :"
            name="colors"
            options={this.state.contactsOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={colourStyles}
            onChange={(choice) => this.getUserChoice(choice)}
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
              onChange={this.getMessage}
            ></textarea>
            <div className="tc">
              <input
                onClick={() => this.sendMessage()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Send"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendMessage;
