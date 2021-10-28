import * as d3 from "d3";
import { drawRelationLine } from "./relationLine";
import { BranchNode, LeafNode } from "./nodeInterface";
import { generateNodes } from "./generateNodes";
import { findRelations } from "./findRelations";
import { zoomToNode } from "./zoomToNode";
import { setNodeAttributes } from "./setNodeAttributes";

export const chart = (
  data: BranchNode,
  size: [number, number],
  padding: number
) => {
  let nodes = generateNodes(data, size, padding);

  let baseZoomNode = nodes[0];
  let zoomNode = nodes[0];

  d3.select("body").select("svg").remove();

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", size[0])
    .attr("height", size[1])
    .attr("viewBox", `0 0 ${size[0]} ${size[1]}`);

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrowhead")
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("refX", 5)
    .attr("refY", 3)
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 6 3, 0 6");

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

  let circles = bubbles
    .append("circle")
    .data(nodes)
    .attr("r", (d, i, e) => {
      return d.r;
    });

  let text = bubbles
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
    });

  let relations = findRelations(nodes);

  let relationPaths = svg
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
    .attr("fill", "transparent")
    .attr("marker-end", "url(#arrowhead)");

  setNodeAttributes(
    bubbles,
    circles,
    text,
    relationPaths,
    svg.select("defs").select("marker")
  );

  circles
    .on("dblclick", (e: Event, d) => {
      if (d) {
        // 🤮
        let dParsed = <d3.HierarchyCircularNode<BranchNode | LeafNode>>d;

        if (dParsed == zoomNode) {
          zoomToNode(svg, baseZoomNode);
          zoomNode = baseZoomNode;
        } else {
          zoomToNode(svg, dParsed);
          zoomNode = dParsed;
        }
      }
    })
    .on("click", (e: Event, d) => {
      if (d) {
        nodes.forEach((node) => {
          node.data.focus = false;
        });

        (<d3.HierarchyCircularNode<BranchNode | LeafNode>>d).data.focus = true;
        setNodeAttributes(
          bubbles,
          circles,
          text,
          relationPaths,
          svg.select("defs").select("marker")
        );
      }
    });

  let resize = () => {
    svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
    zoomToNode(svg, zoomNode, 0);
  };

  window.addEventListener("resize", () => {
    resize();
  });
  resize();
  return svg;
};
