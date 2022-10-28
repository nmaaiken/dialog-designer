import { ReactFlowInstance, Node } from "react-flow-renderer";
import { DragEvent } from "react";
import { getParent } from "./getParent";

export function createNewNode(
  event: DragEvent,
  reactFlowInstance: ReactFlowInstance,
  id: string,
  nodes: Node[]
) {
  const type = event.dataTransfer!.getData("application/reactflow");
  const position = reactFlowInstance.project({
    x: event.clientX,
    y: event.clientY,
  });
  const newId = id;
  const parent: Node = getParent(position, nodes);

  const newNode: Node = {
    id: newId,
    type,
    position,
    data: {
      label: `${type} node`,
      id: newId,
    },
    expandParent: false,
  };

  if (parent) {
    newNode.parentNode = parent.id;
    newNode.extent = "parent";
    newNode.position = {
      x: position.x - (parent.positionAbsolute?.x || parent.position.x),
      y: position.y - (parent.positionAbsolute?.y || parent.position.y),
    };
  }

  return newNode;
}
