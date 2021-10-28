export type nodeTypes = "person" | "abteilung" | "projekt" | "default";

export const nodeTypeProperties: { [key in nodeTypes]: nodeType } = {
  person: {
    size: 100,
    color: "#b3b3b3",
    opacity: 0.75,
  },
  abteilung: {
    size: 500,
    color: "#f77f00",
    opacity: 0.75,
  },
  projekt: {
    size: 250,
    color: "#fcbf49",
    opacity: 0.75,
  },
  default: {
    size: 1000,
    color: "#003049",
    opacity: 0.75,
  },
};

interface nodeType {
  size: number;
  color: string;
  opacity: number;
}
