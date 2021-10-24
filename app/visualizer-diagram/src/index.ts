import data from "../data/data.json";
import "./index.scss";
import { chart } from "./chart";
import { loadExcelFile } from "./excelLoader";
import * as d3 from "d3";
import { BranchNode } from "./nodeInterface";

d3.select("#fileInput").on("input", (f) => {
  loadExcelFile(f).then((e) => {
    chart(<BranchNode>e, [1000, 1000], 20);
  });
});

let dataChart = chart(data, [1000, 1000], 20);
