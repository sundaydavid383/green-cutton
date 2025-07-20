import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./login.css";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleLogin = async () => {
  setError("");
  setSuccess("");

  if (!email || !password) {
    setError("Email and password are required.");
    return;
  }

  if (!isValidEmail(email)) {
    setError("Please enter a valid email.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email,
      password,
    });

    console.log("Login response:", res.data);

    if (res.data.otpRequired) {
      setOtpSent(true); // Show OTP input field
      setSuccess("OTP sent to your email.");
    } else if (res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setSuccess("Login successful!");
    } else {
      setError("Unexpected response from server.");
    }

  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async () => {
  setError("");
  setSuccess("");

  if (!otp || otp.length < 4) {
    setError("Please enter a valid OTP.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
      email,
      otp,
    });

    console.log("OTP response:", res.data);

    if (res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setSuccess("OTP verified and login successful!");
      setOtpSent(false);
    } else {
      setError("OTP verification failed.");
    }

  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("OTP verification error.");
    }
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="loading-text">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <h2 className="h2-dark">Login</h2>

      {error && (
        <div className="alert error-alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="alert success-alert">
          <strong>Success:</strong> {success}
        </div>
      )}

      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn" onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button className="btn" onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Login;