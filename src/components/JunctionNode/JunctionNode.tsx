import { useMenuState, ControlledMenu, MenuItem } from "@szhsin/react-menu";
import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import useDeleteNode from "../../utils/deleteNode";

function JunctionNode(props) {
  const deleteNode = useDeleteNode();
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const id = props.id;
  const onContextMenu = (event: React.MouseEvent) => {
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };
  return (
    <div
      className="initialstate-node-container node-body__button-visible-on-hover"
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
      <svg height={36} width={36}>
        <circle cx={18} cy={18} r={18} fill={"black"}></circle>
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

export default JunctionNode;
