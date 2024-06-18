import LinkedList from "./LinkedList.mjs";

export default class Graph {
    
    #matrizAdyacencia = []; // Matriz de adyacencia usando listas enlazadas para almacenar los vecinos
    #map = new Map(); // Mapa para asociar vértices con índices en la matriz de adyacencia

    constructor() {}

    /* Agregar múltiples vértices
    addVertices(...vertices) {
        for (let vertex of vertices) {
            this.addVertex(vertex);
        }
    }
    */

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    // Implementación Dijkstra
    dijkstra(startVertex, endVertex) {
        // Representa distancias no alcanzables
        const inf = Infinity;
        
        // Crea un arreglo para las distancias e inicializa en infinito todos los vertices
        const distances = new Array(this.numVertices()).fill(inf);
        
        // Crea un arreglo para los vertices visitados y los inicializa en false
        const visited = new Array(this.numVertices()).fill(false);
        
        const startIndex = this.#map.get(startVertex);
        const endIndex = this.#map.get(endVertex);
        
        distances[startIndex] = 0;
    
        while (true) {
            let f = -1;
            let minDistance = inf;
    
            // Busca el vertice no visitado con la menor distancia
            for (let i = 0; i < this.numVertices(); i++) {
                if (!visited[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    f = i;
                }
            }
            
            if (f === -1) {
                break;
            }
    
            // Marca el vertice como visitado.
            visited[f] = true;
    
            // Obtiene la lista de vecinos del vertice
            const neighbors = this.#matrizAdyacencia[f];
            let current = neighbors.head;
    
            // Recorre todos los vecinos del vertice
            while (current) {
                
                const neighborIndex = this.#map.get(current.value.node);
                const weight = current.value.weight;
    
                if (distances[f] + weight < distances[neighborIndex]) {
                    distances[neighborIndex] = distances[f] + weight;
                }
    
                current = current.next;
            }
        }
    
        return distances[endIndex];
    }
    
    // Recorrido en profundidad (DFS)
    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const stack = [];
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop(); // Saca el ultimo vertice agregado
            if (!visited[currentVertex]) { // Si no ha sidio visitado
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; // Obtiene el vecino
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex); // Agrega el vecino a la pila si no ha sido visitado
                    }
                    current = current.next; // Pasa al siguiente vecino
                }
            }
        }
    }

    // Recorrido en anchura (BFS)
    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const queue = [];
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    getVertices() {
        return this.#map.keys();
    }

    numVertices() {
        return this.#map.size;
    }

    numEdges() {
        let numEdges = 0;
        for (let linkedList of this.#matrizAdyacencia) {
            numEdges += linkedList.size();
        }
        return numEdges;
    }
}