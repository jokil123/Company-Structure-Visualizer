import * as xlsx from "xlsx";
import * as d3 from "d3";
import { readPromise } from "./readAsTextPromise";
import { nodeTypeProperties, nodeTypes } from "./nodeTypes";

interface element {
  name: string;
  type: nodeTypes;
  parent: string;
  relations: string[];
  children?: element[];
  value?: number;
}

export const loadExcelFile = async (e: Event) => {
  let fileContentString = await readPromise(
    (<HTMLInputElement>e.target).files[0]
  );

  let workbook = xlsx.read(fileContentString);

  let sheet = workbook.Sheets[workbook.SheetNames[0]];

  let dimensions = sheet["!ref"].split(":");

  let contentSize = [3, parseInt(dimensions[1].match(/\d+/)[0])];

  let elements: element[] = [];

  for (let i = contentSize[0]; i <= contentSize[1]; i++) {
    elements.push({
      name: sheet[`A${i}`] ? (<string>sheet[`A${i}`].v).toLowerCase() : "",
      type: <nodeTypes>(
        (sheet[`B${i}`] ? (<string>sheet[`B${i}`].v).toLowerCase() : "default")
      ),
      parent: sheet[`C${i}`] ? (<string>sheet[`C${i}`].v).toLowerCase() : "",
      relations: sheet[`D${i}`]
        ? (<string>sheet[`D${i}`].v).split(",").map((relation: string) => {
            return relation.trim().toLowerCase();
          })
        : [],
    });
  }

  let lut: { [key: string]: element } = {};
  elements.forEach((element) => {
    lut[element.name] = element;
  });

  let topLevelNodes: element[] = [];

  elements.forEach((element) => {
    if (element.name == "") {
      return;
    }

    if (element.parent == "") {
      topLevelNodes.push(element);
    } else {
      if (!lut[element.parent].children) {
        lut[element.parent].children = [];
      }

      lut[element.parent].children.push(element);
    }
  });

  elements.forEach((element) => {
    if (!element.children || element.children.length == 0) {
      element.value = nodeTypeProperties[element.type].size;
    }
  });

  return topLevelNodes[0];
};

d3.select("#fileInput").on("input", loadExcelFile);
