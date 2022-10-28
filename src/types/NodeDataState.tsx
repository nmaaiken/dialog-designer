import { NodeDetailData } from "./NodeDetailData";
export interface NodeDataState {
  nodeData: NodeDetailData[];
  updateNodeData: (data: NodeDetailData) => void;
  removeNodeData: (nodeId: string) => void;
}
