// src/pages/SignUp.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

    // Show loading toast
    const loadingToast = toast.loading('Creating your account...');

    try {
      await register(form);
      toast.dismiss(loadingToast);
      toast.success('Account created successfully! Welcome to EinfachDeutsch!');
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Registration failed. Please check your information and try again.');
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Welcome Section */}
      <div className="flex-1 lg:w-1/2 bg-sky-400 text-white flex items-center justify-center order-1 lg:order-1 min-h-[50vh] lg:min-h-screen relative">
        {/* Curved Design */}
        <div className="absolute inset-0 bg-sky-400 lg:rounded-tr-[50%_100%] lg:rounded-br-[50%_100%] rounded-b-[50px] lg:rounded-b-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-md p-6 md:p-8">
          <div className="flex items-center justify-center mb-8 lg:mb-12">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="w-12 h-auto mr-3" />
            <h1 className="font-bold text-xl md:text-2xl">
              EINFACH<span className="text-red-600">DEUTSCH</span>
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Willkommen!</h2>
          
          <div className="flex flex-col gap-6 items-center">
            <p className="text-sm md:text-base leading-relaxed text-center max-w-xs">
              Time to pick up where you left off.<br />
              Log in and continue learning!
            </p>
            <button 
              className="bg-blue-800 text-white border-none py-3 px-8 rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(30,64,175,0.3),_0_2px_12px_rgba(30,64,175,0.2)] hover:bg-blue-900 hover:scale-105 hover:shadow-[0_4px_25px_rgba(30,64,175,0.4),_0_3px_15px_rgba(30,64,175,0.3)]" 
              onClick={() => navigate('/')}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 bg-white order-2 lg:order-2">
        <div className="w-full max-w-lg">
          <h2 className="text-sky-400 text-2xl md:text-3xl font-bold mb-2 text-center">SIGN UP</h2>
          <p className="mb-8 text-base text-gray-600 text-center">Please fill in all your details to create an account.</p>
          
          {error && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form className="w-full flex flex-col gap-6" onSubmit={handleSignup}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
                value={form.first_name}
                onChange={handleChange}
                required
                disabled={isLoading}
              /> 
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
                value={form.last_name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            
            {/* Password and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <input
                type="date"
                name="birth_date"
                placeholder="Birthdate"
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
                value={form.birth_date}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            
            {/* Country */}
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
              value={form.country}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            
            <button 
              type="submit" 
              className="w-full mt-4 bg-sky-400 text-white py-4 px-6 border-none rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(56,189,248,0.3),_0_2px_12px_rgba(56,189,248,0.2)] hover:bg-sky-500 hover:scale-105 hover:shadow-[0_4px_25px_rgba(56,189,248,0.4),_0_3px_15px_rgba(56,189,248,0.3)] disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:hover:scale-100" 
              disabled={!isFormComplete || isLoading}
            >
              {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
