import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    /* Temporal hard codded login validation*/
    const user = {loggedIn: true};
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/" />
}

export const RestrictedRoutes = () => {
    const isAuth = useAuth();
    return isAuth == 0 ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes;