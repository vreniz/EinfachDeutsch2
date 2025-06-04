// src/pages/Profile.tsx
import Navbar from '../../components/NAVBAR';
import { useUser } from '../../Context/UserContext';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Estado local para el formulario de edición
  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    country: user?.country || "",
    birth_date: user?.birth_date || "",
    photoUrl: user?.photoUrl || "",
  });

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        country: user.country || "",
        birth_date: user.birth_date || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  // Cambiar foto
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setForm(prev => ({ ...prev, photoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Guardar cambios
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading('Updating your profile...');

    try {
      // Only send fields that can be updated (exclude email)
      const updates = {
        first_name: form.first_name,
        last_name: form.last_name,
        birth_date: form.birth_date,
        country: form.country,
      };

      await updateUser(updates);
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to update profile. Please try again.');
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Avatar
  const avatarSrc =
    form.photoUrl ||
    user?.photoUrl ||
    'https://api.dicebear.com/8.x/personas/svg?seed=profile';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-blue-100">
          {/* X Cerrar */}
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md z-10"
            title="Back to Home"
            onClick={() => navigate('/home')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-600">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="relative flex justify-center items-center mb-4">
            <img
              src={avatarSrc}
              alt="User avatar"
              className="w-30 h-30 rounded-full object-cover border-4 border-blue-500 bg-blue-50"
            />
            {/* Editar foto */}
            <button
              className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-blue-600 transition-colors duration-200 cursor-pointer shadow-lg"
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
            >+</button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
          </div>

          {!editing ? (
            <>
              {error && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <h2 className="text-3xl text-blue-600 font-bold mb-1 text-center">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-blue-500 text-base mb-5 font-medium text-center">{user?.email}</p>
              <div className="mt-5 w-full">
                <div className="flex justify-between text-lg my-3">
                  <span className="text-blue-600 font-semibold">Birthdate:</span>
                  <span className="text-blue-500">{user?.birth_date}</span>
                </div>
                <div className="flex justify-between text-lg my-3">
                  <span className="text-blue-600 font-semibold">Country:</span>
                  <span className="text-blue-500">{user?.country}</span>
                </div>
              </div>
              <button
                className="w-full bg-blue-500 text-white font-bold text-lg py-3 rounded-3xl mt-6 hover:bg-blue-600 transition-colors duration-200 cursor-pointer shadow-md"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form className="w-full flex flex-col gap-4" onSubmit={handleSave}>
              {error && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.first_name}
                placeholder="First Name"
                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                required
                disabled={isLoading}
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.last_name}
                placeholder="Last Name"
                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                required
                disabled={isLoading}
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="email"
                value={form.email}
                placeholder="Email"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                disabled={true}
                title="Email cannot be changed"
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="date"
                value={form.birth_date}
                placeholder="Birthdate"
                onChange={e => setForm(f => ({ ...f, birth_date: e.target.value }))}
                required
                disabled={isLoading}
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.country}
                placeholder="Country"
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                required
                disabled={isLoading}
              />
              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-blue-500 text-white font-bold text-base py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="flex-1 bg-gray-300 text-gray-700 font-bold text-base py-3 rounded-xl hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setEditing(false);
                    setError(null);
                    setForm({
                      first_name: user?.first_name || "",
                      last_name: user?.last_name || "",
                      email: user?.email || "",
                      country: user?.country || "",
                      birth_date: user?.birth_date || "",
                      photoUrl: user?.photoUrl || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

