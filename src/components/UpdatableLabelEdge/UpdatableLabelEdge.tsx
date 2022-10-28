import { CSSProperties, useState } from "react";
import { getSmoothStepPath, getEdgeCenter } from "react-flow-renderer";
import ReactTextareaAutosize from "react-textarea-autosize";
import "./updatable-edge.css";

function UpdatableLabelEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}) {
  const foreignObjectSize = 86;
  const [hasFocus, setHasFocus] = useState(false);

  const inputStyle: CSSProperties = {
    display: "flex",
    textAlign: "center",
    outline: "none",
    backgroundColor: hasFocus ? "rgba(164, 233, 255, 0.5" : "transparent",
  };

  const onMouseOver = (event) => {
    event.preventDefault();
    setHasFocus(true);
  };

  const onMouseLeave = (event) => {
    event.preventDefault();
    setHasFocus(false);
  };

  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <svg>
      <defs>
        <marker
          id="triangle"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="10"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#777" />
        </marker>
      </defs>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={"url(#triangle)"}
      />
      <foreignObject
        width={322}
        height={60}
        x={edgeCenterX - 161}
        y={edgeCenterY - 45}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          {/* <input
            type="text"
            className="edge__label--visible-on-hover"
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            style={inputStyle}
          /> */}
          <ReactTextareaAutosize className="double-width" />
        </div>
      </foreignObject>
    </svg>
  );
}

export default UpdatableLabelEdge;
