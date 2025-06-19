// Estructura testing card 

{
  "_id": ObjectId,
  "projectId": ObjectId,           // Referencia al proyecto
  //"sequenceId": ObjectId,          // Referencia a la secuencia
  "title": String,                 // Pregunta por resolver
  "hypothesis": String,            // Hipótesis
  "experimentType": String,        // Tipo de experimento (dropdown)
  "description": String,           // Descripción del experimento
  "metrics": [                     // Métricas (array de objetos)
    {
      "metric": String,            // Nombre de la métrica (dropdown)
      "unit": String,              // Unidad o periodo (dropdown tiempo)
      "value": Number              // Valor numérico
    }
  ],
  "criteria": [                    // Criterios de éxito (array de objetos)
    {
      "metric": String,            // Métrica a evaluar
      "operator": String,          // =, >, <
      "value": Number              // Valor de comparación
    }
  ],
  "startDate": Date,
  "endDate": Date,
  "attachments": [                 // Archivos anexos
    {
      "fileUrl": String,
      "fileName": String
    }
  ],
  "responsible": ObjectId,         // Referencia a usuario responsable
  "experimentCategory": String,    // Descubrimiento o Validación
  "status": String,                // En desarrollo, En validación, etc.
  "connections": {                 // Conexiones a otras cards
    "previous": [ObjectId],        // IDs de testing cards anteriores
    //"next": [ObjectId],            // IDs de testing cards siguientes
    "learningCard": ObjectId       // ID de la learning card asociada
  },
  "createdAt": Date,
  "updatedAt": Date
}

// Estructura Learning Card 

{
  "_id": ObjectId,
  "experimentId": ObjectId,        // Referencia a la testing card
  "result": String,                // Resultado
  "actionableInsight": String,     // Hallazgo accionable
  "links": [String],               // Links a anexos (opcional)
  "attachments": [                 // Archivos anexos
    {
      "fileUrl": String,
      "fileName": String
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}

// Estructura proyectos 
referencia. Si no, podrías tener algo así:
Proyectos
{
  "_id": ObjectId,
  "name": String,
  // Otros campos
}
Secuencias
{
  "_id": ObjectId,
  "projectId": ObjectId,
  "name": String,
  // Otros campos
}



