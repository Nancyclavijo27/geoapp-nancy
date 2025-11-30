import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/UserProfile";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Login y Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home interno */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />

        {/* Perfil protegido */}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
