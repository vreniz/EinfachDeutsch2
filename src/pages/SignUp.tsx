// src/pages/SignUp.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="relative h-screen w-screen flex flex-col lg:flex-row">
      <div className="flex-1 bg-sky-400 text-white flex items-center justify-center rounded-br-[50%_100%] lg:rounded-tr-[50%_100%] lg:rounded-br-[50%_100%] h-auto lg:h-screen order-2 lg:order-none min-h-[210px] lg:min-h-0 rounded-b-[2.2rem] lg:rounded-b-none pt-6 lg:pt-0 pb-8 lg:pb-0 items-start lg:items-center">
        <div className="flex flex-col items-center justify-center text-center gap-10 max-w-[400px] w-full p-4 lg:p-8 h-full">
          <div className="flex items-center justify-center gap-2 text-[1.6rem] lg:text-2xl font-bold -translate-y-4 lg:-translate-y-4 mt-0 lg:mt-0 mb-8 lg:mb-0">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="w-[45px] h-auto" />
            <h1 className="font-bold text-[1.6rem] lg:text-2xl m-0 leading-none">EINFACH<span className="text-red-600">DEUTSCH</span></h1>
          </div>
          <div className="mt-0 lg:mt-0">
            <h2 className="text-2xl lg:text-[2.7rem] font-bold mb-4">Willkommen!</h2>
            <p className="mb-4 text-[0.95rem] lg:text-base leading-snug max-w-full whitespace-normal lg:whitespace-normal">
              Time to pick up where you left off. <br />
              Log in and continue learning!
            </p>
            <button className="bg-blue-800 text-white border-none py-2.5 px-6 rounded-full font-bold cursor-pointer" onClick={() => navigate('/')}>
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:flex-1 flex flex-col justify-center lg:justify-center items-center p-8 lg:p-8 order-1 lg:order-none bg-white min-h-[260px] lg:min-h-0 justify-end lg:justify-center pb-2 lg:pb-8">
        <h2 className="text-blue-800 text-[1.6rem] lg:text-2xl font-bold mb-2">SIGN UP</h2>
        <p className="mb-6 text-base">Please fill in all your details to create an account.</p>
        <form className="w-full max-w-[500px] flex flex-col items-center gap-5" onSubmit={handleSignup}>
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
       <input
       type="text"
       name="name"
       placeholder="First Name"
       className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
       value={form.name}
       onChange={handleChange}
       required
        /> 
       <input
       type="text"
       name="lastName"
       placeholder="Last Name"
       className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
       value={form.lastName}
       onChange={handleChange}
       required
      />
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
      value={form.password}
      onChange={handleChange}
      required
    />
    <input
      type="date"
      name="birthDate"
      placeholder="Birthdate"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
      value={form.birthDate}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
      value={form.email}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="country"
      placeholder="Country"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-100"
      value={form.country}
      onChange={handleChange}
      required
    />
  </div>
  <button type="submit" className="w-full mt-5 text-lg lg:text-[1.15rem] py-3 lg:py-3 bg-sky-400 text-white border-none rounded-full font-bold cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none" disabled={!isFormComplete}>SIGN UP</button>
</form>

      </div>
    </div>
  );
}
