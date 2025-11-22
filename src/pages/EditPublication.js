import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/axios";

export default function EditPublication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load publication data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/publications/${id}`);
        const pub = res.data.publication || res.data;
        setTitle(pub.title);
        setContent(pub.content);
        setStatus(pub.status);
        setError("");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 404
            ? "Publication not found"
            : "Failed to load publication"
        );
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/publications/${id}`, {
        publication: { title, content, status },
      });
      navigate("/publications");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.errors
          ? err.response.data.errors.join(", ")
          : "Failed to update publication"
      );
    }
  };

  if (loading) return <p className="loading">Loading publication...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Edit Publication</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Buttons in one row */}
          <div className="button-row">
            <button
              type="button"
              className="btn"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f2e9e4;
          color: #22223b;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .form-wrapper {
          background-color: #c9ada7;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }

        h2 {
          margin-bottom: 20px;
          color: #22223b;
          text-align: center;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        label {
          margin-bottom: 5px;
          font-weight: 600;
          color: #22223b;
        }

        input,
        textarea,
        select {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #9a8c98;
          border-radius: 6px;
          outline: none;
          transition: border 0.3s;
          background-color: #f2e9e4;
          color: #22223b;
        }

        input:focus,
        textarea:focus,
        select:focus {
          border-color: #4a4e69;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* Buttons in one row */
        .button-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .btn {
          flex: 1;
          background-color: #22223b;
          color: #f2e9e4;
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn:hover {
          background-color: #4a4e69;
        }

        .loading,
        .error {
          text-align: center;
          color: #22223b;
          font-size: 18px;
        }

        .error {
          color: #9a8c98;
        }

        @media (max-width: 600px) {
          .form-wrapper {
            padding: 30px 20px;
          }

          input,
          textarea,
          select,
          .btn {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
