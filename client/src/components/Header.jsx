import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ isAuthenticated, handleLogout, privilege }) => {
  return (
    <header className='navbar bg-color4 bg-opacity-80 shadow-lg'>
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
      <div className='navbar-end'>
        <ul className='menu menu-vertical menu-md lg:menu-horizontal'>
          {isAuthenticated ? (
            <>
              <Link to='/'>
                <li className=''>
                  <span className='text-color1'>Home</span>
                </li>
              </Link>
              <Link to='/project'>
                <li className=''>
                  <span className='text-color1'>Projects</span>
                </li>
              </Link>
              {privilege === 1 && ( // Check if privilege is 1
                <>
                <Link to='/sign-up'>
                  <li className=''>
                    <span className='text-color1'>Add User</span>
                  </li>
                </Link>
                <Link to='/tester'>
                <li className=''>
                  <span className='text-color1'>Tester</span>
                </li>
              </Link>
              </>
              )}
              <Link to='/account'>
                <li className=''>
                  <span className='text-color1'>Profile</span>
                </li>
              </Link>
              <li className='' onClick={handleLogout}>
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
}

export const Footer = () => {
  return(
    <div className="p-1">
      <div className="badge bg-green-600"></div>
      <div className="badge bg-yellow-500"></div>
      <div className="badge bg-red-600"></div>
      <div className="badge bg-sky-500"></div>
      <div className="badge bg-gray-500"></div>
      <div className="badge bg-blue-700"></div>
      <div className="badge bg-pink-700"></div>
    </div>
  );
}
export default Header;
