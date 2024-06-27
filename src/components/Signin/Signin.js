import React, { useState, useEffect } from "react";
import "./Signin.css";
import { setLocalStorage } from "../../helpers/localStorage";
import axios from "axios";

const Signin = ({ getUserJwt }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add("background-linear-gradient");
    return () => {
      document.body.classList.remove("background-linear-gradient");
    };
  }, []);

  const getUser = (e) => {
    setUser(e.target.value);
  };

  const getUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://cugd-api.vercel.app/signin", {
        user,
        password,
      });
      const jwt = res.data.token;
      setLocalStorage("jwt", jwt);
      getUserJwt(jwt);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signin-container">
      <article className="signin-card">
        <main className="signin-main">
          <div className="signin-form">
            <fieldset className="signin-fieldset">
              <legend className="signin-legend">Sign In</legend>
              <div className="signin-input-container">
                <label className="signin-label" htmlFor="Username">
                  Username
                </label>
                <input
                  className="signin-input"
                  type="text"
                  name="Username"
                  id="Username"
                  value={user}
                  onChange={getUser}
                />
              </div>
              <div className="signin-input-container">
                <label className="signin-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="signin-input"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={getUserPassword}
                />
              </div>
            </fieldset>
            <div className="signin-button-container">
              <button onClick={signIn} className="signin-button">
                Sign in
              </button>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Signin;
