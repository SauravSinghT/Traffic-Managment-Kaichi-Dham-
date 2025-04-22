const historicalEdgeData = [
    { edge: "Kwarab-Ramgarh", hour: 8, isWeekend: 0, isEvent: 0, traffic: 1 },
    { edge: "Kwarab-Ramgarh", hour: 13, isWeekend: 0, isEvent: 1, traffic: 1 },
    { edge: "Kwarab-Ramgarh", hour: 18, isWeekend: 1, isEvent: 1, traffic: 3 },
  
    { edge: "Kwarab-Kainchi", hour: 8, isWeekend: 0, isEvent: 0, traffic: 3 },
    { edge: "Kwarab-Kainchi", hour: 13, isWeekend: 1, isEvent: 0, traffic: 5 },
    { edge: "Kwarab-Kainchi", hour: 18, isWeekend: 1, isEvent: 1, traffic: 7 },
  
    { edge: "Ramgarh-Kainchi", hour: 8, isWeekend: 0, isEvent: 0, traffic: 0 },
    { edge: "Ramgarh-Kainchi", hour: 13, isWeekend: 1, isEvent: 0, traffic: 1 },
    { edge: "Ramgarh-Kainchi", hour: 18, isWeekend: 1, isEvent: 1, traffic: 3 },
  
    { edge: "Kainchi-Bhowali", hour: 8, isWeekend: 0, isEvent: 0, traffic: 3 },
    { edge: "Kainchi-Bhowali", hour: 13, isWeekend: 1, isEvent: 0, traffic: 4  },
    { edge: "Kainchi-Bhowali", hour: 18, isWeekend: 1, isEvent: 1, traffic: 9 },
  ];
  
function euclideanDistance(a, b) {
  return Math.sqrt(
    Math.pow(a.hour - b.hour, 2) +
    Math.pow(a.isWeekend - b.isWeekend, 2) +
    Math.pow(a.isEvent - b.isEvent, 2)
  );
}

function knnPredictTraffic(edge, hour, isWeekend, isEvent, k = 3) {
  const relevantData = historicalEdgeData.filter(d => d.edge === edge);
  if (relevantData.length === 0) {
    return 1; 
  }

  relevantData.forEach(d => {
    d.dist = euclideanDistance({ hour, isWeekend, isEvent }, d);
  });

  relevantData.sort((a, b) => a.dist - b.dist);
  const neighbors = relevantData.slice(0, k);

  const predicted = neighbors.reduce((sum, n) => sum + n.traffic, 0) / neighbors.length;
  return predicted;
}

class Node {
  constructor(name) {
    this.name = name;
    this.neighbors = {}; 
  }
}

class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(name) {
    if (!this.nodes[name]) this.nodes[name] = new Node(name);
  }

  addEdge(node1, node2, baseWeight) {
    if (this.nodes[node1] && this.nodes[node2]) {
      this.nodes[node1].neighbors[node2] = { baseWeight, simulatedIncrement: 0 };
      this.nodes[node2].neighbors[node1] = { baseWeight, simulatedIncrement: 0 };
    }
  }

  static getEdgeKey(node1, node2) {
    return [node1, node2].sort().join("-");
  }

  updateEdgeWeights(hour, isWeekend, isEvent) {
    for (const nodeName in this.nodes) {
      const node = this.nodes[nodeName];
      for (const neighbor in node.neighbors) {
        const edgeKey = Graph.getEdgeKey(nodeName, neighbor);
        const predictedTraffic = knnPredictTraffic(edgeKey, hour, isWeekend, isEvent);
        node.neighbors[neighbor].baseWeight = predictedTraffic;
      }
    }
  }

  dijkstra(startNodeName, endNodeName) {
    if (!this.nodes[startNodeName] || !this.nodes[endNodeName]) {
      return "Start or end node not found.";
    }

    const distances = {};
    const previous = {};
    const visited = new Set();

    for (const nodeName in this.nodes) {
      distances[nodeName] = Infinity;
      previous[nodeName] = null;
    }
    distances[startNodeName] = 0;

    while (visited.size < Object.keys(this.nodes).length) {
      let currentNodeName = null;
      let smallestDistance = Infinity;
      for (const nodeName in distances) {
        if (!visited.has(nodeName) && distances[nodeName] < smallestDistance) {
          smallestDistance = distances[nodeName];
          currentNodeName = nodeName;
        }
      }

      if (currentNodeName === null || smallestDistance === Infinity) break;
      if (currentNodeName === endNodeName) break;

      visited.add(currentNodeName);
      const currentNode = this.nodes[currentNodeName];

      for (const neighborName in currentNode.neighbors) {
        if (visited.has(neighborName)) continue;

        const edge = currentNode.neighbors[neighborName];
        const totalWeight = edge.baseWeight + edge.simulatedIncrement;
        const altDistance = distances[currentNodeName] + totalWeight;

        if (altDistance < distances[neighborName]) {
          distances[neighborName] = altDistance;
          previous[neighborName] = currentNodeName;
        }
      }
    }

    const path = [];
    let current = endNodeName;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    if (distances[endNodeName] === Infinity) return "No path found.";
    return path;
  }

  calculateRouteWeight(route) {
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const edge = this.nodes[route[i]].neighbors[route[i + 1]];
      total += edge.baseWeight + edge.simulatedIncrement;
    }
    return total;
  }

  updateTraffic(route) {
    for (let i = 0; i < route.length - 1; i++) {
      const node1 = route[i];
      const node2 = route[i + 1];
      this.nodes[node1].neighbors[node2].simulatedIncrement++;
      this.nodes[node2].neighbors[node1].simulatedIncrement++;
    }
  }

  processVehicle(start, destination, hour, isWeekend, isEvent) {  
    this.updateEdgeWeights(hour, isWeekend, isEvent);

    const route = this.dijkstra(start, destination);
    if (typeof route === "string") {
      console.log(`Result: ${route}`);
      return;
    }

    const totalWeight = this.calculateRouteWeight(route);
    this.updateTraffic(route);
    return route;
  }
}

const trafficGraph = new Graph();
["Kwarab", "Ramgarh", "Kainchi", "Bhowali"].forEach(name => trafficGraph.addNode(name));

trafficGraph.addEdge("Kwarab", "Ramgarh", 1);
trafficGraph.addEdge("Kwarab", "Kainchi", 1);
trafficGraph.addEdge("Ramgarh", "Kainchi", 1);
trafficGraph.addEdge("Kainchi", "Bhowali", 1);

// const testScenarios = [
//   { hour: 8, isWeekend: 0, isEvent: 0 },
//   { hour: 13, isWeekend: 1, isEvent: 0 },
//   { hour: 18, isWeekend: 1, isEvent: 1 },
// ];

// testScenarios.forEach(({ hour, isWeekend, isEvent }, idx) => {
//   console.log(`\n=== Simulation ${idx + 1} ===`);
//   trafficGraph.processVehicle("Kwarab", "Bhowali", hour, isWeekend, isEvent);
//   trafficGraph.processVehicle("Bhowali", "Kwarab", hour, isWeekend, isEvent);
// });

module.exports = {trafficGraph}