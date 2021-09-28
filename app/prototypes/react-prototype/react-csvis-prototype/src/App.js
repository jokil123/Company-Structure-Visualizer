import { useState } from "react";

import Bubble from "./components/Bubble";

const App = () => {
  const [graph, setGraph] = useState({
    text: "Parent",
    children: [
      {
        text: "Child with sibling 1",
        children: [
          {
            text: "Child of Child",
            children: [],
          },
        ],
      },
      {
        text: "Child with sibling 2",
        children: [],
      },
    ],
  });

  return (
    <div className="App">
      <Bubble graph={graph} />
    </div>
  );
};

export default App;
