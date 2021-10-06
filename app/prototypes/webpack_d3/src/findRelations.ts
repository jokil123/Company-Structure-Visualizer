import { BranchNode, LeafNode, Node } from "./nodeInterface";

export const findRelations = (
  nodes: d3.HierarchyCircularNode<BranchNode | LeafNode>[]
) => {
  let relations: [
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    d3.HierarchyCircularNode<BranchNode | LeafNode>
  ][] = [];

  nodes.forEach((e) => {
    if (!e.data.relations) {
      return;
    }

    e.data.relations.forEach((r) => {
      let n = nodes.find((n) => {
        return n.data.name == r;
      });

      if (n == undefined) {
        throw new Error(`DATA ERROR: Cannot find Node "${r}"`);
      }

      relations.push([e, n]);
    });
  });
  return relations;
};
