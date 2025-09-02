import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import Content from "./components/Content";
import DriversManager from "./components/ManagerDrivers";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // بررسی localStorage هنگام mount
    return !!localStorage.getItem("encryptedTokens");
  });

  const handleLogout = () => {
    localStorage.removeItem("encryptedTokens");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        <Route element={<ProtectedRoute onLogout={handleLogout} />}>
          <Route
            element={
              <ProtectedLayout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          >
            <Route path="/" element={<Content />} />
            <Route path="/drivers" element={<DriversManager />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
