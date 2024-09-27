import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import GuestRoute from "./middlewares/GuestRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute isAuthenticated={!!token}>
              <LoginPage />
            </GuestRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
