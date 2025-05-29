// src/pages/SignUp.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

export default function SignUp() {
  const { register } = useUser();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birth_date: '',
    country: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };
  
  const isFormComplete = Object.values(form).every(v => v.trim() !== "");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await register(form);
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
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
            <button className="bg-blue-800 text-white border-none py-2.5 px-6 rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(30,64,175,0.3),_0_2px_12px_rgba(30,64,175,0.2)] hover:bg-blue-900 hover:scale-105 hover:shadow-[0_4px_25px_rgba(30,64,175,0.4),_0_3px_15px_rgba(30,64,175,0.3)]" onClick={() => navigate('/')}>
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:flex-1 flex flex-col justify-center lg:justify-center items-center p-8 lg:p-8 order-1 lg:order-none bg-white min-h-[260px] lg:min-h-0 justify-end lg:justify-center pb-2 lg:pb-8">
        <h2 className="text-blue-800 text-[1.6rem] lg:text-2xl font-bold mb-2">SIGN UP</h2>
        <p className="mb-6 text-base">Please fill in all your details to create an account.</p>
        
        {error && (
          <div className="w-full max-w-[500px] mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form className="w-full max-w-[500px] flex flex-col items-center gap-5" onSubmit={handleSignup}>
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
       <input
       type="text"
       name="first_name"
       placeholder="First Name"
       className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
       value={form.first_name}
       onChange={handleChange}
       required
       disabled={isLoading}
        /> 
       <input
       type="text"
       name="last_name"
       placeholder="Last Name"
       className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
       value={form.last_name}
       onChange={handleChange}
       required
       disabled={isLoading}
      />
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
      value={form.password}
      onChange={handleChange}
      required
      disabled={isLoading}
    />
    <input
      type="date"
      name="birth_date"
      placeholder="Birthdate"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
      value={form.birth_date}
      onChange={handleChange}
      required
      disabled={isLoading}
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
      value={form.email}
      onChange={handleChange}
      required
      disabled={isLoading}
    />
    <input
      type="text"
      name="country"
      placeholder="Country"
      className="w-full p-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
      value={form.country}
      onChange={handleChange}
      required
      disabled={isLoading}
    />
  </div>
  <button 
    type="submit" 
    className="w-full mt-5 text-lg lg:text-[1.15rem] py-3 lg:py-3 bg-sky-400 text-white border-none rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(56,189,248,0.3),_0_2px_12px_rgba(56,189,248,0.2)] hover:bg-sky-500 hover:scale-105 hover:shadow-[0_4px_25px_rgba(56,189,248,0.4),_0_3px_15px_rgba(56,189,248,0.3)] disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:hover:scale-100" 
    disabled={!isFormComplete || isLoading}
  >
    {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
  </button>
</form>

      </div>
    </div>
  );
}
