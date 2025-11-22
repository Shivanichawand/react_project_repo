// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publications from "./pages/Publications";
import NewPublication from "./pages/NewPublication";
import EditPublication from "./pages/EditPublication";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/publications"
          element={token ? <Publications /> : <Navigate to="/login" />}
        />
        <Route
          path="/publication/new"
          element={token ? <NewPublication /> : <Navigate to="/login" />}
        />
        <Route
          path="/publications/:id/edit"
          element={token ? <EditPublication /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
