import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch("/api/v1/users/check_authentication", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

         /* const res2 = await fetch("/api/v1/users/privilege", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         }); */
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return { loggedIn: isAuthenticated, setIsAuthenticated };
};

export const usePriv = () => {
  const [isPrivilaged, setIsPrivilaged] = useState(false);
  useEffect(() => {
    const checkPrivilage = async() => {
      try{
        const response = await fetch("/api/v1/users/privilege", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.json();
        data.result['privilage'];

      }catch(error){
        console.error("Authentication check error:", error);
        setIsPrivilaged(false)
      };
    };
    checkPrivilage();
  },[]);
  return {privilage: isPrivilaged, setIsPrivilaged};
};




































export const ProtectedRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};


