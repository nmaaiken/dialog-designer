import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import { CSSProperties, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import useDeleteNode from "../../utils/deleteNode";
import NodeDeleteButton from "../NodeDeleteButton/NodeDeleteButton";

function DeepHistoryStateNode(props) {
  const deleteNode = useDeleteNode();
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const id = props.id;
  const onContextMenu = (event: React.MouseEvent) => {
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };

  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div
      className="history-state-node-container node-body__button-visible-on-hover"
      style={style}
      onContextMenu={onContextMenu}
    >
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="handle no-opacity display-hover stretch-along-border"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="handle no-opacity display-hover stretch-along-border"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="handle no-opacity display-hover stretch-along-border"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle no-opacity display-hover stretch-along-border"
      />
      <svg height={56} width={56}>
        <circle
          cx={28}
          cy={28}
          r={25}
          stroke={"black"}
          strokeWidth={4}
          fill={"white"}
        ></circle>
        <text
          x={28}
          y={28}
          stroke={"black"}
          //strokeWidth={2}
          fontSize={"2rem"}
          textAnchor={"middle"}
          alignmentBaseline={"central"}
        >
          H*
        </text>
      </svg>
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
        onAbort={() => toggleMenu(false)}
      >
        <MenuItem onClick={() => deleteNode(id)}>Delete node</MenuItem>
      </ControlledMenu>
    </div>
  );
}

export default DeepHistoryStateNode;
