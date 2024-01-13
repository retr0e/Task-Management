import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ isAuthenticated, handleLogout }) {
  return (
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
  );
}
