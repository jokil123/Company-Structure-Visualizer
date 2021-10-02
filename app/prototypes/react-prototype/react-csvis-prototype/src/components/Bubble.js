import { v4 as uuid } from "uuid";

const Bubble = ({ graph }) => {
  return (
    <div className="bubble">
      <p>{graph.text}</p>
      <div>
        {graph.children.length > 0
          ? graph.children.map((child) => <Bubble key={uuid()} graph={child} />)
          : ""}
      </div>
    </div>
  );
};

export default Bubble;
