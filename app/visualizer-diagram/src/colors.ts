import { color } from "d3";
import { BranchNode, LeafNode } from "./nodeInterface";
import { nodeTypeProperties } from "./nodeTypes";

export const colorPalette = (
  d: d3.HierarchyCircularNode<BranchNode | LeafNode>
): string => {
  let palette = ["#003049", "#fcbf49", "#f77f00", "#d62828"];

  return nodeTypeProperties[d.data.type]
    ? nodeTypeProperties[d.data.type].color
    : palette[d.depth];
};
