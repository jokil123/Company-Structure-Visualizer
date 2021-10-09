import { BranchNode, LeafNode } from "./nodeInterface";

export const setNodeAttributes = (
  selection: d3.Selection<
    SVGGElement,
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    SVGGElement,
    unknown
  >
) => {
  selection.selectAll("g");
};
