import { XYPosition, Node } from "react-flow-renderer";
import { isOverlapping } from "./isOverlapping";

export function getParent(newNodePosition: XYPosition, nodes: Node[]) {
    let parent;
    for (const node of nodes) {
      if (
        isOverlapping(
          node.positionAbsolute || node.position,
          [node.width!, node.height!],
          newNodePosition
        )
      ) {
        parent = node;
      }
    }
    return parent;
  }