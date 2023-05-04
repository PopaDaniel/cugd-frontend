import { Component } from "react";
import "./Profile.css";
//import logo from "../Profile/img.png";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPhone: "077777777",
      userEmail: "test@gmail.com",
      userCnp: "1234567890",
      img: [],
    };
  }

  // async componentDidMount() {
  //   const fetchData = await fetch("http://localhost:3000/");
  //   const data = await fetchData.json();
  //   const imgData = [data[0]];
  //   this.setState({
  //     userName: data[0].managerName,
  //     img: imgData,
  //   });
  // }
  render() {
    const img = this.props.manager.img;
    const name = this.props.manager.name;
    return (
      <div className="tc profile">
        <div className="title">
          <h2 className="ma3">Profile</h2>
        </div>

        <div className="profile-contanier">
          {img?.map((obj, i) => {
            const base64String = btoa(
              new Uint8Array(obj.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, "")
            );
            return (
              <img
                className="mb2 v-mid br-100"
                src={`data:image/png;base64,${base64String}`}
                alt="img"
                style={{ width: "370px", height: "370px" }}
                key={i}
              />
            );
          })}

          <div className="profile-details">
            <p>Full Name:</p>
            <h3>{name}</h3>

            <p>Phone Number:</p>
            <h3>{this.state.userPhone}</h3>

            <p>Email:</p>
            <h3>{this.state.userEmail}</h3>

            <p>Cnp:</p>
            <h3>{this.state.userCnp}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
