import * as d3 from "d3";
import data from "../data/data.json";
import "./index.scss";
import { drawRelationLine } from "./relationLine";
import { BranchNode, LeafNode } from "./nodeInterface";
import { colorPalette } from "./colors";
import { generateNodes } from "./generateNodes";
import { findRelations } from "./findRelations";

const chart = (
  data: BranchNode,
  size: [number, number],
  style: {
    chart: {
      padding: number;
    };
    relation: {
      fill: string;
      strokeWidth: number;
    };
    circle: {
      opacity: number;
    };
    text: {
      fill: string;
    };
  },
  styleSelected?: {
    relation?: {};
    circle?: {};
    text?: {};
  }
) => {
  let nodes = generateNodes(data, size, style.chart.padding);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", size[0])
    .attr("height", size[1]);

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrowhead")
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("refX", 7)
    .attr("refY", 4)
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 8 4, 0 8")
    .attr("fill", style.relation.fill);

  let bubbles = svg
    .append("g")
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .attr("id", (d, i, e) => {
      let a = d.data.name;
      return a;
    })
    .attr("transform", (d, i, e) => {
      return `translate(${d.x}, ${d.y})`;
    });

  bubbles
    .append("circle")
    .data(nodes)
    .attr("r", (d, i, e) => {
      return d.r;
    })
    .attr("fill", (d, i, e) => {
      return colorPalette(d.depth);
    })
    .style("opacity", style.circle.opacity)
    // event stuff
    .on("click", (e: Event, d) => {
      d.data.focus = true;
      console.log(e.target);
    });

  bubbles
    .append("text")
    .data(nodes)
    .text((d, i, e) => {
      return d.data.name;
    })
    .attr("transform", (d, i, e) => {
      return `translate(0,${d.r * -0.2})`;
    })
    .attr("text-anchor", "middle")
    .style("font-size", (d, i, e) => {
      return (d.r * 0.25) / (d.data.name.length * 0.01 + 1);
    })
    .attr("fill", style.text.fill);

  let relations = findRelations(nodes);

  svg
    .append("g")
    .selectAll("path")
    .data(relations)
    .enter()
    .append("path")
    .attr("d", (d, i, e) => {
      return drawRelationLine(
        {
          x: d[0].x,
          y: d[0].y,
          r: d[0].r,
        },
        {
          x: d[1].x,
          y: d[1].y,
          r: d[1].r,
        }
      );
    })
    .attr("stroke", style.relation.fill)
    .attr("fill", "transparent")
    .attr("stroke-width", style.relation.strokeWidth)
    .attr("marker-end", "url(#arrowhead)");
};

let style = {
  chart: {
    padding: 20,
  },
  relation: {
    fill: "#4472C4",
    strokeWidth: 1,
  },
  circle: {
    opacity: 0.75,
  },
  text: {
    fill: "white",
  },
};

let styleSelected = {};

chart(data, [1000, 1000], style);
