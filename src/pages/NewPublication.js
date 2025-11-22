import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/axios";

export default function NewPublication() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/publications", { title, content, status }, {
        headers: { "Content-Type": "application/json" }
        });
      navigate("/publications");
    } catch (err) {
      setError(err.response?.data?.errors?.join(", ") || "Creation failed");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>New Publication</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* Buttons in one row */}
          <div className="button-row">
            <button
              type="button"
              className="btn back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <button type="submit" className="btn save-btn">
              Save
            </button>
          </div>
        </form>
      </div>

      <style>{`
        :root {
          --dark-blue: #22223b;
          --indigo: #4a4e69;
          --grayish-purple: #9a8c98;
          --light-pink: #c9ada7;
          --off-white: #f2e9e4;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--off-white);
          padding: 20px;
        }

        .form-wrapper {
          background: var(--light-pink);
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px;
          text-align: center;
          box-sizing: border-box;
        }

        .form-wrapper h1 {
          margin-bottom: 20px;
          font-size: 2rem;
          font-weight: 300;
          color: var(--dark-blue);
        }

        .form-wrapper .error {
          color: #ff4d4f;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        .form-wrapper input,
        .form-wrapper textarea,
        .form-wrapper select {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: 1px solid var(--grayish-purple);
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border 0.3s, background 0.3s, color 0.3s;
          background: var(--off-white);
          color: var(--dark-blue);
          box-sizing: border-box;
        }

        .form-wrapper input:focus,
        .form-wrapper textarea:focus,
        .form-wrapper select:focus {
          border-color: var(--indigo);
          background: #fff;
        }

        .form-wrapper textarea {
          min-height: 120px;
          resize: vertical;
        }

        /* Buttons in one row */
        .button-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .btn {
          flex: 1;
          padding: 12px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
          color: var(--off-white);
          background-color: var(--dark-blue);
        }

        .btn:hover {
          background-color: var(--indigo);
        }

        @media (max-width: 480px) {
          .form-wrapper {
            padding: 30px 20px;
          }
          .form-wrapper h1 {
            font-size: 1.5rem;
          }
          .form-wrapper input,
          .form-wrapper textarea,
          .form-wrapper select,
          .btn {
            font-size: 0.95rem;
            padding: 10px;
          }
        }

        @media (max-width: 360px) {
          .form-wrapper {
            padding: 25px 15px;
          }
          .form-wrapper h1 {
            font-size: 1.3rem;
          }
          .form-wrapper input,
          .form-wrapper textarea,
          .form-wrapper select,
          .btn {
            font-size: 0.9rem;
            padding: 8px 10px;
          }
        }
      `}</style>
    </div>
  );
}
