import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ isAuthenticated, handleLogout }) {
  const [privilege, setPrivilege] = useState(4);

  const checkPrivilege = async () => {
    try {
      const response = await fetch("/api/v1/users/privilege");
      const data = await response.json();

      if (data.success) {
        setPrivilege(data["userPrivilege"]["privilege"]);
      } else {
        setPrivilege(4);
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkPrivilege();

  return(
    <header className="navbar bg-color4">
      <div className='navbar-start'>
      {/*<======================Project-Name=====================>*/}
      <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-3xl menu menu-horizontal'>
            <span className='text-color1'>Task</span>
            <span className='text-orange'>Menager</span>
          </h1>
      </Link>
      </div>
      {/*<===================Accesed-Options=====================>*/}
      <div className="navbar-end">
        
      <ul className='menu menu-vertical menu-md lg:menu-horizontal'>
          {isAuthenticated ? (
            <>
              <Link to='/'>
                <li className=''>
                  <span className='text-color1'>Home</span>
                </li>
              </Link>
              <Link to='/projects'>
                <li className=''>
                  <span className='text-color1'>Projects</span>
                </li>
              </Link>
              {privilege === 1 && ( // Check if privilege is 1
                <Link to='/sign-up'>
                  <li className=''>
                    <span className='text-color1'>Add User</span>
                  </li>
                </Link>
              )}
              <Link to='/account'>
                <li className=''>
                  <span className='text-color1'>Profile</span>
                </li>
              </Link>
              <li
                className=''
                onClick={handleLogout}
              >
                <span className='text-color1 hover:underline'>Log Out</span>
              </li>
            </>
          ) : (
            <Link to='/sign-in'>
              <li className=''>
                <span className='text-color1'>Sign In</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>

  );

  /* return (
    <header className='bg-color4 shadow-md'>
      <div className='flex items-stretch justify-between  max-w-auto mx-3 p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-3xl flex flex-wrap'>
            <span className='text-color1'>Task</span>
            <span className='text-orange'>Menager</span>
          </h1>
        </Link>

        <ul className='flex gap-1'>
          {isAuthenticated ? (
            <>
              <Link to='/'>
                <li className='toolbox-Element'>
                  <span className='text-color1'>Home</span>
                </li>
              </Link>
              <Link to='/projects'>
                <li className='toolbox-Element'>
                  <span className='text-color1'>Projects</span>
                </li>
              </Link>
              {privilege === 1 && ( // Check if privilege is 1
                <Link to='/sign-up'>
                  <li className='toolbox-Element'>
                    <span className='text-color1'>Add User</span>
                  </li>
                </Link>
              )}
              <Link to='/account'>
                <li className='toolbox-Element'>
                  <span className='text-color1'>Profile</span>
                </li>
              </Link>
              <li
                className='sm:inline text-slate-700 hover:underline cursor-pointer'
                onClick={handleLogout}
              >
                <span className='text-color1 hover:underline'>Log Out</span>
              </li>
            </>
          ) : (
            <Link to='/sign-in'>
              <li className='sm:inline text-slate-700 hover:underline'>
                <span className='text-color1'>Sign In</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  ); */
}
