import { useState, DragEvent, useMemo, MouseEvent } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  MiniMap,
  Background,
  ReactFlowInstance,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from "react-flow-renderer";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";

import TextUpdaterNode from "../TextUpdaterNode/TextUpdaterNode";
import NamedStateNode from "../NamedStateNode/NamedStateNode";
import Sidebar from "./Sidebar";
import NodeDetailView from "../NodeDetailView/NodeDetailView";

import "./dnd.css";
import "@szhsin/react-menu/dist/core.css";
import { useNodeDataState } from "../../hooks/useNodeDataState";
import InitialStateNode from "../InitialStateNode/InitialStateNode";
import FinalStateNode from "../FinalStateNode/FinalStateNode";
import ShallowHistoryStateNode from "../HistoryStateNode/ShallowHistoryStateNode";
import { createNewNode } from "../../utils/NodeFactory";
import ChoiceNode from "../ChoiceNode/ChoiceNode";
import UpdatableLabelEdge from "../UpdatableLabelEdge/UpdatableLabelEdge";
import UserSpeechBubbleNode from "../SpeechBubbleNode/UserSpeechBubbleNode";
import MagentaSpeechBubbleNode from "../SpeechBubbleNode/MagentaSpeechBubbleNode";
import ForkJoinNode from "../ForkJoinNode/ForkJoinNode";
import JunctionNode from "../JunctionNode/JunctionNode";
import DeepHistoryStateNode from "../HistoryStateNode/DeepHistoryStateNode";
import TerminationStateNode from "../TerminationNode/TerminationNode";
import Header from "./Header";

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isNodeClicked, toggleNodeClicked] = useState(false);
  const [activeNode, setActiveNode] = useState<Node>();
  const updateNodeDetailsState = useNodeDataState(
    (state) => state.updateNodeData
  );

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNode,
      namedStateNode: NamedStateNode,
      initialState: InitialStateNode,
      finalState: FinalStateNode,
      shallowHistoryState: ShallowHistoryStateNode,
      deepHistoryState: DeepHistoryStateNode,
      conditional: ChoiceNode,
      userSpeechbubble: UserSpeechBubbleNode,
      magentaSpeechbubble: MagentaSpeechBubbleNode,
      forkJoinNode: ForkJoinNode,
      junctionNode: JunctionNode,
      terminationNode: TerminationStateNode,
    }),
    []
  );
  const edgeTypes = useMemo(() => ({ default: UpdatableLabelEdge }), []);

  const onNodeClick = (event, node: Node) => {
    setActiveNode(node);
    toggleNodeClicked(true);
  };

  const onPaneClick = () => {
    toggleNodeClicked(false);
  };

  const onNodeContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  const onConnect = (params: Connection | Edge) =>
    setEdges((eds) => addEdge(params, eds));
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    // currently, when a new node is being added while the detail view is open,
    //it will try to read data from the state that is not yet there and will crash the app.
    // Therefore, we close the view on drop to prevent a crash. This is only a temporary fix to prevent crashes.
    toggleNodeClicked(false);

    if (reactFlowInstance) {
      const newNode = createNewNode(event, reactFlowInstance, getId(), nodes);
      updateNodeDetailsState({
        id: newNode.id,
        name: `${newNode.type} node`,
        comment: "",
      });

      setNodes((nds) => nds.concat(newNode));
    }
  };

  return (
    <div className="dndflow">
      <div className="dndflow__flowcontainer">
        <ReactFlowProvider>
          <div className="reactflow-wrapper">
            <Header />
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={nodes}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeContextMenu={onNodeContextMenu}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              edgeTypes={edgeTypes}
              /* snapToGrid={true} */
              /* snapGrid={snapGrid} */
              connectionMode={ConnectionMode.Loose}
              fitView
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>
            {/* <ControlledMenu
              {...menuProps}
              anchorPoint={anchorPoint}
              onClose={() => toggleMenu(false)}
              onAbort={() => toggleMenu(false)}
            >
              <MenuItem>Add details</MenuItem>
            </ControlledMenu> */}
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
      {/* {isNodeClicked && <NodeDetailView node={activeNode as Node} />} */}
    </div>
  );
};

export default DnDFlow;
