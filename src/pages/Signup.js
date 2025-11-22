import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../apis/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/signup", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation, 
      });
      localStorage.setItem("token", res.data.token);
      navigate("/publications");
    } catch (err) {
      setError(err.response?.data?.errors?.join(", ") || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>

      <style jsx="true">{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f2e9e4;
          padding: 20px;
        }

        .signup-box {
          background: #c9ada7;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 2rem;
          color: #22223b;
        }

        .error {
          color: #9a8c98;
          margin-bottom: 15px;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .signup-form input {
          padding: 12px 15px;
          font-size: 1rem;
          border: 1px solid #9a8c98;
          border-radius: 8px;
          outline: none;
          background-color: #f2e9e4;
          color: #22223b;
          transition: border 0.3s ease;
        }

        .signup-form input:focus {
          border-color: #4a4e69;
        }

        .signup-form button {
          padding: 12px 15px;
          font-size: 1rem;
          background-color: #22223b;
          color: #f2e9e4;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .signup-form button:hover {
          background-color: #4a4e69;
        }

        .login-link {
          margin-top: 15px;
          font-size: 0.9rem;
          color: #22223b;
        }

        .login-link a {
          color: #4a4e69;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link a:hover {
          color: #22223b;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-box {
            padding: 30px 20px;
          }

          .signup-form input {
            padding: 10px;
          }

          .signup-form button {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
