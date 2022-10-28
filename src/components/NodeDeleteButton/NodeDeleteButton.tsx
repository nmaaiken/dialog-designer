import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ReactFlowState,
  useStore,
  useStoreApi,
  getConnectedEdges,
  EdgeChange,
  NodeChange,
} from "react-flow-renderer";
import shallow from "zustand/shallow";
import "./node-delete-button.css";
import { useNodeDataState } from "../../hooks/useNodeDataState";

function NodeDeleteButton(props: { id: string }) {
  const selector = (s: ReactFlowState) => ({
    onNodesChange: s.onNodesChange,
    onEdgesChange: s.onEdgesChange,
  });

  const { onNodesChange, onEdgesChange } = useStore(selector, shallow);
  const removeNodeData = useNodeDataState((state) => state.removeNodeData);
  const store = useStoreApi();

  function deleteNode(nodeId: string) {
    const {
      nodeInternals,
      edges,
      hasDefaultNodes,
      hasDefaultEdges,
      onNodesDelete,
      onEdgesDelete,
    } = store.getState();
    const nodes = Array.from(nodeInternals.values());
    const nodeToRemove = nodes.filter((el) => el.id === nodeId);
    const connectedEdgesToRemove = getConnectedEdges(nodeToRemove, edges);
    const edgeIdsToRemove = connectedEdgesToRemove.reduce<string[]>(
      (res, edge) => {
        if (!res.includes(edge.id)) {
          res.push(edge.id);
        }
        return res;
      },
      []
    );

    if (edgeIdsToRemove.length > 0) {
      onEdgesDelete?.(connectedEdgesToRemove);

      if (onEdgesChange) {
        const edgeChanges: EdgeChange[] = edgeIdsToRemove.map((id) => ({
          id,
          type: "remove",
        }));
        onEdgesChange(edgeChanges);
      }
    }

    if (nodeToRemove.length > 0) {
      onNodesDelete?.(nodeToRemove);

      if (onNodesChange) {
        const nodeChanges: NodeChange[] = nodeToRemove.map((n) => ({
          id: n.id,
          type: "remove",
        }));
        onNodesChange(nodeChanges);
      }

      removeNodeData(nodeId);
    }

    store.setState({ nodesSelectionActive: false });
  }

  return (
    <button className="node-delete-button" onClick={() => deleteNode(props.id)}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export default NodeDeleteButton;
