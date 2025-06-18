import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './Login.css';

/**
 * Interfaz para las props del componente Login
 */
interface LoginProps {
  onLogin: () => void;
}

/**
 * Componente de página de Login
 * Proporciona un formulario simple de autenticación
 */
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Maneja el envío del formulario de login
   * Para este ejemplo, acepta cualquier combinación de usuario/contraseña no vacía
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, ingresa usuario y contraseña');
      return;
    }

    // Simulación de autenticación (en producción aquí iría la lógica real)
    if (username.length > 0 && password.length > 0) {
      onLogin();
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <LogIn className="login-icon" />
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">Accede a tu espacio de trabajo</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary login-button">
            Ingresar
          </button>
        </form>

        <div className="login-footer">
          <p>Tip: Usa cualquier usuario y contraseña para acceder</p>
        </div>
      </div>
    </div>
  );
};

export default Login;