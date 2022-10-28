import { XYPosition } from "react-flow-renderer";

export function isOverlapping(node1Position: XYPosition, node1Dims: [number, number], node2Position: XYPosition) {

    const node1BottomRightPosition: XYPosition = {
        x: node1Position.x + node1Dims[0],
        y: node1Position.y + node1Dims[1]
    }
    const isOverlapping = node1Position.x < node2Position.x && node1BottomRightPosition.x > node2Position.x && node1Position.y < node2Position.y && node1BottomRightPosition.y > node2Position.y;
    console.log(isOverlapping);
    return isOverlapping;
}