import { Node } from "react-flow-renderer";
import { useNodeDataState } from "../../hooks/useNodeDataState";

import "./node-detail-view.css";
import { useState, useRef } from "react";

export interface NodeDetailViewProps {
  node: Node;
}
function NodeDetailView(props: NodeDetailViewProps) {
  const nodeDataState = useNodeDataState((state) => state.nodeData);
  const setNodeDetails = useNodeDataState((state) => state.updateNodeData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const commentTextArea = useRef<HTMLTextAreaElement>(null);
  const nameTextArea = useRef<HTMLTextAreaElement>(null);

  let doesNodeExist, nodeDetails;
  for (const node of nodeDataState) {
    if (node.id === props.node.id) {
      nodeDetails = node;
      doesNodeExist = true;
    }
  }

  const [comment, setComment] = useState(nodeDetails.comment);
  const [name, setName] = useState(nodeDetails.name);

  const isNodeSpeechBubble = props.node.type?.includes("Speechbubble") || false;

  const onEditClick = (event) => {
    event.preventDefault();
    setIsDisabled(false);
    setIsEditable(true);
  };
  const onSaveClick = (event) => {
    event.preventDefault();

    setNodeDetails({
      id: nodeDetails.id,
      name: nameTextArea.current
        ? nameTextArea.current.value
        : nodeDetails.name,
      comment: commentTextArea.current
        ? commentTextArea.current.value
        : nodeDetails.comment,
    });

    setIsDisabled(true);
    setIsEditable(false);
  };

  const onCancelClick = (event) => {
    event.preventDefault();
    setComment(nodeDetails.comment);
    setName(nodeDetails.name);
    setIsDisabled(true);
    setIsEditable(false);
  };

  const onCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const onNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  return (
    <div className="node-detail-view">
      {doesNodeExist && (
        <>
          <h3 className="node-detail-view__heading">Details</h3>
          <div className="wrapper">
            <div className="node-detail-view__details">
              <label>Name:</label>
              <textarea
                className="name-area"
                disabled={isDisabled}
                value={name}
                onChange={onNameChange}
                ref={nameTextArea}
              ></textarea>
              {isNodeSpeechBubble && (
                <>
                  <label>Sample Utterances:</label>
                  <textarea
                    className="utterance-area"
                    disabled={isDisabled}
                    ref={nameTextArea}
                  ></textarea>
                </>
              )}

              <label>Comment:</label>
              <textarea
                className="comment-area"
                name="comment"
                id="comment"
                value={comment}
                disabled={isDisabled}
                onChange={onCommentChange}
                ref={commentTextArea}
              ></textarea>
            </div>
            <div className="button-wrapper">
              {isEditable ? (
                <>
                  <button className="button-primary" onClick={onSaveClick}>
                    Save
                  </button>
                  <button className="button-cancel" onClick={onCancelClick}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="button-primary" onClick={onEditClick}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NodeDetailView;
