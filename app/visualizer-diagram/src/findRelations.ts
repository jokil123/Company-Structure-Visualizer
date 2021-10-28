import { BranchNode, LeafNode, Node } from "./nodeInterface";

export const findRelations = (
  nodes: d3.HierarchyCircularNode<BranchNode | LeafNode>[]
) => {
  let relations: [
    d3.HierarchyCircularNode<BranchNode | LeafNode>,
    d3.HierarchyCircularNode<BranchNode | LeafNode>
  ][] = [];

  console.log(
    nodes.map((node) => {
      return node.data.name;
    })
  );

  nodes.forEach((e) => {
    if (!e.data.relations) {
      return;
    }

    e.data.relations.forEach((r) => {
      console.log(r);
      if (r == "") {
        return;
      }

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
