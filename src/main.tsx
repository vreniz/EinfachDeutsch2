import React from 'react'; // 👈 solución

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './Context/UserContext'; // 👈 importa

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <UserProvider> {/* 👈 envuelve tu app */}
    <App />
  </UserProvider>
</React.StrictMode>,
);

