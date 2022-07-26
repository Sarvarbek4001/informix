import React, { useContext } from "react";
import "./App.scss";
import LandingPage from "./page/landingPage";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./page/login/login";
import AuthContext from "./context/AuthenticationContext";
import Admin from "./page/admin/admin";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {ctx.isLoggedIn && <Route path="/admin/*" element={<Admin />} />}
      </Routes>
    </div>
  );
}

export default App;
