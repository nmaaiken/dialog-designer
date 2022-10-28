import { useMenuState, ControlledMenu, MenuItem } from "@szhsin/react-menu";
import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import useDeleteNode from "../../utils/deleteNode";
import "./fork-join-node.css";

function ForkJoinNode(props) {
  const deleteNode = useDeleteNode();
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const id = props.id;
  const onContextMenu = (event: React.MouseEvent) => {
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };
  return (
    <div onContextMenu={onContextMenu}>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle no-opacity display-hover stretch-along-border"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="handle no-opacity display-hover stretch-along-border"
      />

      <div className="fork-join-node"></div>
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

export default ForkJoinNode;
