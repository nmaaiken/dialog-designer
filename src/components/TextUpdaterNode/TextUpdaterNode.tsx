import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

import "./text_updater_node.css";

function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          type="text"
          className="node-text-field"
          defaultValue="Type here"
          name="text"
          onChange={onChange}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default TextUpdaterNode;
