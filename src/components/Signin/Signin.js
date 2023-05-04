import { Component } from "react";
import "./Signin.css";
import { setLocalStorage } from "../../helpers/localStorage";
import axios from "axios";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }
  componentDidMount() {
    document.body.classList.add("background-linear-gradient");
  }

  componentWillUnmount() {
    document.body.classList.remove("background-linear-gradient");
  }

  getUser = (e) => {
    this.setState({
      user: e.target.value,
    });
  };

  getUserPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  signIn = async () => {
    const res = await axios.post(
      "https://casutaursitoarelor-api.onrender.com/signin",
      {
        user: this.state.user,
        password: this.state.password,
      }
    );
    const jwt = res.data.token;
    setLocalStorage("jwt", jwt);
    this.props.getUserJwt(jwt);
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Username">
                  Username
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="user"
                  name="Username"
                  id="Username"
                  onChange={this.getUser}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.getUserPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.signIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
