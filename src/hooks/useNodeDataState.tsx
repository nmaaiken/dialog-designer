import create from "zustand";
import produce from "immer";
import { NodeDataState } from "../types/NodeDataState";
import { NodeDetailData } from "../types/NodeDetailData";

export const useNodeDataState = create<NodeDataState>((set) => ({
  nodeData: [],
  updateNodeData: (data: NodeDetailData) =>
    set((state) => {
      let existingNodeIndex: number | undefined = undefined;
      let newNodeData = [...state.nodeData];

      for (const node of state.nodeData) {
        if (data.id.toString === node.id.toString) {
          console.log("New node id: " + data.id);
          console.log("Existing node id: " + node.id);
          console.log("IDs are equal?: " + (data.id === node.id));
          existingNodeIndex = state.nodeData.indexOf(node);
        }
      }

      if (existingNodeIndex !== undefined) {
        newNodeData[existingNodeIndex] = data;
      } else {
        newNodeData.push(data);
      }
      state.nodeData = newNodeData;
    }),
  removeNodeData: (nodeId) =>
    set((state) => {
      let index = state.nodeData.findIndex((el) => el.id === nodeId);
      state.nodeData.splice(index !== -1 ? index : 0);
    }),
}));
