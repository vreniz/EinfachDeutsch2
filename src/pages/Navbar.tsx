import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../Context/UserContext';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser(); // 👈 incluye logout
  const navigate = useNavigate();

  // Maneja el cierre de sesión
  const handleSignOut = () => {
    logout();
    navigate('/'); // Te lleva al login (raíz "/")
  };

  return (
    <nav className="flex justify-between items-center bg-sky-400 px-8 py-3 font-sans flex-wrap">
      <div className="flex items-center text-xl font-bold gap-2">
        <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="w-8 h-auto rounded" />
        <span><span className="text-white">EINFACH</span><span className="text-red-600">DEUTSCH</span></span>
      </div>

      <button className="hidden max-md:block text-3xl text-white bg-none border-none cursor-pointer ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`flex gap-8 flex-wrap ${menuOpen ? 'max-md:flex max-md:flex-col max-md:w-full max-md:mt-4' : 'max-md:hidden'}`}>
        <Link to="/home" className="text-white no-underline font-bold hover:text-slate-900 transition-colors">Home</Link>
        <Link to="/practice" className="text-white no-underline font-bold hover:text-slate-900 transition-colors">Practice</Link>
        <Link to="/progress" className="text-white no-underline font-bold hover:text-slate-900 transition-colors">Overall Progress</Link>
        <div className="relative font-bold text-white cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <span>{user ? user.name : 'USER'} ▾</span>
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-sky-300/95 rounded-2xl flex flex-col p-4 gap-2 z-[1000] w-44 shadow-lg">
              <button onClick={() => { setShowDropdown(false); navigate('/profile'); }} className="bg-none border-none text-white font-bold text-center cursor-pointer hover:text-slate-900 py-1">Profile</button>
              <button onClick={() => { setShowDropdown(false); navigate('/reminder'); }} className="bg-none border-none text-white font-bold text-center cursor-pointer hover:text-slate-900 py-1">Reminder</button>
              <button onClick={handleSignOut} className="bg-none border-none text-white font-bold text-center cursor-pointer hover:text-slate-900 py-1">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
