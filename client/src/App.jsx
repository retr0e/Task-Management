import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes            from "./ProtectedRoutes";

/* Pages */
import Home     from "./pages/Home";
import SignUp   from "./pages/SignUp";
import About    from "./pages/About";
import Profile  from "./pages/Profile";
import SignIn   from "./pages/SignIn";
import Projects from "./pages/Projects";
import Error    from "./pages/Error"

/* Components */
import Header   from "./components/Header";
import Taskbar  from "./components/Taskbar";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/create-user-account' element={<SignUp />} />
        <Route element={<ProtectedRoutes/>}>
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/projects' element={<Projects />} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

function NoPage() {
  return (
    <div className="">
    
      <h2 >Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
