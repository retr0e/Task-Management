import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { DesChangeForm, Team_Form_X } from "../pages/Forms";

const Header = ({ isAuthenticated, handleLogout, privilege }) => {
  return (
    <header className='navbar bg-gray-600/70 bg-opacity-80 shadow-lg h-16'>
      <div className='navbar-start'>
        {/*<======================Project-Name=====================>*/}
        <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-3xl menu menu-horizontal'>
            <span className='text-color1'>Task</span>
            <span className=' text-orange'>Menager</span>
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
                  <span className=''>Home</span>
                </li>
              </Link>
              {privilege <=3 &&(
              <Link to='/project'>
                <li className=''>
                  <span className=''>Projects</span>
                </li>
              </Link>
              )}
              {privilege === 1 && ( // Check if privilege is 1
                <>
                <Link to='/sign-up'>
                  <li className=''>
                    <span className=''>Add User</span>
                  </li>
                </Link>
                <Link to='/tester'>
                <li className=''>
                  <span className=''>Tester</span>
                </li>
              </Link>
              </>
              )}
              {privilege <= 2 &&(
                
                <Modal
                  element={<Team_Form_X/>}
                  btn_Name={'Manage Teams'}
                  modal_ID={'Manage Teams'}
                  btn_Style={''}
                />
                
              )}
              <Link to='/profile'>
                <li className=''>
                  <span className=''>Profile</span>
                </li>
              </Link>
              <li className='' onClick={handleLogout}>
                <span className=' hover:underline'>Log Out</span>
              </li>
            </>
          ) : (
            <Link to='/sign-in'>
              <li className=''>
                <span className=''>Sign In</span>
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
      <div  value="business"   className="checkbox theme-controller badge bg-green-600"> </div>
      <div  value="retro"      className="checkbox theme-controller badge bg-yellow-500"></div>
      <div  value="valentine"  className="checkbox theme-controller badge bg-red-600">   </div>
      <div  value="lofi"       className="checkbox theme-controller badge bg-sky-500">   </div>
      <div  value="dark"       className="checkbox theme-controller badge bg-gray-500">  </div>
      <div  value="emerald"    className="checkbox theme-controller badge bg-blue-700">  </div>
      <div  value="fantasy"    className="checkbox theme-controller badge bg-pink-700">  </div>
    </div>
  );
}
export default Header;
