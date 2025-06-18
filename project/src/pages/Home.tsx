import React from 'react';
import { LogOut, Home as HomeIcon } from 'lucide-react';
import FlowEditor from '../components/FlowEditor/FlowEditor';
import './Home.css';

/**
 * Interfaz para las props del componente Home
 */
interface HomeProps {
  onLogout: () => void;
}

/**
 * Componente de página principal (Home)
 * Contiene el header de navegación y el editor de flujo
 */
const Home: React.FC<HomeProps> = ({ onLogout }) => {
  return (
    <div className="home-container">
      {/* Header de navegación */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <HomeIcon className="header-icon" />
            <h1 className="header-title">Editor de Flujo</h1>
          </div>
          <button 
            onClick={onLogout}
            className="btn btn-secondary logout-btn"
          >
            <LogOut className="btn-icon" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="home-main">
        <div className="main-content">
          <div className="content-header">
            <h2 className="content-title">Espacio de Trabajo</h2>
            <p className="content-subtitle">
              Haz doble clic en el canvas para crear nodos, o usa los botones en cada nodo para editarlos y crear conexiones
            </p>
          </div>
          
          {/* Componente del editor de flujo */}
          <div className="flow-container">
            <FlowEditor />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;