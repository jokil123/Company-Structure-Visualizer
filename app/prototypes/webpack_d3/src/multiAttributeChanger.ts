import * as d3 from "d3";

export const applyAttributes = (
  selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  props: [string, string | number][]
) => {
  props.forEach((prop) => {
    selection.attr(prop[0], prop[1]);
  });
};
