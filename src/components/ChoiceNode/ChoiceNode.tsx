import { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import Moveable from "react-moveable";
import ReactTextareaAutosize from "react-textarea-autosize";
import { NodeDetailData } from "../../types/NodeDetailData";
import NodeDeleteButton from "../NodeDeleteButton/NodeDeleteButton";
import useDeleteNode from "../../utils/deleteNode";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "./choice-node.css";

function ChoiceNode(props) {
  const [frame, setFrame] = useState({ translate: [0, 0] });
  const id = props.id;
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [menuProps, toggleMenu] = useMenuState();
  const deleteNode = useDeleteNode();

  const onContextMenu = (event: React.MouseEvent) => {
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };

  return (
    <div
      className="conditional-container node-body__button-visible-on-hover choice-node"
      id={props.id}
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
      <ReactTextareaAutosize />
      <div className="svg-container">
        <svg width={40} height={40} className="diamond-rect">
          <rect
            /*   x={"25%"}
            y={"10%"} */
            width={40}
            height={40}
            fill={"white"}
            stroke={"black"}
            strokeWidth={2}
            /* transform={"rotate(45, 28, 28)"} */
          ></rect>
        </svg>
      </div>
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

export default ChoiceNode;
