import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../../Context/UserContext';

export default function LogIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading('Signing in...');

    try {
      await login(form.email, form.password);
      toast.dismiss(loadingToast);
      toast.success('Welcome back! Successfully signed in.');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      toast.dismiss(loadingToast);
      toast.error('Invalid email or password. Please try again.');
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Login Form Section */}
      <div className="flex-1 lg:flex-none lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 bg-white order-2 lg:order-1">
        <div className="w-full max-w-md">
          <h2 className="text-blue-800 text-2xl md:text-3xl font-bold mb-2 text-center">LOG IN</h2>
          <p className="mb-8 text-base text-gray-600 text-center">Use your email and password</p>
          
          {error && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-white hover:border-gray-400"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <a href="#" className="text-center block text-blue-600 font-medium underline text-sm transition-colors duration-200 hover:text-blue-800">
              Forgot your password?
            </a>
            <button 
              type="submit" 
              className="w-full bg-blue-800 text-white py-4 px-6 border-none rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(30,64,175,0.3),_0_2px_12px_rgba(30,64,175,0.2)] hover:bg-blue-900 hover:scale-105 hover:shadow-[0_4px_25px_rgba(30,64,175,0.4),_0_3px_15px_rgba(30,64,175,0.3)] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex-1 lg:w-1/2 bg-blue-800 text-white flex items-center justify-center order-1 lg:order-2 min-h-[50vh] lg:min-h-screen relative">
        {/* Curved Design */}
        <div className="absolute inset-0 bg-blue-800 lg:rounded-tl-[50%_100%] lg:rounded-bl-[50%_100%] rounded-b-[50px] lg:rounded-b-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-md p-6 md:p-8">
          <div className="flex items-center justify-center mb-8 lg:mb-12">
            <img src="https://flagcdn.com/w320/de.png" alt="German flag" className="w-12 h-auto mr-3" />
            <div className="font-bold text-xl md:text-2xl">
              <span className="text-white">EINFACH</span><span className="text-red-600">DEUTSCH</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Willkommen!</h2>
          
          <div className="flex flex-col gap-6 items-center">
            <p className="text-sm md:text-base leading-relaxed text-center max-w-xs">
              Sign up and discover how fun German can be.<br />
              Learning starts here!
            </p>
            <button
              className="bg-sky-400 text-white border-none py-3 px-8 rounded-full font-bold cursor-pointer transition-all duration-200 shadow-[0_3px_20px_rgba(56,189,248,0.3),_0_2px_12px_rgba(56,189,248,0.2)] hover:bg-sky-500 hover:scale-105 hover:shadow-[0_4px_25px_rgba(56,189,248,0.4),_0_3px_15px_rgba(56,189,248,0.3)]"
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
