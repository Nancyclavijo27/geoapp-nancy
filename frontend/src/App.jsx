import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import RoutesPage from "./pages/RoutesPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import Profile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import MyRoutesPage from "./pages/MyRoutesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PrivateLayout from "./layouts/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/my-routes" element={<MyRoutesPage />} />
          <Route path="/routes/:id" element={<RouteDetailPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 👑 Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
