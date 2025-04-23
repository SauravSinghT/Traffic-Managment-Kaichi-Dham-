import React from "react";

const locations = ["Kwarab", "Ramgarh", "Kainchi", "Bhowali"];


const nodePositions = {
  Kwarab: { x: 50, y: 170 },
  Ramgarh: { x: 390, y: 50 },
  Kainchi: { x: 390, y: 320 },
  Bhowali: { x: 660, y: 170 },
};


const allEdges = [
  ["Kwarab", "Ramgarh"],
  ["Ramgarh", "Kainchi"],
  ["Kainchi", "Bhowali"],
  ["Ramgarh", "Bhowali"],
  ["Kwarab", "Kainchi"],
  ["Kainchi", "Ramgarh"],
];


let highlightedRoute=[];


const isEdgeHighlighted = (source, target) => {
  for (let i = 0; i < highlightedRoute?.length - 1; i++) {
    const a = highlightedRoute[i];
    const b = highlightedRoute[i + 1];
    if (
      (a === source && b === target) ||
      (a === target && b === source)
    ) {
      return true;
    }
  }
  return false;
};

const GraphSVG = (props) => {
    highlightedRoute = props.route;
  return (
    <div className="w-3xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Route Graph (SVG)</h2>
      <svg width="750px" height="400px" className="mx-auto block">
        {/* Draw edges */}
        {allEdges.map(([from, to], idx) => {
          const fromPos = nodePositions[from];
          const toPos = nodePositions[to];
          const highlighted = isEdgeHighlighted(from, to);
          return (
            <line
              key={idx}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={highlighted ? "#3b82f6" : "#d1d5db"} 
              strokeWidth={highlighted ? 4 : 2}
              strokeLinecap="round"
            />
          );
        })}

       
        {locations.map((loc) => {
          const pos = nodePositions[loc];
          return (
            <g key={loc}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={40} 
                fill="#3b82f6"
                stroke="white"
                strokeWidth={3}
              />
              <text
                x={pos.x}
                y={pos.y + 7} 
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                fontSize="16"
                style={{ userSelect: "none", fontFamily: "sans-serif" }}
              >
                {loc.charAt(0).toUpperCase() + loc.slice(1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphSVG;
