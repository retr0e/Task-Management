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
import Home, { ProjectList } from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

import Overview from "./pages/Overview";
import Project from "./pages/Project";

// Components

import Header from "./components/Header";
import Taskbar from "./components/Taskbar";
import Component from "./TESTERS/placeHolder";

export default function App() {
  const [whichPrivilege, setPrivilege] = useState(4);
  const { loggedIn, setIsAuthenticated } = useAuth();

  const checkPrivilege = async () => {
    const response = await fetch("/api/v1/users/privilege", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.success) {
      setPrivilege(data["userPrivilege"]["privilege"]);
    }
  };

  checkPrivilege();

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

  checkPrivilege();
  // console.log(whichPrivilege);
  return (
    <BrowserRouter>
      {/*<==================Always-Displayed-Element======================>*/}
      <Header
        isAuthenticated={loggedIn}
        handleLogout={handleLogout}
        privilege={whichPrivilege}
      />

      {/*<===================Routes-To-Functionalities==================>*/}
      <Routes>
        {/*<=======================Public-access========================>*/}
        <Route path='/sign-in' element={<SignIn onLogin={handleLogin} />} />
        <Route path='/sign-up' element={<SignUp onLogin={handleLogin} />} />
        <Route path='/tester' element={<Component />} />
        {/*<======================Restricted-access=====================>*/}
        {loggedIn ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<Overview />} />
        )}
        {/* <Route path='/account' element={<Profile handleLogout={handleLogout} />}/> */}

        <Route element={<ProtectedRoutes isAuthenticated={loggedIn} />}>
          <Route 
            path='/profile/:profile_id' 
            element={<Profile />} /> 
          <Route
            path='/projects/:project_id'
            element={<Project privilege={whichPrivilege} />}
          />
          <Route
            path='/project'
            element={<ProjectList />}
          />
        </Route>

        {/*Catch all failed links */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {/* <FormButton/> */}
    </BrowserRouter>
  );
}
