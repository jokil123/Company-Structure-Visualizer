import { hierarchy } from "d3-hierarchy";
import { BranchNode, LeafNode } from "./nodeInterface";

export const zoomToNode = (
  zoomElement: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  node: {
    x: number;
    y: number;
    r: number;
  }
): void => {
  let canvasSize: [number, number] = [
    parseFloat(zoomElement.attr("width")),
    parseFloat(zoomElement.attr("height")),
  ];

  let aspect = canvasSize[0] / canvasSize[1];

  let viewBoxSize: [number, number] = [0, 0];

  if (canvasSize[0] >= canvasSize[1]) {
    viewBoxSize[0] = node.r * 2;
    viewBoxSize[1] = viewBoxSize[0] * aspect;
  } else {
    viewBoxSize[1] = node.r * 2;
    viewBoxSize[0] = viewBoxSize[1] * aspect;
  }

  let viewBoxStart: [number, number] = [
    node.x - viewBoxSize[0] * 0.5,
    node.y - viewBoxSize[1] * 0.5,
  ];

  zoomElement
    .transition()
    .duration(500)
    .attr(
      "viewBox",
      `${viewBoxStart[0]} ${viewBoxStart[1]} ${viewBoxSize[0]} ${viewBoxSize[1]}`
    );
};
