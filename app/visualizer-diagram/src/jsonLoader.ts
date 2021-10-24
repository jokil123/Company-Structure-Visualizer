import * as d3 from "d3";
import { resolve } from "../webpack.config";

import { BranchNode, LeafNode, Node } from "./nodeInterface";

interface fileNode {
  name: string;
  type: "department" | "person" | "group" | "parentDepartment";
  children?: [fileNode];
  relations?: string[];
  value?: number;
}

export const initFileLoading = () => {
  d3.select("#fileInput").on("input", loadJsonFile);
};

const loadJsonFile = async (e: Event) => {

  let fileContentString = await readAsTextPromise((<HTMLInputElement>e.target).value)


  let fileContent; = <fileNode>JSON.parse(fileContentString);
  

  let fileContent = <fileNode>JSON.parse((<HTMLInputElement>e.target).value);

  console.log(fileContent);
};

const readAsTextPromise = (blob: Blob): Promise<string | ArrayBuffer> => {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsText(blob);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onabort = reject;
    reader.onerror = reject;
  });
};
