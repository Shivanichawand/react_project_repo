import { useEffect, useState } from "react";
import api from "../apis/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Publications() {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/publications");
      const sorted = res.data.sort((a, b) => b.id - a.id);
      setPubs(sorted);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load publications");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletePub = async (id) => {
    try {
      await api.delete(`/publications/${id}`);
      setPubs(pubs.filter((pub) => pub.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const toggleStatus = async (pub) => {
    try {
      const status = pub.status === "draft" ? "published" : "draft";
      await api.patch(`/publications/${pub.id}`, { publication: { status } });
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to update status");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const colors = ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"];

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: colors[0] }}>
        <p>Loading publications...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>{error}</p>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: colors[4],
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 300, margin: 0, color: colors[0] }}>Publications</h1>
          <Link
            to="/publication/new"
            style={{
              padding: "10px 20px",
              backgroundColor: colors[1],
              color: colors[4],
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Add New
          </Link>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: `1px solid ${colors[1]}`,
              backgroundColor: colors[4],
              color: colors[1],
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* PUBLICATIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {pubs.map((p) => (
          <div
            key={p.id}
            style={{
              width: "95%",
              margin: "0 auto",
              backgroundColor: "rgba(201,173,167,0.8)", // semi-transparent
              border: `1px solid ${colors[2]}`,
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* First Row: Title + Status Chip & Edit/Delete */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Title + Status Chip */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 400, color: colors[0] }}>{p.title}</span>
                <span
                  style={{
                    borderRadius: "12px",
                    border: `1px solid ${colors[1]}`,
                    padding: "3px 8px",
                    fontSize: "10px",
                    fontWeight: 300,
                    color: p.status === "published" ? colors[1] : colors[2],
                    textTransform: "capitalize",
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Edit/Delete Buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  to={`/publications/${p.id}/edit`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `1px solid ${colors[1]}`,
                    color: colors[1],
                    textDecoration: "none",
                  }}
                >
                  <FaEdit size={14} />
                </Link>
                <button
                  onClick={() => deletePub(p.id)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `1px solid ${colors[1]}`,
                    color: colors[1],
                    background: colors[4],
                    cursor: "pointer",
                  }}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <p style={{ fontSize: "14px", lineHeight: "1.4", color: colors[0] }}>{p.content}</p>

            {/* Toggle Status */}
            <button
              onClick={() => toggleStatus(p)}
              style={{
                alignSelf: "flex-start",
                padding: "7px 14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: p.status === "draft" ? colors[1] : colors[2],
                color: colors[4],
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "13px",
              }}
            >
              {p.status === "draft" ? "Publish" : "Unpublish"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
