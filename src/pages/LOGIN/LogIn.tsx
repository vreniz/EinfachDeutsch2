import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

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
    <div className="relative h-screen w-screen flex flex-col lg:flex-row">
      <div className="flex-[0.85] lg:flex-none lg:w-auto flex flex-col justify-center lg:justify-center items-center p-8 lg:p-8 bg-white order-1 lg:order-none pb-2 lg:pb-8 min-h-[260px] lg:min-h-0 justify-end lg:justify-center">
        <h2 className="text-blue-800 text-[1.6rem] lg:text-2xl font-bold mb-2">LOG IN</h2>
        <p className="mb-6 text-base text-black">Use your email and password</p>
        <form className="w-full max-w-[300px] lg:max-w-[300px] px-1 lg:px-0 flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
            value={form.password}
            onChange={handleChange}
            required
          />
          <a href="#" className="text-center block -mt-2 mb-4 text-blue-600 font-medium underline text-[0.95rem] transition-colors duration-200 hover:text-blue-800">Forgot your password?</a>
          <button type="submit" className="bg-blue-800 text-white py-2.5 px-6 border-none rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(30,64,175,0.3),_0_2px_12px_rgba(30,64,175,0.2)] hover:bg-blue-900 hover:scale-105 hover:shadow-[0_4px_25px_rgba(30,64,175,0.4),_0_3px_15px_rgba(30,64,175,0.3)]">SIGN IN</button>
        </form>
      </div>

      <div className="flex-1 lg:flex-1 bg-blue-800 text-white flex items-center justify-center rounded-bl-[50%_100%] lg:rounded-tl-[50%_100%] lg:rounded-bl-[50%_100%] h-auto lg:h-screen order-2 lg:order-none min-h-[210px] lg:min-h-0 rounded-b-[2.2rem] lg:rounded-b-none pt-6 lg:pt-0 pb-8 lg:pb-0 items-start lg:items-center">
        <div className="flex flex-col items-center text-center max-w-80 p-4 lg:p-8">
          <div className="flex items-center justify-center mb-8 lg:mb-10 mt-0 lg:-mt-14">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="w-[45px] h-auto block mr-2 max-w-full" />
            <div className="font-bold text-[1.6rem] lg:text-2xl">
              <span className="text-white">EINFACH</span><span className="text-red-600">DEUTSCH</span>
            </div>
          </div>
          <h2 className="text-2xl lg:text-[2.7rem] font-bold mb-4">Willkommen!</h2>
          <div className="mt-6 flex flex-col gap-4 items-center">
            <p className="text-[0.95rem] lg:text-base leading-snug text-center max-w-[280px] lg:max-w-[280px] mx-auto whitespace-normal lg:whitespace-nowrap">
              Sign up and discover how fun German can be. <br /> Learning starts here!
            </p>
            <button
              className="bg-sky-400 text-white border-none py-2.5 px-6 rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(56,189,248,0.3),_0_2px_12px_rgba(56,189,248,0.2)] hover:bg-sky-500 hover:scale-105 hover:shadow-[0_4px_25px_rgba(56,189,248,0.4),_0_3px_15px_rgba(56,189,248,0.3)]"
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
