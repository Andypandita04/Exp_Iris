/**
 * Tipos de datos para el componente FlowEditor
 */

/**
 * Estructura de datos para un nodo en el flujo
 */
export interface NodeData {
  /** Nombre del nodo */
  nombre: string;
  
  /** Descripción del nodo */
  descripcion: string;
  
  /** Fecha asociada al nodo (formato YYYY-MM-DD) */
  fecha: string;
  
  /** Función para editar el nodo */
  onEdit: () => void;
  
  /** Función para eliminar el nodo */
  onDelete: () => void;
  
  /** Función para agregar un nodo hijo */
  onAddChild: () => void;
}

/**
 * Datos para la creación de un nuevo nodo
 */
export interface CreateNodeData {
  nombre: string;
  descripcion: string;
  fecha: string;
  position: {
    x: number;
    y: number;
  };
}

/**
 * Datos para la actualización de un nodo existente
 */
export interface UpdateNodeData {
  id: string;
  nombre?: string;
  descripcion?: string;
  fecha?: string;
}

/**
 * Estados posibles del editor de flujo
 */
export type FlowEditorState = 'idle' | 'editing' | 'creating' | 'deleting';

/**
 * Configuración del editor de flujo
 */
export interface FlowEditorConfig {
  /** Habilitar/deshabilitar el grid de fondo */
  showGrid: boolean;
  
  /** Habilitar/deshabilitar los controles */
  showControls: boolean;
  
  /** Habilitar/deshabilitar el mini mapa */
  showMiniMap: boolean;
  
  /** Zoom inicial */
  defaultZoom: number;
  
  /** Posición inicial del viewport */
  defaultViewport: {
    x: number;
    y: number;
    zoom: number;
  };
}