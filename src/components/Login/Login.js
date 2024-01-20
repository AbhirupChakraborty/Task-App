import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setEmailError(email ? "" : "Email is required");
    setPasswordError(password ? "" : "Password is required");
    if (email && password) {
      navigate("/list");
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
          <input
            className="iconEmail"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="field">
          <label className="p">Password</label>
          <div className="password-container">
            <input
              className="iconPassword"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button className="forget-password">Forget Password?</button>
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div>
          <button className="loginButton" onClick={handleLogin}>
            Log In
          </button>
        </div>
        <a id="sso">or login with SSO</a>
      </div>
      <div className="helpDiv">
        <button id="help">Help</button>
      </div>
      <div id="footer">
        <text>
          Don't have a account?
          <a>
            <u>Sign Up</u>
          </a>
        </text>
      </div>
      <div id="lastLine">
        <text>
          This site is protected by reCAPTCHA and the Google
          <a>
            <u>Privacy Policy</u>
          </a>
          and
          <a>
            <u>Terms of Service</u>
          </a>
          apply
        </text>
      </div>
    </div>
  );
}
export default Login;
