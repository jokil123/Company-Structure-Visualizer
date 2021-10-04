import * as d3 from "d3";
import { Node, branchNode, leafNode } from "./nodeInterface";
import * as v from "@thi.ng/vectors";
import fe from "from-exponential";

export const drawRelationLine = (
  startNode: { x: number; y: number; r: number },
  endNode: { x: number; y: number; r: number }
): string => {
  let controlPointDistance = 100;

  let startVector = <v.Vec2>v.vec2(startNode.x, startNode.y);
  let endVector = <v.Vec2>v.vec2(endNode.x, endNode.y);

  let pathVector = <v.Vec2>v.sub([], endVector, startVector);
  let direction = <v.Vec2>v.normalize([], pathVector);

  let startOffset = <v.Vec2>v.mulN([], direction, startNode.r);
  let endOffset = <v.Vec2>v.mulN([], direction, pathVector.length - endNode.r);

  let startPosition = <v.Vec2>v.add([], startVector, startOffset);
  let endPosition = <v.Vec2>v.add([], endVector, endOffset);

  let startHandleOffset = <v.Vec2>(
    v.mulN([], direction, startNode.r + controlPointDistance)
  );
  let endHandleOffset = <v.Vec2>(
    v.mulN([], direction, pathVector.length - endNode.r - controlPointDistance)
  );

  let startHandlePosition = <v.Vec2>v.add([], startVector, startHandleOffset);
  let endHandlePosition = <v.Vec2>v.add([], endVector, endOffset);

  let co = [
    fe(startPosition[0]),
    fe(startPosition[1]),
    fe(startHandlePosition[0]),
    fe(startHandlePosition[1]),
    fe(endHandlePosition[0]),
    fe(endHandlePosition[1]),
    fe(endPosition[0]),
    fe(endPosition[1]),
  ];

  return `M${co[0]},${co[1]} C${co[2]},${co[3]} ${co[4]},${co[5]} ${co[6]},${co[7]}`;
};
