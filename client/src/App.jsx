import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";
import { ProtectedRoutes, useAuth } from "./ProtectedRoutes";

// Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

import Overview from "./pages/Overview";
import Project from "./pages/Project";

// Components

import Header from "./components/Header";
import Taskbar from "./components/Taskbar";
import FormButton from "./components/FormButton";

export default function App() {
  const { loggedIn, setIsAuthenticated } = useAuth();

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
      {/*<==================Always-Displayed-Element======================>*/}
      <Header isAuthenticated={loggedIn} handleLogout={handleLogout} />

      {/*<===================Routes-To-Functionalities==================>*/}
      <Routes>
        {/*<=======================Public-access========================>*/}
        <Route path='/sign-in' element={<SignIn onLogin={handleLogin} />} />
        <Route path='/sign-up' element={<SignUp onLogin={handleLogin} />} />
        {/*<======================Restricted-access=====================>*/}
        {loggedIn ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<Overview />} />
        )}
        {/* <Route path='/account' element={<Profile handleLogout={handleLogout} />}/> */}

        <Route element={<ProtectedRoutes isAuthenticated={loggedIn} />}>
          <Route path='/about' element={<About />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/project/:project_id' element={<Project />} />
        </Route>

        {/*Catch all failed links */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {/* <FormButton/> */}
    </BrowserRouter>
  );
}
