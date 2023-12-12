import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='bg-color4 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl sm:text-3xl flex flex-wrap'>
            <span className='text-color1'>Task</span>
            <span className='text-orange'>Menager</span>
          </h1>
        </Link>

        <form className='bg-color2  p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-color5' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              <span className="text-color1">Home</span>
            </li>
          </Link>
          <Link to='/projects'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
            <span className="text-color1">Projects</span>
            </li>
          </Link>
          <Link to='/sign-in'>
            <li className='sm:inline text-slate-700 hover:underline'>
            <span className="text-color1">Sign In</span>
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
