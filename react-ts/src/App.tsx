import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  // const [isAuth, setIsAuth] = useState(false)

  // console.log(isAuth);
  return (
    <>
      <Navbar />
      <Routes>
        {/* {isAuth ? ( */}
        <Route path="/home" element={<HomePage />} />
        {/* ) : ( */}
        <Route
          path="/login"
          element={<LoginPage isAuth={undefined} setIsAuth={undefined} />}
        />
        {/* )} */}
      </Routes>
    </>
  );
}

export default App;
