import * as d3 from "d3";
//import data from "../data/data.json";

interface Node {
  id: number;
  name: string;
  relations: string[];
}

interface leafNode extends Node {
  value: number;
}

interface branchNode extends Node {
  children: (leafNode | branchNode)[];
}

let data: branchNode = {
  id: 1,
  name: "test",
  relations: ["abc"],
  children: [
    {
      id: 2,
      name: "abc",
      relations: [],
      value: 10,
    },
  ],
};

let hierarchy = d3.hierarchy(data, (d: branchNode) => {
  return d.children;
});

let packackager = d3.pack().size([500, 500]);

let layout = packackager(hierarchy);

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", 500)
  .attr("width", 500);

let bubbles = svg
  .selectAll("g")
  .data(layout.descendants())
  .enter()
  .append("g")
  .attr("a", (d, i, e) => {d.data.});

bubbles
  .append("circle")
  .data(layout.descendants())
  .attr("r", (d, i, e) => {
    return d.r;
  });
