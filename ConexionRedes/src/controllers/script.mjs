import Graph from "../models/Graph.mjs";

const graph = new Graph();

// Obtener referencias a los elementos del DOM
const btnAgregarDestino = document.getElementById("AddRed");
const btnAgregarConexion = document.getElementById("AddRed2");
const btnRecorridoProfundidad = document.getElementById("profundidad");
const btnRecorridoAnchura = document.getElementById("anchura");
const tbodyProfundidad = document.getElementById("tbodyProfundidad");
const tbodyAnchura = document.getElementById("tbodyAnchura");

// Función para mostrar alertas personalizadas
function mostrarAlerta(icon, title, message) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#007bff'
    });
}

// Evento para agregar un destino al grafo
btnAgregarDestino.addEventListener("click", () => {
    const red = document.getElementById("redes").value.trim(); // Obtener el valor y quitar espacios en blanco al inicio y final
    
    if (red !== "") { // Verificar que el valor no esté vacío
        if (graph.addVertex(red)) {
            mostrarAlerta('success', 'Registro Exitoso', `Se registró la red ${red}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo registrar la red');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar el nombre de la red');
    }
});

// Evento para agregar una conexión al grafo
btnAgregarConexion.addEventListener("click", () => {
    const redInicial = document.getElementById("inicial").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const peso = parseInt(document.getElementById("peso").value);

    if (redInicial !== "" && destino !== "") { // Verificar que ambos campos no estén vacíos
        if (graph.addEdge(redInicial, destino, peso)) {
            mostrarAlerta('success', 'Conexión Agregada', 'La conexión se agregó correctamente');
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo agregar la conexión');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambas redes para la conexión');
    }
});

// Evento para realizar un recorrido en profundidad (DFS)
btnRecorridoProfundidad.addEventListener("click", () => {
    // Limpiar contenido anterior
    tbodyProfundidad.innerHTML = '';
    
    // Obtener el primer vértice del grafo
    const vertices = [...graph.getVertices()][0];
    
    // Realizar recorrido en profundidad (DFS)
    graph.dfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyProfundidad.appendChild(row);
    });
    
    mostrarAlerta('info', 'Ejecutando Recorrido De Profundidad', 'Recorrido en profundidad completado');
});

// Evento para realizar un recorrido en anchura (BFS)
btnRecorridoAnchura.addEventListener("click", () => {
    // Limpiar contenido anterior
    tbodyAnchura.innerHTML = '';
    
    // Obtener el primer vértice del grafo
    const vertices = [...graph.getVertices()][0];
    
    // Realizar recorrido en anchura (BFS)
    graph.bfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyAnchura.appendChild(row);
    });
    
    mostrarAlerta('info', 'Ejecutando Recorrido De Anchura', 'Recorrido en anchura completado');
});
