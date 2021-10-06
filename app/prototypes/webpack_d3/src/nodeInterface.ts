export interface Node {
  name: string;
  value?: number;
  relations?: string[];
  focus?: boolean;
}

export interface leafNode extends Node {
  value: number;
}

export interface branchNode extends Node {
  children: (leafNode | branchNode)[];
}
