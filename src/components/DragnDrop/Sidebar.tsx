import { DragEvent } from "react";
import { CSSProperties } from "react";
import "./sidebar.css";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = () => {
  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  };

  const nsnNameStyle: CSSProperties = {
    borderBottom: "1px #000 solid",
    flex: 0.5,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    backgroundColor: "rgba(40, 40, 40, 0.3)",
  };

  return (
    <aside>
      <h4>Drag these items onto the canvas to start a new graph:</h4>
      <div
        className="named-state-node__body"
        onDragStart={(event: DragEvent) => onDragStart(event, "namedStateNode")}
        draggable
        style={style}
      >
        <div className="named-state-node__name" style={nsnNameStyle}></div>
        <div className="named-state-node__content"></div>
      </div>
      <div
        className="delete-button__no-display padding-top"
        onDragStart={(event: DragEvent) =>
          onDragStart(event, "userSpeechbubble")
        }
        draggable
        style={style}
      >
        <div className="speech-bubble user width-set"></div>
      </div>
      <div
        className="speechbubble__node delete-button__no-display padding-top"
        onDragStart={(event: DragEvent) =>
          onDragStart(event, "magentaSpeechbubble")
        }
        draggable
        style={style}
      >
        <div className="speech-bubble magenta width-set"></div>
      </div>
      <div
        className="initial-state__node delete-button__no-display"
        onDragStart={(event: DragEvent) => onDragStart(event, "initialState")}
        draggable
        style={style}
      >
        <svg height={56} width={56}>
          <circle cx={28} cy={28} r={25} fill={"black"}></circle>
        </svg>
      </div>
      <div
        className="final-state__node delete-button__no-display"
        onDragStart={(event: DragEvent) => onDragStart(event, "finalState")}
        draggable
        style={style}
      >
        <svg height={56} width={56}>
          <circle cx={28} cy={28} r={25} fill={"black"}></circle>
          <circle cx={28} cy={28} r={22} fill={"white"}></circle>
          <circle cx={28} cy={28} r={19} fill={"black"}></circle>
        </svg>
      </div>
      <div
        className="history-state__node delete-button__no-display"
        onDragStart={(event: DragEvent) =>
          onDragStart(event, "shallowHistoryState")
        }
        draggable
        style={style}
      >
        <svg height={56} width={56}>
          <circle
            cx={28}
            cy={28}
            r={25}
            stroke={"black"}
            strokeWidth={4}
            fill={"white"}
          ></circle>
          <text
            x={28}
            y={28}
            stroke={"black"}
            //strokeWidth={2}
            fontSize={"2rem"}
            textAnchor={"middle"}
            alignmentBaseline={"central"}
          >
            H
          </text>
        </svg>
      </div>
      <div
        className="history-state__node delete-button__no-display"
        onDragStart={(event: DragEvent) =>
          onDragStart(event, "deepHistoryState")
        }
        draggable
        style={style}
      >
        <svg height={56} width={56}>
          <circle
            cx={28}
            cy={28}
            r={25}
            stroke={"black"}
            strokeWidth={4}
            fill={"white"}
          ></circle>
          <text
            x={28}
            y={28}
            stroke={"black"}
            //strokeWidth={2}
            fontSize={"2rem"}
            textAnchor={"middle"}
            alignmentBaseline={"central"}
          >
            H*
          </text>
        </svg>
      </div>
      <div
        className="conditional__node delete-button__no-display padding-top"
        onDragStart={(event: DragEvent) => onDragStart(event, "conditional")}
        draggable
        style={style}
      >
        <svg width={40} height={40} className="diamond-rect">
          <rect
            width={40}
            height={40}
            fill={"white"}
            stroke={"black"}
            strokeWidth={2}
          ></rect>
        </svg>
      </div>
      <div
        className="padding-top"
        onDragStart={(event: DragEvent) => onDragStart(event, "forkJoinNode")}
        draggable
        style={style}
      >
        <div className="fork-join-node"></div>
      </div>
      <div
        onDragStart={(event: DragEvent) => onDragStart(event, "junctionNode")}
        draggable
        style={style}
      >
        <svg height={36} width={36}>
          <circle cx={18} cy={18} r={18} fill={"black"}></circle>
        </svg>
      </div>
      {/*       <div
        className="padding-top"
        onDragStart={(event: DragEvent) =>
          onDragStart(event, "terminationNode")
        }
        draggable
        style={style}
      >
        <div className="crossbar1">
          <div className="crossbar2"></div>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
