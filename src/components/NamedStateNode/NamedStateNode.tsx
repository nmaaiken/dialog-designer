import { useCallback, useRef, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import Moveable from "react-moveable";

import "./nsn.css";
import NodeDeleteButton from "../NodeDeleteButton/NodeDeleteButton";
import {
  ControlledMenu,
  Menu,
  MenuItem,
  useMenuState,
} from "@szhsin/react-menu";
import "../../../node_modules/@szhsin/react-menu/dist/core.css";
import "../../../node_modules/@szhsin/react-menu/dist/index.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import deleteNode from "../../utils/deleteNode";
import useDeleteNode from "../../utils/deleteNode";

function NamedStateNode({ data }) {
  const [frame, setFrame] = useState({ translate: [0, 0] });
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [regions, setRegions] = useState(0);
  const [compartments, setCompartments] = useState(0);
  const [zzIndex, setZIndex] = useState(1000);
  const deleteNode = useDeleteNode();

  const id: string = data.id;

  const onContextMenu = (event: React.MouseEvent) => {
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };

  const addVerticalRegion = () => {
    setRegions(regions + 1);
  };

  const deleteVerticalRegion = () => {
    setRegions(regions - 1);
  };

  const addCompartment = () => {
    setCompartments(compartments + 1);
  };

  const deleteCompartment = () => {
    setCompartments(compartments - 1);
  };

  const sendToBack = () => {
    setZIndex(0);
  };

  const style = {
    zIndex: zzIndex,
  };

  return (
    <>
      <div
        className="named-state-node"
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
        <div className="named-state-node__body" id={id}>
          <div className="named-state-node__name">
            <ReactTextareaAutosize autoFocus className="state-text-field" />
          </div>
          <div className="compartment-region-content-wrapper">
            <div className="compartments">
              {[...Array(compartments)].map(
                (child: undefined, index: number) => (
                  <div className="named-state-node__compartment" key={index}>
                    <ReactTextareaAutosize
                      autoFocus
                      className="state-text-field"
                    />
                  </div>
                )
              )}
            </div>
            <div className="regions bottom-borders-rounded">
              {[...Array(regions)].map((child: undefined, index: number) => (
                <div className="named-state-node__region" key={index}>
                  <ReactTextareaAutosize
                    autoFocus
                    className="state-text-field"
                  />
                </div>
              ))}
              <div className="default-region">
                <ReactTextareaAutosize autoFocus className="state-text-field" />
              </div>
            </div>
          </div>
        </div>
        <Moveable
          target={document.querySelector<HTMLElement>("#" + id)}
          resizable={true}
          origin={false}
          throttleResize={1}
          renderDirections={["se"]}
          onResizeStart={(event) => {
            event.setOrigin(["%", "%"]);
            event.dragStart && event.dragStart.set(frame.translate);
          }}
          onResize={(event) => {
            const beforeTranslate = event.drag.beforeTranslate;

            frame.translate = beforeTranslate;
            event.target.style.width = `${event.width}px`;
            event.target.style.height = `${event.height}px`;
            event.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
        />
        <ControlledMenu
          {...menuProps}
          anchorPoint={anchorPoint}
          onClose={() => toggleMenu(false)}
          onAbort={() => toggleMenu(false)}
        >
          <MenuItem>Add details</MenuItem>
          <MenuItem onClick={addCompartment}>Add compartment</MenuItem>
          <MenuItem onClick={addVerticalRegion}>Add vertical region</MenuItem>
          <MenuItem onClick={deleteVerticalRegion}>
            Delete vertical region
          </MenuItem>
          <MenuItem onClick={deleteCompartment}>Delete compartment</MenuItem>
          {/* <MenuItem onClick={sendToBack}>Send to back</MenuItem> */}
          <MenuItem onClick={() => deleteNode(id)}>Delete node</MenuItem>
        </ControlledMenu>
      </div>
    </>
  );
}

export default NamedStateNode;
