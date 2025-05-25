import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
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
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="flag" />
        <span><span className="white">EINFACH</span><span className="red">DEUTSCH</span></span>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/home">Home</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/progress">Overall Progress</Link>
        <div className="navbar-user" onClick={() => setShowDropdown(!showDropdown)}>
          <span>{user ? user.name : 'USER'} ▾</span>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={() => { setShowDropdown(false); navigate('/profile'); }}>Profile</button>
              <button onClick={() => { setShowDropdown(false); navigate('/reminder'); }}>Reminder</button>
              <button onClick={handleSignOut}>Sign out</button>
              {/* 👆 LLAMA handleSignOut */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
