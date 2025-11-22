import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/publications");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <button
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, html, #root {
          height: 100%;
          font-family: Arial, sans-serif;
          background-color: #f2e9e4;
          color: #22223b;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .login-box {
          background: #c9ada7;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-title {
          margin-bottom: 20px;
          color: #22223b;
        }

        .error {
          color: #9a8c98;
          margin-bottom: 15px;
        }

        .login-form input {
          width: 100%;
          padding: 12px 15px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #9a8c98;
          font-size: 16px;
          background-color: #f2e9e4;
          color: #22223b;
          outline: none;
          transition: border 0.3s ease;
        }

        .login-form input:focus {
          border-color: #4a4e69;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background-color: #22223b;
          color: #f2e9e4;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .login-btn:hover {
          background-color: #4a4e69;
        }

        .signup-text {
          margin-top: 15px;
          font-size: 14px;
          color: #22223b;
        }

        .signup-btn {
          background: none;
          border: none;
          color: #4a4e69;
          cursor: pointer;
          font-weight: bold;
          padding: 0;
          margin-left: 5px;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .signup-btn:hover {
          color: #22223b;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 20px;
          }

          .login-form input {
            padding: 10px;
          }

          .login-btn {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
