import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import { useUser } from '../Context/UserContext';

export default function LogIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    // 🚀 Simulación de login (en futuro, aquí irá tu llamada al backend)
    setUser({
      name: 'Vanessa',
      lastName: 'Reniz',           // <-- Añadido
      email: form.email,
      birthDate: '2001-05-15',     // <-- Añadido
      country: 'Colombia',         // <-- Añadido
      photoUrl: undefined          // <-- Opcional
    });
  
    // Redirige al home
    navigate('/home');
  };
  

  return (
    <div className="login-container">
      <div className="login-left-section">
        <h2 className="login-title">LOG IN</h2>
        <p className="login-text">Use your email and password</p>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={form.password}
            onChange={handleChange}
            required
          />
          <a href="#" className="forgot-link">Forgot your password?</a>
          <button type="submit" className="login-btn">SIGN IN</button>
        </form>
      </div>

      <div className="login-right-section">
        <div className="login-right-content">
          <div className="login-logo-group">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="login-flag" />
            <div className="login-logo-text">
              <span className="login-logo-white">EINFACH</span><span className="login-highlight">DEUTSCH</span>
            </div>
          </div>
          <h2 className="login-welcome-title">Willkommen!</h2>
          <div className="login-cta-group">
            <p className="login-welcome-text">
              Sign up and discover how fun German can be. <br /> Learning starts here!
            </p>
            <button
              className="login-signup-btn"
              onClick={() => navigate('/signup')}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
