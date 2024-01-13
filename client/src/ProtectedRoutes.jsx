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

// DO NOT TOUCH THIS DEMON
// export const usePriv = async () => {
//   const [whatPrivilege, setPrivilege] = useState();

//   useEffect(() => {
//     const checkPrivilege = async () => {
//       const response = await fetch("/api/v1/users/privilege", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();

//       if (data.success) {
//         setPrivilege(data["userPrivilege"]["privilege"]);
//       } else {
//         setPrivilege(4);
//       }
//     };

//     checkPrivilege();
//   });

//   return { privilege: whatPrivilege, setPrivilege };
// };

export const ProtectedRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};
