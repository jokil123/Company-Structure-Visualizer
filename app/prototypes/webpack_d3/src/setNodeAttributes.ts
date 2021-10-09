import { compileS } from "@thi.ng/vectors";
import * as d3 from "d3";
import { colorPalette } from "./colors";

import { BranchNode, LeafNode } from "./nodeInterface";

export const setNodeAttributes = (
  groups: d3.Selection<
    SVGGElement,
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    SVGGElement,
    unknown
  >,
  circles: d3.Selection<
    SVGCircleElement,
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    SVGGElement,
    unknown
  >,
  text: d3.Selection<
    SVGTextElement,
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    SVGGElement,
    unknown
  >,
  relations: d3.Selection<
    SVGPathElement,
    [
      d3.HierarchyCircularNode<BranchNode | LeafNode>,
      d3.HierarchyCircularNode<BranchNode | LeafNode>
    ],
    SVGGElement,
    unknown
  >,
  marker: d3.Selection<SVGMarkerElement, unknown, HTMLElement, any>
) => {
  circles
    .attr("fill", (d, i, e) => {
      return colorPalette(d.depth);
    })
    .style("opacity", style.circle.opacity);

  text.attr("fill", style.text.fill);

  relations
    .attr("stroke-width", style.relation.strokeWidth)
    .attr("stroke", style.relation.fill);

  marker.attr("fill", style.relation.fill);

  circles
    .filter((d) => {
      return d.data.focus;
    })
    .attr("fill", "black")
    .style("opacity", 1);
};

const style = {
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

const styleSelected = {};
