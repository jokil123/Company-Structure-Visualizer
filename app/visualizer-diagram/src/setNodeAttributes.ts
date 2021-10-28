import * as d3 from "d3";
import { colorPalette } from "./colors";

import { BranchNode, LeafNode } from "./nodeInterface";
import { nodeTypeProperties, nodeTypes } from "./nodeTypes";

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
      return colorPalette(d);
    })
    .style("opacity", (d, i, e) => {
      if (d.data.type /* && !d.data.type == ""*/) {
        return nodeTypeProperties[<nodeTypes>d.data.type].opacity;
      } else {
        return style.circle.opacity;
      }
    });
  // .style("filter", "");

  text.attr("fill", style.text.fill);

  relations
    .attr("stroke-width", style.relation.strokeWidth)
    .attr("stroke", style.relation.fill);

  marker.transition().duration(250).attr("fill", style.relation.fill);

  circles
    .transition()
    .duration(250)
    .filter((d) => {
      return d.data.focus;
    })
    // .style("filter", "hue-rotate(10deg) saturate(200%)");
    .attr("fill", "#e6e6e6")
    .style("opacity", 1);

  text
    .transition()
    .duration(250)
    .filter((d) => {
      console.log(d.data.focus);
      return d.data.focus;
    })
    .attr("fill", "black");

  relations
    .transition()
    .duration(250)
    .filter((d) => {
      return d.some((ref) => {
        if (ref.data.focus) {
          return true;
        }
      });
    })
    .attr("stroke-width", 5);
};

const style = {
  chart: {
    padding: 20,
  },
  relation: {
    fill: "#4472C4",
    strokeWidth: 3,
  },
  circle: {
    opacity: 0.75,
  },
  text: {
    fill: "white",
  },
};

const styleSelected = {};
