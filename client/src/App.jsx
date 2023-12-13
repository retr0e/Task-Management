import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Projects from "./pages/Projects";
import Overview from "./pages/Overview";

// Components
import Error from "./pages/Error";
import Header from "./components/Header";
import Taskbar from "./components/Taskbar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/users/logout");
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(false);
      } else {
        console.error("Logout error:", data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <Routes>
        {isAuthenticated ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<Overview />} />
        )}
        <Route path='/sign-in' element={<SignIn onLogin={handleLogin} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/projects' element={<Projects />} />
            </ProtectedRoutes>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

function NoPage() {
  return (
    <div className=''>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
