import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import NodeEditModal from './NodeEditModal';
import { NodeData } from './types';
import './FlowEditor.css';

// Tipos de nodos personalizados
const nodeTypes = {
  customNode: CustomNode,
};

/**
 * Componente principal del editor de flujo
 * Maneja la lógica principal de React Flow y las operaciones CRUD de nodos
 */
const FlowEditor: React.FC = () => {
  // Estados para nodos y conexiones
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Estados para el modal de edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<Node<NodeData> | null>(null);
  
  // Contador para IDs únicos
  const nodeIdCounter = useRef(1);

  /**
   * Maneja la conexión entre nodos
   */
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  /**
   * Crea un nuevo nodo en una posición específica
   */
  const createNode = useCallback((position: { x: number; y: number }) => {
    const newNodeId = `node-${nodeIdCounter.current++}`;
    
    const newNode: Node<NodeData> = {
      id: newNodeId,
      type: 'customNode',
      position,
      data: {
        nombre: `Nodo ${nodeIdCounter.current - 1}`,
        descripcion: 'Descripción del nuevo nodo',
        fecha: new Date().toISOString().split('T')[0],
        onEdit: () => {},
        onDelete: () => {},
        onAddChild: () => {},
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  /**
   * Crea un nuevo nodo hijo conectado al nodo padre
   */
  const createChildNode = useCallback((parentId: string) => {
    const parentNode = nodes.find(node => node.id === parentId);
    if (!parentNode) return;

    const newNodeId = `node-${nodeIdCounter.current++}`;
    
    // Calcular posición del nuevo nodo
    const newPosition = {
      x: parentNode.position.x + Math.random() * 100 - 50,
      y: parentNode.position.y + 150,
    };

    // Crear nuevo nodo
    const newNode: Node<NodeData> = {
      id: newNodeId,
      type: 'customNode',
      position: newPosition,
      data: {
        nombre: `Nodo ${nodeIdCounter.current - 1}`,
        descripcion: 'Descripción del nuevo nodo',
        fecha: new Date().toISOString().split('T')[0],
        onEdit: () => {},
        onDelete: () => {},
        onAddChild: () => {},
      },
    };

    // Crear nueva conexión
    const newEdge: Edge = {
      id: `edge-${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      type: 'smoothstep',
    };

    // Actualizar estados
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, setNodes, setEdges]);

  /**
   * Elimina un nodo y todas sus conexiones
   */
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  /**
   * Abre el modal de edición para un nodo específico
   */
  const openEditModal = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setEditingNode(node);
      setIsModalOpen(true);
    }
  }, [nodes]);

  /**
   * Guarda los cambios realizados en el modal de edición
   */
  const saveNodeChanges = useCallback((updatedData: Omit<NodeData, 'onEdit' | 'onDelete' | 'onAddChild'>) => {
    if (!editingNode) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...updatedData,
              },
            }
          : node
      )
    );

    setIsModalOpen(false);
    setEditingNode(null);
  }, [editingNode, setNodes]);

  /**
   * Cierra el modal de edición sin guardar cambios
   */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingNode(null);
  }, []);

  /**
   * Maneja el doble clic en el canvas para crear un nuevo nodo
   */
  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = (event.target as Element).closest('.react-flow')?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    const position = {
      x: event.clientX - reactFlowBounds.left - 100,
      y: event.clientY - reactFlowBounds.top - 50,
    };

    createNode(position);
  }, [createNode]);

  /**
   * Crea el primer nodo en el centro
   
  const createFirstNode = useCallback(() => {
    createNode({ x: 250, y: 100 });
  }, [createNode]);

  const createFirstNode = useCallback(() => {
    // Usa coordenadas más centrales y ajusta según el tamaño de tu contenedor
    createNode({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 });
  }, [createNode]);*/
  const createFirstNode = useCallback(() => {
    console.log("Creando primer nodo...");
    createNode({ x: 250, y: 100 });
  }, [createNode]);

  // Actualizar las funciones en los datos de los nodos
  const nodesWithUpdatedCallbacks = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onEdit: () => openEditModal(node.id),
      onDelete: () => deleteNode(node.id),
      onAddChild: () => createChildNode(node.id),
    },
  }));

  return (
    <div className="flow-editor">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodesWithUpdatedCallbacks}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneDoubleClick={onPaneDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-container"
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1} 
            color="#e5e7eb"
          />
          <Controls 
            position="top-right"
            className="flow-controls"
          />
        </ReactFlow>
        
        {/* Mensaje de ayuda cuando no hay nodos */}
        {nodes.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <h3>¡Comienza creando tu primer nodo!</h3>
              <p>Haz doble clic en cualquier parte del canvas o usa el botón de abajo</p>
              <button 
                onClick={createFirstNode}
                className="btn btn-primary create-first-node-btn"
              >
                Crear Primer Nodo
              </button>
            </div>
          </div>
        )}
      </ReactFlowProvider>

      {/* Modal de edición */}
      {isModalOpen && editingNode && (
        <NodeEditModal
          node={editingNode}
          onSave={saveNodeChanges}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FlowEditor;