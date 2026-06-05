import ReactFlow, {
  MarkerType,
  Position
} from "reactflow";

import CircularProgress from "@mui/material/CircularProgress";

import "reactflow/dist/style.css";

function AgentGraph({ steps }: any) {

  const getColor = (status: string) => {

    if (status === "running") return "#2563eb";

    if (status === "success") return "#16a34a";

    if (status === "failed") return "#dc2626";

    return "#374151";
  };

  const nodeStyle = (status: string) => ({

    background: getColor(status),

    color: "white",

    width: 220,

    height: 90,

    borderRadius: 16,

    fontWeight: "bold",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "15px",

    border: "2px solid rgba(255,255,255,0.08)"

  });

  const nodeLabel = (
    label: string,
    running: boolean
  ) => (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8
      }}
    >

      {
        running && (
          <CircularProgress
            size={14}
            sx={{
              color: "white"
            }}
          />
        )
      }

      <span>{label}</span>

    </div>

  );

  const nodes = [

    {
      id: "1",
      position: { x: 0, y: 0 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Parse",
          steps?.parse === "running"
        )
      },

      style: nodeStyle(steps?.parse)
    },

    {
      id: "2",
      position: { x: 280, y: 0 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Extract",
          steps?.extract === "running"
        )
      },

      style: nodeStyle(steps?.extract)
    },

    {
      id: "3",
      position: { x: 560, y: 0 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Allocate",
          steps?.allocate === "running"
        )
      },

      style: nodeStyle(steps?.allocate)
    },

    {
      id: "4",
      position: { x: 840, y: 0 },

      sourcePosition: Position.Bottom,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Validate",
          steps?.validate === "running"
        )
      },

      style: nodeStyle(steps?.validate)
    },

    {
      id: "5",
      position: { x: 0, y: 140 },

      sourcePosition: Position.Right,
      targetPosition: Position.Top,

      data: {
        label: nodeLabel(
          "Search Attractions",
          steps?.search === "running"
        )
      },

      style: nodeStyle(steps?.search)
    },

    {
      id: "6",
      position: { x: 280, y: 140 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Search Hotels",
          steps?.hotels === "running"
        )
      },

      style: nodeStyle(steps?.hotels)
    },

    {
      id: "7",
      position: { x: 560, y: 140 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Build Itinerary",
          steps?.itinerary === "running"
        )
      },

      style: nodeStyle(steps?.itinerary)
    },

    {
      id: "8",
      position: { x: 840, y: 140 },

      sourcePosition: Position.Right,
      targetPosition: Position.Left,

      data: {
        label: nodeLabel(
          "Final Response",
          steps?.final === "running"
        )
      },

      style: nodeStyle(steps?.final)
    }

  ];

  const commonEdge = {

    type: "straight",

    style: {
      stroke: "#94a3b8",
      strokeWidth: 2
    },

    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  };

  const edges = [

    {
      id: "e1",
      source: "1",
      target: "2",
      ...commonEdge
    },

    {
      id: "e2",
      source: "2",
      target: "3",
      ...commonEdge
    },

    {
      id: "e3",
      source: "3",
      target: "4",
      ...commonEdge
    },

    {
      id: "e4",

      source: "4",

      target: "5",

      type: "smoothstep",

      style: {
        stroke: "#94a3b8",
        strokeWidth: 2
      },

      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    },

    {
      id: "e5",
      source: "5",
      target: "6",
      ...commonEdge
    },

    {
      id: "e6",
      source: "6",
      target: "7",
      ...commonEdge
    },

    {
      id: "e7",
      source: "7",
      target: "8",
      ...commonEdge
    }

  ];

  return (

    <div
      style={{
        height: 280
      }}
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{
          padding: 0.2
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        proOptions={{
          hideAttribution: true
        }}
      />

    </div>

  );
}

export default AgentGraph;