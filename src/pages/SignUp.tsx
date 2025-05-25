// src/pages/SignUp.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { useUser } from '../Context/UserContext';

export default function SignUp() {
  const { setUser } = useUser(); // ahora sí lo usas
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const isFormComplete = Object.values(form).every(v => v.trim() !== "");


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Puedes guardar el usuario en localStorage aquí si quieres persistencia real

    // Registra en el contexto de usuario (sin la password)
    setUser({
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      birthDate: form.birthDate,
      country: form.country,
      photoUrl: '', // aún vacío, lo puede editar después
    });

    // Redirige a home
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="left-content">
          <div className="logo-group">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="flag" />
            <h1 className="logo">EINFACH<span className="highlight">DEUTSCH</span></h1>
          </div>
          <div className="welcome-block">
            <h2 className="welcome-title">Willkommen!</h2>
            <p className="welcome-text">
              Time to pick up where you left off. <br />
              Log in and continue learning!
            </p>
            <button className="sign-in-btn" onClick={() => navigate('/')}>
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      <div className="right-section">
        <h2 className="signup-title">SIGN UP</h2>
        <p className="signup-text">Please fill in all your details to create an account.</p>
        <form className="signup-grid-form" onSubmit={handleSignup}>
       <div className="signup-grid">
       <input
       type="text"
       name="name"
       placeholder="First Name"
       className="input"
       value={form.name}
       onChange={handleChange}
       required
        /> 
       <input
       type="text"
       name="lastName"
       placeholder="Last Name"
       className="input"
       value={form.lastName}
       onChange={handleChange}
       required
      />
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="input"
      value={form.password}
      onChange={handleChange}
      required
    />
    <input
    
      type="date"
      name="birthDate"
      placeholder="Birthdate"
      className="input"
      value={form.birthDate}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="input"
      value={form.email}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="country"
      placeholder="Country"
      className="input"
      value={form.country}
      onChange={handleChange}
      required
    />
  </div>
  <button type="submit" className="signup-btn" disabled={!isFormComplete}>SIGN UP</button>
</form>

      </div>
    </div>
  );
}
