import { BranchNode, LeafNode } from "./nodeInterface";
import * as d3 from "d3";

export const generateNodes = (
  data: BranchNode,
  size: [number, number],
  padding: number
) => {
  let hierarchy = d3
    .hierarchy(data, (d: BranchNode) => {
      return d.children;
    })
    .sum((d) => {
      return d.value;
    })
    .sort((a, b) => b.value - a.value);

  let packager = d3.pack().size(size).padding(padding);

  let layout = packager(hierarchy);

  let nodes = layout.descendants().map((d) => {
    d.data = { ...(<LeafNode | BranchNode>d.data), focus: false };
    return <d3.HierarchyCircularNode<LeafNode | BranchNode>>d;
  });

  return nodes;
};
