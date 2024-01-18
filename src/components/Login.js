import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
    } else {
      alert("Both fields are mandatory");
    }
  };
  return (
    <div className="loginPage">
      <div id="header">
        <small>Don't have a account? </small>
        <button className="signUp"> Sign up </button>
      </div>
      <div id="loginCard">
        <h3>Welcome back!</h3>
        <div className="field">
          <label className="p">Email</label>
          <br />
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="p">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Link to="/list">
            <button className="loginButton" onClick={handleLogin}>
              Log In
            </button>
          </Link>
        </div>
        <a href="#" id="sso">
          {" "}
          or login with SSO{" "}
        </a>
      </div>
      {/* <div>
                <button id='help'>Help</button>
            </div> */}
      {/* <div id="footer">
                <text>Don't have a account? <a href="#"> <u>SignUp</u></a></text>
            </div> */}
      <div id="lastLine">
        <text>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#">
            <u>Privacy Policy</u>
          </a>{" "}
          and{" "}
          <a href="#">
            <u>Terms of Service</u>
          </a>{" "}
          apply
        </text>
      </div>
    </div>
  );
}
export default Login;
