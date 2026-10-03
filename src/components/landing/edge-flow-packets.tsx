"use client";

import { useEffect, useMemo, useRef } from "react";

import { pointOnPolyline, type PolylinePoint } from "@/lib/polyline-motion";

const PACKET_COUNT = 6;
const LOOP_MS = 9000;

type PacketSpec = {
  routeIndex: number;
  phase: number;
};

function buildPacketSpecs(routeCount: number): PacketSpec[] {
  return Array.from({ length: PACKET_COUNT }, (_, index) => {
    const routeIndex = index % routeCount;
    const lane = Math.floor(index / routeCount);
    return {
      routeIndex,
      phase: routeIndex * 0.08 + lane * 0.5,
    };
  });
}

function positionsForTime(
  routes: readonly PolylinePoint[][],
  specs: readonly PacketSpec[],
  elapsedMs: number,
): PolylinePoint[] {
  return specs.map((spec) => {
    const route = routes[spec.routeIndex];
    const progress = spec.phase + elapsedMs / LOOP_MS;
    return pointOnPolyline(route, progress);
  });
}

function routesSignature(routes: readonly PolylinePoint[][]): string {
  return routes
    .map((route) => route.map((point) => `${point.x},${point.y}`).join(";"))
    .join("|");
}

export function EdgeFlowPackets({
  routes,
}: {
  routes: readonly PolylinePoint[][];
}) {
  const specs = useMemo(
    () => buildPacketSpecs(routes.length),
    [routes.length],
  );
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const routesKey = useMemo(() => routesSignature(routes), [routes]);

  const initialPositions = useMemo(
    () => positionsForTime(routes, specs, 0),
    [routes, specs],
  );

  useEffect(() => {
    if (routes.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    let frame = 0;
    let start = performance.now();

    const applyPositions = (points: PolylinePoint[]) => {
      points.forEach((point, index) => {
        const circle = circleRefs.current[index];
        if (!circle) {
          return;
        }
        circle.setAttribute("cx", String(point.x));
        circle.setAttribute("cy", String(point.y));
      });
    };

    const tick = () => {
      const elapsed = performance.now() - start;
      applyPositions(positionsForTime(routes, specs, elapsed));
      frame = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      start = performance.now();
      tick();
    };

    const idleId = window.requestIdleCallback(startLoop, { timeout: 2000 });

    return () => {
      window.cancelIdleCallback(idleId);
      cancelAnimationFrame(frame);
    };
  }, [routes, routesKey, specs]);

  if (routes.length === 0) {
    return null;
  }

  return (
    <g aria-hidden="true">
      {initialPositions.map((point, index) => (
        <circle
          key={`flow-packet-${index}`}
          ref={(element) => {
            circleRefs.current[index] = element;
          }}
          cx={point.x}
          cy={point.y}
          r="3.5"
          className="edge-packet fill-primary"
        />
      ))}
    </g>
  );
}
