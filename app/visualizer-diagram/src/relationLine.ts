import * as d3 from "d3";
import { Node, BranchNode, LeafNode } from "./nodeInterface";
import * as v from "@thi.ng/vectors";
import fe from "from-exponential";
import { step, vec2 } from "@thi.ng/vectors";

export const drawRelationLine = (
  startNode: { x: number; y: number; r: number },
  endNode: { x: number; y: number; r: number },
  snap: boolean = true,
  snapSteps: number = 8,
  distanceSnapCutoff: number = 200
): string => {
  let unitV = v.Vec2.X_AXIS;

  let startV = <v.Vec2>v.vec2(startNode.x, startNode.y);
  let endV = <v.Vec2>v.vec2(endNode.x, endNode.y);

  let pathV = <v.Vec2>v.sub([], endV, startV);
  let dirAB = <v.Vec2>v.normalize([], pathV);
  let dirBA = <v.Vec2>v.mulN([], dirAB, -1);

  let controlPointDistance =
    (v.dist(v.Vec2.ZERO, pathV) - startNode.r - endNode.r) / 2;

  let startAngle = Math.atan2(det(unitV, dirAB), v.dot(unitV, dirAB));
  let endAngle = Math.atan2(det(unitV, dirBA), v.dot(unitV, dirBA));

  if (snap && v.dist(v.Vec2.ZERO, pathV) > distanceSnapCutoff) {
    startAngle = snapAngle(startAngle, snapSteps);
    endAngle = snapAngle(endAngle, snapSteps);
  }

  let startDirection = v.rotate([], v.Vec2.X_AXIS, startAngle);
  let endDirection = v.rotate([], v.Vec2.X_AXIS, endAngle);

  let startOffset = <v.Vec2>v.mulN([], startDirection, startNode.r);
  let endOffset = <v.Vec2>v.mulN([], endDirection, endNode.r);

  let startHandleOffset = <v.Vec2>(
    v.mulN([], startDirection, startNode.r + controlPointDistance)
  );
  let endHandleOffset = <v.Vec2>(
    v.mulN([], endDirection, endNode.r + controlPointDistance)
  );

  let startPosition = <v.Vec2>v.add([], startV, startOffset);
  let endPosition = <v.Vec2>v.add([], endV, endOffset);

  let startHandlePosition = <v.Vec2>v.add([], startV, startHandleOffset);
  let endHandlePosition = <v.Vec2>v.add([], endV, endHandleOffset);

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

const snapAngle = (angle: number, steps: number): number => {
  let normalizedAngle = normalizeAngle(angle);
  let normalizedSnappedAngle = Math.round(normalizedAngle * steps) / steps;

  return unnormalizeAngle(normalizedSnappedAngle);
};

const normalizeAngle = (angle: number): number => {
  return angle / (2 * Math.PI);
};

const unnormalizeAngle = (normalizedAngle: number): number => {
  if (normalizedAngle > 0.5) {
    normalizedAngle = -0.5 * -1;
  }

  return normalizedAngle * 2 * Math.PI;
};

const det = (v1: v.Vec2, v2: v.Vec2): number => {
  return v1[0] * v2[1] - v1[1] * v2[0];
};
