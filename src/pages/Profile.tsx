// src/pages/Profile.tsx
import Navbar from './Navbar';
import { useUser } from '../Context/UserContext';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, setUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  // Estado local para el formulario de edición
  const [form, setForm] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    country: user?.country || "",
    birthDate: user?.birthDate || "",
    photoUrl: user?.photoUrl || "",
  });

  // Cambiar foto
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setForm(prev => ({ ...prev, photoUrl: reader.result as string }));
        if (!editing && user) {
          setUser({ ...user, photoUrl: reader.result as string });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Guardar cambios
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...form });
    setEditing(false);
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
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            title="Back to Home"
            onClick={() => navigate('/home')}
          >
            <svg width="22" height="22" viewBox="0 0 22 22">
              <line x1="5" y1="5" x2="17" y2="17" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="17" y1="5" x2="5" y2="17" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
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
              <h2 className="text-3xl text-blue-600 font-bold mb-1 text-center">
                {user?.name} {user?.lastName}
              </h2>
              <p className="text-blue-500 text-base mb-5 font-medium text-center">{user?.email}</p>
              <div className="mt-5 w-full">
                <div className="flex justify-between text-lg my-3">
                  <span className="text-blue-600 font-semibold">Birthdate:</span>
                  <span className="text-blue-500">{user?.birthDate}</span>
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
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.name}
                placeholder="Name"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.lastName}
                placeholder="Last Name"
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                required
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="email"
                value={form.email}
                placeholder="Email"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="date"
                value={form.birthDate}
                placeholder="Birthdate"
                onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
                required
              />
              <input
                className="w-full py-3 px-4 border-2 border-blue-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                type="text"
                value={form.country}
                placeholder="Country"
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                required
              />
              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-blue-500 text-white font-bold text-base py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="flex-1 bg-gray-300 text-gray-700 font-bold text-base py-3 rounded-xl hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: user?.name || "",
                      lastName: user?.lastName || "",
                      email: user?.email || "",
                      country: user?.country || "",
                      birthDate: user?.birthDate || "",
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

