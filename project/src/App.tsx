import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

/**
 * Componente principal de la aplicación
 * Maneja la navegación entre páginas sin usar react-router para mantener simplicidad
 */
function App() {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState<'login' | 'home'>('login');

  /**
   * Función para manejar el login exitoso
   */
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  /**
   * Función para manejar el logout
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  return (
    <div className="app">
      {currentPage === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;