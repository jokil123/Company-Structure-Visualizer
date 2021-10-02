import { SVG } from "@svgdotjs/svg.js";

let draw = SVG().addTo("body").size(300, 300);
let rect = draw.rect(200, 100).attr({ fill: "#f06" });
