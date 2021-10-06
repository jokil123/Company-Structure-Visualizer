export interface Node {
  name: string;
  value?: number;
  relations?: string[];
  focus?: boolean;
}

export interface LeafNode extends Node {
  value: number;
}

export interface BranchNode extends Node {
  children: (LeafNode | BranchNode)[];
}
